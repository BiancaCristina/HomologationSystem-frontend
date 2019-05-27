import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import {logout} from '../common/auth/auth'

class Logout extends Component {
    componentWillMount() {
        logout()
        hashHistory.push('/consultar')
        window.location.reload()
    }

    render() {
        return; 
    }
}

export default Logout; 