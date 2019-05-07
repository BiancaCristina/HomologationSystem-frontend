import axios from 'axios'
import { toastr } from 'react-redux-toastr'

const BASE_URL = 'http://localhost:8080/equipamentos'

export function create(values) {
    axios.post(`${BASE_URL}`, values)
    .then(resp => {
            toastr.success('Sucesso', 'Equipamento cadastrado')
        })
        .catch(e => {
            toastr.error('Erro', 'Houve problemas para cadastrar equipamento')
            //e.response.data.errors.forEach(error => toastr.error('Erro', error))
        })
    return {
        type: 'TEMP'
    }
}