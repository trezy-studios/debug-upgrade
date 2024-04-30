// Local imports
import { store } from '../../store/store.js'
import { Vector2 } from '../Vector2.js'





/**
 * Calculates the current cell along an arbitrary axis based on the position and direction of the movement.
 *
 * @param {number} pixelPosition The pixel position along an axis.
 * @param {number} travelDirection The current direction of travel along the axis.
 * @returns {number} The axial position of the cell.
 */
function calculateAxialCell(pixelPosition, travelDirection) {
	if (travelDirection < 0) {
		return Math.ceil(pixelPosition / 16)
	} else {
		return Math.floor(pixelPosition / 16)
	}
}





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

		const patch = {
			totalMoves: totalMoves + 1,
		}

		let path = currentPath
		const nextPathSegmentVector = new Vector2(
			path[0].x,
			path[0].y,
		)

		if (Vector2.areEqual(robotPosition, nextPathSegmentVector)) {
			path = [...currentPath]
			path.shift()

			if (path.length) {
				patch.currentPath = path
			} else {
				patch.currentPath = null
				patch.robotPixelPosition = new Vector2(
					previousState.robotPosition.x * 16,
					previousState.robotPosition.y * 16,
				)
			}
		} else {
			const travelDirection = Vector2.direction(robotPosition, nextPathSegmentVector)
			const travelDistance = new Vector2(
				travelDirection.x * robotSpeed,
				travelDirection.y * robotSpeed,
			)
			const newRobotPixelPosition = Vector2.add(robotPixelPosition, travelDistance)

			const newRobotPosition = new Vector2(
				calculateAxialCell(newRobotPixelPosition.x, travelDirection.x),
				calculateAxialCell(newRobotPixelPosition.y, travelDirection.y),
			)

			patch.robotPosition = newRobotPosition
			patch.robotPixelPosition = newRobotPixelPosition
		}

		return patch
	})
}
