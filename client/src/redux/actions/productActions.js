import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DElETE_REQUEST,
    PRODUCT_DElETE_SUCCESS,
    PRODUCT_DElETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL
  } from '../constants/productConstants'

  const API_URL='http://localhost:8000/api/products'

  export const getProductList = () => async (dispatch) =>{
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})

        const {data} = await axios.get(API_URL)

        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message})
    }

  }

  export const getProductDetails = (id) => async (dispatch) =>{
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`${API_URL}/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS, 
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message : error.message})
    }

  }

  export const deleteProduct = (id) => async (dispatch, getState) =>{
    try {
        dispatch({type: PRODUCT_DElETE_REQUEST})

        const { userLogin: { userInfo } } = getState()

        const config = { 
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        }
        await axios.delete(`${API_URL}/${id}`, config)

        dispatch({type: PRODUCT_DElETE_SUCCESS})

    } catch (error) {
      const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
      dispatch({
        type: PRODUCT_DElETE_FAIL,
        payload: message,
      })
    }
  }

  export const createProduct = () => async (dispatch, getState) =>{
    try {
        dispatch({type: PRODUCT_CREATE_REQUEST})

        const { userLogin: { userInfo } } = getState()

        const config = { 
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        }
        const { data } = await axios.post(`${API_URL}`, {}, config)

        dispatch({type: PRODUCT_CREATE_SUCCESS, payload: data})

    } catch (error) {
      const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload: message,
      })
    }
  }

  export const updateProduct = (product) => async (dispatch, getState) =>{
    try {
        dispatch({type: PRODUCT_UPDATE_REQUEST, data: product})

        const { userLogin: { userInfo } } = getState()

        const config = { 
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
          }
        }
        const { data } = await axios.put(`${API_URL}/${product._id}`, product, config)

        dispatch({type: PRODUCT_UPDATE_SUCCESS, payload: data})

    } catch (error) {
      const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload: message,
      })
    }
  }