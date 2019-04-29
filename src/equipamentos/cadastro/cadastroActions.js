import axios from 'axios'

const BASE_URL = 'http://localhost:8080/equipamentos'

export function create(values) {
    axios.post(`${BASE_URL}`, values)
    
    return {
        type: 'TEMP'
    }
}