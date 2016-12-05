import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

import config from '../configs/application'

const params = [reducers]

if(!config.production && window.devToolsExtension) {
  params.push(window.devToolsExtension())
}
params.push(applyMiddleware(thunk))

export default createStore(...params)
