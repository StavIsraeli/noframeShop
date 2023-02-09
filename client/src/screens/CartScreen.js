import React, { useEffect } from 'react'
import Meta from '../components/Meta'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' 
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../redux/actions/cartActions'
import { useSearchParams } from 'react-router-dom';
import Message from '../components/Message'


const CartScreen = () => {
    const { id } = useParams();    
    const [searchParams] = useSearchParams();
    const qty = searchParams.get('qty') ? parseInt(searchParams.get('qty')) : 1
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cartItems } = useSelector( state => state.cart)

    useEffect(() => {
        if(id){
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty])

    const removeFromCartHandler = (id) =>{
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping')
    }


  return (
    <><Meta title={`Noframe | Cart`} /><Row>
          <Col md={8}>
              <h1>Shopping Cart</h1>
              {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message> :
                  <ListGroup variant='flush'>
                      {cartItems.map(item => (
                          <ListGroup.Item key={item.product}>
                              <Row>
                                  <Col md={2}>
                                      <Image src={item.image} alt={item.name} fluid rounded></Image>
                                  </Col>
                                  <Col md={3}>
                                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                                  </Col>
                                  <Col md={2}>
                                      {item.price}
                                  </Col>
                                  <Col md={2}>
                                      <Form.Control as='select' value={item.qty} onChange={(e) => { dispatch(addToCart(item.product, parseInt(e.target.value))) } }>
                                          {[...Array(item.countInStock).keys()].map(i => (
                                              <option key={i + 1} value={i + 1}>{i + 1}</option>
                                          ))}
                                      </Form.Control>
                                  </Col>
                                  <Col md={2}>
                                      <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                          <i className='fas fa-trash'></i>
                                      </Button>
                                  </Col>
                              </Row>
                          </ListGroup.Item>
                      ))}
                  </ListGroup>}
          </Col>
          <Col md={4}>
              <Card>
                  <ListGroup variant='flush'>
                      <ListGroup.Item>
                          <h2>Subtotal {cartItems.reduce((total, item) => total += item.qty, 0)} items</h2>
                          {cartItems.reduce((total, item) => total + item.qty * item.price, 0).toFixed(2)}₪
                      </ListGroup.Item>
                      <ListGroup.Item>
                          <Button
                              type='button'
                              className='btn-block'
                              disabled={cartItems.length === 0}
                              onClick={checkoutHandler}>
                              Proceed To Checkout
                          </Button>
                      </ListGroup.Item>
                  </ListGroup>
              </Card>

          </Col>
      </Row></>
  )
}

export default CartScreen