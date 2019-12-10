import React from 'react'
import { Header as NBHeader, Body, Title } from 'native-base'
import { Button } from 'react-native';

const Header = ({deleteAll}) => {
	return (
			<NBHeader style={{backgroundColor: '#5859f2'}}>
				<Body>
					<Title style={{color: '#ffffff' }}>Todo App</Title>
					
				</Body>
			</NBHeader>
		)
}

export default Header