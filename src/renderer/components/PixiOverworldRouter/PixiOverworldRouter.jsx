// Local imports
import { PixiOverworldBlock } from '../PixiOverworldBlock/PixiOverworldBlock.jsx'





// Constants
import { LEVEL_LAYOUT } from '../../data/LEVEL_LAYOUT.js'





/**
 * Renders the overworld.
 *
 * @component
 */
export function PixiOverworldRouter() {
	return (
		<PixiOverworldBlock block={LEVEL_LAYOUT.blocks.router} />
	)
}
