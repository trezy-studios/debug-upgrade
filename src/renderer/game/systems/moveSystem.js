// Local imports
import { store } from '../../store/store.js'
import { Vector2 } from '../Vector2.js'





/** Moves the robot. */
export function moveSystem() {
	const { currentPath } = store.state

	if (!currentPath) {
		return
	}

	if (!currentPath.length) {
		store.set(() => ({ currentPath: null }))
		return
	}

	store.set(previousState => {
		const {
			robotPixelPosition,
			robotPosition,
			robotSpeed,
			totalMoves,
		} = previousState

		let path = currentPath
		let nextPathSegment = path[0]
		let nextPathSegmentVector = new Vector2(
			nextPathSegment.x,
			nextPathSegment.y,
		)

		if (Vector2.areEqual(robotPosition, nextPathSegmentVector)) {
			path = [...currentPath]
			path.shift()
			nextPathSegment = path[0]

			if (nextPathSegment) {
				return {
					totalMoves: totalMoves + 1,
					currentPath: path,
				}
			}

			return {
				robotPixelPosition: new Vector2(
					previousState.robotPosition.x * 16,
					previousState.robotPosition.y * 16,
				),
				totalMoves: totalMoves + 1,
				currentPath: null,
			}
		}

		const travelDirection = Vector2.subtract(nextPathSegmentVector, robotPosition)
		const travelDistance = new Vector2(
			travelDirection.x * robotSpeed,
			travelDirection.y * robotSpeed,
		)
		const newRobotPixelPosition = Vector2.add(robotPixelPosition, travelDistance)
		const newRobotPosition = new Vector2(
			Math.floor(newRobotPixelPosition.x / 16),
			Math.floor(newRobotPixelPosition.y / 16),
		)

		return {
			robotPosition: newRobotPosition,
			robotPixelPosition: newRobotPixelPosition,
			totalMoves: previousState.totalMoves + 1,
			currentPath: path,
		}
	})
}
