import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

class LoginForm extends Component {
    render() {
        const { handleSubmit } = this.props
        return (    
            <form role='form' onSubmit= {handleSubmit}>
                <div className='box-body'>
                    <Field name="acesso" component="input" type="text" placeholder="Usuário"/>
                </div>

                <div className='box-body'>
                    <Field name="senha" component="input" type="password" placeholder="Senha"/>
                </div>

                <div className='box-footer'>
                    <button type='submit' className='btn btn-primary'
                    >Entrar</button>
                </div>
            </form>
        )
    }
}

export default reduxForm({form: 'LoginForm'})(LoginForm)