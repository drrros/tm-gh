import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

function SuccessfulRegistrationModal(props) {

    return (
        <Modal
            open={props.modal}
            size='mini'
        >
            <Header icon>
                <Icon name='envelope outline' />
                Успешная регистрация
            </Header>
            <Modal.Content>
                <p>
                    Теперь вы можете войти с указанными логином\паролем
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button color='green' inverted onClick={props.closeRegModal}>
                    <Icon name='checkmark' /> OK
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default SuccessfulRegistrationModal
