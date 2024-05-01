// Local importso
import { animate } from 'framer-motion/dom'
import { LEVEL_LAYOUT } from '../../data/LEVEL_LAYOUT.js'
import { store } from '../store.js'
import { Vector2 } from '../../game/Vector2.js'





/**
 * Moves the camera to focus on a level in the overworld.
 *
 * @param {string} levelID The ID of the level to focus on.
 * @param {boolean} [isSmooth] Whether to make it a smooth transition.
 */
export function focusOverworldLevel(levelID, isSmooth) {
	const blockData = LEVEL_LAYOUT.blocks[levelID]
	const sectionData = LEVEL_LAYOUT.sections[blockData.section]

	const levelOffsetX = -(blockData.position.x + (sectionData?.position.x ?? 0))
	const levelOffsetY = -(blockData.position.y + (sectionData?.position.y ?? 0))

	const {
		cameraOffset,
		resolution,
		stageHeight,
		stageWidth,
		uiScale,
	} = store.state

	const stageCenterX = (stageWidth / resolution) / uiScale
	const stageCenterY = (stageHeight / resolution) / uiScale

	const cameraOffsetXAnimationOptions = {
		// eslint-disable-next-line jsdoc/require-jsdoc
		onUpdate: latest => store.set(previousState => ({
			cameraOffset: new Vector2(
				latest,
				previousState.cameraOffset.y,
			),
		})),
	}

	const cameraOffsetYAnimationOptions = {
		// eslint-disable-next-line jsdoc/require-jsdoc
		onUpdate: latest => store.set(previousState => ({
			cameraOffset: new Vector2(
				previousState.cameraOffset.x,
				latest,
			),
		})),
	}

	if (!isSmooth) {
		cameraOffsetYAnimationOptions.duration = 0
		cameraOffsetXAnimationOptions.duration = 0
	}

	animate(cameraOffset.x, stageCenterX + levelOffsetX, cameraOffsetXAnimationOptions)
	animate(cameraOffset.y, stageCenterY + levelOffsetY, cameraOffsetYAnimationOptions)
}
