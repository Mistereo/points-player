import { createSelector } from 'reselect';

import nodesSelector from './nodesSelector';
import cursorSelector from './cursorSelector';
import appearanceSelector from './appearanceSelector';


export default createSelector(
  cursorSelector,
  nodesSelector,
  appearanceSelector,
  (cursor, nodes, appearance) => ({
    cursor,
    nodes,
    ...appearance,
  })
);
