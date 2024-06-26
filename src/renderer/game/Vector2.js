// Types
/** @typedef {import('../../types/CoordinateString.js').CoordinateString} CoordinateString */





/**
 * Represents a vector on a two dimensional plane.
 */
export class Vector2 {
	/****************************************************************************\
	 * Public static methods
	\****************************************************************************/

	/**
	 * Adds the values of two vectors.
	 *
	 * @param {Vector2} vectorA The first vector to be added.
	 * @param {Vector2} vectorB The second vector to be added.
	 * @returns {Vector2} A new Vector2 representing the result of the operation.
	 */
	static add(vectorA, vectorB) {
		if (!(vectorA instanceof Vector2) || !(vectorB instanceof Vector2)) {
			throw new TypeError('Cannot add non-vectors.')
		}

		return new Vector2(
			vectorA.x + vectorB.x,
			vectorA.y + vectorB.y,
		)
	}

	/**
	 * Compares two vectors to check if they're equivalent.
	 *
	 * @param {Vector2} vectorA The first vector to be compared.
	 * @param {Vector2} vectorB The second vector to be compared.
	 * @returns {boolean} Whether the vectors are equivalent.
	 */
	static areEqual(vectorA, vectorB) {
		if (!(vectorA instanceof Vector2) || !(vectorB instanceof Vector2)) {
			throw new TypeError('Cannot check equality of non-vectors.')
		}

		return vectorA.toString() === vectorB.toString()
	}

	/**
	 * Determines the direction from one vector to another.
	 *
	 * @param {Vector2} vectorA The starting vector.
	 * @param {Vector2} vectorB The destination vector.
	 * @returns {Vector2} The distance between the vectors.
	 */
	static direction(vectorA, vectorB) {
		if (!(vectorA instanceof Vector2) || !(vectorB instanceof Vector2)) {
			throw new TypeError('Cannot subtract non-vectors.')
		}

		const result = new Vector2(0, 0)

		if (vectorB.x < vectorA.x) {
			result.x = -1
		} else if (vectorB.x > vectorA.x) {
			result.x = 1
		}

		if (vectorB.y < vectorA.y) {
			result.y = -1
		} else if (vectorB.y > vectorA.y) {
			result.y = 1
		}

		return result
	}

	/**
	 * Determines the distance between 2 vectors.
	 *
	 * @param {Vector2} vectorA The starting vector.
	 * @param {Vector2} vectorB The destination vector.
	 * @returns {Vector2} The distance between the vectors.
	 */
	static distance(vectorA, vectorB) {
		if (!(vectorA instanceof Vector2) || !(vectorB instanceof Vector2)) {
			throw new TypeError('Cannot subtract non-vectors.')
		}

		return new Vector2(
			Math.abs(vectorB.x - vectorA.x),
			Math.abs(vectorB.y - vectorA.y),
		)
	}

	/**
	 * Gets the distance between two vectors.
	 *
	 * @param {Vector2} vectorA The first vector to be compared.
	 * @param {Vector2} [vectorB] The second vector to be compared. Defaults to 0, 0.
	 * @returns {number} A vector representing the relative distance between the input vectors.
	 */
	static magnitude(vectorA, vectorB = new Vector2(0, 0)) {
		if (!(vectorA instanceof Vector2) || !(vectorB instanceof Vector2)) {
			throw new TypeError('Cannot calculate magnitude for non-vectors.')
		}

		const x = vectorA.x - vectorB.x
		const y = vectorA.y - vectorB.y

		const x2 = x ** 2
		const y2 = y ** 2

		return Math.sqrt(x2 + y2)
	}

	/**
	 * Converts a string representation of a 2d vector to a proper Vector2.
	 *
	 * @param {CoordinateString} coordinateString The coordinate string to parse into a Vector2.
	 * @returns {Vector2} The instantiated Vector2.
	 */
	static fromString(coordinateString) {
		if (!/^-?\d+\|-?\d+$/u.test(coordinateString)) {
			throw new TypeError('vector strings must conform to the format `x|y`')
		}

		const [x, y] = coordinateString.split('|').map(Number)

		return new Vector2(x, y)
	}

	/**
	 * Subtracts the values of two vectors.
	 *
	 * @param {Vector2} vectorA The vector to be subtracted from.
	 * @param {Vector2} vectorB The vector to subtract.
	 * @returns {Vector2} A new Vector2 representing the result of the operation.
	 */
	static subtract(vectorA, vectorB) {
		if (!(vectorA instanceof Vector2) || !(vectorB instanceof Vector2)) {
			throw new TypeError('Cannot subtract non-vectors.')
		}

		return new Vector2(
			vectorA.x - vectorB.x,
			vectorA.y - vectorB.y,
		)
	}





	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	/** @type {number} */
	#x

	/** @type {number} */
	#y





	/****************************************************************************\
	 * Constructor
	\****************************************************************************/

	/**
	 * Creates a new 2d vector.
	 *
	 * @param {number} x The x coordinate of the vector.
	 * @param {number} y The y coordinate of the vector.
	 */
	constructor(x, y) {
		this.#x = x
		this.#y = y
	}





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	/**
	 * Generates a string representation of the vector coordinates.
	 *
	 * @returns {CoordinateString} A string representation of the vector coordinates.
	 */
	toString() {
		return `${this.#x}|${this.#y}`
	}





	/****************************************************************************\
	 * Public instance getters/setters
	\****************************************************************************/

	/** @returns {number} The current position of this vector on the horizontal axis. */
	get x() {
		return this.#x
	}

	/**
	 * Update the position of this vector on the horizontal axis.
	 */
	set x(value) {
		if (typeof value !== 'number') {
			throw new TypeError('Vector2\'s `x` value must be a number')
		}
		this.#x = value
	}

	/** @returns {number} The current position of this vector on the vertical axis. */
	get y() {
		return this.#y
	}

	/**
	 * Update the position of this vector on the vertical axis.
	 */
	set y(value) {
		if (typeof value !== 'number') {
			throw new TypeError('Vector2\'s `y` value must be a number')
		}
		this.#y = value
	}
}
