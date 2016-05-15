import expect from 'expect'

import appearance, { initialState } from '../../src/reducers/appearance'
import { setAppearance, resetAppearance } from '../../src/actions'

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
        prop: 'value',
        anotherProp: 'value',
      }, {
        type: setAppearance.getType(),
        payload: {
          prop: 'new value',
        },
      })
    ).toEqual({
      prop: 'new value',
      anotherProp: 'value',
    })
  })

  it('should handle RESET_APPEARANCE', () => {
    expect(
      appearance({}, { type: resetAppearance.getType() })
    ).toEqual(
      initialState
    )
  })
})
