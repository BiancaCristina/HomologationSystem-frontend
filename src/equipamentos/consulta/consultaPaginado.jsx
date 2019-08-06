import React, {Component} from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import {isAuthenticated} from '../../common/auth/auth'
import {showEquipamentos, deleteEquipamentos, editEquipamentos} from './consultaActions'

const state_link = "STATE_LINK";

class ConsultaPaginado extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            equipamentos: [],
            columns: [],
            showLinkImagem: localStorage.getItem(state_link)
        };

        this.renderEditable = this.renderEditable.bind(this);
        this.renderColunas = this.renderColunas.bind(this);
    }

    componentWillMount() {
        // O componente já será renderizado com a lista de equipamentos
        showEquipamentos()
        .then(data => this.setState({equipamentos: data}));

        this.renderColunas();
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

    showLink() {
        // Verifica se deve mostrar a coluna "linkImagem"
        if (this.state.showLinkImagem == null || this.state.showLinkImagem == 0) {
            return false
        }

        else return true
    }

    handleEditLink(row) {
        // Muda o estado que exibe a coluna "linkImagem" e salva no localStorage
        if (this.state.showLinkImagem == null || this.state.showLinkImagem == 0) {
            this.setState({showLinkImagem: 1})
            localStorage.setItem(state_link, 1)
        }

        else {
            this.setState({showLinkImagem: 0})
            localStorage.setItem(state_link, 0)
        }

        window.location.reload()
    }
    
    handleDelete(row) {
        var id = row.id
        deleteEquipamentos(id)
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
                        <i className={`fa fa-pencil`} onClick={() => this.handleEditLink(row.original)}/>
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
                    <a style={{float : 'left', paddingRight : '25px'}}>
                        <i className={`fa fa-link`} onClick={() => this.handleLink(row.original)}/>
                    </a>
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
                    editEquipamentos(id, data, cellInfo)
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

    renderColunas() {
        const colunas = [{
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
            Header: 'LinkImagem',
            accessor: 'linkImagem',
            show: this.showLink(),
            Cell: row => (this.renderEditable(row)),
            filterable: false
        },
        {
            Header: '',
            acessor: 'editIcons',
            //show: isAuthenticated(),
            Cell: row => (
                    this.renderOptins(row)
            ),
            filterable: false
        }]

        this.setState({columns: colunas})
    }

    render() {
        return(
            <div>
                <ReactTable 
                    data={this.state.equipamentos}
                    columns={this.state.columns}
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