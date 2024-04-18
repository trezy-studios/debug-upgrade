// Module imports
import { Container } from '@pixi/react'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useStore } from 'statery'





// Local imports
import { PixiTileMapLayer } from '../PixiTileMapLayer/PixiTileMapLayer.jsx'
import { store } from '../../store/store.js'





/**
 * Renders a tilemap.
 *
 * @component
 */
export function PixiTileMap({
	isCursor = false,
	layers,
}) {
	const {
		cameraOffsetX,
		cameraOffsetY,
		cursorX,
		cursorY,
	} = useStore(store)

	const alpha = useMemo(() => {
		if (isCursor) {
			return 0.7
		}

		return 1
	}, [isCursor])

	const renderedLayers = useMemo(() => {
		return layers.map((layerMap, index) => {
			return (
				<PixiTileMapLayer
					key={index}
					isCursor={isCursor}
					layerMap={layerMap} />
			)
		})
	}, [
		isCursor,
		layers,
	])

	const x = useMemo(() => {
		let result = cameraOffsetX

		if (isCursor) {
			result += cursorX * 16
		}

		return result
	}, [
		cameraOffsetX,
		cursorX,
		isCursor,
	])

	const y = useMemo(() => {
		let result = cameraOffsetY

		if (isCursor) {
			result += cursorY * 16
		}

		return result
	}, [
		cameraOffsetY,
		cursorY,
		isCursor,
	])

	return (
		<Container
			alpha={alpha}
			x={x}
			y={y}>
			{renderedLayers}
		</Container>
	)
}

PixiTileMap.propTypes = {
	isCursor: PropTypes.bool,
	layers: PropTypes.arrayOf(PropTypes.object).isRequired,
}
