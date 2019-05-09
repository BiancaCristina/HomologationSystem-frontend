import React, {Component} from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";

class ConsultaPaginado extends Component {
    constructor(props) {
        super(props);
        
        // O estado "termo" define o filtro de busca
        this.state = {
            equipamentos: [],
            termo: '',
            pageOfItems: []
        };
    }

    componentWillMount() {
        // Faz um GET no endpoint que retorna os equipamentos paginados
        // Troquei o equipamentos/page por equipamentos/ (não vem paginado do spring)
        const BASE_URL = 'http://localhost:8080/equipamentos'

        fetch(`${BASE_URL}/`)
        .then(response => response.json())
        .then(data => this.setState({equipamentos: data}));
    }

    filterMethod (filter, row, column) {
        // Metodo da documentação para um filtro que não é case sensitive
        const id = filter.pivotId || filter.id
        return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
    }

    render() {
        // Cria const pra não usar "this.state" o tempo todo
        const {equipamentos, termo} = this.state;
        equipamentos && console.log(equipamentos)

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
                    data={equipamentos}
                    columns={columns}
                    defaultPageSize={10}
                    pageSizeOptins = {[3,6]}
                    filterable= {true}
                    defaultFilterMethod= {this.filterMethod}
                />
            </div>
        );
    }
}

export default ConsultaPaginado