/**
 * @type {{
 * 	sections: {
 * 		[key: string]: import ('../../types/OverworldSection.js').OverworldSection,
 * 	},
 * 	blocks: {
 * 		[key: string]: import ('../../types/OverworldBlock.js').OverworldBlock,
 * 	},
 * }}
 */
export const LEVEL_LAYOUT = {
	sections: {
		// top
		section01: {
			name: "section01",
			blocks: ["lvl01", "lvl02", "lvl03", "junction01", "section01Lock"],
			position: {
				x: 238,
				y: 14,
			},
			size: {
				height: 84,
				width: 84,
			},
		},

		// left
		section02: {
			name: "section02",
			blocks: [
				"lvl04",
				"lvl05",
				"lvl06",
				"lvl07",
				"lvl08",
				"lvl09",
				"lvl10",
				"lvl11",
				"lvl12",
				"junction02",
				"section02Lock",
				"section02Boss",
			],
			position: {
				x: 14,
				y: 78,
			},
			size: {
				height: 180,
				width: 196,
			},
		},

		// right
		section03: {
			name: "section03",
			blocks: [
				"lvl13",
				"lvl14",
				"lvl15",
				"lvl16",
				"lvl17",
				"lvl18",
				"lvl19",
				"lvl20",
				"lvl21",
				"junction03",
				"junction04",
				"section03Lock",
				"section03Boss",
			],
			position: {
				x: 366,
				y: 62,
			},
			size: {
				height: 164,
				width: 164,
			},
		},

		// bottom
		section04: {
			name: "section04",
			blocks: [
				"lvl22",
				"lvl23",
				"lvl24",
				"lvl25",
				"lvl26",
				"lvl27",
				"lvl28",
				"lvl29",
				"lvl30",
				"junction05",
				"section04Lock",
				"section04Boss",
			],
			position: {
				x: 222,
				y: 190,
			},
			size: {
				height: 180,
				width: 164,
			},
		},
	},

	blocks: {
		router: {
			name: "router",
			links: [],
			position: {
				x: 240,
				y: 112,
			},
			type: "router",
		},

		// section01
		lvl01: {
			name: "lvl01",
			section: "section01",
			fogmap: 255,
			connections: {
				bottom: true,
			},
			links: ["junction01"],
			type: "level",
			position: {
				x: 34,
				y: 2,
			},
		},
		lvl02: {
			name: "lvl02",
			section: "section01",
			fogmap: 200,
			connections: {
				top: true,
			},
			links: ["junction01"],
			prerequisite: ["lvl01"],
			type: "level",
			position: {
				x: 2,
				y: 34,
			},
		},
		lvl03: {
			name: "lvl03",
			section: "section01",
			fogmap: 200,
			connections: {
				top: true,
			},
			links: ["junction01"],
			prerequisite: ["lvl01"],
			type: "level",
			position: {
				x: 66,
				y: 34,
			},
		},
		junction01: {
			name: "junction01",
			section: "section01",
			links: ["lvl01", "lvl02", "lvl03", "section01Lock"],
			prerequisite: ["lvl01"],
			type: "junction",
			position: {
				x: 40,
				y: 24,
			},
		},
		section01Lock: {
			name: "section01Lock",
			section: "section01",
			links: ["junction01", "router"],
			type: "lock",
			position: {
				x: 34,
				y: 66,
			},
		},

		// section02
		lvl04: {
			name: "lvl04",
			section: "section02",
			connections: {
				bottom: true,
				left: true,
				right: true,
				top: true,
			},
			links: ["router", "lvl05", "section02Lock"],
			prerequisite: ["lvl01", "lvl02", "lvl03"],
			type: "level",
			position: {
				x: 178,
				y: 66,
			},
		},
		lvl05: {
			name: "lvl05",
			section: "section02",
			connections: {
				right: true,
				top: true,
			},
			links: ["lvl04", "lvl06"],
			prerequisite: ["lvl04"],
			type: "level",
			position: {
				x: 146,
				y: 34,
			},
		},
		lvl06: {
			name: "lvl06",
			section: "section02",
			connections: {
				bottom: true,
				left: true,
			},
			links: ["lvl05", "lvl07"],
			prerequisite: ["lvl05"],
			type: "level",
			position: {
				x: 146,
				y: 2,
			},
		},
		lvl07: {
			name: "lvl07",
			section: "section02",
			connections: {
				right: true,
			},
			links: ["lvl06"],
			prerequisite: ["lvl06"],
			type: "level",
			position: {
				x: 114,
				y: 2,
			},
		},
		lvl08: {
			name: "lvl08",
			section: "section02",
			connections: {
				bottom: true,
				left: true,
				top: true,
			},
			links: ["lvl04", "lvl09", "junction02"],
			prerequisite: ["lvl04"],
			type: "level",
			position: {
				x: 146,
				y: 98,
			},
		},
		lvl09: {
			name: "lvl09",
			section: "section02",
			connections: {
				right: true,
			},
			links: ["lvl08"],
			prerequisite: ["lvl08"],
			type: "level",
			position: {
				x: 82,
				y: 82,
			},
		},
		lvl10: {
			name: "lvl10",
			section: "section02",
			connections: {
				bottom: true,
				right: true,
			},
			links: ["lvl11", "junction02"],
			prerequisite: ["lvl08"],
			type: "level",
			position: {
				x: 114,
				y: 130,
			},
		},
		lvl11: {
			name: "lvl11",
			section: "section02",
			connections: {
				top: true,
			},
			links: ["lvl10"],
			prerequisite: ["lvl10"],
			type: "level",
			position: {
				x: 114,
				y: 162,
			},
		},
		lvl12: {
			name: "lvl12",
			section: "section02",
			connections: {
				left: true,
			},
			links: ["junction02"],
			prerequisite: ["lvl08"],
			type: "level",
			position: {
				x: 178,
				y: 162,
			},
		},
		junction02: {
			name: "junction02",
			section: "section02",
			links: ["lvl08", "lvl10", "lvl12"],
			prerequisite: ["lvl08"],
			type: "junction",
			position: {
				x: 152,
				y: 136,
			},
		},
		section02Lock: {
			name: "section02Lock",
			section: "section02",
			links: ["lvl04", "section02Boss"],
			prerequisite: ["lvl01", "lvl02", "lvl03"],
			type: "lock",
			position: {
				x: 66,
				y: 50,
			},
		},
		section02Boss: {
			name: "section02Boss",
			section: "section02",
			connections: {
				right: true,
			},
			links: ["section02Lock"],
			prerequisite: [
				"lvl04",
				"lvl05",
				"lvl06",
				"lvl07",
				"lvl08",
				"lvl09",
				"lvl10",
				"lvl11",
			],
			type: "boss",
			position: {
				x: 2,
				y: 34,
			},
		},

		// section03
		lvl13: {
			name: "lvl13",
			section: "section03",
			connections: {
				left: true,
				top: true,
			},
			links: ["router", "lvl14"],
			prerequisite: ["section02Boss"],
			type: "level",
			position: {
				x: 2,
				y: 82,
			},
		},
		lvl14: {
			name: "lvl14",
			section: "section03",
			connections: {
				left: true,
				right: true,
			},
			links: ["lvl13", "junction03"],
			prerequisite: ["lvl13"],
			type: "level",
			position: {
				x: 34,
				y: 66,
			},
		},
		lvl15: {
			name: "lvl15",
			section: "section03",
			connections: {
				bottom: true,
				left: true,
			},
			links: ["lvl15", "lvl16", "junction03"],
			prerequisite: ["lvl14"],
			type: "level",
			position: {
				x: 50,
				y: 34,
			},
		},
		lvl16: {
			name: "lvl16",
			section: "section03",
			connections: {
				right: true,
				top: true,
			},
			links: ["lvl15", "lvl17"],
			prerequisite: ["lvl15"],
			type: "level",
			position: {
				x: 18,
				y: 34,
			},
		},
		lvl17: {
			name: "lvl17",
			section: "section03",
			connections: {
				bottom: true,
			},
			links: ["lvl16"],
			prerequisite: ["lvl16"],
			type: "level",
			position: {
				x: 18,
				y: 2,
			},
		},
		lvl18: {
			name: "lvl18",
			section: "section03",
			connections: {
				bottom: true,
				top: true,
			},
			links: ["junction03", "junction04"],
			prerequisite: ["lvl14"],
			type: "level",
			position: {
				x: 50,
				y: 98,
			},
		},
		lvl19: {
			name: "lvl19",
			section: "section03",
			connections: {
				right: true,
			},
			links: ["junction04"],
			prerequisite: ["lvl18"],
			type: "level",
			position: {
				x: 18,
				y: 114,
			},
		},
		lvl20: {
			name: "lvl20",
			section: "section03",
			connections: {
				bottom: true,
				left: true,
			},
			links: ["lvl21", "junction04"],
			prerequisite: ["lvl18"],
			type: "level",
			position: {
				x: 82,
				y: 114,
			},
		},
		lvl21: {
			name: "lvl21",
			section: "section03",
			connections: {
				top: true,
			},
			links: ["lvl20"],
			prerequisite: ["lvl20"],
			type: "level",
			position: {
				x: 66,
				y: 146,
			},
		},
		junction03: {
			name: "junction03",
			section: "section03",
			links: ["lvl14", "lvl15", "lvl16", "section03Lock"],
			prerequisite: ["lvl14"],
			type: "junction",
			position: {
				x: 56,
				y: 72,
			},
		},
		junction04: {
			name: "junction04",
			section: "section03",
			links: ["lvl18", "lvl19", "lvl20"],
			prerequisite: ["lvl18"],
			type: "junction",
			position: {
				x: 56,
				y: 120,
			},
		},
		section03Lock: {
			name: "section03Lock",
			section: "section03",
			links: ["junction03", "section03Boss"],
			prerequisite: [
				"lvl13",
				"lvl14",
				"lvl15",
				"lvl16",
				"lvl17",
				"lvl18",
				"lvl19",
				"lvl20",
				"lvl21",
			],
			type: "lock",
			position: {
				x: 82,
				y: 66,
			},
		},
		section03Boss: {
			name: "section03Boss",
			section: "section03",
			connections: {
				left: true,
			},
			links: ["section03Lock"],
			prerequisite: [
				"lvl13",
				"lvl14",
				"lvl15",
				"lvl16",
				"lvl17",
				"lvl18",
				"lvl19",
				"lvl20",
				"lvl21",
			],
			type: "boss",
			position: {
				x: 114,
				y: 50,
			},
		},

		// section04
		lvl22: {
			name: "lvl22",
			section: "section04",
			connections: {
				bottom: true,
				left: true,
				right: true,
				top: true,
			},
			links: ["lvl25", "junction05"],
			prerequisite: ["section03Boss"],
			type: "level",
			position: {
				x: 50,
				y: 18,
			},
		},
		lvl23: {
			name: "lvl23",
			section: "section04",
			connections: {
				bottom: true,
			},
			links: ["junction05"],
			prerequisite: ["lvl22"],
			type: "level",
			position: {
				x: 2,
				y: 2,
			},
		},
		lvl24: {
			name: "lvl24",
			section: "section04",
			connections: {
				left: true,
			},
			links: ["junction05"],
			prerequisite: ["lvl22"],
			type: "level",
			position: {
				x: 18,
				y: 34,
			},
		},
		lvl25: {
			name: "lvl25",
			section: "section04",
			connections: {
				bottom: true,
				left: true,
				right: true,
			},
			links: ["lvl22", "lvl26", "lvl27"],
			prerequisite: ["lvl22"],
			type: "level",
			position: {
				x: 82,
				y: 18,
			},
		},
		lvl26: {
			name: "lvl26",
			section: "section04",
			connections: {
				left: true,
			},
			links: ["lvl25"],
			prerequisite: ["lvl25"],
			type: "level",
			position: {
				x: 114,
				y: 34,
			},
		},
		lvl27: {
			name: "lvl27",
			section: "section04",
			connections: {
				bottom: true,
				left: true,
				right: true,
				top: true,
			},
			links: ["lvl25", "lvl28", "lvl29", "lvl30"],
			prerequisite: ["lvl25"],
			type: "level",
			position: {
				x: 82,
				y: 50,
			},
		},
		lvl28: {
			name: "lvl28",
			section: "section04",
			connections: {
				right: true,
			},
			links: ["lvl27"],
			prerequisite: ["lvl27"],
			type: "level",
			position: {
				x: 50,
				y: 50,
			},
		},
		lvl29: {
			name: "lvl29",
			section: "section04",
			connections: {
				left: true,
			},
			links: ["lvl27"],
			prerequisite: ["lvl27"],
			type: "level",
			position: {
				x: 146,
				y: 50,
			},
		},
		lvl30: {
			name: "lvl30",
			section: "section04",
			connections: {
				top: true,
			},
			links: ["lvl27"],
			prerequisite: ["lvl27"],
			type: "level",
			position: {
				x: 82,
				y: 82,
			},
		},
		junction05: {
			name: "junction05",
			section: "section04",
			links: ["lvl23", "lvl24"],
			prerequisite: ["lvl22"],
			type: "junction",
			position: {
				x: 8,
				y: 24,
			},
		},
		section04Lock: {
			name: "section04Lock",
			section: "section04",
			links: ["lvl22", "section04Boss"],
			prerequisite: [
				"lvl22",
				"lvl23",
				"lvl24",
				"lvl25",
				"lvl26",
				"lvl27",
				"lvl28",
				"lvl29",
				"lvl30",
			],
			type: "lock",
			position: {
				x: 50,
				y: 98,
			},
		},
		section04Boss: {
			name: "section04Boss",
			section: "section04",
			connections: {
				top: true,
			},
			links: ["section04Lock"],
			prerequisite: [
				"lvl22",
				"lvl23",
				"lvl24",
				"lvl25",
				"lvl26",
				"lvl27",
				"lvl28",
				"lvl29",
				"lvl30",
			],
			type: "boss",
			position: {
				x: 34,
				y: 130,
			},
		},
	},
};
