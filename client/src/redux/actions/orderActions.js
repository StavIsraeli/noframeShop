import axios from 'axios'
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL
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

  export const getOrderDetails = (id) => async (dispatch, getState) =>{
    try {
        dispatch({type: ORDER_DETAILS_REQUEST})

        const { userLogin: { userInfo } } = getState()

        const config = { 
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        }

        const {data} = await axios.get(`${API_URL}/${id}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS, 
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message})
    }

  }

  export const payOrder = (id, paymentResult) => async (dispatch, getState) =>{
    try {
        dispatch({type: ORDER_PAY_REQUEST})

        const { userLogin: { userInfo } } = getState()

        const config = { 
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
          }
        }
        const { data } = await axios.put(`${API_URL}/${id}/pay`, paymentResult, config)

        dispatch({type: ORDER_PAY_SUCCESS, payload: data })

    } catch (error) {
      const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
      dispatch({
        type: ORDER_PAY_FAIL,
        payload: message,
      })
    }
  }

  export const deliverOrder = (id) => async (dispatch, getState) =>{
    try {
        dispatch({type: ORDER_DELIVER_REQUEST})

        const { userLogin: { userInfo } } = getState()

        const config = { 
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        }
        const { data } = await axios.put(`${API_URL}/${id}/deliver`,{}, config)

        dispatch({type: ORDER_DELIVER_SUCCESS, payload: data })

    } catch (error) {
      const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
      dispatch({
        type: ORDER_DELIVER_FAIL,
        payload: message,
      })
    }
  }

  export const getMyOrderList = () => async (dispatch, getState) =>{
    try {
        dispatch({type: ORDER_LIST_MY_REQUEST})

        const { userLogin: { userInfo } } = getState()

        const config = { 
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
          }
        }
        const { data } = await axios.get(`${API_URL}/myorders`, config)

        dispatch({type: ORDER_LIST_MY_SUCCESS, payload: data })

    } catch (error) {
      const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
      dispatch({
        type: ORDER_LIST_MY_FAIL,
        payload: message,
      })
    }
  }

  export const getOrderList = () => async (dispatch, getState) =>{
    try {
        dispatch({type: ORDER_LIST_REQUEST})

        const { userLogin: { userInfo } } = getState()

        const config = { 
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        }

        const {data} = await axios.get(API_URL, config)

        dispatch({type: ORDER_LIST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message})
    }

  }