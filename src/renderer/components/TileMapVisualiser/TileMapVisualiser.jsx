// Module imports
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useStore } from 'statery'





// Local imports
import styles from './TileMapVisualiser.module.scss'

import { store } from '../../store/store.js'
import { TileMap } from '../../game/TileMap.js'
import { Vector2 } from '../../game/Vector2.js'





/**
 * Renders the items in the tile queue.
 *
 * @param {Object} props All props.
 * @param {TileMap} props.tilemap The tilemap to be rendered.
 */
export function TileMapVisualiser({ tilemap }) {
	const {
		resourcepacks,
		uiScale,
	} = useStore(store)

	const compiledStyles = useMemo(() => ({
		height: tilemap.height * 16 * uiScale,
		width: tilemap.width * 16 * uiScale,
	}), [])

	const renderedTilestacks = useMemo(() => {
		let result = []

		for (const [coordinateString, tilestack] of tilemap.tilestacks) {
			const position = Vector2.fromString(coordinateString)
			const elementStack = []
			result.push(elementStack)

			let tileIndex = 0

			for (const tile of tilestack) {
				const resourcepack = resourcepacks.get(tile.resourcepackID)
				const texture = resourcepack.tilesSpritesheet.textures[tile.tileID]
				const baseImage = texture.baseTexture.resource

				// @ts-expect-error Actually yes it DOES exist, Typescript. It's just not declared. 🤷🏻‍♂️
				const baseImageURL = /** @type {string} */ (baseImage.url)

				elementStack.push((
					<div
						key={`${coordinateString}::${tileIndex}`}
						className={styles['tile']}
						style={{
							backgroundImage: `url(${baseImageURL})`,
							backgroundPositionX: -texture.frame.x,
							backgroundPositionY: -texture.frame.y,
							left: `${position.x * 16}px`,
							height: texture.frame.height,
							width: texture.frame.width,
						}} />
				))

				tileIndex += 1
			}
		}

		return (
			<div
				className={styles['tilemap']}>
				{result}
			</div>
		)
	}, [
		resourcepacks,
		tilemap,
	])

	return (
		<motion.div
			className={styles['tilemap-visualiser']}
			style={compiledStyles}>
			{renderedTilestacks}
		</motion.div>
	)
}

TileMapVisualiser.propTypes = {
	tilemap: PropTypes.instanceOf(TileMap).isRequired,
}
