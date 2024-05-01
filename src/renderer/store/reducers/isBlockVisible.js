// Local imports
import { LEVEL_LAYOUT } from '../../data/LEVEL_LAYOUT.js'
import { store } from '../store.js'





/**
 * Checks whether a block is visible based on the current save data.
 *
 * @param {string} blockID The ID of the block to be checked.
 * @returns {boolean} Whether the block should be visible.
 */
export function isBlockVisible(blockID) {
	const { saveData } = store.state
	const blockData = LEVEL_LAYOUT.blocks[blockID]

	if (!blockData.prerequisite || saveData.campaign[blockData.name]) {
		return true
	}

	return blockData.prerequisite.every(prerequisiteID => saveData.campaign[prerequisiteID])
}
