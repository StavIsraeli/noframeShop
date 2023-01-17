import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

const API_URL='http://localhost:8000/api/products'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`${API_URL}/${id}`)

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty
      },
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }

  export const removeFromCart = (id) => async (dispatch, getState) => {
    
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id 
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }
  