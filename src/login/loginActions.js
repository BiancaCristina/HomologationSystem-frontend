import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import {setToken} from '../common/auth/auth'

const BASE_URL = 'http://localhost:8080/login'
const TOKEN_KEY = "SequenciaAssinarToken"

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
            //console.log(response.headers.authorization)
            //setToken(response.headers.authorization)
            //localStorage.setItem(TOKEN_KEY, response.headers.authorization);
            
            setToken(response.headers.authorization)
            console.log(localStorage.getItem(TOKEN_KEY))
            toastr.success('Login realizado com sucesso!')
        })
        .catch(error => {
            toastr.error('Erro', 'Houve problema ao realizar login com as credenciais utilizadas!')
        })
}