// Local imports
import { moveSystem } from './systems/moveSystem.js'
import { pathfindingSystem } from './systems/pathfindingSystem.js'
import { timeSystem } from './systems/timeSystem.js'





/**
 * Updates the game logic and renders the camera.
 *
 * @returns {boolean} Whether the loop executed successfully.
 */
export function gameLoop() {
	timeSystem()
	pathfindingSystem()
	moveSystem()

	return true
}
