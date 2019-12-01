import React, { Component } from 'react'
import { FlatList, View, StatusBar, StyleSheet, AsyncStorage } from 'react-native'
import uuidv1 from 'uuid/v1'
import _values from 'lodash.values'
import { Button, Text as NBText, Segment } from 'native-base'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import Header from '../components/Header'
import Item from '../components/Item'
import FloatingButton from '../components/FloatingButton'

export class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    todos: {},
    isDataReady: false,
    filter: 'Todo'
  }

  componentDidMount = () => {
    this.loadTodos()
  }

  // loadFonts = async () => {
  //  try {
  //    await Font.loadAsync({
  //      Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
  //      Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
  //      Ionicons: require('../node_modules/native-base/Fonts/Ionicons.ttf')
  //    })
  //    this.setState({ isDataReady: true })
  //  } catch (err) {
  //    alert('Application Error. Cannot load fonts.')
  //  }
  // }

  loadTodos = async () => {
    try {
      await Font.loadAsync({
        Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf')
      })

      const getTodos = await AsyncStorage.getItem('todos')
      const parsedTodos = JSON.parse(getTodos)
      this.setState({ isDataReady: true, todos: parsedTodos || {} })
    } catch (err) {
      alert('Application Error. Cannot load data.')
    }
  }

  addTodo = (Title, Description) => {
    

    if (Title !== '' && Description !== '') {
      this.setState(prevState => {
        const ID = uuidv1()
        const newToDoObject = {
          [ID]: {
            id: ID,
            Title: Title,
            Description: Description,
            createdAt: Date.now()
          }
        }
        const newState = {
          ...prevState,
          todos: {
            ...prevState.todos,
            ...newToDoObject
          }
        }
        this.saveTodos(newState.todos)
        return { ...newState }
        

      })
    }
  }

  deleteTodo = id => {
    this.setState(prevState => {
      const todos = prevState.todos
      delete todos[id]
      const newState = {
        ...prevState,
        ...todos
      }
      this.saveTodos(newState.todos)
      return { ...newState }
    })
  }

  saveTodos = newToDos => {
    const saveTodos = AsyncStorage.setItem('todos', JSON.stringify(newToDos))
    filteredItems(newToDos)
  }

  onPressFab = () => {
    this.props.navigation.navigate('AddTask', {
      saveItem: this.addTodo
    })
  }

  filteredItems = () => {
   
      return _values(this.state.todos).filter(i => {
        return i
        console.warn(i)
      })
      
  }

  render() {
    const { isDataReady, filter } = this.state

    if (!isDataReady) {
      return <AppLoading />
    }
    return (
      <View style={styles.container}>
        <Header />
        <StatusBar barStyle='light-content' />
        <FlatList
          data={this.filteredItems}
          contentContainerStyle={styles.content}
          renderItem={row => {
            return (
              <Item
                Description={row.item.Description}
                Title={row.item.Title}
                id={row.item.id}
                deleteTodo={this.deleteTodo}
             
              />
            )
          }}
          keyExtractor={item => item.id}
        />
        <FloatingButton actionOnPress={this.onPressFab} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    alignSelf: 'stretch'
  },
  contentHeader: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default HomeScreen