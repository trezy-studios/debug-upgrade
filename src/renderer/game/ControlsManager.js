// Module imports
import { schedule } from 'rafael/lib/schedule.js'





// Local imports
import { ACTIONS } from '../data/ACTIONS.js'
import { ACTION_HANDLERS } from '../data/ACTION_HANDLERS.js'
import { EventEmitter } from './EventEmitter.js'
import { Gamepad } from './Gamepad.js'
import { Keyboard } from './Keyboard.js'
import { store } from '../store/store.js'





const foo = {
	"categories": [
		{
			"id": "GAME",
			"label": "Game"
		},

		{
			"id": "MENU",
			"label": "Menu"
		}
	],

	"actions": [
		{
			"category": "GAME",
			"id": "MOVE_CURSOR_UP",
			"label": "Move Cursor Up",
			"defaults": {
				"keyboardPrimary": ["KeyW"],
				"keyboardSecondary": ["ArrowUp"],
				"gamepadPrimary": ["Axis::1::-"],
				"gamepadSecondary": ["Button::12"]
			}
		},
		{
			"category": "GAME",
			"id": "MOVE_CURSOR_DOWN",
			"label": "Move Cursor Down",
			"defaults": {
				"keyboardPrimary": ["KeyS"],
				"keyboardSecondary": ["ArrowDown"],
				"gamepadPrimary": ["Axis::1::+"],
				"gamepadSecondary": ["Button::13"]
			}
		},
		{
			"category": "GAME",
			"id": "MOVE_CURSOR_LEFT",
			"label": "Move Cursor Left",
			"defaults": {
				"keyboardPrimary": ["KeyA"],
				"keyboardSecondary": ["ArrowLeft"],
				"gamepadPrimary": ["Axis::0::-"],
				"gamepadSecondary": ["Button::14"]
			}
		},
		{
			"category": "GAME",
			"id": "MOVE_CURSOR_RIGHT",
			"label": "Move Cursor Right",
			"defaults": {
				"keyboardPrimary": ["KeyD"],
				"keyboardSecondary": ["ArrowRight"],
				"gamepadPrimary": ["Axis::0::+"],
				"gamepadSecondary": ["Button::15"]
			}
		},
		{
			"category": "GAME",
			"id": "PLACE_TILESET",
			"label": "Place Tileset",
			"defaults": {
				"keyboardPrimary": ["Enter"],
				"keyboardSecondary": [],
				"gamepadPrimary": ["Button::0"],
				"gamepadSecondary": []
			}
		},
		{
			"category": "GAME",
			"id": "SKIP_TIMER",
			"label": "Skip Timer",
			"defaults": {
				"keyboardPrimary": ["Space"],
				"keyboardSecondary": [],
				"gamepadPrimary": ["Button::3"],
				"gamepadSecondary": []
			}
		},
		{
			"category": "GAME",
			"id": "PAUSE",
			"label": "Pause",
			"defaults": {
				"keyboardPrimary": ["Escape"],
				"keyboardSecondary": [],
				"gamepadPrimary": ["Button::9"],
				"gamepadSecondary": []
			}
		},

		{
			"category": "MENU",
			"id": "UP",
			"label": "Up",
			"defaults": {
				"keyboardPrimary": ["ArrowUp"],
				"keyboardSecondary": [],
				"gamepadPrimary": ["Button::12"],
				"gamepadSecondary": []
			}
		},
		{
			"category": "MENU",
			"id": "DOWN",
			"label": "Down",
			"defaults": {
				"keyboardPrimary": ["ArrowDown"],
				"keyboardSecondary": [],
				"gamepadPrimary": ["Button::13"],
				"gamepadSecondary": []
			}
		},
		{
			"category": "MENU",
			"id": "LEFT",
			"label": "Left",
			"defaults": {
				"keyboardPrimary": ["ArrowLeft"],
				"keyboardSecondary": [],
				"gamepadPrimary": ["Button::14"],
				"gamepadSecondary": []
			}
		},
		{
			"category": "MENU",
			"id": "RIGHT",
			"label": "Right",
			"defaults": {
				"keyboardPrimary": ["ArrowRight"],
				"keyboardSecondary": [],
				"gamepadPrimary": ["Button::15"],
				"gamepadSecondary": []
			}
		},
		{
			"category": "MENU",
			"id": "SELECT",
			"label": "Select",
			"defaults": {
				"keyboardPrimary": ["Enter"],
				"keyboardSecondary": [],
				"gamepadPrimary": ["Button::0"],
				"gamepadSecondary": []
			}
		},
		{
			"category": "MENU",
			"id": "BACK",
			"label": "Back",
			"defaults": {
				"keyboardPrimary": ["Escape"],
				"keyboardSecondary": [],
				"gamepadPrimary": ["Button::1"],
				"gamepadSecondary": []
			}
		}
	]
}





