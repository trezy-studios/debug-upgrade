// Local imports
import { LEVEL_LAYOUT } from '../../data/LEVEL_LAYOUT.js'
import { store } from '../store.js'



/**
 * Marks a level to be revealed in the overworld. (for animation)
 *
 * @param {string} levelID The ID of the level.
 */
export function markLevelToReveal(levelID) {
	store.set(() => {
		return { levelToReveal: levelID }
	}, { forceNotify: true })
}

/**
 * Removes the level that was marked to be revealed (after animation has completed).
 *
 */
export function resetLevelToReveal() {
	store.set(() => {
		return { levelToReveal: null }
	}, { forceNotify: true })
}


/**
 * Get a list of fogmap IDs to reveal based on the last level completed.
 *
 * @returns {number[]}
 */
export function blockFogmapIdsToReveal() {
	const { levelToReveal } = store.state

	if (!levelToReveal) {
		return []
	}

	return Object.values(LEVEL_LAYOUT.blocks).filter(blockData => blockData.prerequisite?.includes(levelToReveal)).map(blockData => blockData.fogmap || 0)
}
