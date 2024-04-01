// Module imports
import {
	defineConfig,
	mergeConfig,
} from 'vite'





// Local imports
import {
	external,
	getBuildConfig,
	getBuildDefine,
	pluginHotRestart,
} from './vite.base.config'





/**
 * @param {import('vite').ConfigEnv<'build'>} env
 */
export default defineConfig(env => {
	const { forgeConfigSelf } = env
	const define = getBuildDefine(env)

	/** @type {import('vite').UserConfig} */
	const config = {
		build: {
			lib: {
				entry: /** @type {string} */ (forgeConfigSelf.entry),
				// eslint-disable-next-line jsdoc/require-jsdoc
				fileName: () => '[name].js',
				formats: ['cjs'],
			},
			rollupOptions: {
				external,
			},
		},
		plugins: [pluginHotRestart('restart')],
		define,
		resolve: {
			// Load the Node.js entry.
			mainFields: ['module', 'jsnext:main', 'jsnext'],
		},
	}

	return mergeConfig(getBuildConfig(env), config)
})
