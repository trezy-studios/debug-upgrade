export const LEVEL_LAYOUT = {
	// top
	section01: {
		blocks: [
			{
				name: 'lvl01',
				connections: {
					bottom: true,
				},
				links: [
					'junction01',
				],
				type: 'level',
				position: {
					x: 34,
					y: 2,
				},
			},
			{
				name: 'lvl02',
				connections: {
					top: true,
				},
				links: [
					'junction01',
				],
				prerequisite: [
					'lvl01',
				],
				type: 'level',
				position: {
					x: 2,
					y: 34,
				},
			},
			{
				name: 'lvl03',
				connections: {
					top: true,
				},
				links: [
					'junction01',
				],
				prerequisite: [
					'lvl01',
				],
				type: 'level',
				position: {
					x: 66,
					y: 34,
				},
			},
			{
				name: 'junction01',
				links: [
					'lvl01',
					'lvl02',
					'lvl03',
					'section01Lock',
				],
				prerequisite: [
					'lvl01',
				],
				type: 'junction',
				position: {
					x: 40,
					y: 24,
				},
			},
			{
				name: 'section01Lock',
				links: [
					'junction01',
					'router',
				],
				prerequisite: [
					'lvl01',
					'lvl02',
					'lvl03',
				],
				type: 'lock',
				position: {
					x: 34,
					y: 66	,
				},
			},
		],
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
		blocks: [
			{
				name: 'lvl04',
				connections: {
					bottom: true,
					left: true,
					right: true,
					top: true,
				},
				links: [
					'router',
					'lvl05',
					'section02-lock',
				],
				prerequisite: [
					'section01-lock',
				],
				type: 'level',
				position: {
					x: 178,
					y: 66,
				},
			},
			{
				name: 'lvl05',
				connections: {
					right: true,
					top: true,
				},
				links: [
					'lvl04',
					'lvl06',
				],
				prerequisite: [
					'lvl04',
				],
				type: 'level',
				position: {
					x: 146,
					y: 34,
				},
			},
			{
				name: 'lvl06',
				connections: {
					bottom: true,
					left: true,
				},
				links: [
					'lvl05',
					'lvl07',
				],
				prerequisite: [
					'lvl05',
				],
				type: 'level',
				position: {
					x: 146,
					y: 2,
				},
			},
			{
				name: 'lvl07',
				connections: {
					right: true,
				},
				links: [
					'lvl06',
				],
				prerequisite: [
					'lvl06',
				],
				type: 'level',
				position: {
					x: 114,
					y: 2,
				},
			},
			{
				name: 'lvl08',
				connections: {
					bottom: true,
					left: true,
					top: true,
				},
				links: [
					'lvl04',
					'lvl09',
					'junction02',
				],
				prerequisite: [
					'lvl04',
				],
				type: 'level',
				position: {
					x: 146,
					y: 98,
				},
			},
			{
				name: 'lvl09',
				connections: {
					right: true,
				},
				links: [
					'lvl08',
				],
				prerequisite: [
					'lvl08',
				],
				type: 'level',
				position: {
					x: 82,
					y: 82,
				},
			},
			{
				name: 'lvl10',
				connections: {
					bottom: true,
					right: true,
				},
				links: [
					'lvl11',
					'junction02',
				],
				prerequisite: [
					'lvl08',
				],
				type: 'level',
				position: {
					x: 114,
					y: 130,
				},
			},
			{
				name: 'lvl11',
				connections: {
					top: true,
				},
				links: [
					'lvl10',
				],
				prerequisite: [
					'lvl10',
				],
				type: 'level',
				position: {
					x: 114,
					y: 162,
				},
			},
			{
				name: 'lvl12',
				connections: {
					left: true,
				},
				links: [
					'junction02',
				],
				prerequisite: [
					'lvl08',
				],
				type: 'level',
				position: {
					x: 178,
					y: 162,
				},
			},
			{
				name: 'junction02',
				links: [
					'lvl08',
					'lvl10',
					'lvl12',
				],
				prerequisite: [
					'lvl08',
				],
				type: 'junction',
				position: {
					x: 152,
					y: 136,
				},
			},
			{
				name: 'section01-lock',
				links: [
					'lvl04',
					'section02-lock',
				],
				prerequisite: [
					'lvl04',
					'lvl05',
					'lvl06',
					'lvl07',
					'lvl08',
					'lvl09',
					'lvl10',
					'lvl11',
				],
				type: 'lock',
				position: {
					x: 66,
					y: 50,
				},
			},
			{
				name: 'section02-boss',
				connections: {
					right: true,
				},
				links: [
					'section02-lock',
				],
				prerequisite: [
					'section02-lock',
				],
				type: 'boss',
				position: {
					x: 2,
					y: 34,
				},
			},
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
		blocks: [
			{
				name: 'lvl13',
				connections: {
					left: true,
					top: true,
				},
				links: [
					'router',
					'lvl14',
				],
				prerequisite: [
					'section02-boss',
				],
				type: 'level',
				position: {
					x: 2,
					y: 82,
				},
			},
			{
				name: 'lvl14',
				connections: {
					left: true,
					right: true,
				},
				links: [
					'lvl13',
					'junction03',
				],
				prerequisite: [
					'lvl13',
				],
				type: 'level',
				position: {
					x: 34,
					y: 66,
				},
			},
			{
				name: 'lvl15',
				connections: {
					bottom: true,
					left: true,
				},
				links: [
					'lvl15',
					'lvl16',
					'junction03',
				],
				prerequisite: [
					'lvl14',
				],
				type: 'level',
				position: {
					x: 50,
					y: 34,
				},
			},
			{
				name: 'lvl16',
				connections: {
					right: true,
					top: true,
				},
				links: [
					'lvl15',
					'lvl17',
				],
				prerequisite: [
					'lvl15',
				],
				type: 'level',
				position: {
					x: 18,
					y: 34,
				},
			},
			{
				name: 'lvl17',
				connections: {
					bottom: true,
				},
				links: [
					'lvl16',
				],
				prerequisite: [
					'lvl16',
				],
				type: 'level',
				position: {
					x: 18,
					y: 2,
				},
			},
			{
				name: 'lvl18',
				connections: {
					bottom: true,
					top: true,
				},
				links: [
					'junction03',
					'junction04',
				],
				prerequisite: [
					'lvl14',
				],
				type: 'level',
				position: {
					x: 50,
					y: 98,
				},
			},
			{
				name: 'lvl19',
				connections: {
					right: true,
				},
				links: [
					'junction04',
				],
				prerequisite: [
					'lvl18',
				],
				type: 'level',
				position: {
					x: 18,
					y: 114,
				},
			},
			{
				name: 'lvl20',
				connections: {
					bottom: true,
					left: true,
				},
				links: [
					'lvl21',
					'junction04',
				],
				prerequisite: [
					'lvl18',
				],
				type: 'level',
				position: {
					x: 82,
					y: 114,
				},
			},
			{
				name: 'lvl21',
				connections: {
					top: true,
				},
				links: [
					'lvl20',
				],
				prerequisite: [
					'lvl20',
				],
				type: 'level',
				position: {
					x: 66,
					y: 146,
				},
			},
			{
				name: 'junction03',
				links: [
					'lvl14',
					'lvl15',
					'lvl16',
					'section03-lock',
				],
				prerequisite: [
					'lvl14',
				],
				type: 'junction',
				position: {
					x: 56,
					y: 72,
				},
			},
			{
				name: 'junction04',
				links: [
					'lvl18',
					'lvl19',
					'lvl20',
				],
				prerequisite: [
					'lvl18',
				],
				type: 'junction',
				position: {
					x: 56,
					y: 120,
				},
			},
			{
				name: 'section03-lock',
				links: [
					'junction03',
					'section03-boss',
				],
				prerequisite: [
					'lvl13',
					'lvl14',
					'lvl15',
					'lvl16',
					'lvl17',
					'lvl18',
					'lvl19',
					'lvl20',
					'lvl21',
				],
				type: 'lock',
				position: {
					x: 82,
					y: 66,
				},
			},
			{
				name: 'section03-boss',
				connections: {
					left: true,
				},
				links: [
					'section03-lock',
				],
				prerequisite: [
					'section03-lock',
				],
				type: 'boss',
				position: {
					x: 114,
					y: 50,
				},
			},
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
		blocks: [
			{
				name: 'lvl22',
				connections: {
					bottom: true,
					left: true,
					right: true,
					top: true,
				},
				links: [
					'lvl25',
					'junction05',
				],
				prerequisite: [
					'section03-boss',
				],
				type: 'level',
				position: {
					x: 50,
					y: 18,
				},
			},
			{
				name: 'lvl23',
				connections: {
					bottom: true,
				},
				links: [
					'junction05',
				],
				prerequisite: [
					'lvl22',
				],
				type: 'level',
				position: {
					x: 2,
					y: 2,
				},
			},
			{
				name: 'lvl24',
				connections: {
					left: true,
				},
				links: [
					'junction05',
				],
				prerequisite: [
					'lvl22',
				],
				type: 'level',
				position: {
					x: 18,
					y: 34,
				},
			},
			{
				name: 'lvl25',
				connections: {
					bottom: true,
					left: true,
					right: true,
				},
				links: [
					'lvl22',
					'lvl26',
					'lvl27',
				],
				prerequisite: [
					'lvl22',
				],
				type: 'level',
				position: {
					x: 82,
					y: 18,
				},
			},
			{
				name: 'lvl26',
				connections: {
					left: true,
				},
				links: [
					'lvl25',
				],
				prerequisite: [
					'lvl25',
				],
				type: 'level',
				position: {
					x: 114,
					y: 34,
				},
			},
			{
				name: 'lvl27',
				connections: {
					bottom: true,
					left: true,
					right: true,
					top: true,
				},
				links: [
					'lvl25',
					'lvl28',
					'lvl29',
					'lvl30',
				],
				prerequisite: [
					'lvl25',
				],
				type: 'level',
				position: {
					x: 82,
					y: 50,
				},
			},
			{
				name: 'lvl28',
				connections: {
					right: true,
				},
				links: [
					'lvl27',
				],
				prerequisite: [
					'lvl27',
				],
				type: 'level',
				position: {
					x: 50,
					y: 50,
				},
			},
			{
				name: 'lvl29',
				connections: {
					left: true,
				},
				links: [
					'lvl27',
				],
				prerequisite: [
					'lvl27',
				],
				type: 'level',
				position: {
					x: 146,
					y: 50,
				},
			},
			{
				name: 'lvl30',
				connections: {
					top: true,
				},
				links: [
					'lvl27',
				],
				prerequisite: [
					'lvl27',
				],
				type: 'level',
				position: {
					x: 82,
					y: 82,
				},
			},
			{
				name: 'junction05',
				links: [
					'lvl23',
					'lvl24',
				],
				prerequisite: [
					'lvl22',
				],
				type: 'junction',
				position: {
					x: 8,
					y: 24,
				},
			},
			{
				name: 'section04-lock',
				links: [
					'lvl22',
					'section04-boss',
				],
				prerequisite: [
					'lvl22',
					'lvl23',
					'lvl24',
					'lvl25',
					'lvl26',
					'lvl27',
					'lvl28',
					'lvl29',
					'lvl30',
				],
				type: 'lock',
				position: {
					x: 50,
					y: 98,
				},
			},
			{
				name: 'section04-boss',
				connections: {
					top: true,
				},
				links: [
					'section04-lock',
				],
				type: 'boss',
				prerequisite: [
					'section04-lock',
				],
				position: {
					x: 34,
					y: 130,
				},
			},
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
}
