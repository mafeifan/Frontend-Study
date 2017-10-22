import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom'
import Header from './Header'
import Content from './Content'
import Demo from './Demo'
import './index.css'

const themeReducer = (state, action) => {
  if (!state) return {
    themeColor: 'red'
  }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, themeColor: action.themeColor }
    default:
      return state
  }
}

const store = createStore(themeReducer)

class Index extends Component {
  static childContextTypes = {
    store: PropTypes.object
  }

  getChildContext () {
    return { store }
  }

  render () {
    return (
      <div>
        <Header />
        <Content />
        <Demo />
      </div>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>,
  document.getElementById('root')
)

