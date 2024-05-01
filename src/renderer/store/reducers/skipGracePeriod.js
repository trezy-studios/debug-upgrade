// Local imports
import { store } from '../store.js'





/**
 * Skips the grace period timer.
 */
export function skipGracePeriod() {
	const {
		now,
		timerPathfindingStartedAt,
	} = store.state

	if (timerPathfindingStartedAt) {
		return
	}

	store.set(() => ({ timerPathfindingStartedAt: now }))
}
