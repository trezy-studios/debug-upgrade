// Module imports
import {
	useCallback,
	useState,
} from 'react'
import { Container } from '@pixi/react'
import PropTypes from 'prop-types'
import { useStore } from 'statery'





// Local imports
import { store } from '../../store/store.js'
import { Vector2 } from '../../game/Vector2.js'






/**
 * Manages click-and-drag functionality for the Pixi stage.
 *
 * @component
 *
 * @param {Object} props All props.
 * @param {import('react').ReactNode} [props.children] Children to be rendered.
 */
export function PixiDragManager({
	children = null,
}) {
	const { uiScale } = useStore(store)
	const [isDragging, setIsDragging] = useState(false)

	const startDrag = useCallback(() => setIsDragging(true), [])
	const cancelDrag = useCallback(() => setIsDragging(false), [])
	const drag = useCallback(
		/**
		 * @param {MouseEvent} event The click event.
		 */
		event => {
			if (isDragging) {
				store.set(previousState => {
					return {
						cameraOffset: new Vector2(
							previousState.cameraOffset.x + (event.movementX / uiScale),
							previousState.cameraOffset.y + (event.movementY / uiScale),
						),
					}
				})
			}
		},
		[
			isDragging,
			uiScale,
		],
	)

	return (
		<Container
			eventMode={'static'}
			onmousedown={startDrag}
			onmouseleave={cancelDrag}
			onmousemove={drag}
			onmouseup={cancelDrag}>
			{children}
		</Container>
	)
}

PixiDragManager.propTypes = {
	children: PropTypes.node,
}
