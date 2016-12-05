import { searchAlbum, searchArtist, makeCall } from '../../services'
import Application from '../../components/Application'
export const constants = {
  APPLICATION_STARTED: 'APPLICATION_STARTED',
  UPDATE_SEARCH_VALUE: 'UPDATE_SEARCH_VALUE',
  LOAD_RESULTS: 'LOAD_RESULTS',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  FAILED: 'FAILED'
}

export const actions = {

  started(){
    return {
        type: constants.APPLICATION_STARTED
      }
  },
  search(type){
    return (dispatch, getState) => {
      let method
      switch (type) {
        case Application.ARTISTS:
          method = searchArtist
          break;
        default:
          method = searchAlbum
          break;
      }
      const param = getState().application.get(type === Application.ARTISTS ? 'artist' : 'album')
      if(param.length < 1) {
        return
      }
      return dispatch(actions.pagination(method(param)))
    }
  },
  pagination(url){
    return async(dispatch) => {
      try {
        dispatch(actions.loadingResults())
        const data = await makeCall(url)
        dispatch(actions.loadedResults())
        dispatch(actions.updateResults(data))
      } catch (e) {
        dispatch(actions.failed())
      }
    }
  },
  failed(){
    return {
      type: constants.FAILED
    }
  },
  loadedResults(){
    return {
      type: constants.LOADED
    }
  },
  loadingResults(){
    return {
      type: constants.LOADING
    }
  },
  updateResults(data){
    return {
      type: constants.LOAD_RESULTS,
      data
    }
  },
  searchValue(value, type){
    return { type: constants.UPDATE_SEARCH_VALUE, params: { type, value } }
  }
}
