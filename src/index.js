import 'babel-polyfill'
import 'classlist-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Application from './components/Application'
import 'bootstrap/dist/css/bootstrap.css'


const provider = <Provider store={store}><Application/></Provider>


render(provider, document.getElementById('app'))
