// Module imports
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useStore } from 'statery'





// Local imports
import styles from './PlaySceneCenterPanelContents.module.scss'

import { PixiStage } from '../PixiStage/PixiStage.jsx'
import { PixiTileMap } from '../PixiTileMap/PixiTileMap.jsx'
import { store } from '../../store/store.js'





/**
 * Renders the contents of the center panel for the Title scene.
 *
 * @component
 */
export function PlaySceneCenterPanelContents() {
	const {
		currentMap,
		currentQueueIndex,
	} = useStore(store)

	const stageWrapperRef = useRef(null)

	return (
		<motion.div
			ref={stageWrapperRef}
			className={styles['wrapper']}
			layout>
			<PixiStage resizeToRef={stageWrapperRef}>
				<PixiTileMap layers={currentMap.tiles} />
			</PixiStage>
		</motion.div>
	)
}
