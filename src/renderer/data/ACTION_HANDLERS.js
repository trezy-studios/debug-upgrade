// Local imports
import { ACTIONS } from './ACTIONS.js'
import { moveCursor } from '../store/reducers/moveCursor.js'
import { placeTileset } from '../store/reducers/placeTileset.js'
import { skipGracePeriod } from '../store/reducers/skipGracePeriod.js'





export const ACTION_HANDLERS = {
	// eslint-disable-next-line jsdoc/require-jsdoc
	[ACTIONS.MOVE_CURSOR_RIGHT]: () => moveCursor(1, 0),

	// eslint-disable-next-line jsdoc/require-jsdoc
	[ACTIONS.MOVE_CURSOR_UP]: () => moveCursor(0, -1),

	// eslint-disable-next-line jsdoc/require-jsdoc
	[ACTIONS.MOVE_CURSOR_DOWN]: () => moveCursor(0, 1),

	// eslint-disable-next-line jsdoc/require-jsdoc
	[ACTIONS.MOVE_CURSOR_LEFT]: () => moveCursor(-1, 0),

	// eslint-disable-next-line jsdoc/require-jsdoc
	[ACTIONS.PLACE_TILESET]: () => placeTileset(),

	// eslint-disable-next-line jsdoc/require-jsdoc
	[ACTIONS.SKIP_TIMER]: () => skipGracePeriod(),

	// eslint-disable-next-line jsdoc/require-jsdoc
	[ACTIONS.PAUSE]: () => {
		console.log('TODO: PAUSE THE GAME')
	},
}
