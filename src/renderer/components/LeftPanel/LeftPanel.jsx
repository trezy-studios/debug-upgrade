// Module imports
import { AnimatePresence } from 'framer-motion'
import { useStore } from 'statery'





// Local imports
import { DecoratedHeader } from '../DecoratedHeader/DecoratedHeader.jsx'
import { getCurrentScene } from '../../store/reducers/getCurrentScene.js'
import { Panel } from '../Panel/Panel.jsx'
import { SCENES } from '../../data/SCENES.js'
import { store } from '../../store/store.js'

import { OverworldSceneLeftPanelContents } from '../OverworldSceneLeftPanelContents/OverworldSceneLeftPanelContents.jsx'
import { PlaySceneLeftPanelContents } from '../PlaySceneLeftPanelContents/PlaySceneLeftPanelContents.jsx'
import { TitleSceneLeftPanelContents } from '../TitleSceneLeftPanelContents/TitleSceneLeftPanelContents.jsx'





// Constants
const PANEL_VARIANTS = {
	animate: {
		opacity: 1,
		x: 0,
		transition: {
			damping: 30,
			stiffness: 500,
			type: 'spring',
		},
	},

	initial: {
		opacity: 0,
		x: '-100%',
	},
}





/**
 * Renders the game's left panel.
 *
 * @component
 */
export function LeftPanel() {
	const proxyStore = useStore(store)
	const currentScene = getCurrentScene(proxyStore)

	return (
		<Panel variants={PANEL_VARIANTS}>
			<DecoratedHeader>{'Menu'}</DecoratedHeader>

			<AnimatePresence mode={'wait'}>
				{(currentScene === SCENES.PLAY) && (
					<PlaySceneLeftPanelContents key={'PlaySceneLeftPanelContents'} />
				)}

				{(currentScene === SCENES.OVERWORLD) && (
					<OverworldSceneLeftPanelContents key={'OverworldSceneLeftPanelContents'} />
				)}

				{(currentScene === SCENES.MAIN_MENU) && (
					<TitleSceneLeftPanelContents key={'TitleSceneLeftPanelContents'} />
				)}
			</AnimatePresence>
		</Panel>
	)
}
