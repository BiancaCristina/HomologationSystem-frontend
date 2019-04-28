import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList } from './consultaActions'

class ConsultaPaginado extends Component {

    constructor(props) {
        super(props)
        this.state = {
            equipamentos: []};
    }

    componentDidMount() {
        // Faz um GET no endpoint que retorna os equipamentos paginados
        const BASE_URL = 'http://localhost:8080/equipamentos'

        fetch(`${BASE_URL}/page`)
        .then(response => response.json())
        .then(data => this.setState({equipamentos: data.content}));
    }

    render() {
        // Pega o estado do componente e usa pra recuperar os dados do backend
        const {equipamentos} = this.state;
        equipamentos && console.log(equipamentos)

        return (
            <div>
                <table className='table'>
                    <thead>
                        <th>R12</th>
                        <th>Nome</th>
                        <th>Fabricante</th>
                        <th>Descrição</th>
                        <th>Status</th>
                        <th>Data</th>

                    </thead>

                    <tbody>
                        { equipamentos && equipamentos.map(
                            item => 
                                <tr key={item.id} >
                                    <td>{item.r12}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.fabricante}</td>
                                    <td>{item.descricao}</td>
                                    <td>{item.status}</td>
                                    <td>{item.dataUltimaEdicao}</td>
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ConsultaPaginado