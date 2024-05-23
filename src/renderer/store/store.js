// Module imports
// import { DEFAULT_CONTROL_BINDINGS } from '../data/DEFAULT_CONTROL_BINDINGS.js'
import { makeStore } from 'statery'





// Local imports
import { ControlsManager } from '../game/ControlsManager.js'
import { getCSSCustomPropertyValue } from '../helpers/getCSSCustomPropertyValue.js'
import { getPalette } from '../helpers/getPalette.js'
import { IPCBridge } from '../helpers/IPCBridge.js'
import { SCENES } from '../data/SCENES.js'
import { Vector2 } from '../game/Vector2.js'





// Types
/** @typedef {import('pixi.js').Application} PixiApplication */
/** @typedef {import('pixi.js').Spritesheet} PixiSpritesheet */
/** @typedef {import('pixi-viewport').Viewport} PixiViewport */

/** @typedef {import('../../types/ControlSchema.js').ControlSchema} ControlSchema */
/** @typedef {import('../../types/Vector2Object.js').Vector2Object} Vector2Object */
/** @typedef {import('../../types/Resourcepack.js').Resourcepack} Resourcepack */
/** @typedef {import('../../types/SaveData.js').SaveData} SaveData */
/** @typedef {import('../game/TileMap.js').TileMap} TileMap */
/** @typedef {import('../../types/TileMapData.js').TileMapData} TileMapData */





export const store = makeStore({
	/** @type {boolean} */
	areAssetsLoaded: false,

	/** @type {number} */
	assetLoadingProgress: 0,

	/** @type {Vector2} */
	cameraOffset: new Vector2(0, 0),

	/** @type {null | ControlSchema[]} */
	controls: null,

	/** @type {ControlsManager} */
	controlsManager: new ControlsManager,

	/** @type {null | string} */
	currentLoadingCategory: null,

	/** @type {null | string} */
	currentLoadingItem: null,

	/** @type {null | TileMap} */
	currentMap: null,

	/** @type {null | string} */
	currentMapID: null,

	/** @type {null | Vector2Object[]} */
	currentPath: null,

	/** @type {null | number} */
	currentQueueIndex: null,

	/** @type {Vector2} */
	cursorPosition: new Vector2(0, 0),

	/** @type {null | string} */
	focusedOverworldLevel: 'lvl01',

	/** @type {boolean} */
	isFilesystemInitialised: false,

	/** @type {boolean} */
	isInitialisingFilesystem: false,

	/** @type {boolean} */
	isLoadingAssets: false,

	/** @type {boolean} */
	isSaving: false,

	/** @type {boolean} */
	isSettingUpPixi: false,

	/** @type {boolean} */
	isVictorious: false,

	/** @type {number} */
	lastPlaceUpdate: 0,

	/** @type {null | string} */
	levelToReveal: null,

	/** @type {number} */
	mainVolume: 0,

	/** @type {null | string} */
	mostRecentSaveID: null,

	/** @type {number} */
	musicVolume: 0,

	/** @type {number} */
	now: performance.now(),

	/** @type {Map<string, string>} */
	palette: getPalette(),

	/** @type {null | PixiApplication} */
	pixiApp: null,

	/** @type {number} */
	resolution: 1,

	/** @type {Map<string, Resourcepack>} */
	resourcepacks: new Map,

	/** @type {Vector2} */
	robotDestination: null,

	/** @type {Vector2} */
	robotPosition: null,

	/** @type {Vector2} */
	robotPixelPosition: null,

	/** @type {number} */
	robotSpeed: 0.4,

	/** @type {null | SaveData} */
	saveData: null,

	/** @type {SCENES[]} */
	sceneHistory: [SCENES.LOADING_GAME],

	/** @type {Map<string, PixiSpritesheet>} */
	spritesheetCache: new Map,

	/** @type {number} */
	soundEffectsVolume: 0,

	/** @type {number} */
	stageHeight: 0,

	/** @type {number} */
	stageWidth: 0,

	/** @type {Map<string, TileMapData>} */
	tilemaps: new Map,

	/** @type {null | number} */
	timerGracePeriod: null,

	/** @type {null | number} */
	timerPathfindingStartedAt: null,

	/** @type {null | number} */
	timerStartedAt: null,

	/** @type {null | number} */
	timerStoppedAt: null,

	/** @type {string} */
	timerString: '00:00',

	/** @type {null | number} */
	totalMoves: null,

	/** @type {number} */
	uiScale: /** @type {number} */ (getCSSCustomPropertyValue('ui-scale')),

	/** @type {null | PixiViewport} */
	viewport: null,
})

if (typeof window !== 'undefined') {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	window.store = store
}

store.subscribe(updates => {
	if ('mostRecentSaveID' in updates) {
		IPCBridge.setConfig('settings::state::mostRecentSaveID', updates.mostRecentSaveID)
	}
})
