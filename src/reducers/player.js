import nodes from './nodes';
import cursor from './cursor';


export default function player(state, action) {
  const nodesState = nodes(state.nodes, action);
  const cursorState = cursor(state.cursor, action, nodesState);

  return {
    ...state,
    cursor: cursorState,
    nodes: nodesState,
  };
}
