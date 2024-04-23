// Module imports
import { aStar } from 'ngraph.path'





// Local imports
import { store } from '../../store/store.js'
import { Vector2 } from '../Vector2.js'





/** Handles pathfinding for the robot. */
export function pathfindingSystem() {
	const {
		currentMap,
		now,
		robotDestination,
		robotPosition,
		timerGracePeriod,
		timerPathfindingStartedAt,
		timerStartedAt,
	} = store.state

	if (!timerPathfindingStartedAt) {
		if (now > (timerStartedAt + timerGracePeriod)) {
			store.set(() => ({ timerPathfindingStartedAt: now }))
		} else {
			return
		}
	}

	if ((robotDestination === null) || Vector2.areEqual(robotPosition, robotDestination)) {
		const {
			destination: newDestination,
		} = currentMap.destinations.reduce((accumulator, destination) => {
			const magnitude = Vector2.magnitude(robotPosition, destination)

			if (magnitude < accumulator.magnitude) {
				return {
					destination,
					magnitude,
				}
			}

			return accumulator
		}, {
			destination: null,
			magnitude: Infinity,
		})

		const newPath = aStar(currentMap.graph)
			.find(
				newDestination.toString(),
				robotPosition.toString(),
			)
			.map(node => node.data.position)

		if (newPath.length) {
			store.set(() => ({
				robotDestination: newDestination,
				currentPath: newPath,
			}))
		}
	}
}
