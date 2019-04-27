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
import { selectTab } from '../../common/tab/tabActions'

class Consulta extends Component {

	componentWillMount() {
		// Faz com que a aba padrão seja a 'tabList' de listar equipamentos
		this.props.selectTab('tabList')
	}

	render() {
		return (
			<div>

			<ContentHeader title='Equipamentos' small='Consulta' />

			<Content>
				<Tabs>
					<TabsHeader>
						<TabHeader label='' icon='bars' target='tabList' />
					</TabsHeader>

					<TabsContent>
						<TabContent id='tabList'>
							<h1>Listar Equipamentos</h1>
						</TabContent>
					</TabsContent>
				</Tabs>
			</Content>

			</div>
		)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({selectTab}, dispatch)
export default connect(null, mapDispatchToProps)(Consulta)