// Module imports
import {
	Assets,
	// BaseTexture,
	// BufferResource,
	// Filter,
	// Texture,
	// WRAP_MODES,
} from 'pixi.js'
import {
	Container,
	Sprite,
} from '@pixi/react'
// import tinycolor from 'tinycolor2'
import { useMemo } from 'react'
import { useStore } from 'statery'





// Local imports
import { isBlockVisible } from '../../store/reducers/isBlockVisible.js'
import { LEVEL_LAYOUT } from '../../data/LEVEL_LAYOUT.js'
import { PixiOverworldRouter } from '../PixiOverworldRouter/PixiOverworldRouter.jsx'
import { PixiOverworldSection } from '../PixiOverworldSection/PixiOverworldSection.jsx'
// @ts-expect-error This file exists, I've just gotta figure out how to get Typescript to not bitch about glsl files.
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
		// resolution,
		// stageHeight,
		// stageWidth,
		// uiScale,
	} = useStore(store)

	const blocksToRender = useMemo(() => {
		return Object
			.values(LEVEL_LAYOUT.blocks)
			.filter(blockData => isBlockVisible(blockData.name))
	}, [])

	// const pointsTexture = useMemo(() => {
	// 	// const data = new Uint8Array(blocksToRender.length * 4)

	// 	// blocksToRender.map((blockData, index) => {
	// 	// 	let x = blockData.position.x
	// 	// 	let y = blockData.position.y

	// 	// 	if (blockData.section) {
	// 	// 		const sectionData = LEVEL_LAYOUT.sections[blockData.section]
	// 	// 		x += sectionData.position.x
	// 	// 		y += sectionData.position.y
	// 	// 	}

	// 	// 	const scaledX = x * uiScale
	// 	// 	const scaledY = y * uiScale

	// 	// 	const normalizedX = scaledX / stageWidth
	// 	// 	const normalizedY = scaledY / stageHeight

	// 	// 	const dataIndex = index * 4
	// 	// 	data[dataIndex] = normalizedX * 255
	// 	// 	data[dataIndex + 1] = normalizedY * 255
	// 	// 	data[dataIndex + 2] = 0
	// 	// 	data[dataIndex + 3] = 255
	// 	// })

	// 	// const buffer = new BufferResource(data, {
	// 	// 	height: 1,
	// 	// 	width: blocksToRender.length,
	// 	// })

	// 	const data = new Uint8Array(8)
	// 	data[0] = (16 / (stageWidth / resolution)) * 255
	// 	data[1] = (16 / (stageHeight / resolution)) * 255
	// 	data[2] = 0
	// 	data[3] = 255

	// 	// data[4] = ((32 * uiScale) / stageWidth) * 255
	// 	// data[5] = ((32 * uiScale) / stageHeight) * 255
	// 	// data[6] = 0
	// 	// data[7] = 255

	// 	console.log({data})

	// 	const buffer = new BufferResource(data, {
	// 		height: 1,
	// 		width: 2,
	// 	})

	// 	// Create PIXI texture from data
	// 	const baseTexture = new BaseTexture(buffer, { wrapMode: WRAP_MODES.CLAMP })

	// 	return new Texture(baseTexture)
	// }, [
	// 	blocksToRender,
	// 	stageHeight,
	// 	stageWidth,
	// ])

	const texture = useMemo(() => Assets.get('overworld::background'), [])

	// const {
	// 	scaledStageHeight,
	// 	scaledStageWidth,
	// } = useMemo(() => ({
	// 	scaledStageWidth: stageWidth * resolution,
	// 	scaledStageHeight: stageHeight * resolution,
	// }), [
	// 	resolution,
	// 	stageHeight,
	// 	stageWidth,
	// 	uiScale,
	// ])

	const mappedLayout = useMemo(() => {
		return Object
			.values(LEVEL_LAYOUT.sections)
			.map(sectionData => (
				<PixiOverworldSection
					key={sectionData.name}
					data={sectionData} />
			))
	}, [])

	// const uniforms = useMemo(() => {
	// 	// const color = tinycolor('#30346d').toRgb()
	// 	const color = tinycolor('red').toRgb()
	// 	const radius = 2

	// 	const uFogColor = new Uint8Array(4)

	// 	uFogColor[0] = color.r / 255
	// 	uFogColor[1] = color.g / 255
	// 	uFogColor[2] = color.b / 255
	// 	uFogColor[3] = 1

	// 	return {
	// 		uFogColor,
	// 		uOffset: [
	// 			cameraOffsetX, // * resolution * uiScale,
	// 			cameraOffsetY, // * resolution * uiScale,
	// 		],
	// 		uPointsCount: 2, //blocksToRender.length,
	// 		uPointsTexture: pointsTexture,
	// 		uRadius: [
	// 			radius / stageWidth,
	// 			radius / stageHeight,
	// 		],
	// 		uScale: uiScale,
	// 		uStageHeight: scaledStageHeight,
	// 		uStageWidth: scaledStageWidth,
	// 	}
	// }, [
	// 	blocksToRender,
	// 	cameraOffsetX,
	// 	cameraOffsetY,
	// 	scaledStageHeight,
	// 	scaledStageWidth,
	// 	pointsTexture,
	// 	resolution,
	// 	uiScale,
	// ])

	// const filters = useMemo(() => [new Filter(null, shader, uniforms)], [uniforms])

	return (
		<Container
			// filters={filters}
			x={cameraOffset.x}
			y={cameraOffset.y}>
			{/* <Sprite
				name={'pointsTexture'}
				scale={10}
				texture={pointsTexture} /> */}
			<Sprite
				name={'background'}
				texture={texture} />

			{mappedLayout}

			<PixiOverworldRouter />
		</Container>
	)
}
