import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList } from './consultaActions'

class ConsultaPaginado extends Component {

    componentWillMount() {
        this.props.getList()
    }

    render() {
        console.log(this.props.getList())
        
        return (
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>R12</th>
                            <th>Nome</th>
                            <th>Fabricante</th>
                            <th>Descrição</th>
                            <th>Status</th>
                            <th>Data</th>
                        </tr>
                    </thead>

                    <tbody>

                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({list: state.consulta.list})
const mapDispatchToProps = dispatch => bindActionCreators({getList}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ConsultaPaginado)