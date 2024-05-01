// Module imports
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useStore } from 'statery'





// Local imports
import styles from './TileMapVisualiser.module.scss'

import { store } from '../../store/store.js'
import { TileMap } from '../../game/TileMap.js'
import { TileMapVisualiserTile } from '../TileMapVisualiserTile/TileMapVisualiserTile.jsx'
import { Vector2 } from '../../game/Vector2.js'





/**
 * Renders the items in the tile queue.
 *
 * @component
 * @param {object} props All props.
 * @param {TileMap} props.tilemap The tilemap to be rendered.
 */
export function TileMapVisualiser({ tilemap }) {
	const { uiScale } = useStore(store)

	const compiledStyles = useMemo(() => ({
		height: tilemap.height * 16 * uiScale,
		width: tilemap.width * 16 * uiScale,
	}), [
		tilemap,
		uiScale,
	])

	const renderedTilestacks = useMemo(() => {
		const result = []

		for (const [coordinateString, tilestack] of tilemap.tilestacks) {
			const position = Vector2.fromString(coordinateString)
			const elementStack = []
			result.push(elementStack)

			let tileIndex = 0

			for (const tile of tilestack) {
				elementStack.push((
					<TileMapVisualiserTile
						key={`${coordinateString}::${tileIndex}`}
						position={position}
						tile={tile} />
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
	}, [tilemap])

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
