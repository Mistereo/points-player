import React, { PropTypes } from 'react'

import { BLUE, RED } from '../constants/colors'

import { pure } from 'recompose'

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
      fill={color === BLUE ? blueColor : (color === RED ? redColor : emptyColor)}
    />
    {isActive ?
      <circle
        cx={x}
        cy={y}
        r={Math.ceil(radius / 2)}
        fill="#f8f8f8"
      /> :
      <text
        {...{ x, y }}
        fill={labelColor}
        style={{
          dominantBaseline: 'central',
          textAnchor: 'middle',
        }}
      >{label}</text>}
  </g>
)

TreeNode.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  color: PropTypes.number,
  isActive: PropTypes.bool,
  label: PropTypes.node,
  radius: PropTypes.number,
  emptyColor: PropTypes.string,
  blueColor: PropTypes.string,
  redColor: PropTypes.string,
  labelColor: PropTypes.string,
  onClick: PropTypes.func,
}

export default pure(TreeNode)
