import expect from 'expect';

import * as Types from '../../src/constants/actions';
import * as Actions from '../../src/actions';

describe('actions', () => {
  it('nextMove should create NEXT_MOVE action', () => {
    expect(Actions.nextMove()).toEqual({ type: Types.NEXT_MOVE })
  })

  it('prevMove should create PREV_MOVE action', () => {
    expect(Actions.prevMove()).toEqual({ type: Types.PREV_MOVE })
  })

  it('firstMove should create FIRST_MOVE action', () => {
    expect(Actions.firstMove()).toEqual({ type: Types.FIRST_MOVE })
  })

  it('lastMove should create LAST_MOVE action', () => {
    expect(Actions.lastMove()).toEqual({ type: Types.LAST_MOVE })
  })

  it('selectMove should create SELECT_MOVE action', () => {
    expect(Actions.selectMove(7)).toEqual({ type: Types.SELECT_MOVE, payload: 7 });
  })

  it('setAppearance should create SET_APPEARANCE action', () => {
    expect(Actions.setAppearance({
      redColor: 'red',
    })).toEqual({
      type: Types.SET_APPEARANCE,
      payload: {
        redColor: 'red',
      }
    });
  })

  it('resetAppearance should create RESET_APPEARANCE action', () => {
    expect(Actions.resetAppearance()).toEqual({ type: Types.RESET_APPEARANCE });
  })

  it('loadSGF should create LOAD_SGF action', () => {
    expect(Actions.loadSGF('(;FF[4];B[aa];W[bb](;B[cc];W[bd])(;B[hh]))')).toEqual({
      type: Types.LOAD_SGF,
      payload: '(;FF[4];B[aa];W[bb](;B[cc];W[bd])(;B[hh]))'
    });
  })
});
