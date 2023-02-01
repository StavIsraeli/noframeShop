import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getProductList, deleteProduct, createProduct } from '../redux/actions/productActions'
import { PRODUCT_CREATE_RESET } from '../redux/constants/productConstants'

import { useNavigate } from 'react-router-dom';

const ProductListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, products } = useSelector(state => state.productList)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = useSelector(state => state.productDelete)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = useSelector(state => state.productCreate)
    const { userInfo } = useSelector(state => state.userLogin)

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})
        if(!userInfo.isAdmin)
            navigate('/login')
        if(successCreate){
            navigate(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(getProductList())
        }

    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct] )

    const handleDeleteProduct = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteProduct(id))
          }
      }

      const handleCreateProduct = () => {
            dispatch(createProduct())
      }

  return (
    <>
        <Row className='align-items-center'>
        <Col >
          <h1>Products</h1>
        </Col>
        <Col sm={2}>
          <Button className='my-3' onClick={handleCreateProduct}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      <Row >
        {loadingDelete && <Loader/>}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loadingCreate && <Loader/>}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loading ? 
        (<Loader/> ): error? 
        (<Message variant='danger'>{error}</Message>) :
        (
            <Table responsive striped bordered hover className='table-sm'>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    </tr>
                </thead>
                <tbody>
                {products.map(( product ) => 
                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>

                        <td>
                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                            <Button variant='light' className='btn-sm'>
                                <i className='fas fa-edit'></i>
                            </Button>
                        </LinkContainer>
                        <Button variant='danger' className='btn-sm' onClick={() => handleDeleteProduct(product._id)}>
                            <i className='fas fa-trash'></i>
                        </Button>
                        </td>

                    </tr>
                )}
                </tbody>

            </Table>
        )}

      </Row>
      </>
  )
}

export default ProductListScreen