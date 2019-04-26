import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'
import Login from '../login/login'
import Consulta from '../equipamentos/consulta/consulta'
import Cadastro from '../equipamentos/cadastro/cadastro'

export default props => (
    <Router history={hashHistory}>
        <Route path='/' component={Login} />
        <Route path='/consultar' component={Consulta} />
        <Route path='/cadastrar' component={Cadastro} />
        <Redirect from='*' to='/' />
    </Router>
)