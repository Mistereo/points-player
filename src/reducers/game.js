import merge from 'lodash/object/merge';
import union from 'lodash/array/union';
import findIndex from 'lodash/array/findIndex';
import SGF from 'sgfjs';

import normalizeSGFTree from '../utils/normalizeSGFTree';
import Game from '../lib/Game';
import createReducer from '../utils/createReducer'
import cursor from './cursor';
import {
  LOAD_SGF,
  ADD_MOVE,
  ADD_COMMENT,
  ADD_MARKER,
  NEXT_MOVE,
  PREV_MOVE,
  FIRST_MOVE,
  LAST_MOVE,
  SELECT_MOVE,
  CREATE_GAME } from '../constants/actions';
import * as Colors from '../constants/colors';
import { gameSelector } from '../selectors/gameSelectors';


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

function convertToCoords(p) {
  const map = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return {
    x: map.indexOf(p[0]),
    y: map.indexOf(p[1])
  }
}

export default createReducer(initialState, {
  [NEXT_MOVE]: cursorHandler,
  [PREV_MOVE]: cursorHandler,
  [FIRST_MOVE]: cursorHandler,
  [LAST_MOVE]: cursorHandler,
  [SELECT_MOVE]: cursorHandler,
  [CREATE_GAME]: (state, { payload }) => {
    return {
      ...initialState,
      rules: {
        ...initialState.rules,
        width: payload.width,
        height: payload.height,
      },
    };
  },
  [LOAD_SGF]: (state, { payload }) => {
    const parsed = SGF.parse(payload);
    const root = parsed;

    let [width, height] = (root.props['SZ'] || '39:32').split(':').map(Number);

    if (!height) {
      height = width;
    }

    const rules = {
      set: 'russian',
      width,
      height
    };

    const tree = {
      0: {
        id: 0,
        childs: [],
      },
    };

    let id = 1;
    let warning = null;
    const game = new Game(rules);

    function processMove(move, parent) {
      if (game.check(move)) {
        game.apply(move);
        const index = id++;
        tree[index] = {
          id: index,
          parent: parent,
          ...move,
          childs: []
        };
        tree[parent].childs.push(index);
        return index;
      }
      warning = "Bad SGF game data.";
      return parent;
    }

    function walk({ props, childs }, parent = 0) {
      if (props['AB']) {
        let moves = props['AB'];
        if (!Array.isArray(moves)) {
          moves = [moves];
        }
        moves.map(convertToCoords).forEach(
          position => {
            parent = processMove({ ...position, color: Colors.BLUE }, parent)
          }
        );
      }
      if (props['AW']) {
        let moves = props['AW'];
        if (!Array.isArray(moves)) {
          moves = [moves];
        }
        moves.map(convertToCoords).forEach(
          position => {
            parent = processMove({ ...position, color: Colors.RED }, parent)
          }
        );
      }

      if (props['B']) {
        let position = convertToCoords(props['B']);
        parent = processMove({ ...position, color: Colors.BLUE }, parent);
      }
      if (props['W']) {
        let position = convertToCoords(props['W']);
        parent = processMove({ ...position, color: Colors.RED }, parent);
      }
      childs.forEach(child => walk(child, parent));
    }

    walk(parsed);

    return {
      ...state,
      cursor: 0,
      rules,
      tree,
    };
  },
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

      return {
        ...state,
        cursor: id,
        tree: {
          ...state.tree,
          [position]: {
            ...state.tree[position],
            childs: union([childs[index]], childs)
          }
        }
      }
    }

    // NOTE: Maybe it's better to introduce id generator.
    const ids = Object.keys(tree).map(Number);
    const id = Math.max(-1, ...ids) + 1;

    const move = {
      id, x, y, color,
      parent: position,
      childs: [],
    };

    const game = gameSelector({
      game: state
    });

    move.captures = game.apply(move);
    move.processed = true;

    return {
      ...state,
      cursor: id,
      tree: {
        ...state.tree,
        [id]: move,
        [position]: {
          ...state.tree[position],
          childs: union([id], target.childs),
        }
      }
    }
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
