import React from 'react'
import {Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react'
import {Link} from "react-router-dom";

const RegisterForm = (props) => {
    return (
        <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 450}}>
                <Header as='h2' color='teal' textAlign='center'>
                    Зарегистрироваться
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='Логин'
                            onChange={props.changeNewUserName}
                        />
                        {
                            Boolean(props.registrationErrorMessage.username) ?
                                <Message
                                    negative
                                    header='Ошибка регистрации'
                                    content={props.registrationErrorMessage.username[0]}
                                />
                                :
                                null
                        }
                        <Form.Input
                            fluid
                            icon='mail'
                            iconPosition='left'
                            placeholder='Email'
                            onChange={props.changeNewUserEmail}
                            // error={props.registrationErrorMessage}
                        />
                        {
                            Boolean(props.registrationErrorMessage.email) ?
                                <Message
                                    negative
                                    header='Ошибка регистрации'
                                    content={props.registrationErrorMessage.email[0]}
                                />
                                :
                                null
                        }
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Пароль'
                            type='password'
                            onChange={props.changeNewUserPassword}
                        />
                        {
                            Boolean(props.registrationErrorMessage.password) ?
                                <Message
                                    negative
                                    header='Ошибка регистрации'
                                    content={props.registrationErrorMessage.password[0]}
                                />
                                :
                                null
                        }
                        <Button
                            color='teal'
                            fluid size='large'
                            onClick={props.handleRegister}
                            loading={props.buttonBlocked}
                            disabled={props.buttonBlocked}
                        >
                            Зарегистрироваться
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    Уже есть аккаунт? <Link to='/'>Войти</Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default RegisterForm
