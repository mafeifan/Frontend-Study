
let createStore = require('redux').createStore;

function counter(state=0, action) {
  switch (action.type) {
    case 'ADD':
      return state + 1
      break;
    case 'SUB':
      return state - 1
      break;
    default:
      return state
      break;
  }
}

let store = createStore(counter)

store.subscribe(() => console.log(store.getState()))

store.dispatch({ type: 'ADD' })
store.dispatch({ type: 'ADD' })
store.dispatch({ type: 'SUB' })
