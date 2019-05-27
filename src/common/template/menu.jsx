import React, {Component} from 'react'
import MenuItem from './menuItem'
import MenuTree from './menuTree'
import {isAuthenticated} from '../auth/auth'

class Menu extends Component {
	renderAcesso() {
		if(!isAuthenticated()) {
			return <MenuItem path='#login' label='Login' icon='sign-in' />
		}

		else {
			return <MenuItem path='#logout' label='Logout' icon='sign-out' />
		}
	}

	renderCadastro() {
		if(isAuthenticated()) {
			return <MenuItem path='#cadastrar' label='Cadastro' icon='edit' />
		}
	}

	renderConsultar() {
		return <MenuItem path='#consultar'
				label='Consulta' icon='book' />
	}

	render() {
		return(
			<ul className='sidebar-menu'>
				
				<MenuTree label='Acesso' icon='user'>
					{this.renderAcesso()}
				</MenuTree>

				<MenuTree label='Equipamentos' icon='wrench'>
					{this.renderConsultar()}
					{this.renderCadastro()}
				</MenuTree>
		  </ul>
		)
	}
}

export default Menu;