import React from 'react'
import LoginPage from "./LoginPage/LoginPage";
import {connect} from "react-redux";
import {
    authenticateThunkCreator,
    changeAuthAC,
    changeLoginAC,
    changePasswordAC
} from "../redux/authReducer";
import {getIsAuthenticated, getLogin, getLoginErrorMessage, getPassword, getToken} from "../redux/selectors";


const LoginPageWrapper = (props) => {

    const firstVisit = localStorage.getItem('visited') || 'false'


    const handleLogin = (event, data) => {
        props.authenticateThunkCreator(props.login, props.password)
    }

    return (
        <LoginPage {...props} handleLogin={handleLogin} modal={firstVisit} />
    )
}

const mapStateToProps = (state) => {
    return {
        login: getLogin(state),
        password: getPassword(state),
        token: getToken(state),
        isAuthenticated: getIsAuthenticated(state),
        loginErrorMessage: getLoginErrorMessage(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLogin: (event, data) => dispatch(changeLoginAC(data.value)),
        changePassword: (event, data) => dispatch(changePasswordAC(data.value)),
        changeAuth: () => dispatch(changeAuthAC()),
        authenticateThunkCreator: (login, password) => dispatch(authenticateThunkCreator(login, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageWrapper)
