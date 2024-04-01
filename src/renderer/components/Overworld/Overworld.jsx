// Module imports
import {
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { motion } from 'framer-motion'





// Local imports
import styles from './Overworld.module.scss'

import { LEVEL_LAYOUT } from '../../data/LEVEL_LAYOUT.js'
import { OverworldBlock } from '../OverworldBlock/OverworldBlock.jsx'
import { OverworldSection } from '../OverworldSection/OverworldSection.jsx'





// Constants
/** @type {import('../../../types/OverworldBlock.js').OverworldBlock} */
const OVERWORLD_BLOCK_DATA = {
	links: [],
	name: 'Router',
	position: {
		x: 240,
		y: 112,
	},
	type: 'router',
}
const VARIANTS = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
	},
}





/**
 * Renders the Overworld.
 *
 * @component
 */
export function Overworld() {
	const overworldRef = useRef(null)

	const [dragConstraints, setDragConstraints] = useState({
		bottom: 0,
		left: 0,
		right: 0,
		top: 0,
	})

	const mappedLayout = useMemo(() => {
		return Object
			.entries(LEVEL_LAYOUT)
			.map(([sectionName, sectionData]) => (
				<OverworldSection
					key={sectionName}
					data={sectionData}
					name={sectionName} />
			))
	}, [])

	useEffect(() => {
		const overworldElement = /** @type {HTMLDivElement} **/ (overworldRef.current)
		if (overworldElement) {
			const horizontalTravelDistance = Math.max(
				(overworldElement.parentElement.offsetWidth / 2) - (overworldElement.offsetWidth / 2),
				(overworldElement.offsetWidth / 2),
			)
			const verticalTravelDistance = Math.max(
				(overworldElement.parentElement.offsetHeight / 2) - (overworldElement.offsetHeight / 2),
				(overworldElement.offsetHeight / 2),
			)

			setDragConstraints({
				bottom: verticalTravelDistance,
				left: -horizontalTravelDistance,
				right: horizontalTravelDistance,
				top: -verticalTravelDistance,
			})
		}
	}, [setDragConstraints])

	console.log(dragConstraints)

	return (
		<motion.div
			ref={overworldRef}
			animate={'visible'}
			className={styles['overworld']}
			drag
			dragConstraints={dragConstraints}
			exit={'hidden'}
			initial={'hidden'}
			variants={VARIANTS}>
			{mappedLayout}
			<OverworldBlock block={OVERWORLD_BLOCK_DATA} />
		</motion.div>
	)
}
