module.exports = {
	branches: [
		'main',
		{
			name: 'beta',
			prerelease: true,
		},
		{
			name: 'alpha',
			prerelease: true,
		},
	],
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		'semantic-release-export-data',
	],
}
