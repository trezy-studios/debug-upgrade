// Module imports
import {
	Container,
	Sprite,
} from '@pixi/react'
import { Assets } from 'pixi.js'
import { useMemo } from 'react'
import { useStore } from 'statery'





// Local imports
import { LEVEL_LAYOUT } from '../../data/LEVEL_LAYOUT.js'
import { PixiOverworldRouter } from '../PixiOverworldRouter/PixiOverworldRouter.jsx'
import { PixiOverworldSection } from '../PixiOverworldSection/PixiOverworldSection.jsx'
import { store } from '../../store/store.js'





/**
 * Renders the overworld.
 *
 * @component
 */
export function PixiOverworld() {
	const { cameraOffset } = useStore(store)

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

	return (
		<Container
			x={cameraOffset.x}
			y={cameraOffset.y}>
			<Sprite
				name={'background'}
				texture={texture} />

			{mappedLayout}

			<PixiOverworldRouter />
		</Container>
	)
}
