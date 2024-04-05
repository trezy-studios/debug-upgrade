// Module imports
import { Graphics } from '@pixi/react'
import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { useStore } from 'statery'





// Local imports
import { LEVEL_LAYOUT } from '../../data/LEVEL_LAYOUT.js'
import { OverworldFog } from '../../shaders/OverworldFog.js'
import { store } from '../../store/store.js'





// Constants
const FILTERS = [OverworldFog]
// const ALL_LEVEL_LAYOUTS = Object
// 	.entries(LEVEL_LAYOUT)
// 	.reduce((accumulator, [sectionName, sectionData]) => {
// 		sectionData.blocks.forEach(block => {
// 			accumulator[block.name] = {
// 				...block,
// 			}
// 		})
// 		console.log(sectionData)
// 		return accumulator
// 	}, {})





/**
 * Renders a mask for the overworld.
 *
 * @component
 */
export function PixiOverworldMask({
	height,
	width,
}) {
	const { saveData } = useStore(store)

	const draw = useCallback(
		/**
		 * @param {import('pixi.js').Graphics} graphics The graphics context.
		 */
		graphics => {
			graphics.clear()
			graphics.beginFill(0x140c1c)
			graphics.drawRect(0, 0, width, height)
			graphics.beginHole()

			Object
				.entries(saveData.campaign)
				.forEach(([levelName, isComplete]) => {
					const levelData = LEVEL_LAYOUT.blocks[levelName]
					const isAvailable = isComplete
						|| !levelData.prerequisite
						|| levelData.prerequisite?.every(prerequisite => saveData.campaign[prerequisite])

					if (isAvailable) {
						const sectionData = LEVEL_LAYOUT.sections[levelData.section]

						graphics.drawRect(
							sectionData.position.x + levelData.position.x,
							sectionData.position.y + levelData.position.y,
							16,
							16,
						)
					}
				})

			graphics.endHole()
			graphics.endFill()
		},
		[
			height,
			saveData,
			width,
		],
	)

	return (
		<Graphics
			draw={draw}
			filters={FILTERS} />
	)
}

PixiOverworldMask.propTypes = {
	height: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
}
