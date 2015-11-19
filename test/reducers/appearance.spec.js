import expect from 'expect';

import appearance, { initialState } from '../../src/reducers/appearance';
import { SET_APPEARANCE, RESET_APPEARANCE } from '../../src/constants/actions';

describe('appearance reducer', () => {
  it('should handle initial state', () => {
    expect(
      appearance(undefined, {})
    ).toEqual(
      initialState
    )
  })

  it('should handle SET_APPEARANCE', () => {
    expect(
      appearance({
        prop: 'value'
      }, {
        type: SET_APPEARANCE,
        payload: {
          prop: 'new value'
        }
      })
    ).toEqual({
      prop: 'new value'
    })
  })

  it('should handle RESET_APPEARANCE', () => {
    expect(
      appearance({}, { type: RESET_APPEARANCE })
    ).toEqual(
      initialState
    )
  })
});
