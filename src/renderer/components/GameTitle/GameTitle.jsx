// Local imports
import styles from './GameTitle.module.scss'

import { Heading } from '../Heading/Heading.jsx'





/**
 * Renders the game's title.
 *
 * @component
 */
export function GameTitle() {
	return (
		<Heading
			className={styles['game-title']}
			level={1}>
			<span>{'de'}</span>
			<span>{'bug'}</span>
		</Heading>
	)
}
