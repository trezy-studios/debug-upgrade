// Module imports
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { useStore } from 'statery'





// Local imports
import styles from './EndOfRoundScreen.module.scss'

import { DecoratedHeader } from '../DecoratedHeader/DecoratedHeader.jsx'
import { store } from '../../store/store.js'





// Constants
const HEADER_VARIANTS = {
	hidden: { y: -100 },
	visible: { y: 0 },
}
const LABEL_VARIANTS = {
	hidden: { x: -100 },
	visible: { x: 0 },
}
const SCORE_VARIANTS = {
	hidden: { x: 100 },
	visible: { x: 0 },
}
const TOTAL_VARIANTS = {
	hidden: { y: 100 },
	visible: { y: 0 },
}
const WRAPPER_VARIANTS = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
}





/**
 * Renders the end of round sceen.
 *
 * @component
 */
export function EndOfRoundScreen() {
	const {
		currentMap,
		isVictorious,
		timerGracePeriod,
		timerPathfindingStartedAt,
		timerStartedAt,
		totalMoves,
	} = useStore(store)

	const {
		blockingTilesBonus,
		earlyStartBonus,
		pathBonus,
		timeBonus,
		unusedTilesBonus,
	} = useMemo(() => {
		if (!isVictorious) {
			return {}
		}

		const timeToFinish = timerPathfindingStartedAt - timerStartedAt
		const gracePeriodRemaining = timerGracePeriod - timeToFinish

		return {
			blockingTilesBonus: 0,
			earlyStartBonus: Math.floor(Math.max(gracePeriodRemaining, 0)),
			pathBonus: Math.floor((192 / totalMoves) * 1000),
			timeBonus: Math.floor(60000 / Math.abs(gracePeriodRemaining)) * 100,
			unusedTilesBonus: (currentMap.queue?.length ?? 0) * 1000,
		}
	}, [
		isVictorious,
		timerGracePeriod,
		timerPathfindingStartedAt,
		timerStartedAt,
		totalMoves,
	])

	if (!isVictorious) {
		return null
	}

	return (
		<motion.div
			animate={'visible'}
			className={styles['end-of-round-wrapper']}
			exit={'hidden'}
			initial={'hidden'}
			variants={WRAPPER_VARIANTS}>
			<div className={styles['end-of-round']}>
				<motion.div
					animate={'visible'}
					exit={'hidden'}
					initial={'hidden'}
					variants={HEADER_VARIANTS}>
					<DecoratedHeader>
						{'Victory!'}
					</DecoratedHeader>
				</motion.div>

				<dl>
						<motion.dt
							animate={'visible'}
							exit={'hidden'}
							initial={'hidden'}
							variants={LABEL_VARIANTS}>
							{'Early Start'}
						</motion.dt>
						<motion.dd
							animate={'visible'}
							exit={'hidden'}
							initial={'hidden'}
							variants={SCORE_VARIANTS}>
							{`+${earlyStartBonus}`}
						</motion.dd>

						<motion.dt
							animate={'visible'}
							exit={'hidden'}
							initial={'hidden'}
							variants={LABEL_VARIANTS}>
							{'Path Bonus'}
						</motion.dt>
						<motion.dd
							animate={'visible'}
							exit={'hidden'}
							initial={'hidden'}
							variants={SCORE_VARIANTS}>
							{`+${pathBonus}`}
						</motion.dd>

						<motion.dt
							animate={'visible'}
							exit={'hidden'}
							initial={'hidden'}
							variants={LABEL_VARIANTS}>
							{'Time Bonus'}
						</motion.dt>
						<motion.dd
							animate={'visible'}
							exit={'hidden'}
							initial={'hidden'}
							variants={SCORE_VARIANTS}>
							{`+${timeBonus}`}
						</motion.dd>

						<motion.dt
							animate={'visible'}
							exit={'hidden'}
							initial={'hidden'}
							variants={LABEL_VARIANTS}>
							{'Unused Tiles'}
						</motion.dt>
						<motion.dd
							animate={'visible'}
							exit={'hidden'}
							initial={'hidden'}
							variants={SCORE_VARIANTS}>
							{`+${unusedTilesBonus}`}
						</motion.dd>

						<motion.dt
							animate={'visible'}
							exit={'hidden'}
							initial={'hidden'}
							variants={LABEL_VARIANTS}>
							{'Blocking Tiles'}
						</motion.dt>
						<motion.dd
							animate={'visible'}
							exit={'hidden'}
							initial={'hidden'}
							variants={SCORE_VARIANTS}>
							{`+${blockingTilesBonus}`}
						</motion.dd>
					</dl>

					<motion.div
						animate={'visible'}
						className={styles['total']}
						exit={'hidden'}
						initial={'hidden'}
						variants={TOTAL_VARIANTS}>
						<div>{'Total'}</div>
						<div>{earlyStartBonus + pathBonus + timeBonus + unusedTilesBonus + blockingTilesBonus}</div>
					</motion.div>
				</div>
		</motion.div>
	)
}
