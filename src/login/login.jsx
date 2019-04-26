import React, { Component } from 'react'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'

class Login extends Component {
  render() {
    return (
      <div>
        <ContentHeader title='Login' small='Login' />
        <Content>
          Login
        </Content>
      </div>
    )
  }
}

export default Login