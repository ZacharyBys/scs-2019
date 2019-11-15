import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Login from './Login/Login'
import CreateAccount from './CreateAccount/CreateAccount'
import Questions from './Questions/Questions'
import history from './history';

const UserInfoContext = React.createContext('userInfo');

class App extends Component {
  static contextTypes = {
    router: {}
  }
  constructor(props, context){
    super(props, context);
    this.state={
      user : ''
    }

    this.updateUser = this.updateUser.bind(this)
    this.redirect = this.redirect.bind(this)
  } 

  updateUser(newUser){
    console.log(newUser);
    this.setState({
      user: newUser
    })
  }

  redirect(path){
    console.log(this);
    this.state.history.push(path);
  }

  render(){

    console.log(history);

    return(
      <Router history={history}>
        <div>
          <Route path="/login" component={(history) => <Login userInfo={this.state.user} history={history} updateUser={this.updateUser} redirect={this.redirect}/>} />
          <Route path="/account" component={(history) => <CreateAccount userInfo={this.state.user} history={history} updateUser={this.updateUser} redirect={this.redirect}/>} />
          <Route path="/questions" component={(history) => <Questions userInfo={this.state.user} history={history} updateUser={this.updateUser} redirect={this.redirect}/>} />
        </div>
    </Router>);
  }
}

export default App;
