import axios from 'axios'
const BASE_URL = 'http://localhost:8080/equipamentos'

export function getEquipamentosPaginados() {
    const request = axios.get(`${BASE_URL}/page`)
    
    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request
    }
}