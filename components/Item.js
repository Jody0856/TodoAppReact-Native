import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { Icon } from 'native-base'

const { width } = Dimensions.get('window')

const Item = ({ Description, Title, id, deleteTodo }) => {
	
	return (
		<View style={styles.container}>
			<View style={styles.rowContainer}>
				

				<Text style={styles.textTitle}>
					Title:	{Title}
				</Text>
				<Text style={styles.text}>
					
					Description: {Description}
				</Text>
			</View>
			<TouchableOpacity onPressOut={() => deleteTodo(id)}>
				<Icon name='md-trash' style={{ color: '#f54242', paddingRight: 10 }} />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		borderBottomColor:  '#4287f5',
		borderBottomWidth: StyleSheet.hairlineWidth,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	text: {
		color:  '#4287f5',
		fontSize: 18,
		marginVertical: 20,
		paddingLeft: 10
	},
	textTitle: {
		color:  '#4287f5',
		fontSize: 18,
		marginVertical: 20,
		paddingLeft: 10
	},

	rowContainer: {
		flexDirection: 'row',
		width: width / 2,
		alignItems: 'center'
	}
})

export default Item
