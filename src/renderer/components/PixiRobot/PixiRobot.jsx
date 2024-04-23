// Module imports
import {
	AnimatedSprite,
	Container,
} from '@pixi/react'
import {
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { useStore } from 'statery'





// Local imports
import { store } from '../../store/store.js'
import { Vector2 } from '../../game/Vector2.js'





/**
 * Renders a robot.
 *
 * @component
 */
export function PixiRobot() {
	const {
		cameraOffset,
		currentPath,
		robotPixelPosition,
		robotPosition,
		spritesheetCache,
	} = useStore(store)

	const [currentDirection, setCurrentDirection] = useState('east')
	const spritesheet = spritesheetCache.get('robots::pushbot')

	const getTexture = useCallback(
		/**
		 * @param {string} state
		 * @param {string} direction
		 */
		(state, direction) => {
			const spriteKey = `${state}::${direction}`
			return spritesheet.animations[spriteKey] ?? [spritesheet.textures[spriteKey]]
		},
		[],
	)

	const currentState = useMemo(() => {
		if (currentPath?.length) {
			return 'move'
		}

		return 'idle'
	}, [currentPath])

	const filters = useMemo(() => [], [])

	const position = useMemo(() => new Vector2(
		(robotPixelPosition.x + cameraOffset.x) + 1,
		(robotPixelPosition.y + cameraOffset.y) - 2,
	), [
		cameraOffset,
		robotPixelPosition,
	])

	useEffect(() => {
		if (!currentPath?.length) {
			return
		}

		const nextSegment = new Vector2(currentPath[0].x, currentPath[0].y)
		const travelDirection = Vector2.subtract(nextSegment, robotPosition)

		if (travelDirection.x > 0) {
			setCurrentDirection('east')
		} else if (travelDirection.x < 0) {
			setCurrentDirection('west')
		} else if (travelDirection.y > 0) {
			setCurrentDirection('south')
		} else if (travelDirection.y < 0) {
			setCurrentDirection('north')
		}
	}, [currentPath])

	return (
		<Container
			filters={filters}
			x={position.x}
			y={position.y}>
			{['idle', 'move', 'push'].map(state => {
				return ['east', 'north', 'south', 'west'].map(direction => {
					return (
						<AnimatedSprite
							key={`${state}::${direction}`}
							animationSpeed={0.1666}
							isPlaying
							textures={getTexture(state, direction)}
							visible={(state === currentState) && (direction === currentDirection)} />
					)
				})
			})}
		</Container>
	)
}
