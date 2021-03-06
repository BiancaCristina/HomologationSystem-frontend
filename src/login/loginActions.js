import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import {setToken} from '../common/auth/auth'
import { hashHistory } from 'react-router';

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
            setToken(response.headers.authorization)
            toastr.success('Login realizado com sucesso!')
            hashHistory.push('/consultar')
            window.location.reload()
        })
        .catch(error => {
            toastr.error('Erro', 'Houve problema ao realizar login com as credenciais utilizadas!')
        })
}