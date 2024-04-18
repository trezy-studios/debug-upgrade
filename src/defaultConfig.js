// Local imports
import { ACTIONS } from './renderer/data/ACTIONS.js'





export default {
	'settings::accessibility::colorblindType': 'none',
	'settings::accessibility::headingFontFace': 'Thaleah',
	'settings::accessibility::textFontFace': 'Awkward',
	'settings::accessibility::usePixelFonts': true,
	'settings::controls': [
		{
			label: ACTIONS.MOVE_CURSOR_RIGHT,
			mappings: {
				keyboard: {
					primary: ['KeyD'],
					secondary: ['ArrowRight'],
				},
			},
			repeatFrequency: 150,
		},

		{
			label: ACTIONS.MOVE_CURSOR_UP,
			mappings: {
				keyboard: {
					primary: ['KeyW'],
					secondary: ['ArrowUp'],
				},
			},
			repeatFrequency: 150,
		},

		{
			label: ACTIONS.MOVE_CURSOR_DOWN,
			mappings: {
				keyboard: {
					primary: ['KeyS'],
					secondary: ['ArrowDown'],
				},
			},
			repeatFrequency: 150,
		},

		{
			label: ACTIONS.MOVE_CURSOR_LEFT,
			mappings: {
				keyboard: {
					primary: ['KeyA'],
					secondary: ['ArrowLeft'],
				},
			},
			repeatFrequency: 150,
		},

		{
			label: ACTIONS.PLACE_TILESET,
			mappings: {
				keyboard: {
					primary: ['Space'],
					secondary: [],
				},
			},
		},

		{
			label: ACTIONS.SKIP_TIMER,
			mappings: {
				keyboard: {
					primary: ['Enter'],
					secondary: [],
				},
			},
		},
	],
	'settings::graphics::displayMode': 'fullscreen',
	'settings::graphics::displayResolution::height': 2160,
	'settings::graphics::displayResolution::width': 3840,
	'settings::graphics::preferredDisplay': 'primary',
	'settings::sound::effectsVolume': 0.8,
	'settings::sound::mainVolume': 0.8,
	'settings::sound::musicVolume': 0.8,
	'settings::system::showBattery': true,
	'settings::system::showClock': true,
	'settings::system::showCPUTemperature': true,
	'settings::system::showCPUUsage': true,
	'settings::system::showDebuggingPanel': true,
	'settings::system::showFramerate': true,
	'settings::system::showGPUTemperature': true,
	'settings::system::showGPUUsage': true,
	'settings::system::showVRAMTemperature': true,
	'settings::system::showVRAMUsage': true,
	'settings::system::showRAMUsage': true,

	'settings::state::mostRecentSaveID': null,
}
