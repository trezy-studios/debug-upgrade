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
import styles from '../NewGameSceneCenterPanelContents/NewGameSceneCenterPanelContents.module.scss'

import { createSave } from '../../store/reducers/createSave.js'
import { executePromiseWithMinimumDuration } from '../../helpers/executePromiseWithMinimumDuration.js'
import { getAllSaves } from '../../store/reducers/getAllSaves.js'
import { Overworld } from '../Overworld/Overworld.jsx'
import { Terminal } from '../Terminal/Terminal.jsx'
import { TERMINAL_LINE_PART_TYPES } from '../../data/TERMINAL_LINE_PART_TYPES.js'
import { wait } from '../../helpers/wait.js'





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
				.then(() => getAllSaves())
				.then(allSaves => {
					console.log(allSaves)
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

										return [saveData.id, `${(levelsComplete / levelCount) * 100}%`, filesize(saveData.size)]
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
				.then(() => wait(3000))
				.then(() => {
					setIsLoadingWorldMap(false)
					setIsDone(true)
					return null
				})
		}
	}, [
		addLines,
		isCreatingSave,
		isInitializingSystem,
		isLoadingWorldMap,
		isMountingSaveDirectory,
		isStarted,
	])

	return (
		<AnimatePresence mode={'wait'}>
			{!isDone && (
				<Terminal lines={lines} />
			)}

			{isDone && (
				<motion.div
					className={styles['overworld-wrapper']}
					layout>
					<Overworld />
				</motion.div>
			)}
		</AnimatePresence>
	)
}
