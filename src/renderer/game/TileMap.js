// Module imports
import {
	BaseTexture,
	Spritesheet,
} from 'pixi.js'
import createGraph from 'ngraph.graph'





// Local imports
import { fetchAsJSON } from '../helpers/fetchAsJSON.js'
import { parseCoordinateString } from '../helpers/parseCoordinateString.js'
import { store } from '../store/store.js'
import { updateTileMapGraphLinks } from '../helpers/updateTileMapGraphLinks.js'
import { Vector2 } from './Vector2.js'





// Types
/** @typedef {import('../../types/CoordinateString.js').CoordinateString} CoordinateString */
/** @typedef {import('../../types/LayerMap.js').LayerMap} LayerMap */
/** @typedef {import('../../types/TileConfig.js').TileConfig} TileConfig */
/** @typedef {import('../../types/TileMapData.js').TileMapData} TileMapData */
/** @typedef {import('../../types/Vector2Object.js').Vector2Object} Vector2Object */





/**
 * Manages a map's data.
 */
export class TileMap {
	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	/** @type {TileMapData} */
	#data

	/** @type {Map<string, *>} */
	#dependencies = new Map

	/** @type {Vector2[]} */
	#destinations

	/** @type {import('ngraph.graph').Graph} */
	#graph = createGraph()

	/** @type {null | number} */
	#height

	/** @type {string} */
	#id

	/** @type {object} */
	#meta

	/** @type {TileMap[]} */
	#queue

	/** @type {Vector2} */
	#startingPosition

	/** @type {Map<CoordinateString, Set<TileConfig>>} */
	#tilestacks = new Map

	/** @type {null | number} */
	#width





	/****************************************************************************\
	 * Constructor
	\****************************************************************************/

	/**
	 * Creates a new map.
	 *
	 * @param {string} id The ID of the map.
	 * @param {TileMapData} [config] The map config.
	 */
	constructor(id, config) {
		this.#id = id

		if (config) {
			this.#data = config

			if (config.destinations) {
				this.#destinations = /** @type {Vector2[]} */ (config.destinations)
			}

			if (config.queue) {
				this.#queue = /** @type {TileMap[]} */ (config.queue)
			}

			if (config.tilestacks) {
				this.#tilestacks = config.tilestacks
			} else {
				this.#generateTileStacks()
			}

			this.#recalculateDimensions()
			this.#generateGraph()
		}
	}





	/****************************************************************************\
	 * Private instance methods
	\****************************************************************************/

	/** Generates the graph for this tilemap. */
	#generateGraph() {
		for (const [coordinateString] of this.#tilestacks) {
			const [x, y] = parseCoordinateString(coordinateString)
			const tilestack = this.getTilesAt(x, y)

			for (const tileMeta of tilestack) {
				if (this.#graph.hasNode(coordinateString)) {
					const node = this.#graph.getNode(coordinateString)

					if (tileMeta.isBlocking) {
						node.data.isBlocking = true
						node.data.isTraversable = false
					} else if (tileMeta.isTraversable && !node.data.isBlocking) {
						node.data.isTraversable = tileMeta.isTraversable
					}
				} else {
					const nodeData = {
						isBlocking: tileMeta.isBlocking,
						isTraversable: tileMeta.isTraversable,
						position: {
							x,
							y,
						},
						tileStack: [],
					}

					this.#graph.addNode(coordinateString, nodeData)
				}
			}
		}

		updateTileMapGraphLinks(this.#graph)
	}

