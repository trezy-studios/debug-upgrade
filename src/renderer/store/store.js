// Module imports
// import { DEFAULT_CONTROL_BINDINGS } from '../data/DEFAULT_CONTROL_BINDINGS.js'
import { makeStore } from 'statery'





// Local imports
// import { ControlsManager } from '../game/ControlsManager.js'
import { IPCBridge } from '../helpers/IPCBridge.js'
import { SCENES } from '../data/SCENES.js'





export const store = makeStore({
	/** @type {boolean} */
	areAssetsLoaded: false,

	/** @type {number} */
	assetLoadingProgress: 0,

	// /** @type {ControlsManager} */
	// controlsManager: new ControlsManager,

	/** @type {null | string} */
	currentMapID: null,

	/** @type {null | import('../game/TileMap.js').TileMap} */
	currentMap: null,

	/** @type {null | string} */
	currentLoadingCategory: null,

	/** @type {null | string} */
	currentLoadingItem: null,

	/** @type {number} */
	currentQueueIndex: 0,

	/** @type {boolean} */
	isFilesystemInitialised: false,

	/** @type {boolean} */
	isInitialisingFilesystem: false,

	/** @type {boolean} */
	isLoadingAssets: false,

	/** @type {boolean} */
	isSettingUpPixi: false,

	/** @type {number} */
	mainVolume: 0,

	/** @type {null | string} */
	mostRecentSaveID: null,

	/** @type {number} */
	musicVolume: 0,

	/** @type {null | import('pixi.js').Application} */
	pixiApp: null,

	/** @type {Map<string, object>} */
	resourcepacks: new Map,

	/** @type {null | import('../../types/SaveData.js').SaveData} */
	saveData: null,

	/** @type {SCENES[]} */
	sceneHistory: [SCENES.LOADING_GAME],

	/** @type {number} */
	soundEffectsVolume: 0,

	/** @type {Map<string, import('../../types/TileMapData.js').TileMapData>} */
	tilemaps: new Map,

	/** @type {number} */
	uiScale: Number(getComputedStyle(document.querySelector(':root')).getPropertyValue('--ui-scale')),

	/** @type {null | import('pixi-viewport').Viewport} */
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
