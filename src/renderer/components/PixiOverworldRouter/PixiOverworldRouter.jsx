// Local imports
import { PixiOverworldBlock } from '../PixiOverworldBlock/PixiOverworldBlock.jsx'





// Constants
/** @type {import('../../../types/OverworldBlock.js').OverworldBlock} */
const ROUTER_BLOCK_DATA = {
	name: 'Router',
	links: [],
	position: {
		x: 240,
		y: 112,
	},
	type: 'router',
}





/**
 * Renders the overworld.
 *
 * @component
 */
export function PixiOverworldRouter() {
	return (
		<PixiOverworldBlock block={ROUTER_BLOCK_DATA} />
	)
}
