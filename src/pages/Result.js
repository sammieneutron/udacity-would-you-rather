import React, {  useState } from 'react'
import { Container, Card, Form, Button, Col, ProgressBar, Badge } from 'react-bootstrap'
import { handleAnswer } from '../actions/shared'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import NotFound from './NotFound'


function Result(props) {
    
    const {id} = useParams()

    const dispatch = useDispatch();

    const saidVar = useSelector(({ users, questions, authedUser }) => {
        if (questions[id] === undefined) {
            console.log(questions[id])
            const error = true
            return {
                error
            }
        }

        let q = questions[id]
        let author = q ? users[q.author] : ''
        return {
            q: questions[id],
            author,
            authedUser
        }
    })

    const [selectedValue, setSelectedValue] = useState(null)
    const handleChange = (e) => {
        setSelectedValue(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(handleAnswer(saidVar.authedUser, id, selectedValue))
    }  

    
    let ques = saidVar.q ? saidVar.q : ''
    let answerMarkOp1 = saidVar.q ? saidVar.q.optionOne.votes.includes(saidVar.authedUser) : null
    let answerMarkOp2 = saidVar.q ? saidVar.q.optionTwo.votes.includes(saidVar.authedUser) : null
        

    console.log(props)
    if(Object.keys(props).length === 0) {
        return (
            <Container>
                <NotFound/>
            </Container>
        )
    }
    return (
        <div>
            <Container>
                {answerMarkOp1 === true || answerMarkOp2 === true ? (
                    <Col xs={6} md={6}>
                        <Card>
                            <Card.Img variant="top" src={saidVar.author.avatarURL} />
                            <Card.Body>
                                <Card.Title>Asked by {saidVar.author.name}</Card.Title>
                                <Card.Text>
                                    Results:
                                </Card.Text>
                                <div>
                                    <div className="cell">
                                        <div>
                                            {answerMarkOp1 ? (
                                                <Badge pill variant="warning">
                                                    Your Vote
                                                </Badge>
                                            ) : ' '}
                                        </div>
                                        Would you rather {ques ? ques.optionOne.text : ''}
                                        <ProgressBar now={ques ? (ques.optionOne.votes.length / (ques.optionOne.votes.length + ques.optionTwo.votes.length)) * 100 : ''}
                                            label={`${ques ? (ques.optionOne.votes.length / (ques.optionOne.votes.length + ques.optionTwo.votes.length)) * 100 : ''}%`} />
                                        <p>{ques ? `${ques.optionOne.votes.length} out of ${ques.optionTwo.votes.length + ques.optionOne.votes.length}` : ' '}</p>
                                    </div>
                                    <div className="cell">
                                        <div>
                                            {answerMarkOp2 ? (
                                                <Badge pill variant="warning">
                                                    Your Vote
                                                </Badge>
                                            ) : ' '}
                                        </div>
                                        Would you rather {ques ? ques.optionTwo.text : ''}
                                        <ProgressBar now={ques ? (ques.optionOne.votes.length / (ques.optionOne.votes.length + ques.optionTwo.votes.length)) * 100 : ''}
                                            label={`${props.q ? (ques.optionTwo.votes.length / (ques.optionOne.votes.length + ques.optionTwo.votes.length)) * 100 : ''}%`} />
                                        <p>{ques ? `${ques.optionTwo.votes.length} out of ${ques.optionTwo.votes.length + ques.optionOne.votes.length}` : ' '}</p>
                                    </div>
                                </div>

                            </Card.Body>
                        </Card>
                    </Col>
                ) : (
                        <Col xs={6} md={6}>
                            <Card>
                                <Card.Img variant="top" src={saidVar.author.avatarURL} />
                                <Card.Body>
                                    <Card.Title>{saidVar.author.name} asks</Card.Title>
                                    <Card.Text>
                                        Would you rather
                                    </Card.Text>
                                    <Form.Group>
                                    <div className="mb-3">
                                        <Form.Check
                                            type="radio"
                                            name="select"
                                            label={ques ? ques.optionOne.text : ''}
                                            onChange={handleChange}
                                            value="optionOne"
                                        />

                                        <Form.Check
                                            type="radio"
                                            name="select"
                                            label={ques ? ques.optionTwo.text : ''}
                                            onChange={handleChange}
                                            value="optionTwo"
                                        />
                                    </div>
                                    </Form.Group>
                                    <Button variant="primary" onClick={onSubmit}>Submit</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
            </Container>
        </div>
    )
// function mapStateToProps({ users, questions, authedUser }, { match, id }) {
//     console.log(id)
//     if(questions[id] === undefined) {
//         const error = true;
//         return {
//             error
//         }
//     }

//     let q = questions[id]
//     let author = q ? users[q.author] : ''
//     return {
//         q: questions[id],
//         author,
//         authedUser
//     }
// }
}

export default Result