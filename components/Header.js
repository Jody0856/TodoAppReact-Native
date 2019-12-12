import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { ThemeProvider, Icon, Button,Text, Input, Header as HeaderElements } from 'react-native-elements';
const Header = ({signOut}) => {
	return (
				<HeaderElements
				centerComponent={{text: 'Task List', style: { color: 'white', fontSize: 20 }}}	
				leftComponent={
					<Icon name='backspace' color="white" size={30} onPress={()=>signOut()}/>
					
				}	
			>
				
			</HeaderElements>
		)

}

export default Header

