/**
 * @typedef NavGraphNodeOptions
 * @property {string} groupID The group this component belongs to within the graph.
 * @property {string[]} groupLinks An array of IDs to which this node's group will be linked.
 * @property {string} [id] The identifier to use for the node representing this component in the graph.
 * @property {boolean} [isDefault = false] Whether this is the default node for its group.
 * @property {Function} [onActivate] A function to be called when this component's node is activated.
 * @property {Function} [onDeactivate] A function to be called when this component's node is deactivated.
 * @property {Function} [onFocus] A function to be called when this component's node is focused.
 * @property {import('react').MutableRefObject<HTMLElement>} targetRef A react Ref pointing to the element to be used for distance and angle checks.
 */
export const NavGraphNodeOptions = {}
