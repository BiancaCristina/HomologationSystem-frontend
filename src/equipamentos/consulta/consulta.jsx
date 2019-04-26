import React, { Component } from 'react'
import ContentHeader from '../../common/template/contentHeader'
import Content from '../../common/template/content'

class Consulta extends Component {
  render() {
    return (
      <div>
        <ContentHeader title='Equipamentos' small='Consulta' />
        <Content>
          Equipamentos
        </Content>
      </div>
    )
  }
}
export default Consulta