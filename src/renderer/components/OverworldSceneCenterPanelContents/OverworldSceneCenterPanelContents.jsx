// Module imports
import { motion } from 'framer-motion'





// Local imports
import styles from './OverworldSceneCenterPanelContents.module.scss'

import { Overworld } from '../Overworld/Overworld.jsx'





/**
 * Renders the contents of the center panel for the Title scene.
 *
 * @component
 */
export function OverworldSceneCenterPanelContents() {

	return (
		<motion.div
			className={styles['overworld-wrapper']}
			layout>
			<Overworld />
		</motion.div>
	)
}
