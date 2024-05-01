// Module imports
import {
	Children,
	useMemo,
} from 'react'
import classnames from 'classnames'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'





// Local imports
import styles from './ButtonStack.module.scss'





// Constants
const BUTTON_VARIANTS = {
	animate: {
		opacity: 1,
		x: 0,
		transition: {
			damping: 30,
			stiffness: 500,
			type: 'spring',
		},
	},
	exit: {
		opacity: 0,
		x: '-100%',
		transition: {
			duration: 0.2,
		},
	},
	initial: {
		opacity: 0,
		x: '-100%',
	},
}

const MENU_VARIANTS = {
	animate: {
		transition: {
			staggerChildren: 0.05,
		},
	},
	exit: {
		transition: {
			staggerChildren: 0.05,
		},
	},
	initial: {
		transition: {
			staggerChildren: 0.05,
		},
	},
}





/**
 * A wrapper for groups of buttons.
 *
 * @component
 * @param {object} props All component props.
 * @param {*} [props.children] Node to be rendered inside of the button.
 * @param {string} [props.className] Additional classes to be applied to the component.
 * @param {boolean} [props.isSubstack] Whether this button stack is a child.
 */
export function ButtonStack({
	children = null,
	className = '',
	isSubstack = false,
}) {
	const compiledClassName = useMemo(() => {
		return classnames({
			[styles['button-stack']]: true,
			[styles['is-substack']]: isSubstack,
			[className]: true,
		})
	}, [
		className,
		isSubstack,
	])

	const compiledChildren = useMemo(() => {
		if (children === null) {
			return children
		}

		return Children.map(children, (child, index) => {
			if (child === null) {
				return child
			}

			return (
				<motion.div
					key={child.key ?? index}
					className={styles['button-wrapper']}
					variants={BUTTON_VARIANTS}>
					{child}
				</motion.div>
			)
		})
	}, [children])

	return (
		<motion.menu
			animate={'animate'}
			className={compiledClassName}
			exit={'exit'}
			initial={'initial'}
			variants={MENU_VARIANTS}>
			{compiledChildren}
		</motion.menu>
	)
}

ButtonStack.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	isSubstack: PropTypes.bool,
}
