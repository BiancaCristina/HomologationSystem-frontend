import axios from 'axios'
const BASE_URL = 'http://localhost:8080/equipamentos'

export function getList() {
    const request = axios.get(`${BASE_URL}/page`)

    return {
        type: 'EQUIPAMENTOS_FETCHED',
        payload: request
    }
}