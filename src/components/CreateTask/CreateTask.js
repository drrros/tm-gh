import React from 'react'
import {Header, Button, Card, Form, Grid, Icon} from 'semantic-ui-react'
import {DateTimeInput} from 'semantic-ui-calendar-react'
import 'moment/locale/ru'


const CreateTaskForm = (props) => {

    const options = [
        {key: 'm', text: 'Встреча', value: 'Встреча'},
        {key: 'c', text: 'Звонок', value: 'Звонок'},
    ]

    return (
        <Grid textAlign='center' style={{height: '90vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 450}}>
                <Card>
                    <Card.Content>
                        <Card.Header>
                                <Grid>
                                    <Grid.Column textAlign='center' width={14}>
                                        Событие
                                    </Grid.Column>
                                    <Grid.Column textAlign='center' width={2}>
                                        <a href="/" onClick={props.returnButtonHandler}><Icon name='close'/></a>
                                    </Grid.Column>
                                </Grid>
                        </Card.Header>
                        <Form>
                            <Form.Input
                                required
                                fluid
                                placeholder='Заголовок:'
                                onChange={props.changeHead}
                                value={props.head}
                            />
                            <Form.TextArea
                                required
                                placeholder='Описание события:'
                                onChange={props.changeBody}
                                rows={'10'}
                                value={props.body}
                            />
                            <Form.Select
                                required
                                fluid
                                options={options}
                                placeholder='Тип события'
                                onChange={props.onSelectChange}
                                value={props.select}
                            />
                            <DateTimeInput
                                name="dateTime"
                                closable
                                // dateTimeFormat="DD-MM-YYYY HH:mm"
                                placeholder="Время события"
                                iconPosition="left"
                                localization='ru'
                                value={props.dateTime}
                                onChange={props.changeDateTime}
                                popupPosition='bottom center'
                            />
                            <Button
                                onClick={() => {
                                    if (props.editTaskId === '') {
                                        props.handleTaskCreate()
                                    } else {
                                        props.handleTaskEdit()
                                    }
                                }
                                }
                                disabled={props.buttonDisabled}
                                loading={props.buttonDisabled}
                            >
                                {
                                    props.editTaskId === '' ? 'Добавить' : 'Изменить'
                                }
                            </Button>
                            {props.errorMessage === '' ? null :
                                <Header color='red' as='h1'>{props.errorMessage}</Header>}
                        </Form>
                    </Card.Content>
                </Card>
            </Grid.Column>
        </Grid>
    )
}

export default CreateTaskForm
