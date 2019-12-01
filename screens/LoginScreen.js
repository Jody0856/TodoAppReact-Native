import React, { useState } from 'react';
import { View, Text, TextInput, AsyncStorage, AppRegistry, StyleSheet} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { ThemeProvider, Button, Input } from 'react-native-elements';

export default function LoginScreen (props){
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');

	return (
			<View>
				<Input 
					placeholder="Your Username"
					value={this.username}
					autoFocus
					onChangeText={this.setUsername}
				/>
				<Input 
					placeholder="Your Password"
					value={this.password}
					autoFocus
					onChangeText={this.setPassword}
				/>
				<Button
					title="Login"
					style={{backgroundColor: '#5067FF', margin: 25, justifyContent: 'center'}}
					onPress={() => this.login}
					>
					
				</Button>
			</View>
		)
}

login = () =>{
	this.username == 'admin' && this.password == 'admin' ? this.props.navigation.navigate('Home') : alert('Username or Password invalid')
}