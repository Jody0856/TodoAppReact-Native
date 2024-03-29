import React, { Component } from 'react'
import { FlatList, View, StatusBar, StyleSheet, AsyncStorage, ToastAndroid } from 'react-native'
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
      // console.log(this.state.todos)
      // console.log('adad')
    } catch (err) {
      alert('Application Error. Cannot load data.')
    }
  }

  addTodo = (Title, Description) => {
    
    // console.log(Title, Description)
    if (Title !== '' && Description !== '') {
      this.setState(prevState => {
        console.log(prevState)
        const ID = uuidv1()
        const newToDoObject = {
          [ID]: {
            id: ID,
            Title: Title,
            Description: Description,
            createdAt: Date.now()
          }
        } //ini object terbaru

        const newState = {
          ...prevState, //ini object sebelumnya yang banyal
          todos: {
            ...prevState.todos,
            ...newToDoObject
          }
        } //ini
        console.log(newState)
        this.saveTodos(newState.todos)
        ToastAndroid.show('Added Task Success!', ToastAndroid.SHORT)
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
       ToastAndroid.show('Delete Task Success!', ToastAndroid.SHORT)
      return { ...newState }
    })
  }

  // deleteAllTodos = () =>{
  //   AsyncStorage.clear().then(res=>console.log('success')).catch(err=>console.log(err))
    
  // }
  logOutTodos = () =>{
    this.props.navigation.navigate('LoginStack')
  }
  saveTodos = newToDos => {
    const saveTodos = AsyncStorage.setItem('todos', JSON.stringify(newToDos))
    // console.log(newToDos)
    // this.filteredItems(newToDos)
  }

  onPressFab = () => {
    this.props.navigation.navigate('AddTask', {
      saveItem: this.addTodo
    })
      // AsyncStorage.clear().then(result=>console.log('clear success')).catch(err=>console.log(err))
  }

  filteredItems = () => {
        return _values(this.state.todos).map(i => {
        return i
        
      })
      
  }
  
  render() {
    const { isDataReady, filter } = this.state
    // console.log(this.filteredItems())
    if (!isDataReady) {
      return <AppLoading />
    }
    return (
      <View style={styles.container}>
        <Header signOut={this.logOutTodos}/>
        <StatusBar barStyle='light-content' />
        <FlatList
          data={this.filteredItems()}
          contentContainerStyle={styles.content}
          renderItem={row => {
            // console.log(row.item.id)
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