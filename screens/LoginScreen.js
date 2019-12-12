import React, { useState } from 'react';
import { View,TextInput, AsyncStorage, AppRegistry, StyleSheet, ToastAndroid } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { ThemeProvider, Button, Input, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';



const LoginScreen = (props) => {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const input = React.createRef();
	const inputUser = React.createRef();
	


	login = (user, pass) =>{
		
		console.log(user, pass)
		user == 'Admin' && pass == 'admin' ?  props.navigation.navigate('tabNavigator') 
		&&  ToastAndroid.show('Login Success!', ToastAndroid.SHORT) :  
		ToastAndroid.showWithGravityAndOffset('Invalid Username and Password!', ToastAndroid.LONG, ToastAndroid.BOTTOM,25,50),
		input.current.clear(),inputUser.current.clear()
	}
	
	return (
			<View style={styles.container}>
				<Header
				 leftComponent={{text: 'Login', style: { color: 'white', fontSize: 20 }}}
				 centerComponent={{ icon: 'lock', type:'font-awesome', color: 'white',size: 30}}		
				/>
				<Input 
					value={username}
					containerStyle={[{marginTop: 20},styles.input]}
					leftIcon={{ type: 'font-awesome', name: 'user', color: '#4287f5' }}
					leftIconContainerStyle={{marginRight: 25}}
					onChangeText={(username)=>setUsername(username)}
					placeholder="Your Username"
					ref={inputUser}

					
				/>
				<Input 
					value={password}
					containerStyle={styles.input}
					leftIcon={{ type: 'font-awesome', name: 'key',  color: '#4287f5' }}
					leftIconContainerStyle={{marginRight: 20}}
					onChangeText={(password)=>setPassword(password)}
					placeholder="Your Password"
					secureTextEntry={true}
					ref={input}
				/>
				<Button
					containerStyle={styles.button} 
					title="Login"
					onPress={() => this.login(username, password)}
					/>
					
			
			</View>
		)


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
  	alignSelf: 'center',
  	marginBottom: 20,
  	
  },
  button: {
  	alignSelf: 'center',
  	width: 150
  }
})

export default LoginScreen