import merge from 'lodash/object/merge';
import union from 'lodash/array/union';
import findIndex from 'lodash/array/findIndex';

import createReducer from '../utils/createReducer';
import cursor from './cursor';
import {
  ADD_MOVE,
  ADD_COMMENT,
  ADD_MARKER,
  NEXT_MOVE,
  PREV_MOVE,
  FIRST_MOVE,
  LAST_MOVE,
  SELECT_MOVE } from '../constants/actions';
import * as Colors from '../constants/colors';


export const initialState = {
  cursor: 0,
  tree: {
    0: {
      id: 0,
      childs: [],
    },
  },
  rules: {
    set: 'russian',
    width: 39,
    height: 32,
  },
  info: {},
};

function cursorHandler(state, action) {
  return {
    ...state,
    cursor: cursor(state.cursor, action, state.tree)
  };
}

export default createReducer(initialState, {
  [NEXT_MOVE]: cursorHandler,
  [PREV_MOVE]: cursorHandler,
  [FIRST_MOVE]: cursorHandler,
  [LAST_MOVE]: cursorHandler,
  [SELECT_MOVE]: cursorHandler,
  [ADD_MOVE]: (state, { payload }) => {
    // NOTE: this handler needs optimisation

    const { tree } = state;
    const { x, y, position } = payload;

    const { color = Colors.BLUE } = payload;

    const target = tree[position];
    const index = findIndex(
      target.childs.map(i => tree[i]),
      { x, y, color }
    );

    if (index !== -1) {
      // Node with this move already exists, move it to the begining
      const childs = target.childs;
      const id = childs[index];

      return merge({}, state, {
        cursor: id,
        tree: {
          [position]: {
            childs: union([childs[index]], childs),
          },
        },
      });
    }

    // NOTE: Maybe it's better to introduce id generator.
    const ids = Object.keys(tree).map(Number);
    const id = Math.max(-1, ...ids) + 1;

    const move = {
      id, x, y, color,
      parent: position,
      childs: [],
    };

    return merge({}, state, {
      cursor: id,
      tree: {
        [id]: move,
        [position]: {
          childs: union([id], target.childs),
        },
      },
    });
  },
  [ADD_COMMENT]: (state, { payload }) => {
    const { position, comment } = payload;

    return merge({}, state, {
      tree: {
        [position]: {
          comment,
        },
      },
    });
  },
  [ADD_MARKER]: (state, { payload }) => {
    const { tree } = state;
    const { position, type, params = {} } = payload;

    return merge({}, state, {
      tree: {
        [position]: {
          markers: union(tree[position].markers || [], { type, params }),
        },
      },
    });
  },
});
