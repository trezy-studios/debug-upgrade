// Module imports
import {
	useLayoutEffect,
	useRef,
} from 'react'
import { motion } from 'framer-motion'
import { useStore } from 'statery'





// Local imports
import styles from './OverworldSceneCenterPanelContents.module.scss'

import { focusOverworldLevel } from '../../store/reducers/focusOverworldLevel.js'
import { PixiDragManager } from '../PixiDragManager/PixiDragManager.jsx'
import { PixiOverworld } from '../PixiOverworld/PixiOverworld.jsx'
import { PixiStage } from '../PixiStage/PixiStage.jsx'
import { store } from '../../store/store.js'





/**
 * Renders the contents of the center panel for the Title scene.
 *
 * @component
 */
export function OverworldSceneCenterPanelContents() {
	const { saveData } = useStore(store)

	const overworldWrapperRef = useRef(null)

	useLayoutEffect(() => {
		focusOverworldLevel(saveData.lastLevelAccessed)
	}, [saveData])

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
