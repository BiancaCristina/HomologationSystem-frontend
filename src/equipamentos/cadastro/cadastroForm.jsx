import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

class CadastroForm extends Component {
  render() {
    return (
        <form role='form'>
            <div className='box-body'>
                <Field name="R12" component="input" type="text" placeholder="R12"/>
            </div>

            <div className='box-body'>
                <Field name="Nome" component="input" type="text" placeholder="Nome"/>
            </div>

            <div className='box-body'>
                <Field name="Fabricante" component="input" type="text" placeholder="Fabricante"/>
            </div>

            <div className='box-body'>
                <Field name="Descricao" component="input" type="text" placeholder="Descrição"/>
            </div>

            <div>
                <label></label>
                <div>
                    <Field name="favoriteColor" component="select">
                        <option></option>
                        <option value="EM ANDAMENTO">Em andamento</option>
                        <option value="APROVADO">Aprovado</option>
                        <option value="REPROVADO">Reprovado</option>
                    </Field>
                </div>
            </div>

            <div className='box-footer'>
                <button type='submit' className='btn btn-primary'
                >Cadastrar</button>
            </div>
        </form>
        )
    }
}

export default reduxForm({form: 'CadastroForm'})(CadastroForm)