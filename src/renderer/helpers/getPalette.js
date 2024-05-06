// Local imports
import styles from '../styles/data/_colors.module.scss'





/**
 * Retrieves the palette from our SCSS files.
 *
 * @returns {Map<string, string>} A map of color names to values.
 */
export function getPalette() {
	const colorNames = styles.names.split(' ')
	const colorValues = styles.values.split(' ')

	const palette = new Map

	let index = 0

	while (index < colorNames.length) {
		palette.set(JSON.parse(colorNames[index]), colorValues[index])

		index += 1
	}

	return palette
}
