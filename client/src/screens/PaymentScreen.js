import React, { useState } from 'react'
import Meta from '../components/Meta'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../redux/actions/cartActions'
import  CheckoutSteps from '../components/CheckoutSteps'


const PaymentScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { shippingAddress } = useSelector(state => state.cart)
    if(!shippingAddress) {
        navigate('/shipping')
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal')



    const handleSumbmit = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <><Meta title={`Noframe | Payment`} /><FormContainer>
          <CheckoutSteps step1 step2 step3 />
          <h1>Payment Method</h1>
          <Form onSubmit={handleSumbmit}>
              <Form.Group className='mb-3'>
                  <Form.Label as='legend'>Select Method</Form.Label>
                  <Col>
                      <Form.Check
                          type='radio'
                          label='PayPal or Credit Card'
                          id='PayPal'
                          name='paymentMethod'
                          value='PayPal'
                          checked
                          onChange={(e) => setPaymentMethod(e.target.value)}>
                      </Form.Check>
                  </Col>
              </Form.Group>

              <Button type='submit' variant='primary'>Continue</Button>
          </Form>
      </FormContainer></>
  )
}

export default PaymentScreen