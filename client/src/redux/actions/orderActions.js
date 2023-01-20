import axios from 'axios'
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
  } from '../constants/orderConstants'

  const API_URL='http://localhost:8000/api/orders'

  export const createOrder = (order) => async (dispatch, getState) =>{
    try {
        dispatch({type: ORDER_CREATE_REQUEST})

        const { userLogin: { userInfo } } = getState()

        const config = { 
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        }

        const { data } = await axios.post(`${API_URL}`,order , config)

        dispatch({type: ORDER_CREATE_SUCCESS, payload: data })

    } catch (error) {
      const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: message,
      })
    }
  }