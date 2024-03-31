// Module imports
import classnames from 'classnames'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





// Local imports
import styles from './Panel.module.scss'

import { PanelContextProvider } from './PanelContext.jsx'
import { PanelLoader } from './PanelLoader.jsx'





/**
 * A visual container for UI sections.
 *
 * @component
 * @param {object} props All component props.
 * @param {import('react').ReactNode} [props.children] Node to be rendered inside of the panel.
 * @param {string} [props.className] A string of classes to be set on the panel.
 * @param {1 | 2 | 3 | 4} [props.columnSpan] How many columns this panel should span.
 * @param {boolean} [props.isCentered] Whether or not the content of this panel should be centered (both horizontally and vertically).
 * @param {boolean} [props.isPrimary] Whether or not this button is a primary type panel.
 * @param {string} [props.id] A unique identifier which allows this component to transition between different layouts.
 * @param {object} [props.variants] An object representing variations of the component's state to be used for animations.
 * @param {object} [props.variants.animate] The typical state of the component.
 * @param {object} [props.variants.exit] The state to which the component should be animated when it is unmounted.
 * @param {object} [props.variants.initial] The state from which the component should be animated when it is mounted.
 */
export function Panel({
	children = null,
	className = '',
	columnSpan = 1,
	id = null,
	isCentered = false,
	isPrimary = false,
	variants = null,
}) {
	const compiledClassName = useMemo(() => {
		return classnames({
			[className]: true,
			[styles['panel']]: true,
			[styles[`span-${columnSpan}`]]: true,
			[styles['is-centered']]: isCentered,
			[styles['is-primary']]: isPrimary,
		})
	}, [
		columnSpan,
		className,
		isCentered,
		isPrimary,
	])

	return (
		<PanelContextProvider>
			<motion.div
				animate={'animate'}
				className={compiledClassName}
				exit={'exit'}
				id={id}
				initial={'initial'}
				variants={variants}>
				{children}

				<PanelLoader />
			</motion.div>
		</PanelContextProvider>
	)
}

Panel.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	columnSpan: PropTypes.oneOf([1, 2, 3, 4]),
	id: PropTypes.string,
	isCentered: PropTypes.bool,
	isPrimary: PropTypes.bool,
	variants: PropTypes.shape({
		animate: PropTypes.object,
		exit: PropTypes.object,
		initial: PropTypes.object,
	}),
}
