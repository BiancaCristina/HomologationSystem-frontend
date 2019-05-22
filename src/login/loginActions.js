import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm } from 'redux-form'

const BASE_URL = 'http://localhost:8080/login'

export function login(values) {
    return axios({
            method: 'post',
            url: `${BASE_URL}`,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            data: values
        })
        .then(response => {
            console.log(response.headers.authorization)
            toastr.success('Login realizado com sucesso!', 'Login realizado!')
        })
        .catch(error => {
            toastr.error('Erro', 'Houve problema ao realizar login com as credenciais utilizadas!')
        })
}