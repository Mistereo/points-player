import { createSelector } from 'reselect';

import cursorSelector from 'selectors/cursorSelector';
import nodesSelector from 'selectors/nodesSelector';


export default createSelector(
  cursorSelector,
  nodesSelector,
  (cursor, nodes) => nodes[cursor]
);
