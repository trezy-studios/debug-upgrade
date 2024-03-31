// Local imports
import { Button } from '../Button/Button.jsx'
import { ButtonStack } from '../ButtonStack/ButtonStack.jsx'
import { PanelMenu } from '../Panel/PanelMenu.jsx'
import { pushScene } from '../../store/reducers/pushScene.js'
import { SCENES } from '../../data/SCENES.js'





// Constants
const navGroupLinks = ['center panel']





/** Fired when the architect button is clicked. */
function handleArchitectClick() {
	pushScene(SCENES.ARCHITECT)
}

/** Fired when the custom game button is clicked. */
function handleCustomGameClick() {
	pushScene(SCENES.CUSTOM_GAME)
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
export function TitleSceneLeftPanelContents() {
	return (
		<PanelMenu>
			<ButtonStack>
				<Button
					isNavGroupDefault
					navGroupID={'left panel'}
					navGroupLinks={navGroupLinks}
					nodeID={'custom game'}
					onActivate={handleCustomGameClick}
					onClick={handleCustomGameClick}>
					{'Custom Game'}
				</Button>

				<Button
					navGroupID={'left panel'}
					navGroupLinks={navGroupLinks}
					nodeID={'architect'}
					onActivate={handleArchitectClick}
					onClick={handleArchitectClick}>
					{'Architect'}
				</Button>

				<Button
					navGroupID={'left panel'}
					navGroupLinks={navGroupLinks}
					nodeID={'settings'}
					onActivate={handleSettingsClick}
					onClick={handleSettingsClick}>
					{'Settings'}
				</Button>
			</ButtonStack>
		</PanelMenu>
	)
}