/**
 * Manages control surfaces, including mouse/keyboard and gamepads.
 */
export class ControlsManager extends EventEmitter {
	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

 	#actionCaches = new Map

	#gamepads = {
		0: null,
		1: null,
		2: null,
		3: null,
	}

	#keyboard = new Keyboard

	#mode = 'MENU'





	/****************************************************************************\
	 * Public instance properties
	\****************************************************************************/

	/**
	 * Handles a gamepad being connected to the device.
	 *
	 * @param {object} event The `gamepadconnected` event.
	 */
	handleGamepadConnected = event => {
		const { gamepad } = event

		this.#gamepads[gamepad.index] = new Gamepad(gamepad)

		this.emit('gamepad connected')
	}

	/**
	 * Handles a gamepad being disconnected from the device.
	 *
	 * @param {object} event The `gamepaddisconnected` event.
	 */
	handleGamepadDisconnected = event => {
		const { gamepad } = event

		this.#gamepads[gamepad.index].disconnect()
		this.#gamepads[gamepad.index] = null

		this.emit('gamepad disconnected')
	}





	/****************************************************************************\
	 * Constructor
	\****************************************************************************/

	/**
	 * Create a new controls manager.
	 */
	constructor() {
		super()
		this.initialiseEventListeners()
	}





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	/**
	 * Returns the gamepad at the specified index.
	 *
	 * @param {number} [gamepadIndex] The index of the requested gamepad.
	 * @returns {object} The gamepad at the requested index.
	 */
	getGamepad(gamepadIndex) {
		if (typeof gamepadIndex === 'undefined') {
			return Object
				.values(this.#gamepads)
				.filter(gamepad => gamepad !== null)[0]
		}

		return this.#gamepads[gamepadIndex]
	}

	/**
	 * Returns the keyboard.
	 *
	 * @returns {Keyboard} The keyboard.
	 */
	getKeyboard() {
		return this.#keyboard
	}

	/**
	 * Attach all event listeners.
	 */
	initialiseEventListeners() {
		window.addEventListener('gamepadconnected', this.handleGamepadConnected)
		window.addEventListener('gamepaddisconnected', this.handleGamepadDisconnected)
	}

	/**
	 * Start the manager updating in a loop.
	 */
	start() {
		schedule(this.update, { context: this })
	}

	/**
	 * Updates the state of all controllers.
	 */
	update() {
		const now = performance.now()

		Object
			.values(this.#gamepads)
			.forEach(gamepad => {
				if (gamepad === null) {
					return
				}

				gamepad.update()
			})

		Object
			.values(ACTIONS)
			.forEach(label => {
				const handler = ACTION_HANDLERS[label]

				const control = store.state.controls.find(controlItem => controlItem.label === label)

				if (!control) {
					return
				}

				if (control.mappings.keyboard.primary.length || control.mappings.keyboard.secondary.length) {
					const isPrimaryActive = Boolean(control.mappings.keyboard.primary.length) && control.mappings.keyboard.primary.every(code => {
						return this.#keyboard.getKey(code).isActive
					})

					const isSecondaryActive = Boolean(control.mappings.keyboard.secondary.length) && control.mappings.keyboard.secondary.every(code => {
						return this.#keyboard.getKey(code).isActive
					})

					let keyState = null

					if (isPrimaryActive) {
						keyState = control.mappings.keyboard.primary
					} else if (isSecondaryActive) {
						keyState = control.mappings.keyboard.secondary
					}

					if (keyState) {
						let actionCache = this.#actionCaches.get(label)

						if (!actionCache) {
							actionCache = { triggeredAt: now }
							this.#actionCaches.set(label, actionCache)
							this.emit(`action::${label}`)
							handler()
						} else if ((now - actionCache.triggeredAt) >= control.repeatFrequency) {
							actionCache.triggeredAt = now
							this.emit(`action::${label}`)
							handler()
						}
					} else {
						this.#actionCaches.delete(label)
					}
				}
			})
	}





	/****************************************************************************\
	 * Public instance getters/setters
	\****************************************************************************/

	/**
	 * @returns {object} The number of currently tracked gamepads.
	 */
	get gamepadCount() {
		return Object
			.values(this.#gamepads)
			.filter(gamepad => gamepad !== null)
			.length
	}

	/**
	 * @returns {object} An object containing all currently tracked gamepads.
	 */
	get gamepads() {
		return this.#gamepads
	}
}
