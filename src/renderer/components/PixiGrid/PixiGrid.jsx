// Module imports
import {
	Graphics,
	useApp,
} from '@pixi/react'
import {
	useCallback,
	useMemo,
} from 'react'
import { Filter } from 'pixi.js'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import { useStore } from 'statery'





// Local imports
// @ts-expect-error This file exists, I've just gotta figure out how to get Typescript to not bitch about glsl files.
import shader from '../../shaders/LevelGrid.glsl'
import { store } from '../../store/store.js'





// Constants
const DEFAULT_PITCH = {
	x: 16,
	y: 16,
}





/**
 * Renders a tilemap.
 *
 * @component
 */
export function PixiGrid({
	lineAlpha = 1,
	lineThickness = 2,
	pitch = DEFAULT_PITCH,
}) {
	const {
		cameraOffsetX,
		cameraOffsetY,
		resolution,
		stageHeight,
		stageWidth,
		uiScale,
	} = useStore(store)

	const pixiApp = useApp()

	const parsedLineColor = useMemo(() => tinycolor('#30346d'), [])

	const {
		gridHeight,
		gridWidth,
	} = useMemo(() => ({
		gridWidth: stageWidth * resolution,
		gridHeight: stageHeight * resolution,
	}), [
		resolution,
		stageHeight,
		stageWidth,
		uiScale,
	])

	const uniforms = useMemo(() => {
		const parsedLineColorRGB = parsedLineColor.toRgb()

		return {
			lineColor: [
				parsedLineColorRGB.r / 255,
				parsedLineColorRGB.g / 255,
				parsedLineColorRGB.b / 255,
				lineAlpha,
			],
			offset: [
				cameraOffsetX * resolution * uiScale,
				cameraOffsetY * resolution * uiScale,
			],
			pitch: [
				pitch.x * resolution,
				pitch.y * resolution,
			],
			thickness: lineThickness,
			uiScale,
			viewportHeight: gridHeight,
			viewportWidth: gridWidth,
		}
	}, [
		gridHeight,
		gridWidth,
		lineAlpha,
		lineThickness,
		parsedLineColor,
		cameraOffsetX,
		cameraOffsetY,
		pitch.x,
		pitch.y,
		pixiApp,
		uiScale,
	])

	const filters = useMemo(() => [new Filter(null, shader, uniforms)], [uniforms])

  const draw = useCallback(
		/**
		 * @param {import('pixi.js').Graphics} graphics The graphics object to be manipulated.
		 */
		graphics => {
			graphics.clear()
			graphics.beginFill('#140c1c')
			graphics.drawRect(0, 0, gridWidth, gridHeight)
			graphics.filters = filters
		},
		[
			filters,
			gridHeight,
			gridWidth,
		],
	)

	return (
		<Graphics draw={draw} />
	)
}

PixiGrid.propTypes = {
  lineAlpha: PropTypes.number,
  lineThickness: PropTypes.number,
  pitch: PropTypes.shape({
		x: PropTypes.number,
		y: PropTypes.number,
	}),
}
