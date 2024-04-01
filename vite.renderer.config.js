// Module imports
import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import sassDts from 'vite-plugin-sass-dts'





// Local imports
import { pluginExposeRenderer } from './vite.base.config.js'





export default defineConfig(env => {
	/** @type {import('vite').ConfigEnv<'renderer'>} */
	const forgeEnv = /** @type {*} */ (env)
	const {
		forgeConfigSelf,
		mode,
		root,
	} = forgeEnv
	const name = forgeConfigSelf.name ?? ''

	return {
		root,
		mode,
		base: './',
		build: {
			outDir: `.vite/renderer/${name}`,
		},
		publicDir: path.resolve(process.cwd(), 'public'),
		plugins: [
			pluginExposeRenderer(name),
			sassDts(),
			react({ include: /\.jsx$/u }),
		],
		resolve: {
			preserveSymlinks: true,
		},
		clearScreen: false,
	}
})
