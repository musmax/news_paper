import React from 'react'
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const Header = () => {
  return (
    <div className='container'>
      <Navbar className='yellotail'>
        <LinkContainer to='/'>
          <Navbar.Brand>Omaz news</Navbar.Brand>
        </LinkContainer>
      </Navbar>
      <Nav>
        <Nav.Item>
          <LinkContainer to='/'>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </Nav>
      <Nav>
        <Nav.Item>
          <LinkContainer to='/contact'>
            <Nav.Link>Contact</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </Nav>
    </div>
  )
}

export default Header