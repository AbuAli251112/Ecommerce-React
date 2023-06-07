import { CREATE_ORDER_CASH,CREATE_ORDER_CRAD } from '../type'
import { useGetDataToken } from '../../hooks/useGetData'
import { useInsertData } from '../../hooks/useInsertData'

export const createOrderCash = (id, body) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/v1/orders/${id}`, body);
        dispatch({
            type: CREATE_ORDER_CASH,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: CREATE_ORDER_CASH,
            payload: e.response,
        })
    }
}

export const createOrderCARD = (id) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/v1/orders/checkout-session/${id}`);
        dispatch({
            type: CREATE_ORDER_CRAD,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: CREATE_ORDER_CRAD,
            payload: e.response,
        })
    }
}