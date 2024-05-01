// Module imports
import {
	useCallback,
	useMemo,
} from 'react'
import { Filter } from 'pixi.js'
import { Graphics } from '@pixi/react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import { useStore } from 'statery'





// Local imports
import { getCSSCustomPropertyValue } from '../../helpers/getCSSCustomPropertyValue.js'
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
		cameraOffset,
		resolution,
		stageHeight,
		stageWidth,
		uiScale,
	} = useStore(store)

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
	])

	const uniforms = useMemo(() => {
		const purple = /** @type {string} */ (getCSSCustomPropertyValue('palette-purple'))
		const parsedLineColorRGB = tinycolor(purple).toRgb()

		return {
			uLineColor: [
				parsedLineColorRGB.r / 255,
				parsedLineColorRGB.g / 255,
				parsedLineColorRGB.b / 255,
				lineAlpha,
			],
			uLineThickness: lineThickness,
			uOffset: [
				cameraOffset.x * resolution * uiScale,
				cameraOffset.y * resolution * uiScale,
			],
			uPitch: [
				pitch.x * resolution,
				pitch.y * resolution,
			],
			uScale: uiScale,
			uStageHeight: gridHeight,
			uStageWidth: gridWidth,
		}
	}, [
		gridHeight,
		gridWidth,
		lineAlpha,
		lineThickness,
		cameraOffset,
		pitch.x,
		pitch.y,
		resolution,
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
