// Module imports
import {
	Children,
	createElement,
	useCallback,
	useMemo,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import styles from './DropdownButton.module.scss'

import { Button } from '../Button/Button.jsx'





/**
 * A wrapper for groups of buttons.
 *
 * @component
 * @param {object} props All component props.
 * @param {*} [props.children] Node to be rendered inside of the button.
 * @param {boolean} [props.isAffirmative] Whether this button will cause an affirmative action.
 * @param {boolean} [props.isNegative] Whether this button will cause an negative action.
 * @param {Function} [props.onChevronClick] A function to be fired when the chevron is clicked.
 */
export function DropdownButton({
	children = null,
	isAffirmative = false,
	isNegative = false,
	onChevronClick = null,
}) {
	const compiledChildren = useMemo(() => {
		if (children === null) {
			return children
		}

		const result = {
			first: null,
			rest: [],
		}

		Children.forEach(children, (child, index) => {
			if (child === null) {
				return child
			}

			const newChild = createElement(child.type, {
				...child.props,
				key: child.key ?? index,
				ref: child.ref,
				variants: {
					...(child.props.variants || {}),
				},
			})

			if (!result.first) {
				result.first = newChild
			} else {
				result.rest.push(newChild)
			}
		})

		return result
	}, [children])

	const handleChevronClick = useCallback((...args) => {
		if (onChevronClick) {
			onChevronClick(...args)
		}
	}, [onChevronClick])

	return (
		<div className={styles['expandable-control']}>
			{compiledChildren.first}

			<Button
				className={styles['chevron']}
				hideFromNavGraph
				isAffirmative={isAffirmative}
				isNegative={isNegative}
				isUniformlyPadded
				onClick={handleChevronClick} />
		</div>
	)
}

DropdownButton.propTypes = {
	children: PropTypes.node,
	isAffirmative: PropTypes.bool,
	isNegative: PropTypes.bool,
	onChevronClick: PropTypes.func,
}
