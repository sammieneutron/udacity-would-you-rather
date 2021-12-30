import React, { useState } from 'react'
import { Container, Col, Nav } from 'react-bootstrap'
import Poll from './Poll'
import { useSelector } from 'react-redux'

const Home = () => {

    const [switchQuestion, setSwitchQuestion] = useState(false);

    const handleAnswered = () => {
        setSwitchQuestion(true)
    }
    const handleUnAnswered = () => {
        setSwitchQuestion(false)
    }
    
    const state = useSelector(({ users, questions, authedUser }) => {
        let allQuestions = Object.values(questions)
        let loggedInUser = users[authedUser] 
        let loggedInAnswers = loggedInUser ? Object.keys(loggedInUser.answers) : []
        return {
            answeredQuestions : allQuestions.filter((question) => loggedInAnswers.includes(question.id))
                .sort((a, b) => b.timestamp - a.timestamp),
            unAnsweredQuestions: allQuestions.filter((question) => !loggedInAnswers.includes(question.id))
                .sort((a, b) => b.timestamp - a.timestamp)
        }
    })
    return (
        <div>
            <Container>
                <Col xs={6} md={6}>
                    <Nav justify variant="tabs" defaultActiveKey="link-1">
                        <Nav.Item>
                            <Nav.Link eventKey="link-1" onClick={handleUnAnswered}>Unanswered</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2" onClick={handleAnswered}>Answered</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    {switchQuestion === false ? (
                        state.unAnsweredQuestions.map((q) => (
                            <Poll key={q.id} ques={q} />
                        ))
                    ) : state.answeredQuestions.map((q) => (
                        <Poll key={q.id} ques={q} />
                    ))}
                </Col>
            </Container>
        </div>
    )
}

export default Home
