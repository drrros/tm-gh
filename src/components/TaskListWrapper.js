import React, {useEffect} from 'react'
import TaskList from "./TaskList/TaskList";
import {connect} from "react-redux";
import {
    changeFilterAC,
    deleteTaskThunkCreator,
    enterEditModeTaskThunkCreator, getTasksThunkCreator,
} from "../redux/taskListReducer";
import {
    getDeleteButtonDisabledId,
    getFilteredTasksReselector,
    getFilterText,
    getTaskList
} from "../redux/selectors";


const TaskListWrapper = ({deleteButtonDisabledId, getTasks, ...props}) => {

    useEffect(() => {
        getTasks()
    }, [deleteButtonDisabledId, getTasks]);

    // const changeFilter = (data) => {
    //     props.changeFilter(data)
    //     //props.filterTasks(data)
    // }

    return (
        <TaskList
            taskList={props.filteredTasks}
            handleDeleteButton={props.handleDeleteButton}
            deleteButtonDisabledId={deleteButtonDisabledId}
            handleEditButton={props.handleEditButton}
            taskFilter={props.filterText}
            changeFilter={props.changeFilter}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        taskList: getTaskList(state),
        deleteButtonDisabledId: getDeleteButtonDisabledId(state),
        filterText: getFilterText(state),
        filteredTasks: getFilteredTasksReselector(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTasks: () => dispatch(getTasksThunkCreator()),
        handleDeleteButton: (id) => dispatch(deleteTaskThunkCreator(id)),
        handleEditButton: (id) => dispatch(enterEditModeTaskThunkCreator(id)),
        changeFilter: (filter) => dispatch(changeFilterAC(filter)),
        //filterTasks: (filter) => dispatch(filterTasks(filter)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListWrapper)
