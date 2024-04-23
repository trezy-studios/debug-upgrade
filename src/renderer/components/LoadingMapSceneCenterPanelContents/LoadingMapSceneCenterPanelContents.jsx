// Module imports
import {
	AnimatePresence,
	motion,
} from 'framer-motion'
import {
	useCallback,
	useLayoutEffect,
	useMemo,
	useState,
} from 'react'
import { useStore } from 'statery'





// Local imports
import styles from './LoadingMapSceneCenterPanelContents.module.scss'

import { Button } from '../Button/Button.jsx'
import { executePromiseWithMinimumDuration } from '../../helpers/executePromiseWithMinimumDuration.js'
import { prepareStateForGameplay } from '../../store/reducers/prepareStateForGameplay.js'
import { replaceScene } from '../../store/reducers/replaceScene.js'
import { SCENES } from '../../data/SCENES.js'
import { setCurrentMap } from '../../store/reducers/setCurrentMap.js'
import { store } from '../../store/store.js'
import { Terminal } from '../Terminal/Terminal.jsx'
import { TileMap } from '../../game/TileMap.js'
import { wait } from '../../helpers/wait.js'





// Constants
const VARIANTS = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
	},
}





// Functions
/** Fired when the continue button is activated. */
function handleContinueActivate() {
	replaceScene(SCENES.PLAY)
}





/**
 * Renders the contents of the center panel for the Title scene.
 *
 * @component
 */
export function LoadingMapSceneCenterPanelContents() {
	const { currentMapID } = useStore(store)
	const [isDone, setIsDone] = useState(false)
	const [isLoadingMap, setIsLoadingMap] = useState(false)
	const [isLoadingMapDependencies, setIsLoadingMapDependencies] = useState(false)
	const [isPreparingQueue, setIsPreparingQueue] = useState(false)
	const [isStarted, setIsStarted] = useState(false)
	const [lines, setLines] = useState([])

	const addLines = useCallback(newLines => {
		setLines(previousState => {
			return [
				...previousState,
				...newLines,
			]
		})
	}, [])

	const tileMap = useMemo(() => {
		const oTileMap = new TileMap(currentMapID)
		setCurrentMap(oTileMap)
		return oTileMap
	}, [currentMapID])

	useLayoutEffect(() => {
		if (isDone) {
			return
		}

		if (!isStarted) {
			setIsStarted(true)
			setIsLoadingMap(true)
			addLines([{
				prompt: 'system/user',
				body: [
					`Loading ${currentMapID}...`,
				],
			}])
			prepareStateForGameplay()
			return
		}

		if (isLoadingMap) {
			// eslint-disable-next-line promise/catch-or-return
			executePromiseWithMinimumDuration(tileMap.loadMap(), 1000)
				.then(() => {
					addLines([
						{
							prompt: 'system/user',
							body: [
								`${currentMapID} loaded.`,
							],
						},
					])
					return null
				})
				.then(() => wait(100))
				.then(() => {
					addLines([
						{
							prompt: 'system/user',
							body: [
								'Loading map dependencies...',
							],
						},
					])
					setIsLoadingMap(false)
					setIsLoadingMapDependencies(true)
					return null
				})
			return
		}

		if (isLoadingMapDependencies) {
			// eslint-disable-next-line promise/catch-or-return
			executePromiseWithMinimumDuration(tileMap.loadDependencies(), 1000)
				.then(() => {
					addLines([
						{
							prompt: 'system/user',
							body: [
								`Loaded ${tileMap.dependencies.size} dependenc${tileMap.dependencies.size > 1 ? 'ies' : 'y'}.`,
							],
						},
					])
					return null
				})
				.then(() => wait(100))
				.then(() => {
					addLines([
						{
							prompt: 'system/user',
							body: [
								'Preparing map queue...',
							],
						},
					])
					setIsLoadingMapDependencies(false)
					setIsPreparingQueue(true)
					return null
				})
			return
		}

		if (isPreparingQueue) {
			// eslint-disable-next-line promise/catch-or-return
			wait(1000)
				.then(() => {
					tileMap.prepareQueue()
					addLines([
						{
							prompt: 'system/user',
							body: [
								'Queue is ready.',
							],
						},
					])
					return null
				})
				.then(() => wait(1000))
				.then(() => {
					setIsPreparingQueue(false)
					setIsDone(true)
					return null
				})
		}
	}, [
		addLines,
		currentMapID,
		isDone,
		isLoadingMap,
		isLoadingMapDependencies,
		isPreparingQueue,
		isStarted,
		tileMap,
	])

	return (
		<motion.div
			className={styles['terminal-wrapper']}
			layout>
			<Terminal
				key={'terminal'}
				lines={lines} />

			<AnimatePresence mode={'wait'}>
				{isDone && (
					<motion.div
						key={'continue'}
						animate={'visible'}
						className={styles['continue-wrapper']}
						exit={'hidden'}
						initial={'hidden'}
						variants={VARIANTS}>
						<Button
							navGroupID={'foo'}
							nodeID={'continue'}
							onActivate={handleContinueActivate}
							onClick={handleContinueActivate}>
							{'Continue'}
						</Button>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	)
}
