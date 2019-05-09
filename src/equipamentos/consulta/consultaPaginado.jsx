import React, {Component} from 'react'
import Pagination from '../../common/pagination/pagination'
import { TablePagination } from 'react-pagination-table';
import ReactTable from "react-table";
import "react-table/react-table.css";


function searchingFor(termo) {
    // Verifica se a string em "termo" está inclusa dentro do filtro nome
    return function(equipamento) {
        return equipamento.nome.toLowerCase().includes(termo.toLowerCase()) || 
        equipamento.descricao.toLowerCase().includes(termo.toLowerCase()) || 
        equipamento.fabricante.toLowerCase().includes(termo.toLowerCase()) ||
        equipamento.r12.toString(10).includes(termo) ||
        !termo; 
    }
} 

class ConsultaPaginado extends Component {
    constructor(props) {
        super(props);
        // O estado "termo" define o filtro de busca

        this.state = {
            equipamentos: [],
            termo: '',
            pageOfItems: []
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
    }

    componentWillMount() {
        // Faz um GET no endpoint que retorna os equipamentos paginados
        // Troquei o equipamentos/page por equipamentos/ (não vem paginado do spring)
        const BASE_URL = 'http://localhost:8080/equipamentos'

        fetch(`${BASE_URL}/`)
        .then(response => response.json())
        .then(data => this.setState({equipamentos: data}));
    }

    onChangePage(pageOfItems) {
        this.setState({pageOfItems: pageOfItems})
    }

    handleSearch(event) {
        this.setState({termo: event.target.value})
    }

    showEquipamentos() {
        const {equipamentos, termo} = this.state;
        return this.state.pageOfItems.filter(searchingFor(termo)).map(item =>
            <tr key={item.id}>
                <td>{item.r12}</td>
                <td>{item.nome}</td>
                <td>{item.fabricante}</td>
                <td>{item.descricao}</td>
                <td>{item.status}</td>
                <td>{item.dataUltimaEdicao}</td>
            </tr>
        )
    }

    render() {
        // Pega o estado do componente e usa pra recuperar os dados do backend
        const {equipamentos, termo} = this.state;
        equipamentos && console.log(equipamentos)

        const data = [{
            nome: 'Roy Agasthyan',
            age: 26
          },{
            nome: 'Sam Thomason',
            age: 22
          },{
            nome: 'Michael Jackson',
            age: 36
          },{
            nome: 'Samuel Roy',
            age: 56
          },{
            nome: 'Rima Soy',
            age: 28
          },{
            nome: 'Suzi Eliamma',
            age: 28
          }]

        const columns = [{
                Header: 'R12',
                accessor: 'r12'
            },{
                Header: 'Nome',
                accessor: 'nome'
            },{
                Header: 'Fabricante',
                accessor: 'fabricante'
            }, {
                Header: 'Descrição',
                accessor: 'descricao'
            },{
                Header: 'Status',
                accessor: 'status'
            }, {
                Header: 'Data',
                accessor: 'dataUltimaEdicao'
            }
        ]


        return(
            <div>
                <ReactTable 
                    data={this.state.equipamentos}
                    columns={columns}
                    defaultPageSize={10}
                    pageSizeOptins = {[3,6]}
                    filterable= {true}
                />
            </div>
        );
    }
}

export default ConsultaPaginado