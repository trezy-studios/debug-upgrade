// Module imports
import PropTypes from 'prop-types'
import { Sprite } from '@pixi/react'
import { useMemo } from 'react'
import { useStore } from 'statery'





// Local imports
import { store } from '../../store/store.js'





/**
 * Renders a tilemap.
 *
 * @component
 */
export function PixiTileMapTile({
	tile,
	x,
	y,
}) {
	const { resourcepacks } = useStore(store)

	const texture = useMemo(() => {
		return resourcepacks.get(tile.resourcepackID).tilesSpritesheet.textures[tile.tileID]
	}, [
		resourcepacks,
		tile,
	])

	return (
		<Sprite
			texture={texture}
			x={x * 16}
			y={y * 16} />
	)
}

PixiTileMapTile.propTypes = {
	tile: PropTypes.object.isRequired,
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
}
