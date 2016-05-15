import { createSelector } from 'reselect'

import appearanceSelector from './appearanceSelector'
import {
  gameCursorSelector,
  gameMovesSelector,
  gameActiveNodeSelector,
  gameSelector,
  gameNavigationSelector,
  gameNavigationTreeSelector } from './gameSelectors'


export default createSelector(
  gameCursorSelector,
  gameMovesSelector,
  gameActiveNodeSelector,
  gameNavigationSelector,
  gameSelector,
  appearanceSelector,
  gameNavigationTreeSelector,
  (cursor, moves, activeNode, navigation, game, appearance, navigationTree) => ({
    cursor,
    moves,
    activeNode,
    navigation,
    navigationTree,
    game,
    appearance,
  })
)
