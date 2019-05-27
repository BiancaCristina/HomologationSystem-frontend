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

        this.renderEditable = this.renderEditable.bind(this);
    }

    componentWillMount() {
        // Faz um GET no endpoint que retorna os equipamentos paginados usando o token JWT salvo
        // Troquei o equipamentos/page por equipamentos/ (não vem paginado do spring)        
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

    handleEdit(cellInfo) {
        return (
            <div
              style={{ backgroundColor: "#fafafa" }}
              contentEditable
              suppressContentEditableWarning
              onBlur={e => {
                const data = [...this.state.equipamentos];
                data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                this.setState({ data });
              }}
              dangerouslySetInnerHTML={{
                __html: this.state.equipamentos[cellInfo.index][cellInfo.column.id]
              }}
            />
          );
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
                        <i className={`fa fa-pencil`} onClick={() => this.handleEdit(row)}/>
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

    renderEditable(cellInfo) {
        if (isAuthenticated()) {
            return (
                <div
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.equipamentos];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    data[cellInfo.index].full = data[cellInfo.index].age * 2;
                    e.target.innerHTML = this.state.equipamentos[cellInfo.index][cellInfo.column.id];
                    this.setState({ data });

                    // Atualiza as mudanças no backend
                    var id = data[cellInfo.index].id
                    var url_base = 'http://localhost:8080/equipamentos/' + id;

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


                }}
                >{this.state.equipamentos[cellInfo.index][cellInfo.column.id]}</div>
            );
        }

        else {
            return (
                <div
                >
                {this.state.equipamentos[cellInfo.index][cellInfo.column.id]}</div>
            );
        }
    }
    render() {
        const {equipamentos} = this.state;

        // Colunas da tabela
        const columns = [{
                Header: 'R12',
                accessor: 'r12',
                Cell: row => (this.renderEditable(row))
            },{
                Header: 'Nome',
                accessor: 'nome',
                Cell: row => (this.renderEditable(row))
            },{
                Header: 'Fabricante',
                accessor: 'fabricante',
                Cell: row => (this.renderEditable(row))
            }, {
                Header: 'Descrição',
                accessor: 'descricao',
                Cell: row => (this.renderEditable(row))
            },{
                Header: 'Status',
                accessor: 'status',
                Cell: row => (this.renderEditable(row))
            }, {
                Header: 'Data',
                accessor: 'dataUltimaEdicao',
                Cell: row => (this.renderEditable(row))
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