// Module imports
import { Container } from '@pixi/react'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





// Local imports
import { PixiGrid } from '../PixiGrid/PixiGrid.jsx'
import { PixiTileMapLayer } from '../PixiTileMapLayer/PixiTileMapLayer.jsx'





/**
 * Renders a tilemap.
 *
 * @component
 */
export function PixiTileMap({ layers }) {
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
		<Container>
			<PixiGrid />
			{renderedLayers}
		</Container>
	)
}

PixiTileMap.propTypes = {
	layers: PropTypes.arrayOf(PropTypes.object).isRequired,
}
