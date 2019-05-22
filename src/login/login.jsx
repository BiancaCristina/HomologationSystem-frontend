import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Tabs from '../common/tab/tabs'
import TabsHeader from '../common/tab/tabsHeader'
import TabsContent from '../common/tab/tabsContent'
import TabHeader from '../common/tab/tabHeader'
import TabContent from '../common/tab/tabContent'
import { selectTab, showTabs } from '../common/tab/tabActions'
import {login} from './loginActions'

import Form from './loginForm'

class Login extends Component {

	componentWillMount() {
		// Faz com que a tab padrão seja a 'tabCreate' de criar equipamentos
		this.props.selectTab('tabLogin')

		// Define visibilidade de determinadas tabs
		this.props.showTabs('tabLogin')
	}

	render() {
		return (
			<div>

			<ContentHeader title='Login' small='Autenticação' />

			<Content>
				<Tabs>
					<TabsHeader>
						<TabHeader label='' icon='user' target='tabLogin' />
					</TabsHeader>

					<TabsContent>
						<TabContent id='tabLogin'>
							<Form onSubmit= {login}/>
						</TabContent>
					</TabsContent>
				</Tabs>
			</Content>

			</div>
		)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({selectTab, showTabs}, dispatch)
export default connect(null, mapDispatchToProps)(Login)