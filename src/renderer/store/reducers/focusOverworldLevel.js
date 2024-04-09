// Local importso
import { animate } from 'framer-motion/dom'
import { LEVEL_LAYOUT } from '../../data/LEVEL_LAYOUT.js'
import { store } from '../store.js'





/**
 * Moves the camera to focus on a level in the overworld.
 *
 * @param {string} levelID The ID of the level to focus on.
 * @param {boolean} [isSmooth] Whether to make it a smooth transition.
 */
export function focusOverworldLevel(levelID, isSmooth) {
	const blockData = LEVEL_LAYOUT.blocks[levelID]
	const sectionData = LEVEL_LAYOUT.sections[blockData.section]

	const levelOffsetX = -(blockData.position.x + sectionData.position.x)
	const levelOffsetY = -(blockData.position.y + sectionData.position.y)

	const {
		cameraOffsetX,
		cameraOffsetY,
		resolution,
		stageHeight,
		stageWidth,
		uiScale,
	} = store.state

	const stageCenterX = (stageWidth / resolution) / uiScale
	const stageCenterY = (stageHeight / resolution) / uiScale

	const cameraOffsetXAnimationOptions = {
		onUpdate: latest => store.set(() => ({ cameraOffsetX: latest })),
	}

	const cameraOffsetYAnimationOptions = {
		onUpdate: latest => store.set(() => ({ cameraOffsetY: latest })),
	}

	if (!isSmooth) {
		cameraOffsetYAnimationOptions.duration = 0
		cameraOffsetXAnimationOptions.duration = 0
	}

	animate(cameraOffsetX, stageCenterX + levelOffsetX, cameraOffsetXAnimationOptions)
	animate(cameraOffsetY, stageCenterY + levelOffsetY, cameraOffsetYAnimationOptions)

	// store.set(previousState => {
	// 	const {
	// 		resolution,
	// 		stageHeight,
	// 		stageWidth,
	// 		uiScale,
	// 	} = previousState

	// 	return {
	// 		cameraOffsetX: stageCenterX + levelOffsetX,
	// 		cameraOffsetY: stageCenterY + levelOffsetY,
	// 	}
	// })
}
