import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Col, Form } from 'react-bootstrap'
import { handleSaveQuestion } from '../actions/shared'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Navigate } from 'react-router-dom'

class NewQuestion extends Component {
    state = {
        option1: null,
        option2: null,
        toHome: false
    }
    handleChange1 = (e) => {
        this.setState({
            option1: e.target.value
        })
    }
    handleChange2 = (e) => {
        this.setState({
            option2: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        this.props.dispatch(handleSaveQuestion(this.props.authedUser, this.state.option1, this.state.option2))

        this.setState(() => ({
            toHome: true
        }))
    }
    render() {
        const { toHome } = this.state

        if (toHome === true) {
            return <Navigate to="/" />
        }
        return (
            <div>
                <Container>
                <Col xs={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Would you Rather...</Card.Title>
                            <Form>
                                <Form.Group controlId="users">
                                <Form.Control onChange={this.handleChange1} type="text" placeholder="Option 1" />
                                <span>Or</span>
                                <Form.Control onChange={this.handleChange2} type="text" placeholder="Option 2" />
                                </Form.Group>
                                <Button variant="primary" onClick={this.onSubmit} block>Add</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Container>
            </div>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion)