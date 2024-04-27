// Module imports
import { AnimatePresence } from 'framer-motion'
import { useStore } from 'statery'





// Local imports
import { Autosave } from '../Autosave/Autosave.jsx'
import { getCurrentScene } from '../../store/reducers/getCurrentScene.js'
import { LoadingGameScene } from '../LoadingGameScene/LoadingGameScene.jsx'
import { MainScene } from '../MainScene/MainScene.jsx'
import { SCENES } from '../../data/SCENES.js'
import { store } from '../../store/store.js'
import { WholePixelContainer } from '../WholePixelContainer/WholePixelContainer.jsx'
// import { Architect } from './scenes/Architect/Architect.jsx'
// import { getCurrentScene } from '../newStore/selectors/getCurrentScene.js'
// import { LoadingGameScene } from './scenes/LoadingGameScene/LoadingGameScene.jsx'
// import { ModalPortal } from './ModalPortal/ModalPortal.jsx'
// import { NavGraphContextProvider } from './NavGraph/NavGraphContextProvider.jsx'
// import { useConfigWatcher } from '../hooks/useConfigWatcher.js'





/**
 * Wrapper for the entire application.
 *
 * @component
 */
export function App() {
	const proxyStore = useStore(store)
	const currentScene = getCurrentScene(proxyStore)

	// useConfigWatcher()

	console.log(currentScene)

	return (
		<>
			{/* <NavGraphContextProvider> */}
			<WholePixelContainer>
				<AnimatePresence mode={'wait'}>
					{(currentScene === SCENES.LOADING_GAME) && (
						<LoadingGameScene />
					)}

					{/* {(currentScene === ARCHITECT) && (
						<Architect key={'architect'} />
					)} */}

					{(![SCENES.LOADING_GAME, SCENES.ARCHITECT].includes(currentScene)) && (
						<MainScene />
					)}
				</AnimatePresence>

				<Autosave />
			</WholePixelContainer>
			{/* </NavGraphContextProvider> */}

			{/* <ModalPortal /> */}
		</>
	)
}
