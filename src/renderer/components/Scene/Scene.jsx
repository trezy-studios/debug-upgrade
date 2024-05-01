// Module imports
import classnames from 'classnames'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





// Local imports
import styles from './Scene.module.scss'





/**
 * Renders a scene.
 *
 * @component
 * @param {object} props All props.
 * @param {string} [props.animate] The typical state of the component.
 * @param {import('react').ReactNode} [props.children] The component's children.
 * @param {string} [props.className] Additional classes to be applied to the component.
 * @param {string} [props.exit] The state to which the component should be animated when it is unmounted.
 * @param {string} [props.initial] The state from which the component should be animated when it is mounted.
 * @param {object} [props.variants] An object representing variations of the component's state to be used for animations.
 */
export function Scene({
	// eslint-disable-next-line no-undefined
	animate = undefined,
	children = null,
	className = '',
	// eslint-disable-next-line no-undefined
	exit = undefined,
	// eslint-disable-next-line no-undefined
	initial = undefined,
	// eslint-disable-next-line no-undefined
	variants = undefined,
}) {
	const compiledClassName = useMemo(() => classnames(styles['scene'], className), [className])

	return (
		<motion.main
			animate={animate}
			className={compiledClassName}
			exit={exit}
			initial={initial}
			variants={variants}>
			{children}
		</motion.main>
	)
}

Scene.propTypes = {
	animate: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
	exit: PropTypes.string,
	initial: PropTypes.string,
	variants: PropTypes.object,
}
