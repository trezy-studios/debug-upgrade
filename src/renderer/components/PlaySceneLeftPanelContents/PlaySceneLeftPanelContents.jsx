// Module imports
import {
	useCallback,
	useState,
} from 'react'
import { motion } from 'framer-motion'





// Local imports
import styles from './PlaySceneLeftPanelContents.module.scss'

import { backToScene } from '../../store/reducers/backToScene.js'
import { Button } from '../Button/Button.jsx'
import { ButtonStack } from '../ButtonStack/ButtonStack.jsx'
import { DropdownButton } from '../DropdownButton/DropdownButton.jsx'
import { HorizontalRule } from '../HorizontalRule/HorizontalRule.jsx'
import { PanelMenu } from '../Panel/PanelMenu.jsx'
import { pushScene } from '../../store/reducers/pushScene.js'
import { SCENES } from '../../data/SCENES.js'
import { Timer } from '../Timer/Timer.jsx'





// Constants
const NAV_GROUP_LINKS = ['left panel']
const EXIT_MENU_VARIANTS = {
	hidden: { height: '0' },
	visible: { height: 'auto' },
}





/** Fired when the main menu button is clicked. */
function handleMainMenuClick() {
	backToScene(SCENES.MAIN_MENU)
}

/** Fired when the exit level button is clicked. */
function handleExitLevelClick() {
	pushScene(SCENES.OVERWORLD)
}

/** Fired when the quit to desktop button is clicked. */
function handleQuitToDesktopClick() {
	console.error('Quit isn\'t implemented yet.')
	// quitToDesktop()
}

/** Fired when the restart level button is clicked. */
function handleRestartLevelClick() {
	console.error('Restart Level isn\'t implemented yet.')
	// pushScene(SCENES.SETTINGS)
}

/** Fired when the settings button is clicked. */
function handleSettingsClick() {
	console.error('Settings aren\'t implemented yet.')
	// pushScene(SCENES.SETTINGS)
}

/**
 * Renders the contents of the left panel for the Title scene.
 *
 * @component
 */
export function PlaySceneLeftPanelContents() {
	const [isExitMenuVisible, setIsExitMenuVisible] = useState(false)
	const [exitMenuCloseTimer, setExitMenuCloseTimer] = useState(null)

	const handleExitClick = useCallback(() => {
		setIsExitMenuVisible(previousState => !previousState)
	}, [])

	const handleExitMenuClick = useCallback(() => {
		setIsExitMenuVisible(previousState => !previousState)
	}, [])

	const handleExitMenuMouseEnter = useCallback(() => {
		clearTimeout(exitMenuCloseTimer)
	}, [exitMenuCloseTimer])

	const handleExitMenuMouseLeave = useCallback(() => {
		setExitMenuCloseTimer(setTimeout(() => {
			setIsExitMenuVisible(false)
		}, 1000))
	}, [])

	return (
		<>
			<Timer
				isBordered
				isCentered
				isLarge
				isMonospace />

			<PanelMenu>
				<ButtonStack>
					<Button
						navGroupID={'left panel'}
						navGroupLinks={NAV_GROUP_LINKS}
						nodeID={'overworld'}
						onActivate={handleRestartLevelClick}
						onClick={handleRestartLevelClick}>
						{'Restart Level'}
					</Button>

					<HorizontalRule />

					<Button
						navGroupID={'left panel'}
						navGroupLinks={NAV_GROUP_LINKS}
						nodeID={'overworld'}
						onActivate={handleSettingsClick}
						onClick={handleSettingsClick}>
						{'Settings'}
					</Button>

					<DropdownButton
						isNegative
						onChevronClick={handleExitMenuClick}>
						<Button
							isNegative
							navGroupID={'left panel'}
							navGroupLinks={NAV_GROUP_LINKS}
							nodeID={'quit'}
							onActivate={handleExitClick}
							onClick={handleExitClick}>
							{'Exit'}
						</Button>
					</DropdownButton>

					<motion.div
						animate={isExitMenuVisible ? 'visible' : 'hidden'}
						className={styles['exit-menu']}
						onMouseEnter={handleExitMenuMouseEnter}
						onMouseLeave={handleExitMenuMouseLeave}
						variants={EXIT_MENU_VARIANTS}>
						<ButtonStack isSubstack>
							<Button
								isNegative
								navGroupID={'left panel'}
								navGroupLinks={NAV_GROUP_LINKS}
								nodeID={'overworld'}
								onActivate={handleExitLevelClick}
								onClick={handleExitLevelClick}>
								{'Exit Level'}
							</Button>

							<Button
								isNegative
								navGroupID={'left panel'}
								navGroupLinks={NAV_GROUP_LINKS}
								nodeID={'main menu'}
								onActivate={handleMainMenuClick}
								onClick={handleMainMenuClick}>
								{'Main Menu'}
							</Button>

							<Button
								isNegative
								navGroupID={'left panel'}
								navGroupLinks={NAV_GROUP_LINKS}
								nodeID={'main menu'}
								onActivate={handleQuitToDesktopClick}
								onClick={handleQuitToDesktopClick}>
								{'Desktop'}
							</Button>
						</ButtonStack>
					</motion.div>
				</ButtonStack>
			</PanelMenu>
		</>
	)
}
