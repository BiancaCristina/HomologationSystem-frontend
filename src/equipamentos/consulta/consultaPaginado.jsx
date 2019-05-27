import React, {Component} from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import {getToken, logout, isAuthenticated} from '../../common/auth/auth'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'

const BASE_URL = 'http://localhost:8080/equipamentos'

class ConsultaPaginado extends Component {
    constructor(props) {
        super(props);
        
        // O estado "termo" define o filtro de busca
        this.state = {
            equipamentos: []
        };
    }

    componentWillMount() {
        // Faz um GET no endpoint que retorna os equipamentos paginados usando o token JWT salvo
        // Troquei o equipamentos/page por equipamentos/ (não vem paginado do spring)
        const TOKEN_KEY = "SequenciaAssinarToken"
        
        fetch(`${BASE_URL}/`, {
            method: 'get',
            headers: {
                'Authorization': getToken()
            }
        })
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

    handleEdit(row) {
        console.log(row)
    }
    
    handleDelete(row) {
        // Envia requisição para deletar uma coluna
        var id = row.id
        var url_base = 'http://localhost:8080/equipamentos/' + id;

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
    }

    handleLink(row) {
        // Abre o link da imagem do equipamento em uma nova aba
        window.open(row.linkImagem, "_blank")
    }

    renderOptins(row) {
        if (isAuthenticated()) {
            return (
                <span>
                    <a style={{float : 'left', paddingRight : '25px', color: 'black'}}>
                        <i className={`fa fa-pencil`} onClick={() => this.handleEdit(row.original)}/>
                    </a>
        
                    <a style={{float : 'left', paddingRight : '25px', color:'red' }}>
                        <i className={`fa fa-trash`} onClick={() => this.handleDelete(row.original)}/>
                    </a>
        
                    <a style={{float : 'left', paddingRight : '25px'}}>
                        <i className={`fa fa-link`} onClick={() => this.handleLink(row.original)}/>
                    </a>
                </span>)
        }

        else {
            return(
                <span>
                    
                </span>
            )
        }

    }

    render() {
        // Cria const pra não usar "this.state" o tempo todo
        const {equipamentos, termo} = this.state;

        // Colunas da tabela
        if (isAuthenticated()) {
            
        }
        const columns = [{
                Header: 'R12',
                accessor: 'r12',
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
            }, {
                Header: '',
                acessor: 'linkImagem',
                Cell: row => (
                        this.renderOptins(row)
                  )
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