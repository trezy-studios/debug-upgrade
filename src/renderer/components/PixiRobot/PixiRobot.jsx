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
		robotPosition,
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
		((robotPosition.x * 16) + cameraOffset.x) + 1,
		((robotPosition.y * 16) + cameraOffset.y) - 2,
	), [
		cameraOffset,
		robotPosition,
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
