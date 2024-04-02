// Module imports
import {
	useCallback,
	useMemo,
} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useStore } from 'statery'





// Local imports
import styles from './OverworldBlock.module.scss'

import { Button } from '../Button/Button.jsx'
import { store } from '../../store/store.js'





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
 * @param {string} [props.sectionName] The name of the parent section.
 */
export function OverworldBlock({
	block,
	sectionName = null,
}) {
	const { saveData } = useStore(store)

	const handleSelect = useCallback(() => {
		console.log(`Selected ${block.name}`, block)
	}, [block])

	const compiledClassName = useMemo(() => {
		const classDict = {
			[styles['overworld-block']]: true,
			[styles[block.type]]: true,
		}

		if (sectionName) {
			classDict[styles[sectionName]] = true
		}

		return classnames(classDict)
	}, [
		block,
		sectionName,
	])

	const compiledStyle = useMemo(() => {
		return {
			'--left': `${block.position.x}px`,
			'--top': `${block.position.y}px`,
		}
	}, [block.position])

	const connections = useMemo(() => {
		return CONNECTION_DIRECTIONS
			.map(direction => {
				if (block.connections?.[direction]) {
					return (
						<div
							key={direction}
							className={styles[`connected-${direction}`]} />
					)
				}

				return null
			})
			.filter(Boolean)
	}, [block.connections])

	const isAvailable = useMemo(() => {
		if (block.prerequisite?.length) {
			return block.prerequisite.every(prerequisiteName => saveData.campaign[prerequisiteName])
		}

		return true
	}, [
		block.prerequisite,
		saveData,
	])

	if (!isAvailable) {
		return null
	}

	return (
		<Button
			isStyled={false}
			navGroupID={'overworld'}
			nodeID={block.name}
			onActivate={handleSelect}
			style={compiledStyle}>
			<div className={compiledClassName}>
				{connections}
				{(block.type === 'level') && (
					<span>{block.name.replace(/^lvl/u, '')}</span>
				)}
			</div>
		</Button>
	)
}

OverworldBlock.propTypes = {
	block: PropTypes.object.isRequired,
	sectionName: PropTypes.string,
}
