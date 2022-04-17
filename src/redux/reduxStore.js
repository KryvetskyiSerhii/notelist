import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware  from 'redux-thunk'
import notesReducer from './notesReducer'

let reducersBunch = combineReducers({
    notes: notesReducer
})

let store = createStore(reducersBunch, applyMiddleware(thunkMiddleware))
window.store = store
export default store