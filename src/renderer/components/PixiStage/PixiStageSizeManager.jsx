// Module imports
import PropTypes from 'prop-types'
import { useApp } from '@pixi/react'
import { useLayoutEffect } from 'react'
import { useStore } from 'statery'





// Local imports
import { store } from '../../store/store.js'





// /**
//  * Updates the viewport size in state.
//  *
//  * @param {number} screenWidth The new screen width.
//  * @param {number} screenHeight The new screen height.
//  */
// function handleResize(screenWidth, screenHeight) {
// 	store.set(() => ({
// 		viewport: {
// 			height: screenHeight,
// 			width: screenWidth,
// 		},
// 	}))
// }





/**
 * Renders the overworld.
 *
 * @component
 */
export function PixiStageSizeManager({
	resizeToRef,
}) {
	const { uiScale } = useStore(store)

	const pixiApp = useApp()

	useLayoutEffect(() => {
		pixiApp.resizeTo = resizeToRef.current
		// pixiApp.renderer.on('resize', handleResize)

		// handleResize(pixiApp.screen.width, pixiApp.screen.height)

		// return () => {
		// 	pixiApp.renderer?.removeListener('resize', handleResize)
		// }
	}, [
		pixiApp,
		resizeToRef,
	])

	useLayoutEffect(() => {
		pixiApp.stage.setTransform(
			0,
			0,
			uiScale,
			uiScale,
			0,
			0,
			0,
			0,
			0,
		)
	}, [
		pixiApp,
		uiScale,
	])

	return null
}

PixiStageSizeManager.propTypes = {
	resizeToRef: PropTypes.object.isRequired,
}
