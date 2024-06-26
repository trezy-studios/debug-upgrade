// Module imports
import {
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { motion } from 'framer-motion'
import { useStore } from 'statery'





// Local imports
import styles from './PlaySceneCenterPanelContents.module.scss'

import { EndOfRoundScreen } from '../EndOfRoundScreen/EndOfRoundScreen.jsx'
import { PixiDragManager } from '../PixiDragManager/PixiDragManager.jsx'
import { PixiGrid } from '../PixiGrid/PixiGrid.jsx'
import { PixiRobot } from '../PixiRobot/PixiRobot.jsx'
import { PixiStage } from '../PixiStage/PixiStage.jsx'
import { PixiTileMap } from '../PixiTileMap/PixiTileMap.jsx'
import { store } from '../../store/store.js'
import { useGameLoop } from '../../hooks/useGameLoop.js'
import { Vector2 } from '../../game/Vector2.js'





/**
 * Renders the contents of the center panel for the Title scene.
 *
 * @component
 */
export function PlaySceneCenterPanelContents() {
	const {
		currentMap,
		resolution,
		stageHeight,
		stageWidth,
		uiScale,
	} = useStore(store)

	const [initialCenteringIsComplete, setInitialCenteringIsComplete] = useState(false)
	const stageWrapperRef = useRef(null)

	const currentTileset = useMemo(() => currentMap.queue[0], [currentMap])

	useEffect(() => {
		if (initialCenteringIsComplete) {
			return
		}

		store.set(() => ({
			cameraOffset: new Vector2(
				((stageWidth / resolution) / uiScale) - (currentMap.width * (16 / resolution)),
				((stageHeight / resolution) / uiScale) - (currentMap.height * (16 / resolution)),
			),
		}))

		setInitialCenteringIsComplete(true)
	}, [
		currentMap,
		currentTileset,
		initialCenteringIsComplete,
		resolution,
		stageHeight,
		stageWidth,
		uiScale,
	])

	useGameLoop()

	return (
		<motion.div
			ref={stageWrapperRef}
			className={styles['wrapper']}
			layout>
			<PixiStage resizeToRef={stageWrapperRef}>
				<PixiDragManager>
					<PixiGrid />
					<PixiTileMap tilestacks={currentMap.tilestacks} />

					{Boolean(currentTileset) && (
						<PixiTileMap
							isCursor
							tilestacks={currentTileset.tilestacks} />
					)}

					<PixiRobot />
				</PixiDragManager>
			</PixiStage>

			<EndOfRoundScreen />
		</motion.div>
	)
}
