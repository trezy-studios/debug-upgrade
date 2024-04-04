// Module imports
import {
	Container,
	Sprite,
	useApp,
} from '@pixi/react'
import {
	useLayoutEffect,
	useMemo,
} from 'react'
import { Assets } from 'pixi.js'
import PropTypes from 'prop-types'
import { useStore } from 'statery'





// Local imports
import { store } from '../../store/store.js'

import { LEVEL_LAYOUT } from '../../data/LEVEL_LAYOUT.js'
import { PixiOverworldRouter } from '../PixiOverworldRouter/PixiOverworldRouter.jsx'
import { PixiOverworldSection } from '../PixiOverworldSection/PixiOverworldSection.jsx'





/**
 * Renders the overworld.
 *
 * @component
 */
export function PixiOverworld({
	resizeToRef,
}) {
	const { uiScale } = useStore(store)

	const pixiApp = useApp()

	const texture = useMemo(() => Assets.get('overworld::background'), [])

	const mappedLayout = useMemo(() => {
		return Object
			.values(LEVEL_LAYOUT.sections)
			.map(sectionData => (
				<PixiOverworldSection
					key={sectionData.name}
					data={sectionData} />
			))
	}, [])

	useLayoutEffect(() => {
		pixiApp.resizeTo = resizeToRef.current
	}, [
		pixiApp,
		resizeToRef,
	])

	useLayoutEffect(() => {
		pixiApp.stage.setTransform(
			0,
			0,
			uiScale,
			uiScale,
			0,
			0,
			0,
			0,
			0,
		)
	}, [
		pixiApp,
		uiScale,
	])

	return (
		<Container>
			<Sprite
				name={'background'}
				texture={texture} />

			{mappedLayout}

			<PixiOverworldRouter />
		</Container>
	)
}

PixiOverworld.propTypes = {
	resizeToRef: PropTypes.object.isRequired,
}
