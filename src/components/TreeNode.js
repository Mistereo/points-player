import React from 'react';

import { BLUE, RED } from '../constants/colors';

const TreeNode = ({
  x,
  y,
  color,
  isActive = false,
  label = '',
  radius = 9,
  emptyColor = '#AAAAAA',
  blueColor = '#4169E1',
  redColor = '#DC143C',
  labelColor = '#FFFFFF',
  onClick,
}) => (
  <g onClick={onClick} className="points-player__tree-node">
    <circle
      cx={x}
      cy={y}
      r={radius}
      fill={color === BLUE ? blueColor : (color === RED ? redColor : emptyColor)}/>
    {isActive ?
      <circle
        cx={x}
        cy={y}
        r={Math.ceil(radius / 2)}
        fill="#f8f8f8"/> :
      <text
        {...{x, y}}
        fill={labelColor}
        style={{
          dominantBaseline: 'central',
          textAnchor: 'middle',
        }}>{label}</text>}
  </g>
);

export default TreeNode;
