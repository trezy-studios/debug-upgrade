// Module imports
import {
	contextBridge,
	ipcRenderer,
} from 'electron'





contextBridge.exposeInMainWorld('IPCBridge', {
	/**
	 * Creates a new save file.
	 *
	 * @returns {Promise<import('../types/SaveData.js').SaveData>} The save data that was created.
	 */
	createSave: () => ipcRenderer.invoke('createSave'),

	/**
	 * Retrieves all save data.
	 *
	 * @param {string[]} [saveIDs] An array of IDs to load save data for.
	 * @returns {Promise<import('../types/SaveData.js').SaveData[]>} An array of data from all saves.
	 */
	getSaves: saveIDs => ipcRenderer.invoke('getSaves', saveIDs),

	/**
	 * Gets a config value from disk.
	 *
	 * @param {string} key The config key to be retrieved.
	 * @returns {Promise<*>} The value of the config.
	 */
	getConfig: key => ipcRenderer.invoke('getConfig', key),

	/**
	 * Ensures all directories exist on disk.
	 *
	 * @returns {Promise<boolean>} Whether the directories were successfully created.
	 */
	initialiseDirectories: () => ipcRenderer.invoke('initialiseDirectories'),

	/**
	 * Persists a config value to disk.
	 *
	 * @param {string} key The config key to be set.
	 * @param {*} value The new config value.
	 */
	setConfig: (key, value) => {
		ipcRenderer.invoke('setConfig', key, value)
	},
})
