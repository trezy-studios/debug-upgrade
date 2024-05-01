// Module imports
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





// Local imports
import styles from './DecoratedHeader.module.scss'





/**
 * Renders a decorated header.
 *
 * @component
 * @param {object} props All props.
 * @param {import('react').ReactNode} [props.children] The component's children.
 * @param {string} [props.className] Additional classes to be applied to the component.
 */
export function DecoratedHeader({
	children = null,
	className = '',
}) {
	const compiledClassName = useMemo(() => {
		return classnames(styles['decorated-header'], className)
	}, [className])

	return (
		<header className={compiledClassName}>
			<h2>{children}</h2>
		</header>
	)
}

DecoratedHeader.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}
