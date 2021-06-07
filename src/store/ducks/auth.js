import { HttpApi } from '../../config/Http'
import { changeLoading } from '../actions/loading.action'
import { changeNotify } from '../actions/notify.action'

const initialState = {
    credentials: {
        email: '',
        password: '',
    },
    success: false
}

//eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payLoad }) => {
    switch (type) {
        case actionTypes.CHANGE:
            return {
                     ...state,
                     credentials: {
                        ...state.credentials,
                        ...payLoad
                    }
                }

        case actionTypes.SUCCESS:
            return {
                    ...state,
                    success: payLoad
                }

        default:
            return state
    }
}

export const actionTypes = {
    CHANGE: 'AUTH_CHANGE',
    SUCCESS: 'AUTH_SUCCESS'
}

export const changeAction = (payLoad) => ({
    type: actionTypes.CHANGE,
    payLoad,
})

export const success = (payLoad) => ({
    type: actionTypes.SUCCESS,
    payLoad
})

export const setUserToken = token => dispatch => {
    localStorage.setItem('access_token', token);
    dispatch( changeAction({
        email: '',
        password: ''
    }) )

    dispatch(success(true))
}

export const login = credentials => dispatch => {
    dispatch(changeLoading({
        open: true,
        msg: 'Autenticando usuário'
    }))

    return HttpApi.post('login', {        
        username: credentials.email,
        password: credentials.password
    })
    .then(response => {
        dispatch(changeLoading({ open: false }));
        if (typeof response !== 'undefined') {
            if (response.data.access_token) {
                dispatch( setUserToken(response.data.access_token));                
            }
        }
    })
    .catch(error => {
        dispatch(changeLoading({ open: false }));
        if (typeof error.response !== 'undefined') {
            if (error.response.status === 401 || error.response.status === 400) {
                dispatch(changeNotify({
                    open: true,
                    class: 'error',
                    msg: 'E-mail ou senha incorretos'                    
                }))
            } else {
                dispatch(changeNotify({
                    open: true,
                    class: 'error',
                    msg: 'Erro ao se conectar com o servidor'
                }))
            }
        }

    })
}