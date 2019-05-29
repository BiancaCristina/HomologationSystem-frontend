import {getToken, logout, isAuthenticated} from '../../common/auth/auth'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'

const BASE_URL = 'http://localhost:8080/equipamentos/'

export function showEquipamentos() {
    // Faz um GET no endpoint que retorna os equipamentos paginados usando o token JWT salvo
    return fetch(`${BASE_URL}`, {
        method: 'get',
        headers: {
            'Authorization': getToken()
        }
    })
    .then(response => response.json());
}

export function deleteEquipamentos(id) {
    // Faz um DELETE no endpoint que deleta um equipamento
    var url_base = `${BASE_URL}` + id;

    return (
        axios({
            method: 'delete',
            url: url_base,
            headers: {
               'Access-Control-Allow-Origin': '*',
               'Authorization': getToken()
            }   
           })
           .then(res => {
               window.location.reload()
               
           })
           .catch(err => {
               toastr.error('Não foi possível remover esse equipamento!')
           })
    )
}

export function editEquipamentos(id, data, cellInfo) {
    // Faz um PUT no endpoint que atualiza um equipamento
    var url_base = `${BASE_URL}` + id;

    return (
        axios({
            method: 'put',
            url: url_base,
            headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': getToken()
            },
            data: {
                "id": data[cellInfo.index].id,
                "r12": data[cellInfo.index].r12,
                "nome": data[cellInfo.index].nome,
                "fabricante": data[cellInfo.index].fabricante,
                "descricao": data[cellInfo.index].descricao,
                "status": data[cellInfo.index].status
            }
        })
        .then(res => {
            toastr.success("Equipamento atualizado com sucesso!")
        })
        .catch(err => {
            toastr.error('Não foi possível atualizar esse equipamento!')
        })
    )
}