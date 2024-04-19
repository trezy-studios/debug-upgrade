// Module imports
import {
	AnimatePresence,
	motion,
} from 'framer-motion'
import {
	useCallback,
	useLayoutEffect,
	useState,
} from 'react'
import { filesize } from 'filesize'





// Local imports
import styles from './NewGameSceneCenterPanelContents.module.scss'

import { Button } from '../Button/Button.jsx'
import { createSave } from '../../store/reducers/createSave.js'
import { executePromiseWithMinimumDuration } from '../../helpers/executePromiseWithMinimumDuration.js'
import { getSaves } from '../../store/reducers/getSaves.js'
import { replaceScene } from '../../store/reducers/replaceScene.js'
import { SCENES } from '../../data/SCENES.js'
import { Terminal } from '../Terminal/Terminal.jsx'
import { TERMINAL_LINE_PART_TYPES } from '../../data/TERMINAL_LINE_PART_TYPES.js'
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
	replaceScene(SCENES.OVERWORLD)
}





/**
 * Renders the contents of the center panel for the Title scene.
 *
 * @component
 */
export function NewGameSceneCenterPanelContents() {
	const [isCreatingSave, setIsCreatingSave] = useState(false)
	const [isDone, setIsDone] = useState(false)
	const [isInitializingSystem, setIsInitializingSystem] = useState(false)
	const [isLoadingWorldMap, setIsLoadingWorldMap] = useState(false)
	const [isMountingSaveDirectory, setIsMountingSaveDirectory] = useState(false)
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

	useLayoutEffect(() => {
		if (isDone) {
			return
		}

		if (!isStarted) {
			setIsStarted(true)
			setIsInitializingSystem(true)
			addLines([{
				prompt: 'system/user',
				body: [
					'Initializing system...',
				],
			}])
			return
		}

		if (isInitializingSystem) {
			// eslint-disable-next-line promise/catch-or-return
			wait(2000)
				.then(() => {
					addLines([
						{
							prompt: 'system/user',
							body: [
								'System initialized.',
							],
						},
					])
					return null
				})
				.then(() => wait(500))
				.then(() => {
					addLines([
						{
							prompt: 'system/user',
							body: [
								'Mounting ',
								{
									type: TERMINAL_LINE_PART_TYPES.PATH,
									body: '/dev/saves',
								},
								'...',
							],
						},
					])
					setIsInitializingSystem(false)
					setIsMountingSaveDirectory(true)
					return null
				})
			return
		}

		if (isMountingSaveDirectory) {
			// eslint-disable-next-line promise/catch-or-return
			wait(2000)
				.then(() => {
					addLines([
						{
							prompt: 'system/user',
							body: [
								'Mounted ',
								{
									type: TERMINAL_LINE_PART_TYPES.PATH,
									body: '/dev/saves',
								},
								'.',
							],
						},
					])
					return null
				})
				.then(() => wait(500))
				.then(() => {
					addLines([
						{
							prompt: 'system/user',
							body: [
								'Creating new save...',
							],
						},
					])
					setIsMountingSaveDirectory(false)
					setIsCreatingSave(true)
					return null
				})
			return
		}

		if (isCreatingSave) {
			// eslint-disable-next-line promise/catch-or-return
			executePromiseWithMinimumDuration(createSave(), 1500)
				.then(newSaveData => {
					addLines([
						{
							prompt: 'system/user',
							body: [
								`Created save: /dev/saves/${newSaveData.id}`,
							],
						},
					])
					return null
				})
				.then(() => wait(500))
				.then(() => getSaves())
				.then(allSaves => {
					addLines([
						{
							body: [
								'Current saves:',
								{
									type: TERMINAL_LINE_PART_TYPES.TABLE,
									headings: ['id', 'progress', 'size'],
									rows: allSaves.map(saveData => {
										const {
											levelCount,
											levelsComplete,
										} = Object.values(saveData.campaign).reduce((accumulator, isComplete) => {
											accumulator.levelCount += 1

											if (isComplete) {
												accumulator.levelsComplete += 1
											}

											return accumulator
										}, {
											levelCount: 0,
											levelsComplete: 0,
										})

										return [saveData.id, `${((levelsComplete / levelCount) * 100).toFixed(2).toString().padStart(6, ' ')}%`, filesize(saveData.size)]
									}),
								},
							],
						},
					])
					return null
				})
				.then(() => wait(500))
				.then(() => {
					addLines([
						{
							prompt: 'system/user',
							body: [
								'Loading world map...',
							],
						},
					])
					setIsCreatingSave(false)
					setIsLoadingWorldMap(true)
					return null
				})
		}

		if (isLoadingWorldMap) {
			// eslint-disable-next-line promise/catch-or-return
			wait(2000)
				.then(() => {
					addLines([
						{
							prompt: 'system/user',
							body: [
								'World map loaded.',
							],
						},
					])
					return null
				})
				.then(() => wait(2000))
				.then(() => {
					setIsLoadingWorldMap(false)
					setIsDone(true)
					return null
				})
		}
	}, [
		addLines,
		isCreatingSave,
		isDone,
		isInitializingSystem,
		isLoadingWorldMap,
		isMountingSaveDirectory,
		isStarted,
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
