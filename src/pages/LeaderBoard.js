import React from 'react'
import { Container, Col } from 'react-bootstrap'
import LeaderBoardCard from '../components/LeaderBoardCard'
import { useSelector } from 'react-redux'


const LeaderBoard = () => {
    
    const state = useSelector(({users}) => {
        const sortedUsers = (Object.values(users)).sort((a, b) => {
            const value1 = (Object.keys(a.answers)).length + a.questions.length
            const value2 = (Object.keys(b.answers)).length + b.questions.length
            return value2 - value1
          })
        return {
            sortedUsers
        }
    })

    return (
        <div>
            <Container>
            <Col xs={6} md={6}>
            {state.sortedUsers.map((user) => (
            <LeaderBoardCard key={user.id} user={user}/>
            ))}
            </Col>
            </Container>
        </div>
    )
}

export default LeaderBoard