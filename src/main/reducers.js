import { combineReducers } from 'redux'
import TabReducer from '../common/tab/tabReducer'
import ConsultaReducer from '../equipamentos/consulta/consultaActions'

const rootReducer = combineReducers({
  tab: TabReducer,
  equipamentos: ConsultaReducer
})

export default rootReducer