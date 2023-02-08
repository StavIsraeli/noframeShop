import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useParams } from 'react-router-dom';
import { getProductDetails, createProductReview } from '../redux/actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useNavigate } from 'react-router-dom';
import { PRODUCT_CREATE_REVIEW_RESET } from '../redux/constants/productConstants'



const ProductScreen = () => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const { id } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { product, loading, error } = useSelector(state => state.productDetails)
    const { userInfo } = useSelector(state => state.userLogin)
    const { success: successProductReview, error: errorProductReview } = useSelector(state => state.productCreateReview)
    
 

  useEffect(() => {
    if(successProductReview){
        alert('Review Submitted!')
        setRating(0)
        setComment('')
    }
    dispatch(getProductDetails(id))
    dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createProductReview(id, { rating, comment }))
  }


  return (
    <>
    <Link className='btn btn-light my-3' to={'/'}>Go Back</Link>
    {loading ? (
    <Loader/> ) :
    error ? (
    <Message variant='danger'>{error}</Message>
     ) : (
    <>
    <Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
            <ListGroup>
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
                </ListGroup.Item>
                <ListGroup.Item>
                    Price: {product.price}₪
                </ListGroup.Item>
                <ListGroup.Item>
                    Description: {product.description}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
            <ListGroup variant='flush'>
            <ListGroup.Item>
                <Row>
                    <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item>
                <Row>
                <Col>Status:</Col>
                <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                </Col>
                </Row>
            </ListGroup.Item>
            {product.countInStock>0 && (
                <ListGroup.Item>
                    <Row>
                        <Col>Qty:</Col>
                        <Col>
                            <Form.Control as='select' value={qty} onChange={(e)=> {setQty(e.target.value)}}>
                                {[...Array(product.countInStock).keys()].map(i => (
                                    <option key={i+1} value={i+1}>{i+1}</option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Row>
                </ListGroup.Item>
            )}
            <ListGroup.Item>
                <Row>
                    <Button
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                    >
                    Add To Cart
                    </Button>
                </Row>
            </ListGroup.Item>
            </ListGroup>
            </Card>
        </Col>
    </Row>
    <br/>
    <Row>
        <Col  md={6}>
            <h2>Reviews</h2>
            {product.reviews.length === 0 && <Message>No Reviews</Message>}
            <ListGroup variant='flush'>
                {product.reviews.map( review => (
                    <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                    <h2>Write a Customer Review</h2>
                    {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                    {userInfo ? (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId='rating'>
                                <Form.Label>Rating</Form.Label>
                                <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                <option value=''>Select...</option>
                                <option value='1'>1 - Poor</option>
                                <option value='2'>2 - Fair</option>
                                <option value='3'>3 - Good</option>
                                <option value='4'>4 - Very Good</option>
                                <option value='5'>5 - Excellent</option>
                                </Form.Control>
                            </Form.Group>
                            <br/>
                            <Form.Group controlId='comment'>
                            <Form.Label>Comment</Form.Label>
                                <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                            </Form.Group>
                            <br/>
                            <Button type='submit' variant='primary'>
                                Submit
                            </Button>
                        </Form>

                    ) : (
                    <Message>Please <Link to={'/login'}>sign in</Link> to write a review</Message>
                    )}
                </ListGroup.Item>
            </ListGroup>
        </Col>
    </Row>
    </>
    
    )}
    
    </>
  )
}

export default ProductScreen