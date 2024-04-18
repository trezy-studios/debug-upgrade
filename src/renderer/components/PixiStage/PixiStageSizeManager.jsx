// Module imports
import PropTypes from 'prop-types'
import { useApp } from '@pixi/react'
import { useEffect } from 'react'
import { useStore } from 'statery'





// Local imports
import { store } from '../../store/store.js'





/**
 * Updates the viewport size in state.
 *
 * @param {number} screenWidth The new screen width.
 * @param {number} screenHeight The new screen height.
 * @param {number} [resolution] The new reolution.
 */
function handleResize(screenWidth, screenHeight, resolution) {
	const patch = {
		stageHeight: screenHeight,
		stageWidth: screenWidth,
	}

	if (resolution) {
		patch.resolution = resolution
	}

	store.set(() => patch)
}





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

	useEffect(() => {
		pixiApp.resizeTo = resizeToRef.current
		pixiApp.renderer.on('resize', handleResize)

		handleResize(pixiApp.screen.width, pixiApp.screen.height, pixiApp.renderer.resolution)

		return () => {
			pixiApp.renderer?.removeListener('resize', handleResize)
		}
	}, [
		pixiApp,
		resizeToRef,
	])

	useEffect(() => {
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
