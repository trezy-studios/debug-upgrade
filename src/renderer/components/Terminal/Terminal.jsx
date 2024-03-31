// Module imports
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'





// Local imports
import styles from './Terminal.module.scss'

import { TerminalLine } from '../TerminalLine/TerminalLine.jsx'
import { TerminalPrompt } from '../TerminalPrompt/TerminalPrompt.jsx'
import { useMemo } from 'react'





/**
 *
 * @component
 * @param {object} props All props.
 * @param {import('../../../types/TerminalLine.js').TerminalLine[]} [props.lines] An array of line configs to be rendered.
 */
export function Terminal({
	lines = [],
}) {
	const renderedLines = useMemo(() => {
		return lines.map((line, index) => (
			<motion.div
				key={index}
				className={styles['line']}
				layout>
				{Boolean(line.prompt) && (
					<TerminalPrompt>
						{line.prompt}
					</TerminalPrompt>
				)}

				<TerminalLine parts={line.body} />
			</motion.div>
		))
	}, [lines])

	return (
		<motion.div className={styles['terminal']}>
			{renderedLines}
		</motion.div>
	)
}

Terminal.propTypes = {
	lines: PropTypes.arrayOf(PropTypes.object),
}
