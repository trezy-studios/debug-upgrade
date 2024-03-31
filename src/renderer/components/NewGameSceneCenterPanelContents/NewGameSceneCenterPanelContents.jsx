// Module imports
	import {
	useCallback,
	useLayoutEffect,
	useState,
} from 'react'
import { motion } from 'framer-motion'





// Local imports
import styles from '../NewGameSceneCenterPanelContents/NewGameSceneCenterPanelContents.module.scss'

import { createSave } from '../../store/reducers/createSave.js'
import { Overworld } from '../Overworld/Overworld.jsx'
import { Terminal } from '../Terminal/Terminal.jsx'
import { TERMINAL_LINE_PART_TYPES } from '../../data/TERMINAL_LINE_PART_TYPES.js'
import { wait } from '../../helpers/wait.js'





// Constants
// const TERMINAL_LINES = [
// 	{
// 		prompt: 'system/user',
// 		body: [
// 			'Initializing system...',
// 		],
// 	},
// 	{
// 		prompt: 'system/user',
// 		body: [
// 			'Initialized system.',
// 		],
// 	},
// 	{
// 		prompt: 'system/user',
// 		body: [
// 			'Mounting ',
// 			{
// 				type: TERMINAL_LINE_PART_TYPES.PATH,
// 				body: '/dev/saves',
// 			},
// 			'...',
// 		],
// 	},
// 	{
// 		prompt: 'system/user',
// 		body: [
// 			'Mounted ',
// 			{
// 				type: TERMINAL_LINE_PART_TYPES.PATH,
// 				body: '/dev/saves',
// 			},
// 			'.',
// 		],
// 	},
// 	{
// 		prompt: 'Current saves:',
// 		body: [
// 			'Current saves:',
// 			{
// 				type: TERMINAL_LINE_PART_TYPES.TABLE,
// 				headings: ['id', 'progress', 'size'],
// 				rows: [
// 					[uuid(), '50%', '1.41KB'],
// 					[uuid(), '23%', '1.28KB'],
// 				],
// 			},
// 		],
// 	},
// 	{
// 		prompt: 'system/user',
// 		body: [
// 			'Creating new save...',
// 		],
// 	},
// 	{
// 		prompt: 'system/user',
// 		body: [
// 			`Created save: /dev/saves/${uuid()}`,
// 		],
// 	},
// ]





/**
 * Renders the contents of the center panel for the Title scene.
 *
 * @component
 */
export function NewGameSceneCenterPanelContents() {
	const [isDone, setIsDone] = useState(false)
	const [isStarted, setIsStarted] = useState(false)
	const [isInitializingSystem, setIsInitializingSystem] = useState(false)
	const [isMountingSaveDirectory, setIsMountingSaveDirectory] = useState(false)
	const [isCreatingSave, setIsCreatingSave] = useState(false)
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
			wait(1000).then(() => {
				addLines([
					{
						prompt: 'system/user',
						body: [
							'Initializing system...',
						],
					},
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
			wait(1000).then(() => {
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

		if (!isCreatingSave) {
			// eslint-disable-next-line promise/catch-or-return
			createSave().then(saveData => {
				addLines([
					{
						prompt: 'system/user',
						body: [
							`Created save: /dev/saves/${saveData.id}`,
						],
					},
				])
				setIsDone(true)
				return null
			})
		}
	}, [
		addLines,
		isCreatingSave,
		isInitializingSystem,
		isMountingSaveDirectory,
		isStarted,
	])

	return (
		<>
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
		</>
	)
}
