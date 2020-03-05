import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

import './Navigation.css';

export default class Navigation extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" sticky="top" fixed="top">
                <Navbar.Brand as={Link} to='/'>TMDb Search</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as={NavLink} to='/movies'>Filme</Nav.Link>
                    <Nav.Link as={NavLink} to='/series'>TV Serien</Nav.Link>
                    <Nav.Link as={NavLink} to='/actors'>Schauspieler</Nav.Link>
                    <Nav.Link as={NavLink} to='/outnow'>Aktuelle Kinofilme</Nav.Link>
                    <Nav.Link as={NavLink} to='/upcoming'>Demnächst</Nav.Link>
                </Nav>
            </Navbar>
        );
    }
}