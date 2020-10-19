import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

function FirstVisitModal(props) {
    const [open, setOpen] = React.useState(props.modal)

    const onClose = () => {
        localStorage.setItem('visited', 'true')
        setOpen(false)
    }

    return (
        <Modal
            open={open}
            size='small'
        >
            <Header icon>
                <Icon name='envelope outline' />
                Описание сервиса
            </Header>
            <Modal.Content>
                <p>
                    Сервис предназначен для создания напоминаний. Напоминание о событии будет приходить на электронную почту
                    за 1 час до назначенного события
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button color='green' inverted onClick={onClose}>
                    <Icon name='checkmark' /> OK
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default FirstVisitModal
