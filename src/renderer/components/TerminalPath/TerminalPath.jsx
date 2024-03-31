// Module imports
import PropTypes from 'prop-types'





// Local imports
import styles from './TerminalPath.module.scss'





/**
 *
 * @component
 * @param {object} props All props.
 * @param {string} [props.children] The body of the prompt.
 */
export function TerminalPath({ children }) {
	return (
		<span className={styles['path']}>
			{children}
		</span>
	)
}

TerminalPath.propTypes = {
	children: PropTypes.string.isRequired,
}
