// Local imports
import { LEVEL_LAYOUT } from '../../data/LEVEL_LAYOUT.js'





/**
 * Tests whether the section is complete in the current save.
 *
 * @param {import('../store.js').store} state The current global state.
 * @param {'section01' | 'section02' | 'section03'} sectionName The name of the section to test.
 * @param {boolean} includeBoss Whether to include the boss level.
 * @returns {boolean} Whether the section is complete in the current save.
 */
export function isSectionComplete(state, sectionName, includeBoss = false) {
	const { saveData } = state

	let blocksToTest = LEVEL_LAYOUT.sections[sectionName].blocks

	if (!includeBoss) {
		blocksToTest = blocksToTest.filter(blockName => {
			return !blockName.endsWith('Boss')
		})
	}

	return blocksToTest.every(blockName => {
		if (!saveData.campaign[blockName]) {
			return true
		}

		return !!saveData.campaign[blockName]
	})
}
