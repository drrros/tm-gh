import React from 'react'
import {Button, Header, Icon, Modal} from 'semantic-ui-react'
import {connect} from "react-redux";
import {changeLogoffConfirmAC, logoffUserThunkCreator} from "../redux/authReducer";
import {getLogoffConfirmModal} from "../redux/selectors";

const LogoffButton = (props) => {
    return (
        <>
            <Button circular icon='sign-out' onClick={props.logoffUser}/>
            {
                props.logoffConfirmModal ?
                    <Modal
                        open={props.logoffConfirmModal}
                        size='mini'
                    >
                        <Header icon>
                            <Icon name='sign-out' />
                            Вы уверены, что хотите выйти?
                        </Header>
                        <Modal.Content>
                            <p>
                                Все несохранённые данные будут утеряны
                            </p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button size='small' color='green' inverted onClick={props.cancelLogoff}>
                                <Icon name='checkmark' /> Oтмена
                            </Button>
                            <Button size='small' color='red' onClick={props.confirmLogoff}>
                                <Icon name='checkmark' /> Выйти
                            </Button>
                        </Modal.Actions>
                    </Modal>
                    : null
            }
            {
                props.children
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        logoffConfirmModal: getLogoffConfirmModal(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoffUser: () => dispatch(changeLogoffConfirmAC()),
        cancelLogoff: () => dispatch(changeLogoffConfirmAC()),
        confirmLogoff: () => dispatch(logoffUserThunkCreator())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoffButton)
