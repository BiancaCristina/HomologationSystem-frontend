import '../common/template/dependencies'
import React from 'react'
import Header from '../common/template/header'
import SideBar from '../common/template/sidebar'
import Rotas from './rotas'

export default props => (
  <div className='wrapper'>
      <Header />
      <SideBar />
      
      <div className='content-wrapper'>
        <Rotas />
      </div>
  </div>
)