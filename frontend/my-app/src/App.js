import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Login from './Login/Login'
import CreateAccount from './CreateAccount/CreateAccount'
import Questions from './Questions/Questions'

const UserInfoContext = React.createContext('userInfo');

class App extends Component {

  constructor(){
    super();
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
    this.props.history.push(path);
  }

  render(){
    return(
      <Router>
        <div>
          <Route path="/login" component={() => <Login userInfo={this.state.user} updateUser={this.updateUser} redirect={this.redirect}/>} />
          <Route path="/account" component={() => <CreateAccount userInfo={this.state.user} updateUser={this.updateUser} redirect={this.redirect}/>} />
          <Route path="/questions" component={() => <Questions userInfo={this.state.user}  updateUser={this.updateUser} redirect={this.redirect}/>} />

        </div>
    </Router>);
  }
}

export default App;
