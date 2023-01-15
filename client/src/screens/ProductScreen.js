import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../redux/actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


const ProductScreen = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const {product, loading, error} = useSelector(state => state.productDetails)
 

  useEffect(() => {
    dispatch(getProductDetails(id))
  }, [dispatch, id]);



  return (
    <>
    <Link className='btn btn-light my-3' to={'/'}>Go Back</Link>
    {loading ? 
    <Loader/>:
    error ?
    <Message variant='danger'>{error}</Message> :
    
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
            <ListGroup.Item>
                <Button
                className='btn-block'
                type='button'
                disabled={product.countInStock === 0}
                >
                Add To Cart
                </Button>
            </ListGroup.Item>
                
            </ListGroup>
            </Card>

        </Col>
    </Row>
    
    
    }
    
    </>
  )
}

export default ProductScreen