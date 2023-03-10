import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import logo from '../NOFRAME.png' ; 
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/actions/userActions';
import SearchBox from './SearchBox'
 


const Header = () => {

  const dispatch = useDispatch()
  const { userInfo } = useSelector( state => state.userLogin)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header>
    <Navbar bg="primary"  variant='dark' collapseOnSelect >
    <Container>
      <LinkContainer to='/'>
      <Navbar.Brand>
      <img
              alt=""
              src={logo}
              width="40"
              height="40"
              className="d-inline-block align-center"
            />{' '}
            Noframe Shop
        </Navbar.Brand>
      </LinkContainer>
      <SearchBox/>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav>
          <LinkContainer to='/cart'>
            <Nav.Link ><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
          </LinkContainer>
          {userInfo? (
            <NavDropdown title={userInfo.name} id='username'>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
          <LinkContainer to='/login'>
            <Nav.Link ><i className='fas fa-user'></i> Sign In</Nav.Link>
          </LinkContainer>

          )}
          {userInfo && userInfo.isAdmin && (
            <NavDropdown title='Admin' id='adminmenu'>
            <LinkContainer to='admin/userlist'>
              <NavDropdown.Item>Users</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='admin/productlist'>
              <NavDropdown.Item>Products</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='admin/orderlist'>
              <NavDropdown.Item>Orders</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
          )}
          
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  </header>
  )
}

export default Header