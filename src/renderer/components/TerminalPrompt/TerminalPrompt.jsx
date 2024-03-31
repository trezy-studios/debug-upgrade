// Module imports
import PropTypes from 'prop-types'





// Local imports
import styles from './TerminalPrompt.module.scss'





/**
 *
 * @component
 * @param {object} props All props.
 * @param {string} [props.children] The body of the prompt.
 */
export function TerminalPrompt({ children }) {
	return (
		<span className={styles['prompt']}>
			{children}
		</span>
	)
}

TerminalPrompt.propTypes = {
	children: PropTypes.string.isRequired,
}
