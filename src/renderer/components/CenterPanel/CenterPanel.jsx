// Module imports
import { AnimatePresence } from 'framer-motion'
import { useStore } from 'statery'





// Local imports
// import {
// 	CUSTOM_GAME,
// 	LOADING_MAP,
// 	MAIN_MENU,
// 	MAP_SELECT,
// 	PLAY,
// 	SAVE_SELECT,
// 	SETTINGS,
// } from '../constants/SceneNames.js'
import { getCurrentScene } from '../../store/reducers/getCurrentScene.js'
import { Panel } from '../Panel/Panel.jsx'
import { SCENES } from '../../data/SCENES.js'
import { store } from '../../store/store.js'

// import { CenterPanelContents as CustomGameSceneCenterPanelContents } from './scenes/CustomGame/CenterPanelContents.jsx'
// import { CenterPanelContents as MapSelectSceneCenterPanelContents } from './scenes/MapSelect/CenterPanelContents.jsx'
// import { CenterPanelContents as PlaySceneCenterPanelContents } from './scenes/Play/CenterPanelContents.jsx'
// import { CenterPanelContents as SaveSelectSceneCenterPanelContents } from './scenes/SaveSelect/CenterPanelContents.jsx'
// import { CenterPanelContents as SettingsSceneCenterPanelContents } from './scenes/Settings/CenterPanelContents.jsx'
import { ContinueGameSceneCenterPanelContents } from '../ContinueGameSceneCenterPanelContents/ContinueGameSceneCenterPanelContents.jsx'
import { LoadingMapSceneCenterPanelContents } from '../LoadingMapSceneCenterPanelContents/LoadingMapSceneCenterPanelContents.jsx'
import { NewGameSceneCenterPanelContents } from '../NewGameSceneCenterPanelContents/NewGameSceneCenterPanelContents.jsx'
import { OverworldSceneCenterPanelContents } from '../OverworldSceneCenterPanelContents/OverworldSceneCenterPanelContents.jsx'
import { PlaySceneCenterPanelContents } from '../PlaySceneCenterPanelContents/PlaySceneCenterPanelContents.jsx'
import { TitleSceneCenterPanelContents } from '../TitleSceneCenterPanelContents/TitleSceneCenterPanelContents.jsx'





// Constants
const PANEL_VARIANTS = {
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			damping: 30,
			stiffness: 500,
			type: 'spring',
		},
	},

	exit: {
		opacity: 0,
		y: '100%',
	},

	initial: {
		opacity: 0,
		y: '-100%',
	},
}





/**
 * Renders the game's center panel.
 *
 * @component
 */
export function CenterPanel() {
	const proxyStore = useStore(store)
	const currentScene = getCurrentScene(proxyStore)

	return (
		<AnimatePresence mode={'wait'}>
			{/* {(currentScene === CUSTOM_GAME) && (
				<Panel
					key={`${CUSTOM_GAME}SceneCenterPanelContents`}
					columnSpan={3}
					variants={PANEL_VARIANTS}>
					<CustomGameSceneCenterPanelContents />
				</Panel>
			)}

			{(currentScene === LOADING_MAP) && (
				<Panel
					key={`${LOADING_MAP}SceneCenterPanelContents`}
					columnSpan={3}
					variants={PANEL_VARIANTS}>
					<LoadingMapSceneCenterPanelContents />
				</Panel>
			)}

			{(currentScene === MAP_SELECT) && (
				<Panel
					key={`${MAP_SELECT}SceneCenterPanelContents`}
					columnSpan={3}
					variants={PANEL_VARIANTS}>
					<MapSelectSceneCenterPanelContents />
				</Panel>
			)}

			{(currentScene === PLAY) && (
				<Panel
					key={`${PLAY}SceneCenterPanelContents`}
					columnSpan={3}
					variants={PANEL_VARIANTS}>
					<PlaySceneCenterPanelContents />
				</Panel>
			)}

			{(currentScene === SAVE_SELECT) && (
				<Panel
					key={`${SAVE_SELECT}SceneCenterPanelContents`}
					columnSpan={3}
					variants={PANEL_VARIANTS}>
					<SaveSelectSceneCenterPanelContents />
				</Panel>
			)}

			{(currentScene === SETTINGS) && (
				<Panel
					key={`${SETTINGS}SceneCenterPanelContents`}
					columnSpan={3}
					variants={PANEL_VARIANTS}>
					<SettingsSceneCenterPanelContents />
				</Panel>
			)} */}

			{(currentScene === SCENES.CONTINUE_GAME) && (
				<Panel
					key={`${SCENES.CONTINUE_GAME}SceneCenterPanelContents`}
					columnSpan={3}
					isCentered
					variants={PANEL_VARIANTS}>
					<ContinueGameSceneCenterPanelContents />
				</Panel>
			)}

			{(currentScene === SCENES.LOADING_MAP) && (
				<Panel
					key={`${SCENES.LOADING_MAP}SceneCenterPanelContents`}
					columnSpan={3}
					isCentered
					variants={PANEL_VARIANTS}>
					<LoadingMapSceneCenterPanelContents />
				</Panel>
			)}

			{(currentScene === SCENES.MAIN_MENU) && (
				<Panel
					key={`${SCENES.MAIN_MENU}SceneCenterPanelContents`}
					columnSpan={3}
					isCentered
					variants={PANEL_VARIANTS}>
					<TitleSceneCenterPanelContents />
				</Panel>
			)}

			{(currentScene === SCENES.NEW_GAME) && (
				<Panel
					key={`${SCENES.NEW_GAME}SceneCenterPanelContents`}
					columnSpan={3}
					isCentered
					variants={PANEL_VARIANTS}>
					<NewGameSceneCenterPanelContents />
				</Panel>
			)}

			{(currentScene === SCENES.OVERWORLD) && (
				<Panel
					key={`${SCENES.OVERWORLD}SceneCenterPanelContents`}
					columnSpan={3}
					isCentered
					variants={PANEL_VARIANTS}>
					<OverworldSceneCenterPanelContents />
				</Panel>
			)}

			{(currentScene === SCENES.PLAY) && (
				<Panel
					key={`${SCENES.PLAY}SceneCenterPanelContents`}
					columnSpan={3}
					isCentered
					variants={PANEL_VARIANTS}>
					<PlaySceneCenterPanelContents />
				</Panel>
			)}
		</AnimatePresence>
	)
}
