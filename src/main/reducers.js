import { combineReducers } from 'redux'
import TabReducer from '../common/tab/tabReducer'
import ConsultaReducer from '../equipamentos/consulta/consultaReducer'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  tab: TabReducer,
  consulta: ConsultaReducer,
  form: formReducer
})

export default rootReducer