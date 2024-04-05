// Module imports
import { motion } from 'framer-motion'
import { useRef } from 'react'





// Local imports
import styles from './OverworldSceneCenterPanelContents.module.scss'

import { PixiOverworld } from '../PixiOverworld/PixiOverworld.jsx'
import { PixiStage } from '../PixiStage/PixiStage.jsx'





/**
 * Renders the contents of the center panel for the Title scene.
 *
 * @component
 */
export function OverworldSceneCenterPanelContents() {
	const overworldWrapperRef = useRef(null)

	return (
		<motion.div
			ref={overworldWrapperRef}
			className={styles['overworld-wrapper']}
			layout>
			<PixiStage resizeToRef={overworldWrapperRef}>
				<PixiOverworld />
			</PixiStage>
		</motion.div>
	)
}
