// Local imports
import { IPCBridge } from '../../helpers/IPCBridge.js'
import { store } from '../store.js'





/**
 * Ensures all ofthe required local directories have been created.
 */
export async function initialiseFilesystem() {
	// const { contentManager } = store.state

	await IPCBridge.initialiseDirectories()
	// await contentManager.loadMeta()

	store.set(() => ({ isFilesystemInitialised: true }))
}
