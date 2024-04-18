// Module imports
import { ColorOverlayFilter } from 'pixi-filters'
import PropTypes from 'prop-types'
import { Sprite } from '@pixi/react'
import { useMemo } from 'react'
import { useStore } from 'statery'





// Local imports
import { store } from '../../store/store.js'





// Constants
const BlockedFilter = new ColorOverlayFilter(0xff0000, 0.8)





/**
 * Renders a tilemap.
 *
 * @component
 */
export function PixiTileMapTile({
	isCursor = false,
	tile,
	x,
	y,
}) {
	const {
		currentMap,
		cursorX,
		cursorY,
		resourcepacks,
	} = useStore(store)

	const filters = useMemo(() => {
		if (isCursor && currentMap.isBlockedAt(x + cursorX, y + cursorY)) {
			return [BlockedFilter]
		}

		return []
	}, [
		currentMap,
		cursorX,
		cursorY,
		isCursor,
	])

	const texture = useMemo(() => resourcepacks.get(tile.resourcepackID).tilesSpritesheet.textures[tile.tileID], [
		resourcepacks,
		tile,
	])

	return (
		<Sprite
			filters={filters}
			texture={texture}
			x={x * 16}
			y={y * 16} />
	)
}

PixiTileMapTile.propTypes = {
	isCursor: PropTypes.bool,
	tile: PropTypes.object.isRequired,
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
}
