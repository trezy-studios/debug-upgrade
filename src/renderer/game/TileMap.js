// Module imports
import {
	BaseTexture,
	Spritesheet,
} from 'pixi.js'





// Local imports
import { fetchAsJSON } from '../helpers/fetchAsJSON.js'
import { store } from '../store/store.js'





// Types
/** @typedef {import('../../types/TileMapData.js').BaseTileMapData} BaseTileMapData */
/** @typedef {import('../../types/TileMapData.js').LayerMap} LayerMap */
/** @typedef {import('../../types/TileMapData.js').TileMapData} TileMapData */





/**
 * Manages a map's data.
 */
export class TileMap {
	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	/** @type {TileMapData} */
	#data

	/** @type {Map<*, *>} */
	#dependencies = new Map

	/** @type {null | number} */
	#height

	/** @type {string} */
	#id

	/** @type {object} */
	#meta

	/** @type {TileMap[]} */
	#queue

	/** @type {null | number} */
	#width





	/****************************************************************************\
	 * Private instance methods
	\****************************************************************************/

	/**
	 * Calculates the map's dimensions.
	 */
	#recalculateDimensions() {
		const {
			maxX,
			maxY,
			minX,
			minY,
		} = this.layers.reduce((accumulator, layer) => {
			const occupiedCoordinates = Object.keys(layer)

			occupiedCoordinates.forEach(coordinateString => {
				const [x, y] = coordinateString
					.split('|')
					.map(Number)

				if (accumulator.maxX === null) {
					accumulator.maxX = x
				} else {
					accumulator.maxX = Math.max(accumulator.maxX, x)
				}

				if (accumulator.maxY === null) {
					accumulator.maxY = y
				} else {
					accumulator.maxY = Math.max(accumulator.maxY, y)
				}

				if (accumulator.minX === null) {
					accumulator.minX = x
				} else {
					accumulator.minX = Math.min(accumulator.minX, x)
				}

				if (accumulator.minY === null) {
					accumulator.minY = y
				} else {
					accumulator.minY = Math.min(accumulator.minY, y)
				}
			})

			return accumulator
		}, {
			/** @type {null | number} */
			maxX: null,
			/** @type {null | number} */
			maxY: null,
			/** @type {null | number} */
			minX: null,
			/** @type {null | number} */
			minY: null,
		})

		this.#height = (maxY - minY) + 1
		this.#width = (maxX - minX) + 1
	}





	/****************************************************************************\
	 * Constructor
	\****************************************************************************/

	/**
	 * Creates a new map.
	 *
	 * @param {string} id The ID of the map.
	 * @param {BaseTileMapData} [config] The map config.
	 */
	constructor(id, config) {
		this.#id = id

		if (config) {
			this.#data = config
			this.#recalculateDimensions()
		}
	}





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	/**
	 * Retrieves all tiles at the provided coordinates.
	 *
	 * @param {number} x The horizontal axis coordinate.
	 * @param {number} y The vertical axis coordinate.
	 * @returns {(import('../../types/TileData.js').TileData | null)[]}
	 */
	getTilesAt(x, y) {
		if ((x < 0) || (y < 0)) {
			return Array(this.layers.length).fill(null)
		}

		const coordinateString = `${x}|${y}`

		return this.layers.map(layer => {
			const tileData = layer[coordinateString]

			if (!tileData) {
				return null
			}

			const resourcepack = store.state.resourcepacks.get(tileData.resourcepackID)

			return resourcepack.meta.tiles[tileData.tileID]
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
		const tileStack = this.getTilesAt(x, y)

		return tileStack.some(tileData => {
			if (tileData?.isBlocking || tileData?.isTraversable) {
				return true
			}

			return false
		})
	}

	/**
	 * Loads the map's data.
	 */
	async loadDependencies() {
		const dependencies = {}

		for (const dependencyID of Object.keys(this.#meta.dependencies)) {
			const [
				meta,
				robots,
				tiles,
			] = await Promise.all([
				fetchAsJSON(`resourcepacks/${dependencyID}/meta.json`),
				fetchAsJSON(`resourcepacks/${dependencyID}/robots.json`),
				fetchAsJSON(`resourcepacks/${dependencyID}/tiles.json`),
			])

			const tilesTexture = BaseTexture.from(`resourcepacks/${dependencyID}/${tiles.meta.image}`)
			const tilesSpritesheet = new Spritesheet(tilesTexture, tiles)
			await tilesSpritesheet.parse()

			dependencies[dependencyID] = {
				meta,
				robots,
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

		this.#recalculateDimensions()
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

	/** @returns {string} The ID of this map. */
	get data() {
		return this.#data
	}

	/** @returns {Map<*, *>} A map of this map's dependencies. */
	get dependencies() {
		return this.#dependencies
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
		return this.#data.tiles
	}

	/** @returns {string} The ID of this map. */
	get meta() {
		return this.#meta
	}

	/** @returns {TileMap[]} An array of layer maps. */
	get queue() {
		return this.#queue
	}

	/** @returns {LayerMap[]} An array of layer maps. */
	get tiles() {
		return this.#data.tiles
	}

	/** @returns {number} The width of the map (in tiles). */
	get width() {
		return this.#width
	}
}
