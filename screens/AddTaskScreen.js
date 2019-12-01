  
import React, { Component } from 'react'
import { View } from 'react-native'
import { Form, Item, Input, Button, Text as NBText } from 'native-base'

export class AddTaskScreen extends Component {
	state = {
		title: '',
		desc: ''
	}

	onChangeTitle = event => {
		this.setState({ title: event })
	}

	onChangeDesc = event => {
		this.setState({ desc: event })
	}

	onAddTask = () => {
		const { title, desc } = this.state
		this.props.navigation.state.params.saveItem(title, desc)
		this.props.navigation.goBack()
	}

	render() {
		return (
			<View>
				<View style={{ marginRight: 10 }}>
					<Form>
						<Item>
							<Input
								placeholder='Enter a Title Task...'
								value={this.state.title}
								autoFocus
								clearButtonMode='always'
								autoCorrect={false}
								onChange={(text) =>this.onChangeTitle(text)}
								returnKeyType={'done'}
							/>
						</Item>
						<Item>
							<Input
								placeholder='Enter Description...'
								value={this.state.desc}
								autoFocus
								clearButtonMode='always'
								autoCorrect={false}
								onChange={(text)=>this.onChangeDesc(text)}
								returnKeyType={'done'}
							/>
						</Item>
					</Form>
				</View>
				<View style={{ marginTop: 20 }}>
					<Button
						style={{ backgroundColor: '#5067FF', margin: 25, justifyContent: 'center' }}
						onPress={this.onAddTask}
					>
						<NBText style={{ fontWeight: 'bold' }}>Add Task</NBText>
					</Button>
				</View>
			</View>
		)
	}
}

export default AddTaskScreen