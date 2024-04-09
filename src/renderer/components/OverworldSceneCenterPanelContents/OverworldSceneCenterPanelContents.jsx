// Module imports
import {
	useLayoutEffect,
	useRef,
} from 'react'
import { motion } from 'framer-motion'





// Local imports
import styles from './OverworldSceneCenterPanelContents.module.scss'

import { focusLastOverworldLevel } from '../../store/reducers/focusLastOverworldLevel.js'
import { PixiDragManager } from '../PixiDragManager/PixiDragManager.jsx'
import { PixiOverworld } from '../PixiOverworld/PixiOverworld.jsx'
import { PixiStage } from '../PixiStage/PixiStage.jsx'





/**
 * Renders the contents of the center panel for the Title scene.
 *
 * @component
 */
export function OverworldSceneCenterPanelContents() {
	const overworldWrapperRef = useRef(null)

	useLayoutEffect(() => {
		focusLastOverworldLevel()
	}, [])

	return (
		<motion.div
			ref={overworldWrapperRef}
			className={styles['overworld-wrapper']}
			layout>
			<PixiStage resizeToRef={overworldWrapperRef}>
				<PixiDragManager>
					<PixiOverworld />
				</PixiDragManager>
			</PixiStage>
		</motion.div>
	)
}
