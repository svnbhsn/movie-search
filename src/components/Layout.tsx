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
            {/*             <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>Movie Database Search</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink to='/movies' className='item' activeClassName='active'>Filme</NavLink>
                        <NavLink to='/series' className='item' activeClassName='active'>Serien</NavLink>
                        <NavLink to='/actors' className='item' activeClassName='active'>Actors</NavLink>
                        <NavLink to='/outnow' className='item' activeClassName='active'>Jetzt im Kino</NavLink>
                        <NavLink to='/upcoming' className='item' activeClassName='active'>Neue Filme</NavLink>
                    </Nav>

                </Navbar.Collapse>
            </Navbar> */}

            <div className='ui large top fixed menu'>
                <div className='ui container'>
                    <NavLink to='/movies' className='item' activeClassName='active'>Filme</NavLink>
                    <NavLink to='/series' className='item' activeClassName='active'>Serien</NavLink>
                    <NavLink to='/actors' className='item' activeClassName='active'>Actors</NavLink>
                    <NavLink to='/outnow' className='item' activeClassName='active'>Jetzt im Kino</NavLink>
                    <NavLink to='/upcoming' className='item' activeClassName='active'>Neue Filme</NavLink>
                </div>
                <div className='ui vertical stripe' style={{ marginTop: '100px' }}>
                    <div className='ui middle aligned stackable grid container'>
                        {props.children}
                    </div>
                </div>

            </div>
        </>
    )
}