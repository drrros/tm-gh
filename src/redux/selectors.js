import {createSelector} from "reselect";

// CreateTask

export const getCreateTaskHead = (state) => {
    return state.createTask.head
}

export const getCreateTaskBody = (state) => {
    return state.createTask.body
}

export const getCreateTaskDateTime = (state) => {
    return state.createTask.dateTime
}

export const getCreateTaskSelect = (state) => {
    return state.createTask.select
}

export const getCreateTaskButtonDisabled = (state) => {
    return state.createTask.buttonDisabled
}

export const getCreateTaskErrorMessage = (state) => {
    return state.createTask.errorMessage
}

export const getCreateTaskEditTaskId = (state) => {
    return state.taskList.editTaskId
}

//TaskList

export const getTaskList = (state) => {
    return state.taskList.taskList
}

export const getDeleteButtonDisabledId = (state) => {
    return state.taskList.deleteButtonDisabledId
}

export const getFilterText = (state) => {
    return state.taskList.filterText
}

export const getFilteredTasks = (state) => {
    return state.taskList.filteredTasks
}

export const getFilteredTasksReselector = createSelector([getTaskList, getFilterText], (taskList, taskFilter) => {
    return taskList.filter((el) => {
            return Boolean(
                el.task_header.toLowerCase().includes(taskFilter.toLowerCase()) ||
                el.task_content.toLowerCase().includes(taskFilter.toLowerCase())
            )
        })
} )

// RegisterPage

export const getNewUserName = (state) => {
    return state.auth.newUserName
}

export const getNewUserEmail = (state) => {
    return state.auth.newUserEmail
}

export const getNewUserPassword = (state) => {
    return state.auth.newUserPassword
}

export const getRegistrationErrorMessage = (state) => {
    return state.auth.registrationErrorMessage
}

export const getRegModal = (state) => {
    return state.auth.regModal
}

// LogoffButton

export const getLogoffConfirmModal = (state) => {
    return state.auth.logoffConfirmModal
}

// Login Page


export const getLogin = (state) => {
    return state.auth.login
}

export const getPassword = (state) => {
    return state.auth.password
}

export const getToken = (state) => {
    return state.auth.token
}

export const getIsAuthenticated = (state) => {
    return state.auth.isAuthenticated
}

export const getLoginErrorMessage = (state) => {
    return state.auth.loginErrorMessage
}

