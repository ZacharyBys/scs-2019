import React from 'react';
import { Component } from 'react';
import './CreateAccount.css';
import axios from 'axios';

class CreateAccount extends Component {
    constructor(){
        super();
        this.state={
            user:'',
            password:''
        }
    }

    submit(event){
        event.preventDefault();
        var apiBaseUrl = "http://localhost:5000/";
        var self = this;
        var payload={
            "user": this.state.user,
            "password":this.state.password
        }
        axios.post(apiBaseUrl+'user', payload)
        .then(function (response) {
                console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render(){
      return(
        <div className="App">
            <MuiThemeProvider>

           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({user:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
            <RaisedButton label="Submit" primary={true} onClick={(event) => this.submit(event)}/>
            </MuiThemeProvider>

        </div>
      )
  }
}

export default CreateAccount;
