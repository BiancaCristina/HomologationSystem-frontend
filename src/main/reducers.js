import { combineReducers } from 'redux'
import TabReducer from '../common/tab/tabReducer'
import ConsultaReducer from '../equipamentos/consulta/consultaReducer'

const rootReducer = combineReducers({
  tab: TabReducer,
  consulta: ConsultaReducer
})

export default rootReducer