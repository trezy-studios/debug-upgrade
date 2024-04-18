// Local imports
import { store } from '../store.js'





/**
 * Resets all necessary values before starting a level.
 */
export function resetForGameplay() {
	store.set(() => ({
		cameraOffsetX: 0,
		cameraOffsetY: 0,
		cursorX: 0,
		cursorY: 0,
	}))
}
