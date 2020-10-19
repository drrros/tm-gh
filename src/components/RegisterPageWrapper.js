import React from 'react'
import RegisterPage from "./RegisterPage/RegisterPage";
import {connect} from "react-redux";
import {
    changeNewUserEmailAC,
    changeNewUserNameAC, changeNewUserPasswordAC, closeRegModalThunkCreator,
    registerThunkCreator
} from "../redux/authReducer";
import SuccessfulRegistrationModal from "./RegisterPage/Modal";
import {
    getNewUserEmail,
    getNewUserName,
    getNewUserPassword,
    getRegistrationErrorMessage,
    getRegModal
} from "../redux/selectors";


const RegisterPageWrapper = (props) => {


    const handleRegister = (event, data) => {
        event.preventDefault()
        props.registerThunkCreator(props.newUserName, props.newUserEmail, props.newUserPassword)
    }

    return (
        <>
            <SuccessfulRegistrationModal modal={props.regModal} closeRegModal={props.closeRegModal}/>
            <RegisterPage {...props} handleRegister={handleRegister}/>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        newUserName: getNewUserName(state),
        newUserEmail: getNewUserEmail(state),
        newUserPassword: getNewUserPassword(state),
        registrationErrorMessage: getRegistrationErrorMessage(state),
        regModal: getRegModal(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeNewUserName: (event, data) => dispatch(changeNewUserNameAC(data.value)),
        changeNewUserEmail: (event, data) => dispatch(changeNewUserEmailAC(data.value)),
        changeNewUserPassword: (event, data) => dispatch(changeNewUserPasswordAC(data.value)),
        registerThunkCreator: (login, email, password) => dispatch(registerThunkCreator(login, email, password)),
        closeRegModal: () => dispatch(closeRegModalThunkCreator())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPageWrapper)
