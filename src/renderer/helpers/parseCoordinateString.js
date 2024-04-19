/**
 * Parses a coordinate string to a vector pair.
 *
 * @param {string} coordinateString The coordinate string to be parsed.
 * @returns {[number, number]} The x/y coordinates.
 */
export function parseCoordinateString(coordinateString) {
	const [x, y] = coordinateString
		.split('|')
		.map(Number)

	return [x, y]
}
