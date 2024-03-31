// Module imports
import PropTypes from 'prop-types'





// Local imports
import { useNavGraphNode } from './NavGraphContext.jsx'





/**
 * Creates a node in the nav graph for the wrapped component.
 *
 * @component
 * @param {object} props All props.
 * @param {object} [props.children] The wrapped component.
 * @param {object} props.groupID The ID of the group to which this node will be assigned.
 * @param {object} [props.id] The ID of this node.
 * @param {object} props.isDefault The ID of this node.
 * @param {object} [props.groupLinks] A list of group IDs to which this node should be linked.
 * @param {object} props.onActivate A function to be called when this node is activated.
 * @param {object} [props.onDeactivate] A function to be called when this node is deactivated.
 * @param {object} [props.onFocus] A function to be called when this node is focused.
 * @param {object} props.targetRef A ref to the element that will be used to determine this node's position on the page.
 */
export function NavGraphNode({
	children = null,
	groupID,
	id,
	isDefault = false,
	groupLinks = [],
	onActivate,
	onDeactivate,
	onFocus,
	targetRef,
}) {
	useNavGraphNode({
		groupID,
		id,
		isDefault,
		groupLinks,
		onActivate,
		onDeactivate,
		onFocus,
		targetRef,
	}, [
		groupID,
		id,
		isDefault,
		groupLinks,
		onActivate,
		onDeactivate,
		onFocus,
		targetRef,
	])

	return children
}

NavGraphNode.propTypes = {
	children: PropTypes.node,
	groupID: PropTypes.string.isRequired,
	groupLinks: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	])),
	id: PropTypes.string.isRequired,
	isDefault: PropTypes.bool,
	onActivate: PropTypes.func.isRequired,
	onDeactivate: PropTypes.func,
	onFocus: PropTypes.func,
	targetRef: PropTypes.object.isRequired,
}
