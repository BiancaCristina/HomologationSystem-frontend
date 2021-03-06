import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContentHeader from '../../common/template/contentHeader'
import Content from '../../common/template/content'
import Tabs from '../../common/tab/tabs'
import TabsHeader from '../../common/tab/tabsHeader'
import TabsContent from '../../common/tab/tabsContent'
import TabHeader from '../../common/tab/tabHeader'
import TabContent from '../../common/tab/tabContent'
import { selectTab, showTabs } from '../../common/tab/tabActions'
import {create} from './cadastroActions'

import Form from './cadastroForm'

class Cadastro extends Component {

	componentWillMount() {
		// Faz com que a tab padrão seja a 'tabCreate' de criar equipamentos
		this.props.selectTab('tabCreate')

		// Define visibilidade de determinadas tabs
		this.props.showTabs('tabCreate')
	}

	render() {
		return (
			<div>

			<ContentHeader title='Equipamentos' small='Cadastro' />

			<Content>
				<Tabs>
					<TabsHeader>
						<TabHeader label='' icon='plus' target='tabCreate' />
						<TabHeader label='' icon='pencil' target='tabUpdate' />
						<TabHeader label='' icon='trash-o' target='tabDelete' />
					</TabsHeader>

					<TabsContent>
						<TabContent id='tabCreate'>
							<Form onSubmit= {this.props.create}/>
						</TabContent>

						<TabContent id='tabUpdate'>
							<h1>Editar Equipamento</h1>
						</TabContent>

						<TabContent id='tabDelete'>
							<h1>Deletar Equipamento</h1>
						</TabContent>
					</TabsContent>
				</Tabs>
			</Content>

			</div>
		)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({selectTab, showTabs, create}, dispatch)
export default connect(null, mapDispatchToProps)(Cadastro)