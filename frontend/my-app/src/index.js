import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import Login from './Login/Login'
import CreateAccount from './CreateAccount/CreateAccount'
import Questions from './Questions/Questions'
const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/account" component={CreateAccount} />
      <Route path="/questions" component={Questions} />

    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))
