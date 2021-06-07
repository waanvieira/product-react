import { combineReducers } from 'redux'
import loadingReducer from './loading.reducer'
import notifyReducer from './notify.reducer'
import alertDuck from '../ducks/alert'
import authDuck from '../ducks/auth'
import registerReducer from '../ducks/register'
import ProductsDuck from '../ducks/products'

const rootReducer = combineReducers({
    loadingReducer,
    notifyReducer,
    alertDuck,
    authDuck,
    registerReducer,
    ProductsDuck
})

export default rootReducer;