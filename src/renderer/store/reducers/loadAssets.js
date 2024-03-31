// Module imports
import { Assets } from 'pixi.js'





// Local imports
import { AudioLibrary } from '../../helpers/AudioLibrary.js'
import { IPCBridge } from '../../helpers/IPCBridge.js'
import { setLoadingItem } from './setLoadingItem.js'
import { store } from '../store.js'





/**
 * Hook for loading assets.
 *
 * @param {string[]} manifestIDs The manifest IDs to be loaded.
 * @param {object} [options] All options.
 * @param {Function} [options.onAssetLoadStart] Fired before an asset starts loading.
 * @param {Function} [options.onAssetLoadEnd] Fired when an asset is finished loading.
 * @param {Function} [options.onDone] Fired when all associated assets have been loaded.
 * @returns {Promise<void>}
 */
export async function loadAssets(manifestIDs, options = {}) {
	const {
		onAssetLoadEnd,
		onAssetLoadStart,
		onDone,
	} = options

	const manifestResponses = await Promise.all(manifestIDs.map(manifestID => fetch(`manifests/${manifestID}.json`)))
	const manifestData = await Promise.all(manifestResponses.map(manifestResponse => manifestResponse.json()))

	store.set(() => ({ assetLoadingProgress: 0 }))

	let index = 0

	while (index < manifestData.length) {
		const asset = manifestData[index]

		setLoadingItem(asset)

		if (typeof onAssetLoadStart === 'function') {
			onAssetLoadStart(asset)
		}

		switch (asset.type) {
			case 'audio': {
				await AudioLibrary.load(asset)
				break
			}

			case 'font': {
				await fetch(asset.src)
				break
			}

			case 'image': {
				const imageElement = new Image
				imageElement.src = asset.src
				await imageElement.decode()
				break
			}

			case 'json': {
				await fetch(asset.src)
				break
			}

			case 'setting': {
				const value = await IPCBridge.getConfig(asset.path)
				store.set(() => ({
					[asset.alias]: value,
				}))
				break
			}

			case 'sprite': {
				Assets.add(asset.alias, asset.src)
				await Assets.load(asset.alias)
				break
			}

			case 'video': {
				break
			}

			default:
		}

		store.set(() => ({ assetLoadingProgress: index / manifestData.length }))

		if (typeof onAssetLoadEnd === 'function') {
			onAssetLoadEnd(asset)
		}

		index += 1
	}

	store.set(() => ({ assetLoadingProgress: 1 }))

	if (typeof onDone === 'function') {
		onDone()
	}
}
