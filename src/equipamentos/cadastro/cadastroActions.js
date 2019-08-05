import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm } from 'redux-form'
import {getToken, logout, isAuthenticated} from '../../common/auth/auth'
import { hashHistory } from 'react-router';

const BASE_URL = 'http://localhost:8080/equipamentos'

export function create(values) {
    return dispatch => (
        axios({
            method: 'post',
            url: BASE_URL,
            headers: {
               'Access-Control-Allow-Origin': '*',
               'Authorization': getToken()
            }, 
            data: values
           })

           .then(res => {
                dispatch([
                    resetForm('CadastroForm'),
                    hashHistory.push('/consultar')
                ])
               
           })
           .catch(err => {
               toastr.error('Não foi possível cadastrar esse equipamento!')
           })
    )
}