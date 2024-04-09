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
			})

			return {
				resourcepacks: newResourcepacks,
			}
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
}
