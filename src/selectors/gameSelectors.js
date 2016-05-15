import { createSelector } from 'reselect'

import Game from '../lib/Game'

const TREE_ROOT = 0

export const gameStateSelector = state => state.game

export const gameCursorSelector = createSelector(
  gameStateSelector,
  gameState => gameState.cursor
)

export const gameTreeSelector = createSelector(
  gameStateSelector,
  gameState => gameState.tree
)

export const gameMovesSelector = createSelector(
  gameTreeSelector,
  gameCursorSelector,
  (tree, cursor) => {
    let current = cursor
    const moves = []
    while (current) {
      moves.push(tree[current])
      current = tree[current].parent
    }
    return moves.reverse()
  }
)

export const gameRulesSelector = createSelector(
  gameStateSelector,
  gameState => gameState.rules
)

export const gameSelector = createSelector(
  gameMovesSelector,
  gameRulesSelector,
  (moves, rules) => {
    const game = new Game(rules)
    moves.forEach(move => game.apply(move))
    return game
  }
)

export const gameActiveNodeSelector = createSelector(
  gameTreeSelector,
  gameCursorSelector,
  (tree, cursor) => tree[cursor]
)

export const gameNavigationSelector = createSelector(
  gameTreeSelector,
  gameCursorSelector,
  (tree, cursor) => {
    const node = tree[cursor]

    let current = node
    let last = cursor
    while (current.childs.length) {
      last = current.childs[0]
      current = tree[last]
    }

    return {
      current: cursor,
      next: node.childs[0] || cursor,
      previous: (typeof node.parent === 'number') ? node.parent : cursor,
      first: 0,
      last,
    }
  }
)

function mapToIndex({ x, y }) {
  return x * 1000 + y
}

export const gameNavigationTreeSelector = createSelector(
  gameTreeSelector,
  (tree) => {
    const nodes = []
    const connections = []

    const used = {}
    function walk({ id, color, childs }, { x = 0, y = 0 } = {}) {
      while (used[mapToIndex({ x, y })]) {
        y++
      }
      used[mapToIndex({ x, y })] = true

      const node = { id, color, x, y }
      nodes.push(node)

      childs.forEach(child => {
        const childNode = walk(tree[child], {
          x: x + 1,
          y,
        })

        for (let i = y; i <= childNode.y; i++) {
          used[mapToIndex({ x, y: i })] = true
        }

        connections.push({
          from: node,
          to: childNode,
        })
      })

      return node
    }

    const root = tree[TREE_ROOT]

    if (root) {
      walk(root)
    }

    return {
      nodes,
      connections,
    }
  }
)
