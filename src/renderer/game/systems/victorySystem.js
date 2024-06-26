// Local imports
import { markLevelAsComplete } from '../../store/reducers/markLevelAsComplete.js'
import { markLevelToReveal } from '../../store/reducers/lastLevelCompleted.js'
import { store } from '../../store/store.js'
import { Vector2 } from '../Vector2.js'





/** Tests the game state to determine if the robot has reached a destination. */
export function victorySystem() {
	const {
		currentMap,
		now,
		robotPosition,
	} = store.state

	const hasSucceeded = currentMap.destinations
		.some(destination => Vector2.areEqual(robotPosition, destination))

	if (hasSucceeded) {
		store.set({
			isVictorious: true,
			timerStoppedAt: now,
		})
		markLevelAsComplete(currentMap.id)
		markLevelToReveal(currentMap.id)
	}
}
