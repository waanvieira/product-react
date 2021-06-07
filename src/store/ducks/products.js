import { HttpAuth } from '../../config/Http'
import { changeNotify } from '../actions/notify.action'

export const actionTypes = {
    INDEX: 'PRODUCT_INDEX',
    STORE: 'PRODUCT_STORE',
    UPDATE: 'PRODUCT_UPDATE',
    DESTROY: 'PRODUCT_DESTROY',
    CHANGE: 'PRODUCT_CHANGE'
}

export const indexResponse = (payLoad, isLoadMore) => ({
    type: actionTypes.INDEX,
    payLoad,
    isLoadMore
})

export const index = (query, isLoadMore) => dispatch => {
    return HttpAuth.get(`/produtos?` + new URLSearchParams(query))
        .then(res => typeof res != 'undefined' && dispatch(indexResponse(res.data, isLoadMore)))
}

export const storeResponse = (payLoad) => ({
    type: actionTypes.STORE,
    payLoad
})


export const store = (data) => dispatch => {
    return HttpAuth.post(`/produtos`, data)
        .then(res => typeof res != 'undefined' && dispatch(storeResponse(res.data)))
}

export const updateResponse = (payLoad) => ({
    type: actionTypes.UPDATE,
    payLoad    
})

export const update = (data) => dispatch => {
    return HttpAuth.put(`/produtos/${data.uuid}`, data)
        .then(res => {
            if (typeof res != 'undefined') {
                if (res.data.status === 200) {
                    dispatch(updateResponse(data))
                }

                if (res.data.error) {
                    dispatch( changeNotify({
                        open: true,
                        msg: res.data.error,
                        class: 'error'
                    }))
                }
                
            }
        })
}

export const destroyResponse = (payLoad) => ({
    type: actionTypes.DESTROY,
    payLoad
})

export const destroy = (data) => dispatch => {
    return HttpAuth.delete(`/produtos/${data.uuid}`)
        .then(res => typeof res != 'undefined' && dispatch(destroyResponse(data.id)))
}

const initialState = {
    products: {
        data: []
    },
    product: {}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payLoad, isLoadMore }) => {
    switch (type) {        
        case actionTypes.INDEX:

            if (isLoadMore) {
                payLoad.products.data = state.products.data.concat(payLoad.products.data);
            }

            return { ...state, ...payLoad }
            
        case actionTypes.STORE:
            
            state.products.total = state.products.total + 1;

            return {
                ...state,
                products: {
                    ...state.products,
                    data: [
                        ...[payLoad],
                        ...state.products.data
                    ]
                }            
            }
            
        case actionTypes.UPDATE:
            let index = state.products.data.findIndex(item => item.id === payLoad.id);

            state.products.data[index] = payLoad;

            return { ...state,
                    products: {
                        ...state.products,
                        data: state.products.data                        
                    }
            }

        case actionTypes.DESTROY:
            state.products.total = state.products.total -1;

            return {
                ...state,
                products: {
                    ...state.products,
                    data: state.products.data.filter(item => item.id !== payLoad)
                }
            }

        case actionTypes.CHANGE:        

        return {
            ...state,
            product: (payLoad === 'clear') ? {} : {
                ...state.product,
                payLoad
            }
        }

        default:
            return state
    }

}

