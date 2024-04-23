// Module imports
import { Container } from '@pixi/react'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useStore } from 'statery'





// Local imports
import { parseCoordinateString } from '../../helpers/parseCoordinateString.js'
import { PixiTileMapTile } from '../PixiTileMapTile/PixiTileMapTile.jsx'
import { store } from '../../store/store.js'
import { Vector2 } from '../../game/Vector2.js'





/**
 * Renders a tilemap.
 *
 * @component
 * @param {object} props All props
 * @param {boolean} [props.isCursor] Whether this tilemap is being used as a cursor.
 * @param {Map<string, Set<import('../../../types/TileMapData.js').TileConfig>>} props.tilestacks The tilestacks to be rendered.
 */
export function PixiTileMap({
	isCursor = false,
	tilestacks,
}) {
	const {
		cameraOffset,
		cursorPosition,
	} = useStore(store)

	const alpha = useMemo(() => {
		if (isCursor) {
			return 0.7
		}

		return 1
	}, [isCursor])

	const renderedTilestacks = useMemo(() => {
		const result = []

		for (const [coordinateString, tilestack] of tilestacks) {
			let index = 0

			for (const tile of tilestack) {
				const [x, y] = parseCoordinateString(coordinateString)

				result.push((
					<PixiTileMapTile
						key={`${coordinateString}::${index}`}
						isCursor={isCursor}
						tile={tile}
						x={x}
						y={y} />
				))

				index += 1
			}
		}

		return result
	}, [
		isCursor,
		tilestacks,
	])

	const position = useMemo(() => {
		let result = new Vector2(
			cameraOffset.x,
			cameraOffset.y,
		)

		if (isCursor) {
			result = Vector2.add(result, new Vector2(
				cursorPosition.x * 16,
				cursorPosition.y * 16,
			))
		}

		return result
	}, [
		cameraOffset,
		cursorPosition,
		isCursor,
	])

	return (
		<Container
			alpha={alpha}
			x={position.x}
			y={position.y}>
			{renderedTilestacks}
		</Container>
	)
}

PixiTileMap.propTypes = {
	isCursor: PropTypes.bool,
	tilestacks: PropTypes.instanceOf(Map).isRequired,
}
