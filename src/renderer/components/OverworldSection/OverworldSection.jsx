// Module imports
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





// Local imports
import styles from '../OverworldSection/OverworldSection.module.scss'

import { OverworldBlock } from '../OverworldBlock/OverworldBlock.jsx'





/**
 * Maps section data to renderable blocks.
 *
 * @component
 * @param {import('../../../types/OverworldBlock.js').OverworldBlock[]} blocks Blocks to be mapped.
 * @param {string} sectionName The name of the parent section.
 */
function mapSectionBlocks(blocks, sectionName) {
	return blocks.map(block => {
		return (
			<OverworldBlock
				key={block.name}
				block={block}
				sectionName={sectionName} />
		)
	})
}

/**
 * Renders the Overworld.
 *
 * @component
 */
export function OverworldSection({
	data,
	name,
}) {
	const compiledClassName = useMemo(() => classnames(styles['overworld-section'], styles[name]), [name])

	const compiledStyle = useMemo(() => {
		return {
			'--height': `${data.size.height}px`,
			'--left': `${data.position.x}px`,
			'--top': `${data.position.y}px`,
			'--width': `${data.size.width}px`,
		}
	}, [data])

	return (
		<div
			className={compiledClassName}
			style={compiledStyle}>
			{mapSectionBlocks(data.blocks, name)}
		</div>
	)
}

OverworldSection.propTypes = {
	data: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
}
