/**
 * Calculates the distance between nodes based on their elements' screen space
 * positions.
 *
 * @param {object} nodeA The first node to test.
 * @param {object} nodeB The second node to test.
 * @returns {number} The distance between the two nodes in pixels.
 */
export function getDistanceBetweenNodes(nodeA, nodeB) {
	const boundingRectA = nodeA.data.targetRef.current.getBoundingClientRect()
	const boundingRectB = nodeB.data.targetRef.current.getBoundingClientRect()

	let xDistance = 0
	let yDistance = 0

	if (boundingRectA.left > boundingRectB.right) {
		xDistance = boundingRectA.left - boundingRectB.right
	} else if (boundingRectA.right < boundingRectB.left) {
		xDistance = boundingRectA.right - boundingRectB.left
	} else {
		const centerA = boundingRectA.left + (boundingRectA.width / 2)
		const centerB = boundingRectB.left + (boundingRectB.width / 2)

		xDistance = centerA - centerB
	}

	if (boundingRectA.top > boundingRectB.bottom) {
		yDistance = boundingRectA.top - boundingRectB.bottom
	} else if (boundingRectA.bottom < boundingRectB.top) {
		yDistance = boundingRectA.bottom - boundingRectB.top
	} else {
		const centerA = boundingRectA.top + (boundingRectA.height / 2)
		const centerB = boundingRectB.top + (boundingRectB.height / 2)

		yDistance = centerA - centerB
	}

	return (xDistance ** 2) + (yDistance ** 2)
}
