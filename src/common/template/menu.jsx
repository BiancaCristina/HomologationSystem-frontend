import React from 'react'
import MenuItem from './menuItem'
import MenuTree from './menuTree'

export default props => (
  <ul className='sidebar-menu'>
    <MenuItem path='#' label='Login' icon='user' />

    <MenuTree label='Equipamentos' icon='wrench'>
      <MenuItem path='#consultar'
        label='Consulta' icon='book' />
      <MenuItem path='#cadastrar'
        label='Cadastro' icon='edit' />
    </MenuTree>

  </ul>
)