// Module imports
import {
	createContext,
	useCallback,
	useContext,
	useId as useID,
	useLayoutEffect,
	useMemo,
	useState,
} from 'react'
import createGraph from 'ngraph.graph'
// import { useStore } from 'statery'





// Local imports
// import { Gamepad } from '../../game/Gamepad.js'
import { getDistanceBetweenNodes } from '../../helpers/getDistanceBetweenNodes.js'
// import { store } from '../../store/store.js'





// Types
/** @typedef {import('ngraph.graph').NodeId} NodeID */
/**
 * @typedef {object} ContextValue
 * @property {Function} activateNode
 * @property {Function} createLink
 * @property {Function} createNode
 * @property {NodeID} currentTargetNodeID
 * @property {Function} deactivateNode
 * @property {Function} destroyNode
 * @property {Function} focusNode
 * @property {import('ngraph.graph').Graph} graph
 */





// Constants
/** @type {import('react').Context<ContextValue>} */
const NavGraphContext = createContext({
	currentTargetNodeID: null,
	graph: null,

	activateNode: () => {},
	createLink: () => {},
	createNode: () => {},
	deactivateNode: () => {},
	destroyNode: () => {},
	focusNode: () => {},
})





export function NavGraphContextProvider(props) {
	const { children } = props

	// const { controlsManager } = useStore(store)

	const [axes, setAxes] = useState({
		x: {
			direction: 0,
			isActivated: false,
			isHandled: true,
		},
		y: {
			direction: 0,
			isActivated: false,
			isHandled: true,
		},
	})
	const [currentTargetNodeID, setCurrentTargetNodeID] = useState(null)
	const [gamepadUpdate, setGamepadUpdate] = useState({})
	const [graph] = useState(createGraph())

	/** Traverses the graph to find adjacent nodes. */
	const getAdjacentNodeIDs = useCallback(
		/**
		 * @param {object} options All options.
		 * @param {Set<NodeID>} [options.adjacentNodes] A set of adjacent nodes that have already been discovered.
		 * @param {Set<NodeID>} [options.checkedNodes] A set of nodes that have already been checked. Prevents duplicate checking and infinite loops.
		 * @param {NodeID} [options.originNodeID] The ID of the node to start from.
		 * @param {NodeID} options.sourceNodeID The ID of the node from which this test was started.
		 * @returns {Set<NodeID> | NodeID[]}
		 */
		options => {
			const {
				adjacentNodes = new Set,
				checkedNodes = new Set,
				sourceNodeID,
			} = options

			const originNodeID = options.originNodeID ?? sourceNodeID
			const originNodeGroupID = graph.getNode(originNodeID).data.groupID

			/**
			 * Loop over all outbound links from the current target node.
			 */
			graph.forEachLinkedNode(sourceNodeID, node => {
				if (checkedNodes.has(node.id)) {
					return
				}

				checkedNodes.add(node.id)

				if (!node.data) {
					return
				}

				if (node.data?.isGroup) {
					if ((node.id === originNodeGroupID) || !node.data.defaultTarget) {
						getAdjacentNodeIDs({
							adjacentNodes,
							checkedNodes,
							originNodeID,
							sourceNodeID: node.id,
						})

					} else {
						adjacentNodes.add(node.data.defaultTarget)
					}
				} else {
					adjacentNodes.add(node.id)
				}
			}, true)

			adjacentNodes.delete(sourceNodeID)

			if (sourceNodeID === originNodeID) {
				return Array.from(adjacentNodes)
			}

			return adjacentNodes
		},
		[graph],
	)

	/** Activate a node. */
	const activateNode = useCallback(
		/**
		 * @param {string} nodeID The ID of the node to be activated.
		 */
		nodeID => {
			const node = graph.getNode(nodeID)

			if (typeof node.data.onActivate === 'function') {
				node.data.onActivate()
			}
		},
		[graph],
	)

	/** Deactivate a node. */
	const deactivateNode = useCallback(
		/**
		 * @param {string} nodeID The ID of the node to be deactivated.
		 */
		nodeID => {
			const node = graph.getNode(nodeID)

			if (typeof node.data.onDeactivate === 'function') {
				node.data.onDeactivate()
			}
		},
		[graph],
	)

	/** Creates a link between two nodes. */
	const createLink = useCallback(
		/**
		 * @param {string} nodeIDA The node from which the link will be created.
		 * @param {string} nodeIDB The node to which the link will be created.
		 */
		(nodeIDA, nodeIDB) => {
			if (!graph.getLink(nodeIDA, nodeIDB)) {
				graph.addLink(nodeIDA, nodeIDB)
			}
		},
		[graph],
	)

	/** Creates a new node and adds it to the graph. This will also create the node's group (if it doesn't exist yet) and link the node to the group. */
	const createNode = useCallback(
		/**
		 * @param {import('../../../types/NavGraphNodeOptions.js').NavGraphNodeOptions} options Options for the node to be created.
		 */
		options => {
			const {
				groupID,
				id,
				isDefault = false,
				onActivate,
				onDeactivate,
				onFocus,
				targetRef,
			} = options

			let nodeProps = {
				groupID,
				onActivate,
				onDeactivate,
				onFocus,
				targetRef,
			}

			if (!groupID || !targetRef || (typeof onActivate !== 'function')) {
				return null
			}

			if (!groupID) {
				throw new Error('`groupID` is required.')
			}

			if (typeof onActivate !== 'function') {
				throw new Error('`onActivate` must be a function.')
			}

			if (Boolean(onDeactivate) && (typeof onDeactivate !== 'function')) {
				throw new Error('`onDeactivate` must be a function.')
			}

			if (Boolean(onFocus) && (typeof onFocus !== 'function')) {
				throw new Error('`onFocus` must be a function.')
			}

			if (!targetRef) {
				throw new Error('`targetRef` is required.')
			}

			/**
			 * Add bidirectional links between this node and the node group.
			 */
			createLink(id, groupID)
			createLink(groupID, id)

			const groupNode = graph.getNode(groupID)

			/**
			 * Initialise group data (if necessary).
			 */
			if (!groupNode.data) {
				groupNode.data = {
					defaultTarget: null,
					isGroup: true,
				}
			}

			/**
			 * Set this as the group's default node if necessary.
			 */
			if (isDefault) {
				groupNode.data.defaultTarget = id
			}

			/**
			 * Add this node to the graph.
			 */
			graph.addNode(id, nodeProps)
		},
		[
			createLink,
			graph,
		]
	)

	/** Destroys a node, removing it from the graph. */
	const destroyNode = useCallback(
		/**
		 * @param {string} nodeID The ID of the node to be destroyed.
		 */
		nodeID => {
			let groupNodeID = null
			let isGroupEmpty = true

			/**
			 * Remove all links on this node.
			 */
			graph.forEachLinkedNode(nodeID, (linkedNode, link) => {
				/**
				 * Capture the group ID.
				 */
				groupNodeID = linkedNode.id

				graph.removeLink(link)
			}, true)

			/**
			 * Remove this node from the graph.
			 */
			graph.removeNode(nodeID)

			/**
			 * Capture the group's node.
			 */
			const groupNode = graph.getNode(groupNodeID)

			if (groupNode?.data.defaultTarget === nodeID) {
				groupNode.data.defaultTarget = null
			}

			/**
			 * Loop over all nodes attached to the destroyed node's group to check if
			 * any links remain to non-group nodes.
			 */
			graph.forEachLinkedNode(groupNodeID, node => {
				if (!isGroupEmpty) {
					return
				}

				if (node?.data && !node.data.isGroup) {
					isGroupEmpty = false
				}
			}, true)

			/**
			 * Destroy the associated group node if it's empty.
			 */
			if (isGroupEmpty) {
				graph.removeNode(groupNodeID)
			}
		},
		[graph]
	)

	/** Transfer focus to a node. */
	const focusNode = useCallback(
		/**
		 * @param {NodeID} nodeID The ID of the node to transfer focus to.
		 */
		nodeID => {
			if (!graph.hasNode(nodeID)) {
				return
			}

			let node = graph.getNode(nodeID)

			const {
				defaultTarget,
				isGroup,
				onFocus,
			} = node?.data ?? {}

			if (onFocus) {
				node.data.onFocus(node)
			}

			if (isGroup) {
				if (defaultTarget) {
					focusNode(defaultTarget)
				}

				return
			}

			setCurrentTargetNodeID(nodeID)
		},
		[
			graph,
			setCurrentTargetNodeID,
		]
	)

	/** Fired when a gamepad's joystick axis has changed. */
	const handleAxisChanged = useCallback(event => {
		const {
			index,
			state,
		} = event

		const absoluteState = Math.abs(state)
		const axisKey = [0, 2].includes(index) ? 'x' : 'y'
		const axisIsActivated = axes[axisKey]?.isActivated

		if (!axisIsActivated && (absoluteState > 0.5)) {
			setAxes(previousState => {
				return {
					...previousState,
					[axisKey]: {
						direction: Math.sign(state),
						isActivated: true,
						isHandled: false,
					},
				}
			})
		} else if (axisIsActivated && (absoluteState < 0.5)) {
			setAxes(previousState => {
				return {
					...previousState,
					[axisKey]: {
						isActivated: false,
						isHandled: false,
					},
				}
			})
		}
	}, [
		activateNode,
		axes,
		currentTargetNodeID,
		graph,
	])

	/** Fired when a gamepad button is pressed. */
	const handleButtonPressed = useCallback(event => {
		const { index } = event

		if (index === 0) {
			return activateNode(currentTargetNodeID)
		}

		if (index === 1) {
			return deactivateNode(currentTargetNodeID)
		}

		let axis = null
		let direction = null

		// D-pad Up
		if (index === 12) {
			axis = 'y'
			direction = -1

		// D-pad Down
		} else if (index === 13) {
			axis = 'y'
			direction = 1

		// D-pad Left
		} else if (index === 14) {
			axis = 'x'
			direction = -1

		// D-pad Right
		} else if (index === 15) {
			axis = 'x'
			direction = 1
		}

		if (axis && direction) {
			setAxes(previousState => ({
				...previousState,
				[axis]: {
					direction,
					isActivated: true,
					isHandled: false,
				},
			}))
		}
	}, [
		activateNode,
		currentTargetNodeID,
		deactivateNode,
		graph,
		setAxes,
	])

	/** Fired when a gamepad button is released. */
	const handleButtonReleased = useCallback(event => {
		const { index } = event

		let axis = null

		// D-pad Up/Down
		if ([12, 13].includes(index)) {
			axis = 'x'

		// D-pad Right/Left
		} else if ([14, 15].includes(index)) {
			axis = 'y'
		}

		if (axis) {
			setAxes(previousState => ({
				...previousState,
				[axis]: {
					isActivated: false,
					isHandled: false,
				},
			}))
		}
	}, [setAxes])

	/** Fired when a gamepad is connected of disconnected. Forces an update for things that depend on gamepads. */
	const handleGamepadChange = useCallback(() => setGamepadUpdate({}), [setGamepadUpdate])

	// /**
	//  * Binds all events we need to react to on a gamepad.
	//  *
	//  * @param {Gamepad} gamepad The gamepad to which events will be bound.
	//  */
	// const bindGamepadEvents = useCallback(gamepad => {
	// 	gamepad.on('button pressed', handleButtonPressed)
	// 	gamepad.on('button released', handleButtonReleased)
	// 	gamepad.on('axis changed', handleAxisChanged)
	// }, [
	// 	handleAxisChanged,
	// 	handleButtonPressed,
	// 	handleButtonReleased,
	// ])

	// /**
	//  * Unbinds all events we're currently watching for on a gamepad.
	//  *
	//  * @param {Gamepad} gamepad The gamepad from which events will be unbound.
	//  */
	// const unbindGamepadEvents = useCallback(gamepad => {
	// 	gamepad.off('button pressed', handleButtonPressed)
	// 	gamepad.off('axis changed', handleAxisChanged)
	// }, [
	// 	handleAxisChanged,
	// 	handleButtonPressed,
	// ])

	const providerValue = useMemo(() => ({
		activateNode,
		createLink,
		createNode,
		currentTargetNodeID,
		deactivateNode,
		destroyNode,
		focusNode,
		graph,
	}), [
		activateNode,
		createLink,
		createNode,
		currentTargetNodeID,
		deactivateNode,
		destroyNode,
		focusNode,
		graph,
	])

	// useLayoutEffect(() => {
	// 	const gamepad = controlsManager.getGamepad(0)

	// 	controlsManager.on('gamepad connected', handleGamepadChange)
	// 	controlsManager.on('gamepad disconnected', handleGamepadChange)

	// 	if (gamepad) {
	// 		bindGamepadEvents(gamepad)
	// 	}

	// 	return () => {
	// 		controlsManager.off('gamepad connected', handleGamepadChange)
	// 		controlsManager.off('gamepad disconnected', handleGamepadChange)

	// 		if (gamepad) {
	// 			unbindGamepadEvents(gamepad)
	// 		}
	// 	}
	// }, [
	// 	bindGamepadEvents,
	// 	controlsManager,
	// 	gamepadUpdate,
	// 	handleGamepadChange,
	// 	unbindGamepadEvents,
	// ])

	useLayoutEffect(() => {
		Object
			.entries(axes)
			.forEach(([axisKey, state]) => {
				const {
					direction,
					isActivated,
					isHandled,
				} = state

				if (isActivated && !isHandled) {
					const currentNode = graph.getNode(currentTargetNodeID)

					if (!currentNode) {
						return
					}

					const currentNodeBoundingRect = currentNode.data.targetRef.current.getBoundingClientRect()

					const adjacentNodeIDs = /** @type {NodeID[]} */ (getAdjacentNodeIDs({ sourceNodeID: currentTargetNodeID }))
					const nearestNode = adjacentNodeIDs
						.map(id => graph.getNode(id))
						.filter(node => {
							if (!node) {
								return false
							}

							const boundingRect = node.data.targetRef.current.getBoundingClientRect()

							// Horizontal axis
							if (axisKey === 'x') {
								// Moving right
								if (direction === 1) {
									return currentNodeBoundingRect.left < boundingRect.left
								}

								// Moving left
								return currentNodeBoundingRect.right > boundingRect.right
							}

							// Vertical axis
							if (axisKey === 'y') {
								// Moving down
								if (direction === 1) {
									return currentNodeBoundingRect.top < boundingRect.top
								}

								// Moving up
								return currentNodeBoundingRect.bottom > boundingRect.bottom
							}
						})
						.reduce((accumulator, node) => {
							if (accumulator === null) {
								return node
							}

							const distanceA = getDistanceBetweenNodes(currentNode, accumulator)
							const distanceB = getDistanceBetweenNodes(currentNode, node)

							if (distanceA > distanceB) {
								return node
							}

							return accumulator
						}, null)

					setAxes(previousState => {
						return {
							...previousState,
							[axisKey]: {
								...previousState[axisKey],
								isHandled: true,
							},
						}
					})

					if (nearestNode) {
						focusNode(nearestNode.id)
					}
				}
			})
	}, [
		axes,
		currentTargetNodeID,
		focusNode,
		getAdjacentNodeIDs,
		graph,
		setAxes,
	])

	// @ts-ignore
	window.navGraph = graph

	return (
		<NavGraphContext.Provider value={providerValue}>
			{children}
		</NavGraphContext.Provider>
	)
}

/**
 * Allows access to the internals of the NavGraph Context.
 */
export function useNavGraphContext() {
	return useContext(NavGraphContext)
}

/**
 * Adds a component to the nav graph.
 *
 * @param {import('../../../types/NavGraphNodeOptions.js').NavGraphNodeOptions} options All options.
 */
export function useNavGraphNode(options, dependencies = []) {
	const internalID = useID()

	const {
		groupID,
		groupLinks,
		id = internalID,
		isDefault,
		onActivate,
		onDeactivate,
		onFocus,
		targetRef,
	} = options

	const {
		createLink,
		createNode,
		destroyNode,
	} = useNavGraphContext()

	useLayoutEffect(() => {
		createNode({
			groupID,
			id,
			isDefault,
			onActivate,
			onDeactivate,
			onFocus,
			targetRef,
		})

		groupLinks.forEach(targetNodeID => {
			createLink(groupID, targetNodeID)
			createLink(targetNodeID, groupID)
		})

		return () => destroyNode(id)
	}, dependencies)
}
