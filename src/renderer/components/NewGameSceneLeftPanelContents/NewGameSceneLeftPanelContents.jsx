// Local imports
import { Button } from '../Button/Button.jsx'
import { ButtonStack } from '../ButtonStack/ButtonStack.jsx'
import { PanelMenu } from '../Panel/PanelMenu.jsx'
import { popScene } from '../../store/reducers/popScene.js'
import { pushScene } from '../../store/reducers/pushScene.js'
import { SCENES } from '../../data/SCENES.js'





// Constants
const navGroupLinks = ['center panel']





/** Fired when the back button is clicked. */
function handleBackClick() {
	popScene()
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
export function NewGameSceneLeftPanelContents() {
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
					nodeID={'back'}
					onActivate={handleBackClick}
					onClick={handleBackClick}>
					{'Back'}
				</Button>
			</ButtonStack>
		</PanelMenu>
	)
}
