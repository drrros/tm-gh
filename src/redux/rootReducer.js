import {combineReducers} from 'redux'
import createTask from './createTaskReducer'
import taskList from './taskListReducer'
import auth from './authReducer'
import {connectRouter} from 'connected-react-router'


const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    createTask,
    taskList,
    auth
})

export default createRootReducer
