import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

class CadastroForm extends Component {
    render() {
        const { handleSubmit } = this.props
        return (    
            <form role='form' onSubmit= {handleSubmit}>
                <div className='box-body'>
                    <Field name="r12" component="input" type="text" placeholder="R12"/>
                </div>

                <div className='box-body'>
                    <Field name="nome" component="input" type="text" placeholder="Nome"/>
                </div>

                <div className='box-body'>
                    <Field name="fabricante" component="input" type="text" placeholder="Fabricante"/>
                </div>

                <div className='box-body'>
                    <Field name="descricao" component="input" type="textarea" placeholder="Descrição"/>
                </div>

                <div className='box-body'>
                    <Field name="linkImagem" component="input" type="textarea" placeholder="Link da imagem"/>
                </div>

                <div>
                    <label></label>
                    <div>
                        <Field name="status" component="select">
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