import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

interface Props {
    children: any
}

export default function Layout(props: Props) {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>Movie Database Search</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link><NavLink to='/movies' className='item' activeClassName='active'>Filme</NavLink></Nav.Link>
                        <Nav.Link><NavLink to='/series' className='item' activeClassName='active'>Serien</NavLink></Nav.Link>
                        <Nav.Link> <NavLink to='/actors' className='item' activeClassName='active'>Actors</NavLink></Nav.Link>
                        <Nav.Link><NavLink to='/outnow' className='item' activeClassName='active'>Jetzt im Kino</NavLink></Nav.Link>
                        <Nav.Link> <NavLink to='/upcoming' className='item' activeClassName='active'>Neue Filme</NavLink></Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        </>
    )
}