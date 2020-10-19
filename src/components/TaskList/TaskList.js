import React from 'react'
import {Link} from "react-router-dom";
import {Button, Header, Card, Container, Grid, Table, Input, Popup} from "semantic-ui-react";

const TaskList = props => {

    const handleSearchChange = (event, data) => {
        props.changeFilter(data.value)
    }

    return (
        <Grid centered verticalAlign='middle' style={{height: '90vh'}}>
            <Grid.Column style={{width: '70%'}}>
                <Card fluid>
                    <Card.Content>
                        <Header textAlign='center' as='h3'>События</Header>
                        <hr/>
                        <Input
                            fluid
                            placeholder='Поиск по заголовку или описанию события...'
                            onChange={handleSearchChange}
                            value={props.taskFilter}
                            action={{
                                content: 'Очистить фильтр',
                                onClick: () => handleSearchChange('', {value: ''})
                            }}
                        />
                        <Table celled singleLine>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Событие</Table.HeaderCell>
                                    <Table.HeaderCell>Тип события</Table.HeaderCell>
                                    <Table.HeaderCell>Дата</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Изменить</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Удалить</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {
                                    props.taskList.map((item) => {
                                        let date = new Date(item.task_date)
                                        return (
                                            <Table.Row key={item.id} className='tableRow'>
                                                <Popup
                                                    content={item.task_content}
                                                    trigger={<Table.Cell>{item.task_header}</Table.Cell>}
                                                    position='top center'
                                                />
                                                <Table.Cell>{item.task_type}</Table.Cell>
                                                <Table.Cell>{date.toLocaleString('ru-RU')}</Table.Cell>
                                                <Table.Cell textAlign='center'>
                                                    <Button color='yellow'
                                                            size='mini'
                                                            onClick={props.handleEditButton.bind(this, item.id)}
                                                    >Изменить</Button>
                                                </Table.Cell>
                                                <Table.Cell textAlign='center'>
                                                    <Button
                                                        loading={item.id === props.deleteButtonDisabledId}
                                                        onClick={props.handleDeleteButton.bind(this, item.id)}
                                                        color='red'
                                                        size='mini'
                                                    >Удалить
                                                    </Button></Table.Cell>
                                            </Table.Row>
                                        )
                                    })
                                }
                            </Table.Body>
                        </Table>
                        <Container fluid>
                            <Button
                                fluid
                                as={Link}
                                to="/create_task/"
                            >Создать</Button>
                        </Container>
                    </Card.Content>
                </Card>
            </Grid.Column>
        </Grid>
    )
}

export default TaskList
