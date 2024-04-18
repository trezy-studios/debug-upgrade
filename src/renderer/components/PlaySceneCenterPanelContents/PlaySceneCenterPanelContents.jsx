// Module imports
import {
	useEffect,
	useMemo,
	useRef,
} from 'react'
import { motion } from 'framer-motion'
import { useStore } from 'statery'





// Local imports
import styles from './PlaySceneCenterPanelContents.module.scss'

import { PixiDragManager } from '../PixiDragManager/PixiDragManager.jsx'
import { PixiGrid } from '../PixiGrid/PixiGrid.jsx'
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
		resolution,
		stageHeight,
		stageWidth,
		uiScale,
	} = useStore(store)

	const stageWrapperRef = useRef(null)

	const currentTileset = useMemo(() => currentMap.queue[currentQueueIndex], [currentQueueIndex])

	useEffect(() => {
		store.set(() => ({
			cameraOffsetX: ((stageWidth / resolution) / uiScale) - (currentMap.width * (16 / resolution)),
			cameraOffsetY: ((stageHeight / resolution) / uiScale) - (currentMap.height * (16 / resolution)),
		}))
	}, [
		currentMap,
		currentTileset,
		resolution,
		stageHeight,
		stageWidth,
		uiScale,
	])

	return (
		<motion.div
			ref={stageWrapperRef}
			className={styles['wrapper']}
			layout>
			<PixiStage resizeToRef={stageWrapperRef}>
				<PixiDragManager>
					<PixiGrid />
					<PixiTileMap layers={currentMap.tiles} />
					<PixiTileMap
						isCursor={true}
						layers={currentTileset.tiles} />
				</PixiDragManager>
			</PixiStage>
		</motion.div>
	)
}
