// Local imports
import { EventEmitter } from './EventEmitter.js'





// Constants
const fakeKeyState = {
	isActive: false,
	activatedAt: null,
}
Object.freeze(fakeKeyState)





// Types
/**
 * @typedef KeyState
 * @property {null | number} activatedAt A timestamp representing the time at which this key was last activated.
 * @property {string} code The code of this key.
 * @property {boolean} isActive Whether this key is currently active.
 */





/**
 * Manages a keyboard.
 */
export class Keyboard extends EventEmitter {
	/****************************************************************************\
	 * Public instance properties
	\****************************************************************************/

	/**
	 * @param {KeyboardEvent} event The key down event.
	 */
	handleKeyDown = event => {
		if (event.isTrusted) {
			this.#activateKey(event)
		}
	}

	/**
	 * @param {KeyboardEvent} event The key up event.
	 */
	handleKeyUp = event => {
		if (event.isTrusted) {
			this.#deactivateKey(event)
		}
	}





	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	/** @type {{ [key: string]: KeyState }} */
	#keyStates = {}





	/****************************************************************************\
	 * Constructor
	\****************************************************************************/

	/**
	 * Creates a new keyboard.
	 */
	constructor() {
		super()
		this.#bindEventListeners()
	}





	/****************************************************************************\
	 * Private instance methods
	\****************************************************************************/

	/**
	 * Activates a key on this keyboard.
	 *
	 * @param {KeyboardEvent} event The key down event.
	 */
	#activateKey(event) {
		const { code } = event

		if (!this.#keyStates[code]) {
			this.#keyStates[code] = {
				activatedAt: null,
				code,
				isActive: false,
			}
		}

		const keyState = this.#keyStates[code]

		if (!keyState.isActive) {
			keyState.isActive = true
			keyState.activatedAt = performance.now()
			this.emit('key activated', keyState)
		}
	}

	/**
	 * Binds event listeners to the window.
	 */
	#bindEventListeners() {
		window.addEventListener('keydown', this.handleKeyDown)
		window.addEventListener('keypress', this.handleKeyDown)
		window.addEventListener('keyup', this.handleKeyUp)
	}

	/**
	 * Deactivates a key on this keyboard.
	 *
	 * @param {KeyboardEvent} event The key up event.
	 */
	#deactivateKey(event) {
		const { code } = event

		const keyState = this.#keyStates[code]

		keyState.isActive = false
		keyState.activatedAt = null
		this.emit('key deactivated', keyState)
	}

	/**
	 * Unbinds event listeners from the window.
	 */
	#unbindEventListeners() {
		window.removeEventListener('keydown', this.handleKeyDown)
		window.removeEventListener('keypress', this.handleKeyDown)
		window.removeEventListener('keyup', this.handleKeyUp)
	}





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	/**
	 * Handles teardown for this keyboard.
	 */
	destroy() {
		this.#unbindEventListeners()
	}

	/**
	 * Get the current state of a key on this keyboard.
	 *
	 * @param {string} code The code of the key to be tested.
	 * @returns {KeyState} The current key state.
	 */
	getKey(code) {
		const keyState = this.#keyStates[code]

		if (!keyState) {
			return {
				...fakeKeyState,
				code,
			}
		}

		return keyState
	}
}
