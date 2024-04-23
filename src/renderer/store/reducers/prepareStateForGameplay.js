// Local imports
import { store } from '../store.js'
import { Vector2 } from '../../game/Vector2.js'





/**
 * Resets all necessary values before starting a level.
 */
export function prepareStateForGameplay() {
	store.set(() => {
		return {
			cameraOffset: new Vector2(0, 0),
			cursorPosition: new Vector2(0, 0),
			timerGracePeriod: 10000,
		}
	})
}
