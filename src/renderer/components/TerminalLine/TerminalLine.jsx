// Module imports
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'





// Local imports
import styles from './TerminalLine.module.scss'

import { TERMINAL_LINE_PART_TYPES } from '../../data/TERMINAL_LINE_PART_TYPES.js'
import { TerminalPath } from '../TerminalPath/TerminalPath.jsx'
import { TerminalTable } from '../TerminalTable/TerminalTable.jsx'
import { useMemo } from 'react'





// Constants
const VARIANTS = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
	},
}





/**
 *
 * @component
 * @param {object} props All props.
 * @param {(string | import('../../../types/TerminalLinePartConfig.js').TerminalLinePartConfig)[]} props.parts An array of line configs to be rendered.
 */
export function TerminalLine({ parts }) {
	const renderedParts = useMemo(() => {
		return parts.map((part, partIndex) => {
			if (typeof part === 'string') {
				return part
			}

			switch (part.type) {
				case TERMINAL_LINE_PART_TYPES.PATH:
					return (
						<TerminalPath key={partIndex}>
							{part.body}
						</TerminalPath>
					)

				case TERMINAL_LINE_PART_TYPES.STRING:
					return part.body

				case TERMINAL_LINE_PART_TYPES.TABLE:
					return (
						<TerminalTable
							key={partIndex}
							headings={part.headings}
							rows={part.rows} />
					)

				default:
					console.log(`Unrecognised terminal part type: ${part.type}`, part.body)
					return null
			}
		})
	}, [parts])

	return (
		<motion.span
			animate={'visible'}
			className={styles['body']}
			initial={'hidden'}
			variants={VARIANTS}>
			{renderedParts}
		</motion.span>
	)
}

TerminalLine.propTypes = {
	parts: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string,
	])).isRequired,
}
