import * as API from './../api/Api'
import {push} from 'connected-react-router'


const CHANGE_ACCESS_TOKEN = 'CHANGE_ACCESS_TOKEN'
const CHANGE_REFRESH_TOKEN = 'CHANGE_REFRESH_TOKEN'
const CHANGE_LOGIN = 'CHANGE_LOGIN'
const CHANGE_NEWUSERNAME = 'CHANGE_NEWUSERNAME'
const CHANGE_NEWUSEREMAIL = 'CHANGE_NEWUSEREMAIL'
const CHANGE_NEWUSERPASSWORD = 'CHANGE_NEWUSERPASSWORD'
const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
const CHANGE_AUTH = 'CHANGE_AUTH'
const CHANGE_BUTTON = 'CHANGE_BUTTON'
const CHANGE_REGISTRATIONERRORMESSAGE = 'CHANGE_REGISTRATIONERRORMESSAGE'
const CHANGE_LOGINERRORMESSAGE = 'CHANGE_LOGINERRORMESSAGE'
const CHANGE_LOGOFF_CONFIRM = 'CHANGE_LOGOFF_CONFIRM'
const CHANGE_REG_MODAL = 'CHANGE_REG_MODAL'

const initialState = {
    isAuthenticated: localStorage.getItem('refresh_token') ? true : false,
    accessToken: localStorage.getItem('access_token') ? localStorage.getItem('access_token') : '',
    refreshToken: localStorage.getItem('refresh_token') ? localStorage.getItem('refresh_token') : '',
    login: '',
    password: '',
    buttonBlocked: false,
    newUserName: '',
    newUserPassword: '',
    registrationErrorMessage: [],
    loginErrorMessage: '',
    newUserEmail: '',
    logoffConfirmModal: false,
    regModal: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_ACCESS_TOKEN:
            return {
                ...state, accessToken: action.payload
            }
        case CHANGE_REFRESH_TOKEN:
            return {
                ...state, refreshToken: action.payload
            }
        case CHANGE_LOGIN:
            return {
                ...state, login: action.payload
            }
        case CHANGE_PASSWORD:
            return {
                ...state, password: action.payload
            }
        case CHANGE_AUTH:
            return {
                ...state, isAuthenticated: !state.isAuthenticated
            }
        case CHANGE_BUTTON:
            return {
                ...state, buttonBlocked: !state.buttonBlocked
            }
        case CHANGE_NEWUSERNAME:
            return {
                ...state, newUserName: action.payload
            }
        case CHANGE_NEWUSERPASSWORD:
            return {
                ...state, newUserPassword: action.payload
            }
        case CHANGE_NEWUSEREMAIL:
            return {
                ...state, newUserEmail: action.payload
            }
        case CHANGE_REGISTRATIONERRORMESSAGE:
            return {
                ...state, registrationErrorMessage: action.payload
            }
        case CHANGE_LOGINERRORMESSAGE:
            return {
                ...state, loginErrorMessage: action.payload
            }
        case CHANGE_LOGOFF_CONFIRM:
            return {
                ...state, logoffConfirmModal: !state.logoffConfirmModal
            }
        case CHANGE_REG_MODAL:
            return {
                ...state, regModal: !state.regModal
            }
        default:
            return state
    }
}

export const changeAccessTokenAC = (token) => {
    return {
        type: CHANGE_ACCESS_TOKEN,
        payload: token
    }
}

export const changeRefreshTokenAC = (token) => {
    return {
        type: CHANGE_REFRESH_TOKEN,
        payload: token
    }
}

export const changeLoginAC = (login) => {
    return {
        type: CHANGE_LOGIN,
        payload: login
    }
}

export const changePasswordAC = (password) => {
    return {
        type: CHANGE_PASSWORD,
        payload: password
    }
}

export const changeAuthAC = () => {
    return {
        type: CHANGE_AUTH,
    }
}

export const changeButtonAC = () => {
    return {
        type: CHANGE_BUTTON,
    }
}

export const changeNewUserNameAC = (userName) => {
    return {
        type: CHANGE_NEWUSERNAME,
        payload: userName
    }
}

export const changeNewUserPasswordAC = (userPassword) => {
    return {
        type: CHANGE_NEWUSERPASSWORD,
        payload: userPassword
    }
}

export const changeNewUserEmailAC = (newUserEmail) => {
    return {
        type: CHANGE_NEWUSEREMAIL,
        payload: newUserEmail
    }
}

export const changeRegistrationErrorMessageAC = (errorMessage) => {
    return {
        type: CHANGE_REGISTRATIONERRORMESSAGE,
        payload: errorMessage
    }
}

export const changeLoginErrorMessageAC = (errorMessage) => {
    return {
        type: CHANGE_LOGINERRORMESSAGE,
        payload: errorMessage
    }
}

export const changeLogoffConfirmAC = () => {
    return {
        type: CHANGE_LOGOFF_CONFIRM,
    }
}

export const changeRegModalAC = () => {
    return {
        type: CHANGE_REG_MODAL,
    }
}

export const authenticateThunkCreator = (login, password) => {
    return async (dispatch) => {
        if (login.length > 0 && password.length > 0) {
            dispatch(changeButtonAC())
            try {
                const response = await API.getToken(login, password)
                dispatch(changeAuthAC())
                localStorage.setItem('access_token', response.data.access)
                localStorage.setItem('refresh_token', response.data.refresh)
                dispatch(changeButtonAC())
            }catch (error) {
                dispatch(changeLoginErrorMessageAC(error.response.data.detail))
            }

        }
    }
}

export const registerThunkCreator = (login, email, password) => {
    return async (dispatch) => {
        if (login.length > 0 && password.length > 0 && email.length > 0) {
            dispatch(changeButtonAC())
            try {
                const response = await API.register(login, email, password)
                if (response.status === 201) {
                    dispatch(changeButtonAC())
                    dispatch(changeRegModalAC())
                }
            } catch (error){
                    dispatch(changeRegistrationErrorMessageAC(error.response.data))
            }
        }
    }
}

export const closeRegModalThunkCreator = () => {
    return dispatch => {
        dispatch(changeRegModalAC())
        dispatch(push('/'))
    }
}

export const logoffUserThunkCreator = () => {
    return (dispatch) => {
        dispatch(changeLogoffConfirmAC())
        dispatch(changeAuthAC())
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        dispatch(push('/'))
    }
}

export default reducer
