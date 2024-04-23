// Module imports
import { AnimatedSprite } from '@pixi/react'
import { useMemo } from 'react'
import { useStore } from 'statery'





// Local imports
import { store } from '../../store/store.js'





/**
 * Renders a robot.
 *
 * @component
 */
export function PixiRobot() {
	const {
		cameraOffsetX,
		cameraOffsetY,
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

	const x = useMemo(() => ((robotPosition.x * 16) + cameraOffsetX) + 1, [
		cameraOffsetX,
		robotPosition.x,
	])

	const y = useMemo(() => ((robotPosition.y * 16) + cameraOffsetY) - 2, [
		cameraOffsetY,
		robotPosition.y,
	])

	return (
		<AnimatedSprite
			filters={filters}
			isPlaying
			textures={texture}
			x={x}
			y={y} />
	)
}
