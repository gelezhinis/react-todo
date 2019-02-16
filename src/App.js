import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import './App.css';
// import uuid from 'uuid';
import axios from 'axios';

class App extends Component {
  state = {
    todos: []
        // {
        //     id: uuid.v4(),
        //     title: 'Išnešti šiukšles',
        //     completed: false
        // },
        // {
        //     id: uuid.v4(),
        //     title: 'Nuvažiuoti į parduotuvę',
        //     completed: false
        // },
        // {
        //     id: uuid.v4(),
        //     title: 'Išmokti Reactjs',
        //     completed: false
        // }
    
}
  //importing TodoList from JSONplaceholder 
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=8').then(response => this.setState({todos: response.data}));
  } 

  //Toggle Complete
  markComplete = (id) => {
    this.setState({todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    })});
  }

  //Delete Todo
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/&{id}`).then(response =>
    this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]}))
    
  }

  //Add Todo
  addTodo = (title) => {
    // atkomentuoti, kai TodoList bus ne iš JSONplaceholder
    // const newTodo = {
    //   id: uuid.v4(),
    //   title: title,
    //   completed: false
    // }
    axios.post('https://jsonplaceholder.typicode.com/todos',{
      title: title,
      completed: false
    }).then(response => this.setState({todos: [...this.state.todos, response.data]}));
  }

  render() {
    return (
      <Router>
      <div className="App">
        <div className="container">
          <Header />
          <Route exact path="/" render={props => (
             <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
             </React.Fragment>             
          )} /> 
          <Route path="/about" component={About} />        
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
