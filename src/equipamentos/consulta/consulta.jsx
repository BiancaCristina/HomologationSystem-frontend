import React, { Component } from 'react'

import ContentHeader from '../../common/template/contentHeader'
import Content from '../../common/template/content'
import Tabs from '../../common/tab/tabs'
import TabsHeader from '../../common/tab/tabsHeader'
import TabsContent from '../../common/tab/tabsContent'
import TabHeader from '../../common/tab/tabHeader'


class Consulta extends Component {
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

					</TabsContent>
				</Tabs>
			</Content>

			</div>
		)
	}
}
export default Consulta