	/**
	 * Creates tile stacks for each occupied coordinate in the map.
	 */
	#generateTileStacks() {
		this.#data.layers.forEach(layer => {
			Object.entries(layer).forEach(([coordinateString, tileData]) => {
				/** @type {CoordinateString} */
				const typedCoordinateString = /** @type {*} */ (coordinateString)

				if (!tileData) {
					return
				}

				let tilestack = this.#tilestacks.get(typedCoordinateString)

				if (!tilestack) {
					tilestack = new Set
					this.#tilestacks.set(typedCoordinateString, tilestack)
				}

				tilestack.add(tileData)
			})
		})
	}

	/**
	 * Calculates the map's dimensions.
	 */
	#recalculateDimensions() {
		/** @type {null | number} */
		let maxX = null
		/** @type {null | number} */
		let maxY = null
		/** @type {null | number} */
		let minX = null
		/** @type {null | number} */
		let minY = null

		for (const [coordinateString] of this.#tilestacks) {
			const [x, y] = parseCoordinateString(coordinateString)

			if (maxX === null) {
				maxX = x
			} else {
				maxX = Math.max(maxX, x)
			}

			if (maxY === null) {
				maxY = y
			} else {
				maxY = Math.max(maxY, y)
			}

			if (minX === null) {
				minX = x
			} else {
				minX = Math.min(minX, x)
			}

			if (minY === null) {
				minY = y
			} else {
				minY = Math.min(minY, y)
			}
		}

		this.#height = (maxY - minY) + 1
		this.#width = (maxX - minX) + 1
	}





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	/**
	 * Retrieves all tiles at the provided coordinates.
	 *
	 * @param {number} x The horizontal axis coordinate.
	 * @param {number} y The vertical axis coordinate.
	 * @returns {import('../../types/TileData.js').TileData[]} The tile data for the tilestack at the requested coordinate.
	 */
	getTilesAt(x, y) {
		const tilestack = this.#tilestacks.get(`${x}|${y}`)

		if (!tilestack) {
			return []
		}

		return Array.from(tilestack).map(tileConfig => {
			const resourcepack = store.state.resourcepacks.get(tileConfig.resourcepackID)
			return resourcepack.meta.tiles[tileConfig.tileID]
		})
	}

	/**
	 * Checks whether there is a blocking tile at the provided coordinates.
	 *
	 * @param {number} x The coordinate of the tile on the horizontal axis.
	 * @param {number} y The coordinate of the tile on the vertical axis.
	 * @returns {boolean} Whether the provided coordinates are blocked.
	 */
	isBlockedAt(x, y) {
		let isBlocked = false

		const tileStack = this.getTilesAt(x, y)

		for (const tileData of tileStack) {
			if (tileData?.isBlocking || tileData?.isTraversable) {
				isBlocked = true
				break
			}
		}

		return isBlocked
	}

	/**
	 * Loads the map's data.
	 */
	async loadDependencies() {
		const dependencies = {}

		for (const dependencyID of Object.keys(this.#meta.dependencies)) {
			const [
				meta,
				tiles,
			] = await Promise.all([
				fetchAsJSON(`resourcepacks/${dependencyID}/meta.json`),
				fetchAsJSON(`resourcepacks/${dependencyID}/tiles.json`),
			])

			const tilesTexture = BaseTexture.from(`resourcepacks/${dependencyID}/${tiles.meta.image}`)
			const tilesSpritesheet = new Spritesheet(tilesTexture, tiles)
			await tilesSpritesheet.parse()

			dependencies[dependencyID] = {
				meta,
				tiles,
				tilesSpritesheet,
			}
		}

		store.set(previousState => {
			const newResourcepacks = new Map(previousState.resourcepacks)

			Object.entries(dependencies).forEach(([dependencyID, dependencyData]) => {
				newResourcepacks.set(dependencyID, dependencyData)
				this.#dependencies.set(dependencyID, dependencyData)
			})

			return { resourcepacks: newResourcepacks }
		})

		this.#generateGraph()
	}

	/**
	 * Loads the map's data.
	 */
	async loadMap() {
		const [
			meta,
			data,
		] = await Promise.all([
			fetchAsJSON(`maps/${this.#id}/meta.json`),
			fetchAsJSON(`maps/${this.#id}/map.json`),
		])

		this.#meta = meta
		this.#data = data

		this.#generateTileStacks()
		this.#recalculateDimensions()

		store.set(() => ({
			robotPixelPosition: new Vector2(
				this.#data.startingPosition.x * 16,
				this.#data.startingPosition.y * 16,
			),
			robotPosition: new Vector2(
				this.#data.startingPosition.x,
				this.#data.startingPosition.y,
			),
		}))
	}

	/**
	 * Creates tilemaps from the queue.
	 */
	prepareQueue() {
		this.#queue = this.#data.queue.map((tilemapConfig, index) => {
			return new TileMap(`${this.#id}::${index}`, tilemapConfig)
		})
	}





	/****************************************************************************\
	 * Public instance getters/setters
	\****************************************************************************/

	/** @returns {TileMapData} The ID of this map. */
	get data() {
		return this.#data
	}

	/** @returns {Map<*, *>} A map of this map's dependencies. */
	get dependencies() {
		return this.#dependencies
	}

	/** @returns {Vector2[]} An array of possible destinations for this map. */
	get destinations() {
		if (!this.#data) {
			throw new Error('Cannot access starting position for tilesets')
		}

		if (!this.#destinations) {
			this.#destinations = this.#data.destinations.map(destination => new Vector2(
				destination.x,
				destination.y,
			))
		}

		return this.#destinations
	}

	/** @returns {import('ngraph.graph').Graph} The graph backing this map. */
	get graph() {
		return this.#graph
	}

	/** @returns {number} The height of the map (in tiles). */
	get height() {
		return this.#height
	}

	/** @returns {string} The ID of this map. */
	get id() {
		return this.#id
	}

	/** @returns {LayerMap[]} An array of layer maps. */
	get layers() {
		return this.#data.layers
	}

	/** @returns {string} The ID of this map. */
	get meta() {
		return this.#meta
	}

	/** @returns {TileMap[]} An array of layer maps. */
	get queue() {
		return this.#queue
	}

	/** @returns {Vector2} The position at which the robot must start. */
	get startingPosition() {
		if (!this.#data) {
			throw new Error('Cannot access starting position for tilesets')
		}

		if (!this.#startingPosition) {
			this.#startingPosition = new Vector2(
				this.#data.startingPosition.x,
				this.#data.startingPosition.y,
			)
		}

		return this.#startingPosition
	}

	/** @returns {Map<CoordinateString, Set<TileConfig>>} Tilestacks for all occupied coordinates. */
	get tilestacks() {
		return this.#tilestacks
	}

	/** @returns {number} The width of the map (in tiles). */
	get width() {
		return this.#width
	}
}
