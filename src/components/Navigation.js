import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar, Button, Nav, Image, Offcanvas, Container } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { deleteAuthedUser } from '../actions/authedUser'

class Navigation extends Component {
    logout = () => {
        this.props.dispatch(deleteAuthedUser())
    }
    render() {
        const { loggedInUser } = this.props
        if(this.props.authedUser === '') {
            return (
                <Navigate to="/login" />
            )
        }

        return (

            <Navbar bg="light" expand={false}>
                <Container fluid>
                <Navbar.Brand href="#">Would You Rather</Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel">Would You Rather</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/add">New Question</Link>
                        <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                    </Nav>
                    <Nav className="mt-3">
                        <div className="navText">Hello, {loggedInUser.name}</div>
                        <Image src={loggedInUser.avatarURL} className="rounded" />
                        <Button className="mt-3" variant="primary" onClick={this.logout}>Logout</Button>
                    </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
                </Container>
            </Navbar>


            // <Navbar bg="dark" variant="dark">
            //     <Navbar.Brand href="#home">Would You Rather</Navbar.Brand>
            //     <Nav className="mr-auto">
            //         <Link className="nav-link" to="/">Home</Link>
            //         <Link className="nav-link" to="/new">New Question</Link>
            //         <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
            //     </Nav>
            //     <Nav>
            //         <div className="navText">Hello, {loggedInUser.name}</div>
            //         <Image src={loggedInUser.avatarURL} rounded />
            //         <Button variant="outline-primary" onClick={this.logout}>Logout</Button>
            //     </Nav>
            // </Navbar>
            
        )
    }
}

function mapStateToProps({ authedUser, users } ){
    return {
        loggedInUser: users[authedUser],
        authedUser
    }
}

export default connect(mapStateToProps)(Navigation)