// Module imports
import { Container } from '@pixi/react'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





// Local imports
import { PixiTileMapTile } from '../PixiTileMapTile/PixiTileMapTile.jsx'





/**
 * Renders a tilemap.
 *
 * @component
 */
export function PixiTileMapLayer({
	isCursor = false,
	layerMap,
}) {
	const renderedTiles = useMemo(() => {
		return Object
			.entries(layerMap)
			.map(([tilePositionString, tile]) => {
				const [,
					stringX,
					stringY,
				] = /^(\d+)\|(\d+)$/u.exec(tilePositionString)

				return (
					<PixiTileMapTile
						key={tilePositionString}
						isCursor={isCursor}
						tile={tile}
						x={Number(stringX)}
						y={Number(stringY)} />
				)
			})
	}, [
		isCursor,
		layerMap,
	])

	return (
		<Container>
			{renderedTiles}
		</Container>
	)
}

PixiTileMapLayer.propTypes = {
	isCursor: PropTypes.bool,
	layerMap: PropTypes.object.isRequired,
}
