// Module imports
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'





// Local imports
import styles from './Terminal.module.scss'

import { TerminalLine } from '../TerminalLine/TerminalLine.jsx'
import { TerminalPrompt } from '../TerminalPrompt/TerminalPrompt.jsx'
import { useMemo } from 'react'





// Constants
const VARIANTS = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: 'tween',
		},
	},
}





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
				layout
				variants={VARIANTS}>
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
		<motion.div
			animate={'visible'}
			className={styles['terminal']}
			exit={'hidden'}
			initial={'hidden'}>
			{renderedLines}
		</motion.div>
	)
}

Terminal.propTypes = {
	lines: PropTypes.arrayOf(PropTypes.object),
}
