// Module imports
import {
	useEffect,
	useLayoutEffect,
} from 'react'
import { motion } from 'framer-motion'
import { useStore } from 'statery'





// Local imports
import styles from './TitleSceneCenterPanelContents.module.scss'

import { Button } from '../Button/Button.jsx'
import { ButtonStack } from '../ButtonStack/ButtonStack.jsx'
import { GameTitle } from '../GameTitle/GameTitle.jsx'
import { pushScene } from '../../store/reducers/pushScene.js'
import { SCENES } from '../../data/SCENES.js'
import { store } from '../../store/store.js'
import { unloadSave } from '../../store/reducers/unloadSave.js'
import { useNavGraphContext } from '../NavGraph/NavGraphContext.jsx'





// Constants
const navGroupLinks = ['left panel']





/** Fired when the continue button is clicked. */
function handleContinueClick() {
	pushScene(SCENES.CONTINUE_GAME)
}

/** Fired when the new game button is clicked. */
function handleNewGameClick() {
	pushScene(SCENES.NEW_GAME)
}

/**
 * Renders the contents of the center panel for the Title scene.
 *
 * @component
 */
export function TitleSceneCenterPanelContents() {
  const { mostRecentSaveID } = useStore(store)

	const { focusNode } = useNavGraphContext()

	useLayoutEffect(() => {
		if (mostRecentSaveID) {
			focusNode('continue')
		} else {
			focusNode('new game')
		}
	}, [
		focusNode,
		mostRecentSaveID,
	])

	useEffect(() => {
		unloadSave()
	}, [])

	return (
		<motion.div
			className={styles['game-title-wrapper']}
			layout>
			<GameTitle />

			<ButtonStack key={'campaign menu'}>
				{Boolean(mostRecentSaveID) && (
					<Button
						isAffirmative
						isNavGroupDefault
						navGroupID={'center panel'}
						navGroupLinks={navGroupLinks}
						nodeID={'continue'}
						onActivate={handleContinueClick}
						onClick={handleContinueClick}>
						{'Continue'}
					</Button>
				)}

				<Button
					navGroupID={'center panel'}
					navGroupLinks={navGroupLinks}
					nodeID={'new game'}
					onActivate={handleNewGameClick}
					onClick={handleNewGameClick}>
					{'New Game'}
				</Button>
			</ButtonStack>
		</motion.div>
	)
}
