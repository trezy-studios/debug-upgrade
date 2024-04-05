// Module imports
import PropTypes from 'prop-types'
import { Stage } from '@pixi/react'





// Local imports
import { PixiStageSizeManager } from './PixiStageSizeManager.jsx'





// Constants
const STAGE_OPTIONS = {
	backgroundAlpha: 0,
}





/**
 * Attaches the app to the global scope so it can be used with the Pixi dev tools.
 *
 * @param {import('pixi.js').Application} pixiApp The main Pixi app.
 */
function handleMount(pixiApp) {
	globalThis.__PIXI_APP__ = pixiApp
}





/**
 * Renders the Pixi.js stage.
 *
 * @component
 */
export function PixiStage({
	children = null,
	resizeToRef,
}) {
	return (
		<Stage
			onMount={handleMount}
			options={STAGE_OPTIONS}>
			<PixiStageSizeManager resizeToRef={resizeToRef} />
			{children}
		</Stage>
	)
}

PixiStage.propTypes = {
	children: PropTypes.node,
	resizeToRef: PropTypes.object.isRequired,
}
