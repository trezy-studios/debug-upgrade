// Module imports
import {
	Assets,
	BaseTexture,
	Spritesheet,
} from 'pixi.js'





// Local imports
import { AudioLibrary } from '../../helpers/AudioLibrary.js'
import { fetchAsJSON } from '../../helpers/fetchAsJSON.js'
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
 */
export async function loadAssets(manifestIDs, options = {}) {
	const {
		onAssetLoadEnd,
		onAssetLoadStart,
		onDone,
	} = options

	const manifestResponses = await Promise.all(manifestIDs.map(manifestID => fetch(`manifests/${manifestID}.json`)))
	const manifestData = await Promise.all(manifestResponses.map(manifestResponse => manifestResponse.json()))

	const allAssets = manifestData.flat()

	store.set(() => ({ assetLoadingProgress: 0 }))

	let assetIndex = 0

	while (assetIndex < allAssets.length) {
		const asset = allAssets[assetIndex]

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

			case 'setting': {
				const value = await IPCBridge.getConfig(asset.path)
				store.set(() => ({
					[asset.alias]: value,
				}))
				break
			}

			case 'sprite': {
				Assets.add({
					alias: asset.alias,
					src: asset.src,
				})
				await Assets.load(asset.alias)
				break
			}

			case 'spritesheet': {
				const atlasData = await fetchAsJSON(asset.src)
				const imageSrc = asset.src.replace(/\/\w+\.json?$/u, `/${atlasData.meta.image}`)
				const texture = BaseTexture.from(imageSrc)
				const spritesheet = new Spritesheet({
					cachePrefix: `${asset.src}::`,
					data: atlasData,
					texture,
				})

				await spritesheet.parse()

				store.set(previousState => {
					const newSpritesheetCache = new Map(previousState.spritesheetCache)
					newSpritesheetCache.set(asset.alias, spritesheet)
					return { spritesheetCache: newSpritesheetCache }
				})
				break
			}

			default:
		}

		store.set(() => ({ assetLoadingProgress: assetIndex / allAssets.length }))

		if (typeof onAssetLoadEnd === 'function') {
			onAssetLoadEnd(asset)
		}

		assetIndex += 1
	}

	store.set(() => ({ assetLoadingProgress: 1 }))

	if (typeof onDone === 'function') {
		onDone()
	}
}
