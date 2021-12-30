import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'

class Login extends Component {
    state = {
        error: ''
    }

    handleSubmit = (e) => {
        const userId = this.userId.value
        const { dispatch } = this.props

        e.preventDefault()

        if (userId === '') {
            this.setState({err: "Please choose a user!"})
        } else {
            dispatch(setAuthedUser(userId))
        }
    }
    render() { 
        const { userNames } = this.props
        const { error } = this.state

        return ( 
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Card className="mt-5">
                            <Card.Body className="text-center">
                                <Card.Title>Welcome to the Would You Rather App</Card.Title>

                                <h3>Sign In</h3>
                                <Form className="" onSubmit={this.handleSubmit}>
                                    {error ? (
                                        <p style={{color: 'red'}}>{error}</p>
                                    ) : ''}
                                    <select className="form-control" name="" ref={(id) => (this.userId = id)}>
                                        <option value="">Select a user</option>
                                        {  userNames.map((user) => (
                                            <option value={user.value} key={user.value}>
                                                {user.name}
                                            </option>
                                        ))
                                        }
                                    </select>

                                    <Button
                                        variant="primary"
                                        type='submit'
                                        disabled=""
                                        size="lg"
                                        className="mt-3"
                                    >
                                        Login
                                    </Button>
                                    
                                </Form>
                            </Card.Body>
                            <Card.Footer>
                                
                            </Card.Footer>
                        </Card>
                    </Col>
                    
                </Row>
            </Container>
        );
    }
}

function mapStateToProps({ users }) {
    return {
        userNames: Object.keys(users).map((id) => ({
            value: id,
            name: users[id].name
        }))
    }
}
 
export default connect(mapStateToProps)(Login);