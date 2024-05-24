// Module imports
import {
	Assets,
	Filter,
} from 'pixi.js'
import {
	Container,
	Sprite,
	useTick,
} from '@pixi/react'
import {
 useEffect, useMemo,
 useRef,
} from 'react'
import tinycolor from 'tinycolor2'
import { useStore } from 'statery'





// Local imports
import {
	blockFogmapIdsToReveal, resetLevelToReveal,
 } from '../../store/reducers/lastLevelCompleted.js'
import { isBlockVisible } from '../../store/reducers/isBlockVisible.js'
import { LEVEL_LAYOUT } from '../../data/LEVEL_LAYOUT.js'
import { PixiOverworldRouter } from '../PixiOverworldRouter/PixiOverworldRouter.jsx'
import { PixiOverworldSection } from '../PixiOverworldSection/PixiOverworldSection.jsx'
import shader from '../../shaders/OverworldFog.glsl'
import { store } from '../../store/store.js'





/**
 * Renders the overworld.
 *
 * @component
 */
export function PixiOverworld() {
	const {
		cameraOffset,
		palette,
		resolution,
		stageHeight,
		stageWidth,
		uiScale,
		levelToReveal,
	} = useStore(store)

	const uTime = useRef(0)

	const ANIMATION_DURATION = 1_000

	const fogmapBlocksToUnhide = useMemo(() => {
		const visibleBlocks = Object
			.values(LEVEL_LAYOUT.blocks)
			.filter(blockData => isBlockVisible(blockData.name))

		return Array.from(new Set(visibleBlocks.map(blockData => blockData.fogmap || 0)).values())
	}, [])

	const animatedBlockIds = useMemo(() => {
		return blockFogmapIdsToReveal()
	}, [levelToReveal])

	useEffect(() => {
		let timeout
		if (animatedBlockIds.length) {
			timeout = setTimeout(() => resetLevelToReveal(), ANIMATION_DURATION)
		}
		return () => {
			if (timeout) {
				clearTimeout(timeout)
			}
		}
	}, [animatedBlockIds])

	const overworldTexture = useMemo(() => Assets.get('overworld::background'), [])
	const overworldFogMap = useMemo(() => Assets.get('overworld::fogmap'), [])

	const {
		scaledStageHeight,
		scaledStageWidth,
	} = useMemo(() => ({
		scaledStageWidth: stageWidth * resolution,
		scaledStageHeight: stageHeight * resolution,
	}), [
		resolution,
		stageHeight,
		stageWidth,
	])

	const mappedLayout = useMemo(() => {
		return Object.values(LEVEL_LAYOUT.sections).map(sectionData => (
			<PixiOverworldSection
				key={sectionData.name}
				data={sectionData} />
		))
	}, [])

	const uniforms = useMemo(() => {
		const color = tinycolor(palette.get('black')).toRgb()
		const uFogColor = new Uint8Array(4)
		uFogColor[0] = color.r
		uFogColor[1] = color.g
		uFogColor[2] = color.b
		uFogColor[3] = 255

		const uFogmapBlocksToUnhide = new Uint8Array(64)

		let blockIndex = 0

		while (blockIndex < 64) {
			uFogmapBlocksToUnhide[blockIndex] = fogmapBlocksToUnhide[blockIndex] ?? 0
			blockIndex += 1
		}

		return {
			uFogColor,
			uTime: uTime.current,
			uFogMap: overworldFogMap,
			uScale: uiScale,
			uStageHeight: scaledStageHeight,
			uStageWidth: scaledStageWidth,
			uFogmapBlocksToUnhide: fogmapBlocksToUnhide,
			uAnimationDuration: ANIMATION_DURATION,
			uAnimatedBlockIds: animatedBlockIds,
		}
	}, [
		fogmapBlocksToUnhide,
		overworldFogMap,
		palette,
		scaledStageHeight,
		scaledStageWidth,
		uiScale,
		ANIMATION_DURATION,
		animatedBlockIds,
	])


	const filters = useMemo(() => {
		const filter = new Filter(null, shader, uniforms)
		filter.autoFit = false
		return [filter]
	}, [uniforms])

	// For animation
	useTick((_, { deltaMS }) => {
		// prevent overflow in shader
		const overlayFogFilter = filters[0]
		uTime.current += deltaMS
		overlayFogFilter.uniforms.uTime = uTime.current
	})

	return (
		<Container
			filters={filters}
			x={cameraOffset.x}
			y={cameraOffset.y}>
			<Sprite
				name={'background'}
				texture={overworldTexture} />

			{mappedLayout}

			<PixiOverworldRouter />
		</Container>
	)
}
