import React from 'react'
import {Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import FirstVisitModal from "./Modal";

const LoginForm = (props) => {
    return (
        <>
            {
                props.modal === 'false' ? <FirstVisitModal modal={true} /> : null
            }
            <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Войти в аккаунт
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='Логин'
                                onChange={props.changeLogin}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Пароль'
                                type='password'
                                onChange={props.changePassword}
                            />

                            <Button
                                color='teal'
                                fluid size='large'
                                onClick={props.handleLogin}
                                loading={props.buttonBlocked}
                                disabled={props.buttonBlocked}
                            >
                                Войти
                            </Button>
                            {
                                props.loginErrorMessage ?
                                    <Message
                                        negative
                                        header='Неправильное имя пользователя или пароль'
                                    />
                                    :
                                    null
                            }
                        </Segment>
                    </Form>
                    <Message>
                        Впервые на сайте? <Link to='/register'>Зарегистрироваться</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        </>
    )
}

export default LoginForm
