export const actionTypes = {
    CHANGE: 'CHANGE_ALERT'
}

export const changeAlert = (payLoad) => ({
    type: actionTypes.CHANGE,
    payLoad
})

const initialState = {
    open: false,
    class: 'success',
    time: 3000,
    msg: '',
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payLoad }) => {
    switch (type) {

        case actionTypes.CHANGE:
            return { ...state, ...payLoad }

        default:
            return state
    }

}