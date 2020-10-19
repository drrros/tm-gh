import * as API from './../api/Api'
import {push} from "connected-react-router";
import {sendTaskDataToProps} from "./createTaskReducer";

const SET_TASKS = 'GET_TASKS'
const TOGGLE_FETCHING = 'TOGGLE_FETCHING'
const TOGGLE_DELETE_BUTTON = 'TOGGLE_DELETE_BUTTON'
const SET_EDIT_TASK_ID = 'SET_EDIT_TASK_ID'
const CHANGE_FILTER = 'CHANGE_FILTER'
const CHANGE_FILTERED_TASKS = 'CHANGE_FILTERED_TASKS'


const initialState = {
    taskList: [],
    fetchingTasks: false,
    deleteButtonDisabled: false,
    deleteButtonDisabledId: '',
    editTaskId: '',
    filterText: '',
    filteredTasks: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASKS:
            return {
                ...state, taskList: action.payload, filteredTasks: action.payload
            }
        case TOGGLE_FETCHING:
            return {
                ...state, fetchingTasks: !state.fetchingTasks
            }
        case SET_EDIT_TASK_ID:
            return {
                ...state, editTaskId: action.payload
            }
        case TOGGLE_DELETE_BUTTON:
            return {
                ...state,
                deleteButtonDisabled: !state.deleteButtonDisabled,
                deleteButtonDisabledId: action.payload,
            }
        case CHANGE_FILTER:
            return {
                ...state, filterText: action.payload
            }
        case CHANGE_FILTERED_TASKS:
            return {
                ...state, filteredTasks: action.payload
            }
        default:
            return state
    }
}

const setTasksAC = (taskList) => {
    return {
        type: SET_TASKS,
        payload: taskList
    }
}

const toggleFetchingAC = () => {
    return {
        type: TOGGLE_FETCHING,
    }
}

const deleteButtonAC = (id) => {
    return {
        type: TOGGLE_DELETE_BUTTON,
        payload: id
    }
}

export const setEditTaskIdAC = (id) => {
    return {
        type: SET_EDIT_TASK_ID,
        payload: id
    }
}

export const changeFilterAC = (filter) => {
    return {
        type: CHANGE_FILTER,
        payload: filter
    }
}

export const changeFilteredTasksAC = (filteredTasks) => {
    return {
        type: CHANGE_FILTERED_TASKS,
        payload: filteredTasks
    }
}

export const getTasksThunkCreator = () => {
    return async (dispatch) => {
        dispatch(toggleFetchingAC())
        try {
            const response = await API.getTasks()
            dispatch(setTasksAC(response.data))
            dispatch(toggleFetchingAC())
        } catch (e) {
            //pass
        }
    }
}

export const deleteTaskThunkCreator = (id) => {
    return async (dispatch) => {
        dispatch(deleteButtonAC(id))
        try {
            await API.deleteTask(id)
            dispatch(deleteButtonAC(''))
        } catch (e) {
            //pass
        }
    }
}

export const enterEditModeTaskThunkCreator = (id) => {
    return (dispatch, getState) => {
        const state = getState()
        const idIndex = state.taskList.taskList.findIndex((item) => {
            return item.id === id
        })
        dispatch(setEditTaskIdAC(id))
        dispatch(sendTaskDataToProps(id, state.taskList.taskList[idIndex]))
        dispatch(push('/edit_task'))
    }
}
//
// export const filterTasks = (filter) => {
//     return (dispatch, getState) => {
//         const state = getState()
//         let filteredTasks = state.taskList.taskList.filter((el) => {
//             return Boolean(
//                 el.task_header.toLowerCase().includes(filter.toLowerCase()) ||
//                 el.task_content.toLowerCase().includes(filter.toLowerCase())
//             )
//         })
//         dispatch(changeFilteredTasksAC(filteredTasks))
//     }
// }

export default reducer
