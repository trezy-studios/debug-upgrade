// Local imports
import { store } from '../store.js'





/**
 * Resets all necessary values before starting a level.
 */
export function prepareStateForGameplay() {
	store.set(() => {
		return {
			cameraOffsetX: 0,
			cameraOffsetY: 0,
			cursorX: 0,
			cursorY: 0,
			timerGracePeriod: 10000,
		}
	})
}
