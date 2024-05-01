// Module imports
import {
	Container,
	Sprite,
} from '@pixi/react'
import {
	useCallback,
	useMemo,
	useState,
} from 'react'
import { Assets } from 'pixi.js'
import PropTypes from 'prop-types'





// Local imports
import { focusOverworldLevel } from '../../store/reducers/focusOverworldLevel.js'
import { isBlockVisible } from '../../store/reducers/isBlockVisible.js'
import { pushScene } from '../../store/reducers/pushScene.js'
import { SCENES } from '../../data/SCENES.js'
import { setCurrentMapID } from '../../store/reducers/setCurrentMapID.js'





// Constants
const CONNECTION_DIRECTIONS = [
	'bottom',
	'left',
	'right',
	'top',
]





/**
 * Renders a block in the Overworld.
 *
 * @component
 * @param {object} props All props.
 * @param {import('../../../types/OverworldBlock.js').OverworldBlock} props.block Block data.
 */
export function PixiOverworldBlock({ block }) {
	const [isFocused, setIsFocused] = useState(false)

	const handleSelect = useCallback(() => {
		if (isFocused) {
			if (block.type !== 'level') {
				return
			}

			setCurrentMapID(block.name)
			pushScene(SCENES.LOADING_MAP)
		} else {
			focusOverworldLevel(block.name, true)
			setIsFocused(true)
		}
	}, [
		block,
		isFocused,
	])

	const backgroundTexture = useMemo(() => {
		if (block.type === 'lock') {
			return Assets.get(`overworld::block::${block.type}::${block.section}::background`)
		}

		return Assets.get(`overworld::block::${block.type}::background`)
	}, [block])

	const connections = useMemo(() => {
		return CONNECTION_DIRECTIONS
			.map(direction => {
				if (block.connections?.[direction]) {
					return (
						<Sprite
							key={direction}
							texture={Assets.get(`overworld::block::${block.type}::${direction}Connection`)} />
					)
				}

				return null
			})
			.filter(Boolean)
	}, [block])

	const isAvailable = useMemo(() => isBlockVisible(block.name), [block])

	if (!isAvailable || !backgroundTexture) {
		return null
	}

	return (
		<Container
			eventMode={'static'}
			onclick={handleSelect}
			x={block.position.x}
			y={block.position.y}>
			<Sprite texture={backgroundTexture} />
			{connections}
		</Container>
	)
}

PixiOverworldBlock.propTypes = {
	block: PropTypes.object.isRequired,
}
