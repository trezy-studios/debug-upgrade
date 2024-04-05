// Local imports
import { store } from '../store.js'





/**
 * @param {import('../../game/TileMap.js').TileMap} map The tilemap.
 */
export function setCurrentMap(map) {
	store.set(previousState => {
		const patch = { currentMap: map }

		if (!previousState.tilemaps.has(map.id)) {
			previousState.tilemaps.set(map.id, map)
			patch.tilemaps = new Map(previousState.tilemaps)
		}

		return patch
	})
}
