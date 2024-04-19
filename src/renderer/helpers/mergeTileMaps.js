// Local imports
import { parseCoordinateString } from './parseCoordinateString.js'
import { store } from '../store/store.js'
import { TileMap } from '../game/TileMap.js'




/**
 * Merges 2 tilemaps together. The new map will reuse the ID from tilemap A.
 *
 * @param {TileMap} tilemapA The first tilemap to be merged.
 * @param {TileMap} tilemapB The second tilemap to be merged.
 * @returns {TileMap} tilemapB The second tilemap to be merged.
 */
export function mergeTileMaps(tilemapA, tilemapB) {
	const {
		cursorX,
		cursorY,
	} = store.state

	const newTilestacks = new Map(tilemapA.tilestacks)

	for (const [coordinateString, tilestack] of tilemapB.tilestacks) {
		const [x, y] = parseCoordinateString(coordinateString)

		const adjustedCoordinateString = `${x + cursorX}|${y + cursorY}`

		const existingTilestack = newTilestacks.get(adjustedCoordinateString)

		if (existingTilestack) {
			for (const tileData of tilestack) {
				existingTilestack.add(tileData)
			}
		} else {
			newTilestacks.set(adjustedCoordinateString, tilestack)
		}
	}

	return new TileMap(tilemapA.id, {
		queue: tilemapA.queue.slice(1),
		tilestacks: newTilestacks,
	})
}
