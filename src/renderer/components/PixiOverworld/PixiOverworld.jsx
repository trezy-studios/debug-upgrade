// Module imports
import {
	Container,
	Sprite,
} from '@pixi/react'
import { Assets } from 'pixi.js'
import { useMemo } from 'react'





// Local imports
import { LEVEL_LAYOUT } from '../../data/LEVEL_LAYOUT.js'
// import { PixiOverworldMask } from '../PixiOverworldMask/PixiOverworldMask.jsx'
import { PixiOverworldRouter } from '../PixiOverworldRouter/PixiOverworldRouter.jsx'
import { PixiOverworldSection } from '../PixiOverworldSection/PixiOverworldSection.jsx'





/**
 * Renders the overworld.
 *
 * @component
 */
export function PixiOverworld() {
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
		<Container>
			<Sprite
				name={'background'}
				texture={texture} />

			{mappedLayout}

			<PixiOverworldRouter />

			{/* <PixiOverworldMask
				height={texture.height}
				width={texture.width} /> */}
		</Container>
	)
}
