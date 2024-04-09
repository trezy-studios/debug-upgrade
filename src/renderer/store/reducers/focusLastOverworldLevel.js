// Local imports
import { LEVEL_LAYOUT } from '../../data/LEVEL_LAYOUT.js'
import { store } from '../store.js'





/**
 * Moves the camera to focus on the most recently accessed level in the overworld.
 */
export function focusLastOverworldLevel() {
	store.set(previousState => {
		const {
			resolution,
			saveData,
			stageHeight,
			stageWidth,
			uiScale,
		} = previousState

		const blockData = LEVEL_LAYOUT.blocks[saveData.lastLevelAccessed]
		const sectionData = LEVEL_LAYOUT.sections[blockData.section]

		const levelOffsetX = -(blockData.position.x + sectionData.position.x)
		const levelOffsetY = -(blockData.position.y + sectionData.position.y)

		const stageCenterX = (stageWidth / resolution) / uiScale
		const stageCenterY = (stageHeight / resolution) / uiScale

		return {
			cameraOffsetX: stageCenterX + levelOffsetX,
			cameraOffsetY: stageCenterY + levelOffsetY,
		}
	})
}
