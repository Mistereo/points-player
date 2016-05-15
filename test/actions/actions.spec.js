import expect from 'expect'

import * as Colors from '../../src/constants/colors'
import * as Markers from '../../src/constants/markers'
import * as Actions from '../../src/actions'

describe('actions', () => {
  it('createGame should create CREATE_GAME action', () => {
    const rules = {
      width: 30,
      height: 30,
      set: 'russian',
    }
    expect(Actions.createGame(rules)).toEqual({
      type: 'CREATE_GAME',
      payload: rules,
      meta: undefined,
    })
  })

  it('loadSGF should create LOAD_SGF action', () => {
    expect(Actions.loadSGF('(;FF[4];B[aa];W[bb](;B[cc];W[bd])(;B[hh]))')).toEqual({
      type: Actions.loadSGF.getType(),
      payload: '(;FF[4];B[aa];W[bb](;B[cc];W[bd])(;B[hh]))',
      meta: undefined,
    })
  })

  it('prevMove should create PREV_MOVE action', () => {
    expect(Actions.prevMove()).toEqual({
      type: Actions.prevMove.getType(),
      payload: undefined,
      meta: undefined,
    })
  })

  it('nextMove should create NEXT_MOVE action', () => {
    expect(Actions.nextMove()).toEqual({
      type: Actions.nextMove.getType(),
      payload: undefined,
      meta: undefined,
    })
  })

  it('firstMove should create FIRST_MOVE action', () => {
    expect(Actions.firstMove()).toEqual({
      type: Actions.firstMove.getType(),
      payload: undefined,
      meta: undefined,
    })
  })

  it('lastMove should create LAST_MOVE action', () => {
    expect(Actions.lastMove()).toEqual({
      type: Actions.lastMove.getType(),
      payload: undefined,
      meta: undefined,
    })
  })

  it('selectMove should create SELECT_MOVE action', () => {
    expect(Actions.selectMove(7)).toEqual({
      type: Actions.selectMove.getType(),
      payload: 7,
      meta: undefined,
    })
  })

  it('addMove should create ADD_MOVE action', () => {
    const position = 42
    const move = { x: 10, y: 10, color: Colors.BLUE }
    expect(
      Actions.addMove(position, move)
    ).toEqual({
      type: Actions.addMove.getType(),
      payload: { position, ...move },
      meta: undefined,
    })
  })

  it('addComment should create ADD_COMMENT action', () => {
    const position = 42
    const comment = 'Lorem ipsum'
    expect(
      Actions.addComment(position, comment)
    ).toEqual({
      type: Actions.addComment.getType(),
      payload: { position, comment },
      meta: undefined,
    })
  })

  it('addMarker should create ADD_MARKER action', () => {
    const position = 42
    const type = Markers.CIRCLE
    const params = {
      x: 10,
      y: 10,
    }
    expect(
      Actions.addMarker(position, type, params)
    ).toEqual({
      type: Actions.addMarker.getType(),
      payload: { position, type, params },
      meta: undefined,
    })
  })

  it('setAppearance should create SET_APPEARANCE action', () => {
    expect(Actions.setAppearance({
      redColor: 'red',
    })).toEqual({
      type: Actions.setAppearance.getType(),
      payload: { redColor: 'red' },
      meta: undefined,
    })
  })

  it('resetAppearance should create RESET_APPEARANCE action', () => {
    expect(Actions.resetAppearance()).toEqual({
      type: Actions.resetAppearance.getType(),
      payload: undefined,
      meta: undefined,
    })
  })
})
