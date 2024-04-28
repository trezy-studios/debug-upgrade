// Local imports
import { store } from '../store.js'





/**
 * Unloads a save from the state.
 */
export function unloadSave() {
	store.set(() => ({ saveData: null }))
}
