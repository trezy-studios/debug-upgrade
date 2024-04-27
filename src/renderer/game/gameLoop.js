// Local imports
import { moveSystem } from './systems/moveSystem.js'
import { pathfindingSystem } from './systems/pathfindingSystem.js'
import { store } from '../store/store.js'
import { timeSystem } from './systems/timeSystem.js'
import { victorySystem } from './systems/victorySystem.js'





/**
 * Updates the game logic and renders the camera.
 *
 * @returns {boolean} Whether the loop executed successfully.
 */
export function gameLoop() {
	const { isVictorious } = store.state

	if (isVictorious) {
		return true
	}

	timeSystem()
	pathfindingSystem()
	moveSystem()
	victorySystem()

	return true
}
