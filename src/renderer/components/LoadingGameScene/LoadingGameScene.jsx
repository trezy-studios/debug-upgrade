// Module imports
import {
	AnimatePresence,
	motion,
} from 'framer-motion'
import {
	useEffect,
	useState,
} from 'react'
import { useStore } from 'statery'





// Local imports
import styles from './LoadingGameScene.module.scss'

import { GameTitle } from '../GameTitle/GameTitle.jsx'
import { loadGame } from '../../store/reducers/loadGame.js'
import { pushScene } from '../../store/reducers/pushScene.js'
import { Scene } from '../Scene/Scene.jsx'
import { SCENES } from '../../data/SCENES.js'
import { store } from '../../store/store.js'





// Constants
const MESSAGE_VARIANTS = {
	animate: {
		opacity: 1,
		y: 0,
	},

	exit: {
		opacity: 0,
		y: '150%',
	},

	initial: {
		opacity: 0,
		y: '-150%',
	},
}
const VARIANTS = {
	animate: {
		opacity: 1,
	},

	exit: {
		opacity: 0,
	},

	initial: {
		opacity: 0,
	},
}





/**
 * Renders the main loading scene at the front of the game.
 *
 * @component
 */
export function LoadingGameScene() {
	const {
		assetLoadingProgress,
		isInitialisingFilesystem,
		isLoadingAssets,
		isSettingUpPixi,
	} = useStore(store)

	const [isLoading, setIsLoading] = useState(false)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		if (!isLoading) {
			setIsLoading(true)
			// eslint-disable-next-line promise/catch-or-return
			loadGame().then(() => setIsLoaded(true))
		}
	}, [
		isLoading,
		setIsLoaded,
		setIsLoading,
	])

	useEffect(() => {
		if (isLoaded) {
			pushScene(SCENES.MAIN_MENU)
		}
	}, [isLoaded])

	return (
		<Scene
			key={'loading-game'}
			animate={'animate'}
			className={styles['loading-game']}
			exit={'exit'}
			initial={'initial'}
			variants={VARIANTS}>
			<GameTitle />

			<div className={styles['message-wrapper']}>
				<AnimatePresence>
					{isInitialisingFilesystem && (
						<motion.p
							key={'filesystemSetup'}
							animate={'animate'}
							exit={'exit'}
							initial={'initial'}
							variants={MESSAGE_VARIANTS}>
							{'Setting up the filesystem'}
						</motion.p>
					)}

					{isSettingUpPixi && (
						<motion.p
							key={'rendererSetup'}
							animate={'animate'}
							exit={'exit'}
							initial={'initial'}
							variants={MESSAGE_VARIANTS}>
							{'Preparing the renderer'}
						</motion.p>
					)}

					{isLoadingAssets && (
						<motion.p
							key={'assetLoading'}
							animate={'animate'}
							exit={'exit'}
							initial={'initial'}
							variants={MESSAGE_VARIANTS}>
							{`Loading assets (${Math.floor(assetLoadingProgress * 100)}%)`}
						</motion.p>
					)}
				</AnimatePresence>
			</div>
		</Scene>
	)
}
