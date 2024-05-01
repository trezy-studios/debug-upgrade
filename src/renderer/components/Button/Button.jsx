// Module imports
import {
	useCallback,
	useMemo,
	useRef,
} from 'react'
import classnames from 'classnames'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'





// Local imports
import styles from './Button.module.scss'

import { NavGraphNode } from '../NavGraph/NavGraphNode.jsx'
import { useNavGraphContext } from '../NavGraph/NavGraphContext.jsx'





/**
 * A wrapper for safely creating buttons.
 *
 * @component
 * @param {object} props All component props.
 * @param {*} [props.children] Node to be rendered inside of the button.
 * @param {string} [props.className] Additional classes to be applied to the component.
 * @param {boolean} [props.forceAnimationInclusion] Whether to set animation variants forcefully.
 * @param {string} [props.id] A unique identifier for this button.
 * @param {string} props.nodeID The ID to be used for this button in the navgraph.
 * @param {string} props.navGroupID The ID of the group to which this node will belong in the navgraph.
 * @param {import('ngraph.graph').NodeId[]} [props.navGroupLinks] An array of IDs to which this node's group will be linked.
 * @param {boolean} [props.isAffirmative] Whether this button will cause an affirmative action.
 * @param {boolean} [props.isDisabled] Whether this button is disabled.
 * @param {boolean} [props.isFullWidth] Whether this button should take up the full width of its parent.
 * @param {boolean} [props.isNegative] Whether this button will cause an negative action.
 * @param {boolean} [props.isNavGroupDefault] Whether this node will be used as the default for its node.
 * @param {boolean} [props.isSmall] Whether this button should be smaller than normal.
 * @param {boolean} [props.isStyled] Whether to apply styles to this component.
 * @param {boolean} [props.isSubmit] Whether this button should be smaller than normal.
 * @param {boolean} [props.isText] Whether this button should be rendered as only text.
 * @param {boolean} [props.isUniformlyPadded] Whether this button shoudl have the same padding on all sides.
 * @param {(...args: any[]) => any} props.onActivate A function to be executed when the button is activated via the navgraph.
 * @param {(...args: any[]) => any} [props.onDeactivate] A function to be executed when the button is deactivated via the navgraph.
 * @param {import('react').MouseEventHandler<HTMLButtonElement>} [props.onClick] The function to be executed when this button is clicked.
 * @param {import('react').FocusEventHandler<HTMLButtonElement>} [props.onFocus] A function to be executed when the button is focused within the navgraph.
 * @param {object} [props.style] Additional styles to be applied to the button.
 * @param {object} [props.variants] An object representing variations of the component's state to be used for animations.
 * @param {object} [props.variants.animate] The typical state of the component.
 * @param {object} [props.variants.exit] The state to which the component should be animated when it is unmounted.
 * @param {object} [props.variants.initial] The state from which the component should be animated when it is mounted.
 */
export function Button({
	children = null,
	className = '',
	forceAnimationInclusion = false,
	id = '',
	isAffirmative = false,
	isDisabled = false,
	isFullWidth = false,
	isNavGroupDefault = false,
	isNegative = false,
	isSmall = false,
	isStyled = true,
	isSubmit = false,
	isText = false,
	isUniformlyPadded = false,
	navGroupID,
	// eslint-disable-next-line react/require-default-props
	navGroupLinks,
	nodeID,
	onActivate,
	// eslint-disable-next-line react/require-default-props
	onClick,
	// eslint-disable-next-line react/require-default-props
	onDeactivate,
	// eslint-disable-next-line react/require-default-props
	onFocus,
	// eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
	style = {},
	variants = null,
	...props
}) {
	const buttonRef = useRef(null)

	const {
		currentTargetNodeID,
		focusNode,
	} = useNavGraphContext()

	/** @type {{ [key: string]: string }} */
	const animationProps = useMemo(() => {
		if (forceAnimationInclusion) {
			return {
				animate: 'animate',
				exit: 'exit',
				initial: 'initial',
			}
		}

		return {}
	}, [forceAnimationInclusion])

	/** @type {{ [key: string]: string }} */
	const ariaProps = useMemo(() => {
		return Object.entries(props).reduce((accumulator, [key, value]) => {
			if (key.startsWith('aria-')) {
				accumulator[key] = value
			}

			return accumulator
		}, {})
	}, [props])

	const compiledClassName = useMemo(() => {
		if (isStyled) {
			return classnames({
				[styles['button']]: true,
				[styles['is-affirmative']]: isAffirmative,
				[styles['is-full-width']]: isFullWidth,
				[styles['is-gamepad-focused']]: currentTargetNodeID === nodeID,
				[styles['is-negative']]: isNegative,
				[styles['is-small']]: isSmall,
				[styles['is-text']]: isText,
				[styles['is-uniformly-padded']]: isUniformlyPadded,
				[className]: true,
			})
		}

		return classnames({
			[styles['button-reset']]: true,
			[className]: true,
		})
	}, [
		className,
		currentTargetNodeID,
		isAffirmative,
		isFullWidth,
		isNegative,
		isSmall,
		isStyled,
		isText,
		isUniformlyPadded,
		nodeID,
	])

	/** @type {{ [key: string]: string }} */
	const dataProps = useMemo(() => {
		return Object.entries(props).reduce((accumulator, [key, value]) => {
			if (key.startsWith('data-')) {
				accumulator[key] = value
			}

			return accumulator
		}, {})
	}, [props])

	const handleHover = useCallback(() => focusNode(nodeID), [
		focusNode,
		nodeID,
	])

	return (
		<NavGraphNode
			groupID={navGroupID}
			groupLinks={navGroupLinks}
			id={nodeID}
			isDefault={isNavGroupDefault}
			onActivate={onActivate}
			onDeactivate={onDeactivate}
			// onFocus={onFocus}
			targetRef={buttonRef}>
			<motion.button
				key={id}
				ref={buttonRef}
				className={compiledClassName}
				disabled={isDisabled}
				onClick={onClick}
				onFocus={onFocus}
				onMouseOver={handleHover}
				style={style}
				type={isSubmit ? 'submit' : 'button'}
				variants={variants}
				{...animationProps}
				{...ariaProps}
				{...dataProps}>
				{children}
			</motion.button>
		</NavGraphNode>
	)
}

Button.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	forceAnimationInclusion: PropTypes.bool,
	id: PropTypes.string,
	isAffirmative: PropTypes.bool,
	isDisabled: PropTypes.bool,
	isFullWidth: PropTypes.bool,
	isNavGroupDefault: PropTypes.bool,
	isNegative: PropTypes.bool,
	isSmall: PropTypes.bool,
	isStyled: PropTypes.bool,
	isSubmit: PropTypes.bool,
	isText: PropTypes.bool,
	isUniformlyPadded: PropTypes.bool,
	navGroupID: PropTypes.string.isRequired,
	navGroupLinks: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	])),
	nodeID: PropTypes.string.isRequired,
	onActivate: PropTypes.func.isRequired,
	onClick: PropTypes.func,
	onDeactivate: PropTypes.func,
	onFocus: PropTypes.func,
	style: PropTypes.object,
	variants: PropTypes.shape({
		animate: PropTypes.object,
		exit: PropTypes.object,
		initial: PropTypes.object,
	}),
}
