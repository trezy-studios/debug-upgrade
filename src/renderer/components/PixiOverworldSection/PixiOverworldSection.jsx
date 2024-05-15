// Module imports
import { Container } from '@pixi/react'
import PropTypes from 'prop-types'





// Local imports
import { LEVEL_LAYOUT } from '../../data/LEVEL_LAYOUT.js'
import { PixiOverworldBlock } from '../PixiOverworldBlock/PixiOverworldBlock.jsx'





/**
 * Maps section data to renderable blocks.
 *
 * @component
 * @param {string[]} blocks Blocks to be mapped.
 */
function mapSectionBlocks(blocks) {
	return blocks.map(blockName => {
		const block = LEVEL_LAYOUT.blocks[blockName]

		return (
			<PixiOverworldBlock
				key={block.name}
				block={block} />
		)
	})
}

/**
 * Renders a section of the Overworld.
 *
 * @component
 */
export function PixiOverworldSection({ data }) {
	return (
		<Container
			height={data.size.height}
			name={data.name}
			width={data.size.width}
			x={data.position.x}
			y={data.position.y}>
			{mapSectionBlocks(data.blocks)}
		</Container>
	)
}

PixiOverworldSection.propTypes = {
	data: PropTypes.object.isRequired,
}
