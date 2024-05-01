// Module imports
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useStore } from 'statery'





// Local imports
import styles from './TileMapVisualiserTile.module.scss'

import { store } from '../../store/store.js'
import { Vector2 } from '../../game/Vector2.js'





/**
 * Renders the items in the tile queue.
 *
 * @component
 * @param {object} props All props.
 * @param {Vector2} props.position The vector position of the tile.
 * @param {import('../../../types/TileConfig.js').TileConfig} props.tile The tile data.
 */
export function TileMapVisualiserTile({
	position,
	tile,
}) {
	const { resourcepacks } = useStore(store)

	const resourcepack = resourcepacks.get(tile.resourcepackID)
	const texture = resourcepack.tilesSpritesheet.textures[tile.tileID]
	const baseImage = texture.baseTexture.resource

	// @ts-expect-error Actually yes it DOES exist, Typescript. It's just not declared. 🤷🏻‍♂️
	const baseImageURL = /** @type {string} */ (baseImage.url)

	const cmopiledStyles = useMemo(() => ({
		backgroundImage: `url(${baseImageURL})`,
		backgroundPositionX: -texture.frame.x,
		backgroundPositionY: -texture.frame.y,
		left: `${position.x * 16}px`,
		height: texture.frame.height,
		width: texture.frame.width,
	}), [
		baseImageURL,
		position,
		texture,
	])

	return (
		<div
			className={styles['tile']}
			style={cmopiledStyles} />
	)
}

TileMapVisualiserTile.propTypes = {
	position: PropTypes.instanceOf(Vector2).isRequired,
	tile: PropTypes.object.isRequired,
}
