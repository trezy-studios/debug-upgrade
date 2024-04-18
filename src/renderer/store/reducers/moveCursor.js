// Local imports
// import { Vector2 } from '../../game2/structures/Vector2.js'
import { store } from '../store.js'





/**
 * Moves the cursor by the specified number of cells.
 *
 * @param {number} x The number of cells to move the cursor on the horizontal axis.
 * @param {number} y The number of cells to move the cursor on the vertical axis.
 */
export const moveCursor = (x, y) => {
	const {
		currentMap,
		currentQueueIndex,
	} = store.state

	const currentTileset = currentMap.queue[currentQueueIndex]

	if (!currentTileset) {
		return
	}

	store.set(previousState => {
		return {
			cursorX: previousState.cursorX + x,
			cursorY: previousState.cursorY + y,
			// lastCursorUpdate: previousState.now,
		}
	})
}
