import { combineReducers } from 'redux'
import TabReducer from '../common/tab/tabReducer'
import ConsultaReducer from '../equipamentos/consulta/consultaReducer'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
  tab: TabReducer,
  consulta: ConsultaReducer,
  form: formReducer,
  toastr: toastrReducer
})

export default rootReducer