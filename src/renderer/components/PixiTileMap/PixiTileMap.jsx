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
export function PixiTileMap({ layers }) {
	const {
		cameraOffsetX,
		cameraOffsetY,
	} = useStore(store)

	const renderedLayers = useMemo(() => {
		return layers.map((layerMap, index) => {
			return (
				<PixiTileMapLayer
					key={index}
					layerMap={layerMap} />
			)
		})
	}, [layers])

	return (
		<Container
			x={cameraOffsetX}
			y={cameraOffsetY}>
			{renderedLayers}
		</Container>
	)
}

PixiTileMap.propTypes = {
	layers: PropTypes.arrayOf(PropTypes.object).isRequired,
}
