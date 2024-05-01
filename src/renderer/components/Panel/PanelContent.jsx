// Module imports
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





// Local imports
import styles from './PanelContent.module.scss'





/**
 * Wraps the content of a <Panel>.
 *
 * @component
 * @param {object} props All props.
 * @param {import('react').ReactNode} [props.children] The component's children.
 * @param {string} [props.className] Additional classes to be applied to the component.
 * @param {boolean} [props.hidden] Whether the content is hidden.
 */
export function PanelContent({
	children = null,
	className = '',
	hidden = false,
}) {
	const compiledClassName = useMemo(() => {
		return classnames(styles['panel-content'], className)
	}, [className])

	return (
		<div
			className={compiledClassName}
			hidden={hidden}>
			{children}
		</div>
	)
}

PanelContent.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	hidden: PropTypes.bool,
}
