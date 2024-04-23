// Module imports
import { ColorOverlayFilter } from 'pixi-filters'
import PropTypes from 'prop-types'
import { Sprite } from '@pixi/react'
import { useMemo } from 'react'
import { useStore } from 'statery'





// Local imports
import { store } from '../../store/store.js'





// Constants
const BLOCKED_FILTER = new ColorOverlayFilter(0xff0000, 0.8)





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
		cursorPosition,
		resourcepacks,
	} = useStore(store)

	const filters = useMemo(() => {
		const result = []

		if (isCursor && currentMap.isBlockedAt(x + cursorPosition.x, y + cursorPosition.y)) {
			result.push(BLOCKED_FILTER)
		}

		return result
	}, [
		currentMap,
		cursorPosition,
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
