import C from '../constants'
import appReducer from './reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

// to create a middleware we need a function that returns a function that returns a function that returns a functions.(high order function)
const consoleMessages = store => next => action => {

	let result

	//group all associated actions
	console.groupCollapsed(`dispatching action => ${action.type}`)
	console.log('ski days', store.getState().allSkiDays.length)
	// dispatch the actions
	result = next(action)
      // we get state info after the actions is dispatched
	let { allSkiDays, goal, errors, resortNames } = store.getState()

	console.log(`

		ski days: ${allSkiDays.length}
		goal: ${goal}
		fetching: ${resortNames.fetching}
		suggestions: ${resortNames.suggestions}
		errors: ${errors.length}

	`)

	console.groupEnd()

	return result

}

//thunk: higher order functions give control over when and bow often the actions are dispatched

export default (initialState={}) => {
	return applyMiddleware(thunk, consoleMessages)(createStore)(appReducer, initialState)
}



