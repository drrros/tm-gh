import * as API from './../api/Api'
import {push} from 'connected-react-router'
import {setEditTaskIdAC} from "./taskListReducer";

const CHANGE_HEAD = 'CHANGE_HEAD'
const CHANGE_BODY = 'CHANGE_BODY'
const CHANGE_DATETIME = 'CHANGE_DATETIME'
const SELECT = 'SELECT'
const RESET = 'RESET'
const CHANGE_BUTTON = 'CHANGE_BUTTON'
const CHANGE_ERROR_MESSAGE = 'CHANGE_ERROR_MESSAGE'

const initialState = {
    head: '',
    body: '',
    dateTime: '',
    select: '',
    buttonDisabled: false,
    errorMessage: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_HEAD:
            return {
                ...state, head: action.payload
            }
        case CHANGE_BODY:
            return {
                ...state, body: action.payload
            }
        case CHANGE_DATETIME:
            return {
                ...state, dateTime: action.payload
            }
        case SELECT:
            return {
                ...state, select: action.payload
            }
        case CHANGE_BUTTON:
            return {
                ...state, buttonDisabled: action.payload
            }
        case CHANGE_ERROR_MESSAGE:
            return {
                ...state, errorMessage: action.payload
            }
        case RESET:
            return {
                ...initialState
            }
        default:
            return state
    }
}


export const changeHeadAC = (head) => {
    return {
        type: CHANGE_HEAD,
        payload: head
    }
}

export const changeBodyAC = (body) => {
    return {
        type: CHANGE_BODY,
        payload: body
    }
}

export const changeDateTimeAC = (data) => {
    return {
        type: CHANGE_DATETIME,
        payload: data
    }
}

export const selectAC = (value) => {
    return {
        type: SELECT,
        payload: value
    }
}

export const resetAC = () => {
    return {
        type: RESET,
    }
}

export const changeButtonAC = (status) => {
    return {
        type: CHANGE_BUTTON,
        payload: status
    }
}

export const changeErrorMessageAC = (message) => {
    return {
        type: CHANGE_ERROR_MESSAGE,
        payload: message
    }
}

export default reducer

// export const thunkCreator = (something) => dispatch => {
//     return dispatch(something)
// }

export const createTaskThunkCreator = (head, body, select, dateTime) => {
    return async (dispatch) => {
        if (head && body && select && dateTime) {
            dispatch(changeButtonAC(true))
            try {
                const response = await API.createTask(head, body, select, dateTime)
                if (response.status === 201) {
                    dispatch(changeButtonAC(false))
                    dispatch(push('/'))
                    dispatch(resetAC())
                }
            } catch (e) {
                dispatch(changeErrorMessageAC('Неправильный формат времени ', e.response.data))
            }
        }
    }
}

export const editTaskThunkCreator = (head, body, select, dateTime, id) => {
    return async (dispatch) => {
        if (head && body && select && dateTime) {
            dispatch(changeButtonAC(true))
            try {
                const response = await API.editTask(head, body, select, dateTime, id)
                if (response.status === 200) {
                    dispatch(changeButtonAC(false))
                    dispatch(push('/'))
                    dispatch(resetAC())
                }
            } catch (e) {
                dispatch(changeErrorMessageAC('Неправильный формат времени ', e.response.data))
            }
        }
    }
}

export const sendTaskDataToProps = (taskId, taskData) => {
    return (dispatch) => {
        dispatch(changeHeadAC(taskData.task_header))
        dispatch(changeBodyAC(taskData.task_content))
        dispatch(selectAC(taskData.task_type))
        let dateTimeFormat = new Date(taskData.task_date)
        dateTimeFormat = dateTimeFormat.toLocaleString('ru-RU')
        dateTimeFormat = dateTimeFormat.slice(0, -3)
        dateTimeFormat = dateTimeFormat.replace(/\./g, '-')
        dateTimeFormat = dateTimeFormat.replace(',', '')
        dispatch(changeDateTimeAC(dateTimeFormat))
    }
}

export const returnButtonHandler = (e) => {
    return (dispatch) => {
        e.preventDefault()
        dispatch(resetAC())
        dispatch(setEditTaskIdAC(''))
        dispatch(push('/'))
    }
}
