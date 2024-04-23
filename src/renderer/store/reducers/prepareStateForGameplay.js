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
			currentPath: null,
			currentQueueIndex: 0,
			cursorPosition: new Vector2(0, 0),
			isVictorious: false,
			lastPlaceUpdate: 0,
			robotDestination: null,
			robotPosition: null,
			robotPixelPosition: null,
			timerGracePeriod: 10000,
			timerStartedAt: null,
			timerStoppedAt: null,
			timerString: '00:00',
			timerPathfindingStartedAt: null,
			totalMoves: null,
		}
	})
}
