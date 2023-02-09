import React, { useEffect } from 'react'
import Meta from '../components/Meta'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { useParams } from 'react-router-dom';
import { getProductList } from '../redux/actions/productActions'
import { Link } from 'react-router-dom'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const {products, page, pages, loading, error } = useSelector(state => state.productList)
  const { keyword, pageNumber=1 } = useParams();



  useEffect(() => {
    dispatch(getProductList( keyword, pageNumber ))
  }, [dispatch, keyword, pageNumber]);
  

  return (
    <>
     <Meta title={'Noframe Shop | Home'} />
    {!keyword ? 
    <ProductCarousel/> : 
    <Link className='btn btn-light my-3' to={'/'}>Return To All Products</Link>}
    <br/>
    <h1>Our products</h1>
    {loading ? 
    (<Loader/> ) : error? 
    (<Message variant='danger'>{error}</Message>) :
    (<>
    <Row>
      {products.map(product => (
        <Col key={product._id} sm={18} md={6} lg={4} xl={3}>
          <Product product={product} />
        </Col>
      ))}
    </Row>
          
    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} /></>
    
    ) }
   

    </>
  )
}

export default HomeScreen