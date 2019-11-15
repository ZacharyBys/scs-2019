import React from 'react';
import { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Cell } from 'styled-css-grid';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './Questions.css';
import axios from 'axios';

const style1={
    backgroundColor: "DodgerBlue",
    fontWeight: "bold",
    color: "white",
}

const style2={
    backgroundColor: "Green",    
    fontWeight: "bold",
    color: "white",
}

const style3={
    backgroundColor: "Orange",
    fontWeight: "bold",
    color: "white",
}

const style4={
    backgroundColor: "Red",
    fontWeight: "bold",
    color: "white",
}

class Questions extends Component {
    constructor(){
        super();
        this.state={
            user:'',
            password:''
        }
    }



    submit(event){

    }

    render(){
      return(
        <div className="App">
            <MuiThemeProvider>

            <Grid columns={2}>
                <Cell width={1} height={8} style={style1} onClick={()=>console.log('hi')}>1/2
                
                </Cell>
                <Cell width={1} height={8} style={style2}>1/2
                
                </Cell>
                <Cell width={1} height={8} style={style3}>1/2
                
                </Cell>
                <Cell width={1} height={8} style={style4}>1/2
                
                </Cell>

            </Grid>
            </MuiThemeProvider>

        </div>
      )
  }
}

export default Questions;
