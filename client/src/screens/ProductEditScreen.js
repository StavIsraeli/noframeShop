import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getProductDetails, updateProduct } from '../redux/actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../redux/constants/productConstants'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const ProductEditScreen = () => {
    const { id } = useParams();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, error, product } = useSelector( state => state.productDetails)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector( state => state.productUpdate)


    useEffect(() => {
       
      if(successUpdate){
        dispatch({type: PRODUCT_UPDATE_RESET})
        navigate('/admin/productlist')
      } else {
        
        if(!product.name || product._id!==id){
          dispatch(getProductDetails(id))
        } else {
            setName(product.name)
            setPrice(product.price)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
            setImage(product.image)

        }
      }
        
    }, [dispatch, product, id, navigate, successUpdate])

    const handleSumbmit = (e) => {
        e.preventDefault()
        dispatch(updateProduct({_id: id, name, price, category, countInStock, description, image}))
    }

    const uploadFileHandler = async (e) => {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image', file)
      setUploading(true)
  
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data;boundary="boundary' 
          },
        }
  
        const { data } = await axios.post('http://localhost:8000/api/upload', formData, config)
        setImage(data)
        setUploading(false)
      } catch (error) {
        console.error(error)
        setUploading(false)
      }
    }

    return (
        <>
        <Link to='/admin/productlist' className='btn btn-ligth my-3'>Go Back</Link>
        <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Form onSubmit={handleSumbmit}>
                <Form.Group className="mb-3" controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                    type='name' 
                    placeholder='Enter name' 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId='price'>
                    <Form.Label>Price Address</Form.Label>
                    <Form.Control 
                    type='number' 
                    placeholder='Enter price' 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}>
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='image' className="mb-3">
                  <Form.Control
                  type='text'
                  placeholder='Enter image url'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    label='Choose File'
                    type='file' 
                    onChange={uploadFileHandler}
                  ></Form.Control>
                  {uploading && <Loader />}
                </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
                <Button type='submit' variant='primary'>Update</Button>
            </Form>

        )}
        </FormContainer>
        </>
  )
}

export default ProductEditScreen