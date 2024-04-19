// Local imports
import { mergeTileMaps } from '../../helpers/mergeTileMaps.js'
import { parseCoordinateString } from '../../helpers/parseCoordinateString.js'
import { store } from '../store.js'





/** Place the current tileset into the current map. */
export function placeTileset() {
	store.set(previousState => {
		const {
			currentMap,
			cursorX,
			cursorY,
			lastPlaceUpdate,
		} = previousState

		const currentTileset = currentMap.queue[0]

		const now = performance.now()

		if ((now - lastPlaceUpdate) < 125) {
			return {}
		}

		let isBlocked = false

		for (const [coordinateString] of currentTileset.tilestacks) {
			const [x, y] = parseCoordinateString(coordinateString)

			if (currentMap.isBlockedAt(x + cursorX, y + cursorY)) {
				isBlocked = true
				break
			}
		}

		if (isBlocked) {
			return {}
		}

		const mergedTileMap = mergeTileMaps(currentMap, currentTileset)

		return {
			currentMap: mergedTileMap,
			lastPlaceUpdate: now,
		}
	})
}
