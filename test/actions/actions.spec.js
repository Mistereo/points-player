import expect from 'expect';

import * as Types from '../../src/constants/actions';
import * as Colors from '../../src/constants/colors';
import * as Markers from '../../src/constants/markers';
import * as Actions from '../../src/actions';

describe('actions', () => {
  it('createGame should create CREATE_GAME action', () => {
    const rules = {
      width: 30,
      height: 30,
      set: 'russian'
    };
    expect(Actions.createGame(rules)).toEqual({ type: 'CREATE_GAME', payload: rules });
  })

  it('loadSGF should create LOAD_SGF action', () => {
    expect(Actions.loadSGF('(;FF[4];B[aa];W[bb](;B[cc];W[bd])(;B[hh]))')).toEqual({
      type: Types.LOAD_SGF,
      payload: '(;FF[4];B[aa];W[bb](;B[cc];W[bd])(;B[hh]))'
    });
  })

  it('prevMove should create PREV_MOVE action', () => {
    expect(Actions.prevMove()).toEqual({ type: Types.PREV_MOVE })
  })

  it('nextMove should create NEXT_MOVE action', () => {
    expect(Actions.nextMove()).toEqual({ type: Types.NEXT_MOVE })
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

  it('addMove should create ADD_MOVE action', () => {
    const position = 42;
    const move = { x: 10, y: 10, color: Colors.BLUE };
    expect(
      Actions.addMove(position, move)
    ).toEqual({
      type: Types.ADD_MOVE,
      payload: { position, ...move }
    })
  })

  it('addComment should create ADD_COMMENT action', () => {
    const position = 42;
    const comment = 'Lorem ipsum';
    expect(
      Actions.addComment(position, comment)
    ).toEqual({
      type: Types.ADD_COMMENT,
      payload: { position, comment }
    })
  })

  it('addMarker should create ADD_MARKER action', () => {
    const position = 42;
    const type = Markers.CIRCLE;
    const params = {
      x: 10,
      y: 10
    }
    expect(
      Actions.addMarker(position, type, params)
    ).toEqual({
      type: Types.ADD_MARKER,
      payload: { position, type, params }
    })
  })

  it('setAppearance should create SET_APPEARANCE action', () => {
    expect(Actions.setAppearance({
      redColor: 'red',
    })).toEqual({
      type: Types.SET_APPEARANCE,
      payload: { redColor: 'red' }
    });
  })

  it('resetAppearance should create RESET_APPEARANCE action', () => {
    expect(Actions.resetAppearance()).toEqual({ type: Types.RESET_APPEARANCE });
  })
});
