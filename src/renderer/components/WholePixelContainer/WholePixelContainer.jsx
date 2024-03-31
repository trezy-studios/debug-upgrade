// Module imports
import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'





// Local imports
import styles from './WholePixelContainer.module.scss'





/**
 * A wrapper for ensuring its contents will always be divisible by the current UI scale.
 *
 * @component
 * @param {object} props All component props.
 * @param {import('react').ReactNode} [props.children] Node to be rendered inside of the container.
 * @param {string} [props.className] Additional classees to be applied.
 */
export function WholePixelContainer(props) {
	const {
		children = null,
		className = '',
	} = props

	/** @type {import('react').MutableRefObject<null | HTMLDivElement>} */
	const containerRef = useRef(null)
	const [state, setState] = useState({
		height: 0,
		width: 0,
	})

	const compiledClassName = classnames(styles['whole-pixel-container'], className)

	const updateSize = useCallback(() => {
		const containerElement = containerRef.current

		if (!containerElement) {
			return
		}

		const rootElement = document.querySelector(':root')
		const rootElementStyles = getComputedStyle(rootElement)
		const uiScale = Number(rootElementStyles.getPropertyValue('--ui-scale'))

		const parentHeight = containerElement.parentElement.clientHeight
		const parentWidth = containerElement.parentElement.clientWidth

		const height = Math.floor(parentHeight / uiScale) * uiScale
		const width = Math.floor(parentWidth / uiScale) * uiScale

		setState({
			height,
			width,
		})
	}, [setState])

	useEffect(() => {
		if (typeof window !== 'undefined') {
			updateSize()

			window.addEventListener('resize', updateSize)

			return () => window.removeEventListener('resize', updateSize)
		}
	}, [updateSize])

	return (
		<div
			ref={containerRef}
			className={compiledClassName}
			style={state}>
			{children}
		</div>
	)
}

WholePixelContainer.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}
