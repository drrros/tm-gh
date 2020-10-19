import React from 'react';
import TaskListWrapper from "./components/TaskListWrapper";
import CreateTaskWrapper from "./components/CreateTaskWrapper";
import {Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import LoginPageWrapper from "./components/LoginPageWrapper";
import RegisterPageWrapper from "./components/RegisterPageWrapper";
import LogoffButton from "./components/LogoffButton";


function App(props) {
    if (props.isAuthenticated) {
        return (
            <LogoffButton>
                <Switch>
                    <Route path='/create_task' render={() => <CreateTaskWrapper/>}/>
                    <Route path='/edit_task' render={() => <CreateTaskWrapper/>}/>
                    <Route path='/' render={() => <TaskListWrapper/>}/>
                </Switch>
            </LogoffButton>
        )
    } else {
        return (
            <Switch>
                <Route path='/register' render={() => <RegisterPageWrapper/>}/>
                <Route path='/' render={() => <LoginPageWrapper/>}/>
            </Switch>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(App);
