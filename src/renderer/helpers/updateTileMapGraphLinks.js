/**
 * Updates the links in a tilemap's graph based on the traversability of its nodes.
 */
export function updateTileMapGraphLinks(graph) {
	graph.forEachNode(node => {
		const {
			isBlocking,
			isTraversable,
			position,
		} = node.data

		const {
			x,
			y,
		} = position

		if (isTraversable) {
			const adjacentNodeIDs = [
				// east
				`${x + 1}|${y}`,

				// west
				`${x - 1}|${y}`,

				// south
				`${x}|${y + 1}`,

				// north
				`${x}|${y - 1}`,
			]

			adjacentNodeIDs.forEach(adjacentNodeID => {
				const adjacentNode = graph.getNode(adjacentNodeID)

				if (adjacentNode?.data.isTraversable) {
					graph.addLink(node.id, adjacentNodeID)
				}
			})
		} else if (isBlocking) {
			graph.forEachLinkedNode(node.id, (_, link) =>{
				graph.removeLink(link)
			})
		}
	})
}
