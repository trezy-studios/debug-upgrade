// Local imports
import { backToScene } from '../../store/reducers/backToScene.js'
import { Button } from '../Button/Button.jsx'
import { ButtonStack } from '../ButtonStack/ButtonStack.jsx'
import { PanelMenu } from '../Panel/PanelMenu.jsx'
import { pushScene } from '../../store/reducers/pushScene.js'
import { SCENES } from '../../data/SCENES.js'





// Constants
const navGroupLinks = ['left panel']





/** Fired when the back button is clicked. */
function handleMainMenuClick() {
	backToScene(SCENES.MAIN_MENU)
}

/** Fired when the settings button is clicked. */
function handleSettingsClick() {
	pushScene(SCENES.SETTINGS)
}

/**
 * Renders the contents of the left panel for the Title scene.
 *
 * @component
 */
export function OverworldSceneLeftPanelContents() {
	return (
		<PanelMenu>
			<ButtonStack>
				<Button
					navGroupID={'left panel'}
					navGroupLinks={navGroupLinks}
					nodeID={'settings'}
					onActivate={handleSettingsClick}
					onClick={handleSettingsClick}>
					{'Settings'}
				</Button>

				<Button
					navGroupID={'left panel'}
					navGroupLinks={navGroupLinks}
					nodeID={'main menu'}
					onActivate={handleMainMenuClick}
					onClick={handleMainMenuClick}>
					{'Main Menu'}
				</Button>
			</ButtonStack>
		</PanelMenu>
	)
}
