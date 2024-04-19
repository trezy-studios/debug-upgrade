// Local imports
import { store } from '../store.js'





/**
 * Moves the cursor by the specified number of cells.
 *
 * @param {number} x The number of cells to move the cursor on the horizontal axis.
 * @param {number} y The number of cells to move the cursor on the vertical axis.
 */
export const moveCursor = (x, y) => {
	store.set(previousState => {
		const { currentMap } = previousState

		if (!currentMap) {
			console.error('Failed to get current map', previousState)
		}

		const currentTileset = currentMap.queue[0]

		if (!currentTileset) {
			return {}
		}

		return {
			cursorX: previousState.cursorX + x,
			cursorY: previousState.cursorY + y,
		}
	})
}
