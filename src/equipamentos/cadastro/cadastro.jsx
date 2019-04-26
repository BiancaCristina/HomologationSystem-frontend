import React, { Component } from 'react'
import ContentHeader from '../../common/template/contentHeader'
import Content from '../../common/template/content'

class Cadastro extends Component {
  render() {
    return (
      <div>
        <ContentHeader title='Equipamentos' small='Cadastro' />
        <Content>
          Equipamentos
        </Content>
      </div>
    )
  }
}
export default Cadastro