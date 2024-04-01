// Module imports
// import type { ConfigEnv, UserConfig } from 'vite'
import {
	defineConfig,
	mergeConfig,
} from 'vite'
import {
	external,
	getBuildConfig,
	pluginHotRestart,
} from './vite.base.config'





/**
 * @param {import('vite').ConfigEnv<'build'>} env
 */
export default defineConfig(env => {
	const { forgeConfigSelf } = env

	/** @type {import('vite').UserConfig} */
	const config = {
		build: {
			rollupOptions: {
				external,
				// Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
				input: forgeConfigSelf.entry,
				output: {
					format: 'cjs',
					// It should not be split chunks.
					inlineDynamicImports: true,
					entryFileNames: '[name].js',
					chunkFileNames: '[name].js',
					assetFileNames: '[name].[ext]',
				},
			},
		},
		plugins: [pluginHotRestart('reload')],
	}

	return mergeConfig(getBuildConfig(env), config)
})
