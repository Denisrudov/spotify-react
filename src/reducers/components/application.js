import { fromJS } from 'immutable'
import * as actions from '../../action/components/applicationActions'
const initialState = fromJS({
  artist: '',
  album: '',
})

export default function application(state = initialState, action) {
  switch (action.type) {
    case actions.constants.UPDATE_SEARCH_VALUE:
      const { params: { type, value } } = action
      state = state.set(type, value)
      break
    case actions.constants.LOAD_RESULTS:
      const key = Object.keys(action.data)[ 0 ]
      const data = action.data[ key ]
      state = state.set(key, data)
      break
    case actions.constants.LOADING:
      state = state.set('loading', true).set('failed', false)
      break
    case actions.constants.LOADED:
      state = state.set('loading', false)
      break
    case actions.constants.FAILED:
      state = state.set('loading', false).set('failed', true)
      break
  }
  return state
}
