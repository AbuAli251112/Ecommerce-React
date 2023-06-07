import { ADD_TO_CART,APPLY_COUPON_CART, GET_ALL_USER_CART, UPDATE_ITEM_FROM_CART, DELETE_ITEM_FROM_CART, CLEAR_ALL_USER_CART } from '../type'
import { useGetDataToken } from '../../hooks/useGetData'
import { useInsertData } from '../../hooks/useInsertData';
import useDeleteData from './../../hooks/useDeleteData';
import { useInsUpdateData } from './../../hooks/useUpdateData'

export const addProductToCart = (body) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/v1/cart`, body);
        dispatch({
            type: ADD_TO_CART,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: ADD_TO_CART,
            payload: e.response,
        })
    }
}

export const getAllUserCartItems = () => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/v1/cart`);
        dispatch({
            type: GET_ALL_USER_CART,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: GET_ALL_USER_CART,
            payload: e.response,
        })
    }
}

export const clearAllCartItem = () => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/v1/cart`);
        dispatch({
            type: CLEAR_ALL_USER_CART,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: CLEAR_ALL_USER_CART,
            payload: e.response,
        })
    }
}

export const deleteCartItem = (id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/v1/cart/${id}`);
        dispatch({
            type: DELETE_ITEM_FROM_CART,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: DELETE_ITEM_FROM_CART,
            payload: e.response,
        })
    }
}

export const updateCartItem = (id, body) => async (dispatch) => {
    try {
        const response = await useInsUpdateData(`/api/v1/cart/${id}`, body);
        dispatch({
            type: UPDATE_ITEM_FROM_CART,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: UPDATE_ITEM_FROM_CART,
            payload: e.response,
        })
    }
}

export const applyCouponCart = (body) => async (dispatch) => {
    try {
        const response = await useInsUpdateData(`/api/v1/cart/applyCoupon`, body);
        dispatch({
            type: APPLY_COUPON_CART,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: APPLY_COUPON_CART,
            payload: e.response,
        })
    }
}