// Module imports
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { useStore } from 'statery'





// Local imports
import styles from './TileQueueVisualiser.module.scss'

import { DecoratedHeader } from '../DecoratedHeader/DecoratedHeader.jsx'
import { store } from '../../store/store.js'
import { TileMapVisualiser } from '../TileMapVisualiser/TileMapVisualiser.jsx'





// Constants
const VARIANTS = {
	hidden: {
		opacity: 0,
		x: -100,
	},
	visible: {
		opacity: 1,
		x: 0,
	},
}





/**
 * Renders the items in the tile queue.
 *
 * @component
 */
export function TileQueueVisualiser() {
	const {
		currentMap,
		currentQueueIndex,
	} = useStore(store)

	const renderedQueue = useMemo(() => {
		if (!currentMap.queue.length) {
			return (
				<motion.span
					animate={'visible'}
					exit={'hidden'}
					initial={'hidden'}
					variants={VARIANTS}>
					{'Queue is empty.'}
				</motion.span>
			)
		}

		return currentMap.queue.map((tilemap, index) => {
			const realIndex = currentQueueIndex + index

			return (
				<motion.div
					key={`${currentMap.id}::${realIndex}`}
					animate={'visible'}
					exit={'hidden'}
					initial={'hidden'}
					layoutId={`${currentMap.id}::${realIndex}`}
					variants={VARIANTS}>
					<span>
						{(index === 0) && 'Current'}
						{(index === 1) && 'Next'}
					</span>

					<TileMapVisualiser tilemap={tilemap} />
				</motion.div>
			)
		})
	}, [
		currentMap,
		currentQueueIndex,
	])

	return (
		<motion.div
			className={styles['tile-queue-visualiser']}
			layout>
			<DecoratedHeader>{'Queue'}</DecoratedHeader>

			{renderedQueue}
		</motion.div>
	)
}
