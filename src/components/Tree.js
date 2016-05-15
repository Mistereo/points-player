import React from 'react';
import find from 'lodash/find';

import Node from './TreeNode';


const TREE_ROOT = 0;

function createCC({ nodeRadius, nodeSize }) {
  return x => (x * nodeSize + nodeRadius);
}

function connectionPath(from, to) {
  return `M ${from.x} ${from.y} L ${from.x} ${to.y} L ${to.x} ${to.y}`;
}

const Tree = ({
  cursor = TREE_ROOT,
  nodes = [],
  connections = [],
  nodeRadius = 9,
  nodeSize = 22,
  connectionPathWidth = 2,
  connectionPathColor = '#333',
  padding = 6,
  actions,
  ...otherProps,
}) => {
  const cc = createCC({ nodeRadius, nodeSize });

  const maxX = Math.max(0, ...nodes.map(node => cc(node.x)));
  const maxY = Math.max(0, ...nodes.map(node => cc(node.y)));

  const width = maxX + nodeRadius + 2 * padding;
  const height = maxY + nodeRadius + 2 * padding;

  const path = connections.map(
    conn => connectionPath({
      x: cc(conn.from.x),
      y: cc(conn.from.y),
    }, {
      x: cc(conn.to.x),
      y: cc(conn.to.y),
    })
  ).join(' ');

  const activeNode = find(
    nodes,
    { id: cursor }
  );

  return (
    <div className="points-player__game-tree" ref={node => {
      if (node && activeNode) {
        node.scrollLeft = cc(activeNode.x) - node.offsetWidth / 2;
        node.scrollTop = cc(activeNode.y) - node.offsetHeight / 2;
      }
    }}>
      <svg width={width}
           height={height}
           style={{ padding: padding }}>
        <path d={path}
              fill="none"
              strokeWidth={connectionPathWidth}
              stroke={connectionPathColor}/>
        {nodes.map(item =>
          <Node {...otherProps}
                x={cc(item.x)}
                y={cc(item.y)}
                radius={nodeRadius}
                isActive={item.id === cursor}
                color={item.color}
                key={item.id}
                label={item.x}
                onClick={actions.selectMove.bind(this, item.id)}/>)}
      </svg>
    </div>
  );
};

export default Tree;
