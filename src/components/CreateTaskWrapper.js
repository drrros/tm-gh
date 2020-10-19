import React from 'react'
import CreateTask from "./CreateTask/CreateTask";
import {connect} from "react-redux";
import {
    changeBodyAC,
    changeDateTimeAC,
    changeHeadAC, createTaskThunkCreator, editTaskThunkCreator,
    resetAC, returnButtonHandler,
    selectAC
} from "../redux/createTaskReducer";
import moment from "moment"
import {
    getCreateTaskBody,
    getCreateTaskButtonDisabled,
    getCreateTaskDateTime, getCreateTaskEditTaskId, getCreateTaskErrorMessage,
    getCreateTaskHead,
    getCreateTaskSelect
} from "../redux/selectors";


const CreateTaskWrapper = (props) => {


    //TODO: Convert handleCreate and handleEdit to single func
    const handleTaskCreate = () => {
        let dd = moment(props.dateTime, 'DD-MM-YYYY HH:mm', true)
        props.createTaskThunkCreator(props.head, props.body, props.select, dd.format('YYYY-MM-DDTHH:mm'))
    }

    const handleTaskEdit = () => {
        let dd = moment(props.dateTime, 'DD-MM-YYYY HH:mm', true)
        props.editTaskThunkCreator(props.head, props.body, props.select, dd.format('YYYY-MM-DDTHH:mm'), props.editTaskId)
    }

    return (
        <CreateTask {...props} handleTaskCreate={handleTaskCreate} handleTaskEdit={handleTaskEdit}/>
    )
}
const mapStateToProps = (state) => {
    return {
        head: getCreateTaskHead(state),
        body: getCreateTaskBody(state),
        dateTime: getCreateTaskDateTime(state),
        select: getCreateTaskSelect(state),
        buttonDisabled: getCreateTaskButtonDisabled(state),
        errorMessage: getCreateTaskErrorMessage(state),
        editTaskId: getCreateTaskEditTaskId(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        changeHead: (event, data) => dispatch(changeHeadAC(data.value)),
        changeBody: (event, data) => dispatch(changeBodyAC(data.value)),
        changeDateTime: (event, data) => dispatch(changeDateTimeAC(data.value)),
        onSelectChange: (event, data) => dispatch(selectAC(data.value)),
        handleReset: () => dispatch(resetAC()),
        createTaskThunkCreator: (head, body, select, dateTime) => dispatch(createTaskThunkCreator(head, body, select, dateTime)),
        editTaskThunkCreator: (head, body, select, dateTime, id) => dispatch(editTaskThunkCreator(head, body, select, dateTime, id)),
        returnButtonHandler: (e) => dispatch(returnButtonHandler(e))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskWrapper)
