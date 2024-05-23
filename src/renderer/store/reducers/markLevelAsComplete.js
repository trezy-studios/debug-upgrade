// Local imports
import { store } from '../store.js'





/**
 * Updates the save data to mark a level as complete.
 *
 * @param {string} levelID The ID of the level.
 */
export function markLevelAsComplete(levelID) {
	const { isVictorious } = store.state

	if (!isVictorious) {
		return
	}

	store.set(previousState => {
		const { saveData } = previousState

		saveData.campaign[levelID] = Date.now()

		return { saveData }
	}, { forceNotify: true })
}
