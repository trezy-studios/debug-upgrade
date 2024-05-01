// Module imports
import PropTypes from 'prop-types'





// Local imports
import styles from './PanelMenu.module.scss'





/**
 * @component
 * @param {object} props All props.
 * @param {import('react').ReactNode} [props.children] The component's children.
 */
export function PanelMenu({
	children = null,
}) {
	return (
		<div className={styles['panel-menu']}>
			{children}
		</div>
	)
}

PanelMenu.propTypes = {
	children: PropTypes.node,
}
