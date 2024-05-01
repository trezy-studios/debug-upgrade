// Module imports
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useStore } from 'statery'





// Local imports
import styles from './Timer.module.scss'

import { store } from '../../store/store.js'





/**
 * A timer to represent the amount of time that has passed during the current map session.
 *
 * @component
 * @param {object} props All component props.
 * @param {string} [props.className] Additional classes to be applied to the component.
 * @param {boolean} [props.isBordered] Whether this timer should have a border.
 * @param {boolean} [props.isCentered] Whether this timer should be centered horizontally.
 * @param {boolean} [props.isLarge] Whether this timer should be larger than normal.
 * @param {boolean} [props.isMonospace] Whether the numbers of this timer should be monospaced.
 */
export function Timer({
	className = '',
	isBordered = false,
	isCentered = false,
	isLarge = false,
	isMonospace = false,
}) {
	const { timerString } = useStore(store)

	const compiledClassName = useMemo(() => {
		return classnames(styles['timer'], className, {
			[styles['is-bordered']]: isBordered,
			[styles['is-centered']]: isCentered,
			[styles['is-large']]: isLarge,
			[styles['is-monospace']]: isMonospace,
			[styles['is-negative']]: timerString.startsWith('-'),
		})
	}, [
		className,
		isBordered,
		isCentered,
		isLarge,
		isMonospace,
		timerString,
	])

	const renderedTime = useMemo(() => {
		if (isMonospace) {
			return timerString
				.split('')
				.map((character, index) => {
					return (
						<span key={index}>
							{character}
						</span>
					)
				})
		}

		return timerString
	}, [
		timerString,
		isMonospace,
	])

	return (
		<time className={compiledClassName}>
			<span className={styles['time-wrapper']}>
				{renderedTime}
			</span>
		</time>
	)
}

Timer.propTypes = {
	className: PropTypes.string,
	isBordered: PropTypes.bool,
	isCentered: PropTypes.bool,
	isLarge: PropTypes.bool,
	isMonospace: PropTypes.bool,
}
