// Module imports
import {
	Children,
	cloneElement,
	useMemo,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import styles from './PanelsLayout.module.scss'

import classnames from 'classnames'





/**
 * Layout wrapper for panels.
 *
 * @component
 * @param {object} props All props.
 * @param {import('react').ReactNode} props.children Children of the component.
 */
export function PanelsLayout({
	children = null,
}) {
	const parsedChildren = useMemo(() => {
		return Children.map(children, child => {
			/** @type {import('react').ReactElement} */
			const childPanel = /** @type {*} */ (child)

			cloneElement(childPanel, {
				...(childPanel.props ?? {}),
				className: classnames(childPanel.props.className, styles['panel']),
			})

			return childPanel
		})
	}, [children])

	return (
		<div className={styles['panels-layout']}>
			{parsedChildren}
		</div>
	)
}

PanelsLayout.propTypes = {
	children: PropTypes.node,
}
