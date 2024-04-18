// Module imports
import {
	BaseTexture,
	Spritesheet,
} from 'pixi.js'





// Local imports
import { fetchAsJSON } from '../helpers/fetchAsJSON.js'
import { store } from '../store/store.js'





/**
 * Manages a map's data.
 */
export class TileMap {
	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	/** @type {import('../../types/TileMapData.js').TileMapData} */
	#data

	/** @type {Map<*, *>} */
	#dependencies = new Map

	/** @type {string} */
	#id

	/** @type {object} */
	#meta

	/** @type {import('../../types/TileMapData.js').BaseTileMapData[]} */
	#queue





	/****************************************************************************\
	 * Constructor
	\****************************************************************************/

	/**
	 * Creates a new map.
	 *
	 * @param {string} id The ID of the map.
	 * @param {import('../../types/TileMapData.js').BaseTileMapData} [config] The ma config.
	 */
	constructor(id, config) {
		this.#id = id

		if (config) {
			this.#data = config
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
		return this.#data.dimensions.height
	}

	/** @returns {string} The ID of this map. */
	get id() {
		return this.#id
	}

	/** @returns {import('../../types/TileMapData.js').LayerMap[]} An array of layer maps. */
	get layers() {
		return this.#data.tiles
	}

	/** @returns {string} The ID of this map. */
	get meta() {
		return this.#meta
	}

	/** @returns {import('../../types/TileMapData.js').BaseTileMapData[]} An array of layer maps. */
	get queue() {
		return this.#queue
	}

	/** @returns {import('../../types/TileMapData.js').LayerMap[]} An array of layer maps. */
	get tiles() {
		return this.#data.tiles
	}

	/** @returns {number} The width of the map (in tiles). */
	get width() {
		return this.#data.dimensions.width
	}
}
