// Module imports
import { AnimatedSprite } from '@pixi/react'
import { useMemo } from 'react'
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
		robotPixelPosition,
		spritesheetCache,
	} = useStore(store)

	const direction = useMemo(() => 'east', [])
	const state = useMemo(() => 'idle', [])

	const filters = useMemo(() => [], [])

	const texture = useMemo(() => {
		const spritesheet = spritesheetCache.get('robots::pushbot')
		const spriteKey = `${state}::${direction}`
		return spritesheet.animations[spriteKey] ?? [spritesheet.textures[spriteKey]]
	}, [
		direction,
		spritesheetCache,
		state,
	])

	const position = useMemo(() => new Vector2(
		(robotPixelPosition.x + cameraOffset.x) + 1,
		(robotPixelPosition.y + cameraOffset.y) - 2,
	), [
		cameraOffset,
		robotPixelPosition,
	])

	return (
		<AnimatedSprite
			filters={filters}
			isPlaying
			textures={texture}
			x={position.x}
			y={position.y} />
	)
}
