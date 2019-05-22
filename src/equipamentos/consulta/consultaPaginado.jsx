import React, {Component} from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import qs from 'qs'
import axios from 'axios';

class ConsultaPaginado extends Component {
    constructor(props) {
        super(props);
        
        // O estado "termo" define o filtro de busca
        this.state = {
            equipamentos: []
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
    
    filterCaseInsensitive (filter, row) {
        // Método que filtra os parâmetros da consulta ignorando case sensitive

        const id = filter.pivotId || filter.id;
        const content = row[id];

        if (typeof content !== 'undefined') {
            return String(content).toLowerCase().includes(filter.value.toLowerCase());
        }
    
        return true;
    };
    
    render() {
        // Cria const pra não usar "this.state" o tempo todo
        const {equipamentos, termo} = this.state;
        equipamentos && console.log(equipamentos)
        
        // Colunas da tabela
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
                    defaultFilterMethod= {this.filterCaseInsensitive}
                />
            </div>
        );
    }
}

export default ConsultaPaginado