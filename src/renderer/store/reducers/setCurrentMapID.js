// Local imports
import { store } from '../store.js'





/**
 * @param {string} mapName The name of the map to be loaded.
 */
export function setCurrentMapID(mapName) {
	store.set(() => ({ currentMapID: mapName }))
}
