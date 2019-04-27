import React, { Component } from 'react'

import ContentHeader from '../../common/template/contentHeader'
import Content from '../../common/template/content'
import Tabs from '../../common/tab/tabs'
import TabsHeader from '../../common/tab/tabsHeader'
import TabsContent from '../../common/tab/tabsContent'
import TabHeader from '../../common/tab/tabHeader'

class Cadastro extends Component {
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

					</TabsContent>
				</Tabs>
			</Content>

			</div>
		)
	}
}

export default Cadastro