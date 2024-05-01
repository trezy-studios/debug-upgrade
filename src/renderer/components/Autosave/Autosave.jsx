// Module imports
import {
	AnimatePresence,
	motion,
} from 'framer-motion'
import { useStore } from 'statery'





// Local imports
import styles from './Autosave.module.scss'

import { store } from '../../store/store.js'





// Constants
const VARIANTS = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
	},
}





/**
 * Handles autosave and renders the indicator when a save is in progress.
 *
 * @component
 */
export function Autosave() {
	const { isSaving } = useStore(store)

	return (
		<AnimatePresence mode={'wait'}>
			{isSaving && (
				<motion.div
					animate={'visible'}
					className={styles['autosave']}
					exit={'hidden'}
					initial={'hidden'}
					variants={VARIANTS} />
			)}
		</AnimatePresence>
	)
}
