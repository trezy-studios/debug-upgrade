// Module imports
import PropTypes from 'prop-types'
import { Stage } from '@pixi/react'





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
}) {
	return (
		<Stage
			onMount={handleMount}
			options={STAGE_OPTIONS}>
			{children}
		</Stage>
	)
}

PixiStage.propTypes = {
	children: PropTypes.node,
}
