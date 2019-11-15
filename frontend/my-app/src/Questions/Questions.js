import React from 'react';
import { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Cell } from 'styled-css-grid';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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

const apiBaseUrl = "http://localhost:5000/";


class Questions extends Component {
    constructor(props){
        super(props);
        this.state={
            user:'',
            password:'',
            answers: [],
            questions: [],
            index: 0,
            score: 0,
            dialogText: '',
            dialogOpen: false
        }
        this.answer1 = this.answer1.bind(this)
        this.answer2 = this.answer2.bind(this)
        this.answer3 = this.answer3.bind(this)
        this.answer4 = this.answer4.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)

    }


    componentDidMount(){

        axios.get(apiBaseUrl+'questions')
        .then( (response) => {
                console.log(response.data);
                this.setState({questions:response.data})
        })
      }
  
    
    answer1(event) {
        const correctAnswer = this.state.questions[this.state.index][2];
        if(this.state.questions[this.state.index][3]==correctAnswer){
            this.setState({score:this.state.score+100});
            this.setState({dialogText: 'CORRECT! YAY!'});
        }
        else{
            this.setState({dialogText: 'INCORRECT! BOO!'});
        }
        this.handleOpen();
        this.goToNextQuestion();    }

    answer2(event){
        const correctAnswer = this.state.questions[this.state.index][2];
        if(this.state.questions[this.state.index][4]==correctAnswer){
            this.setState({score:this.state.score+100});
            this.setState({dialogText: 'CORRECT! YAY!'});
        }
        else{
            this.setState({dialogText: 'INCORRECT! BOO!'});
        }
        this.handleOpen();
        this.goToNextQuestion();
    }
    answer3(event){
        const correctAnswer = this.state.questions[this.state.index][2];
        if(this.state.questions[this.state.index][5]==correctAnswer){
            this.setState({score:this.state.score+100});
            this.setState({dialogText: 'CORRECT! YAY!'});
        }
        else{
            this.setState({dialogText: 'INCORRECT! BOO!'});
        }
        this.handleOpen();
        this.goToNextQuestion();
    }
    answer4(event){
        const correctAnswer = this.state.questions[this.state.index][2];
        if(this.state.questions[this.state.index][6]==correctAnswer){
            this.setState({score:this.state.score+100});
            this.setState({dialogText: 'CORRECT! YAY!'});
        }
        else{
            this.setState({dialogText: 'INCORRECT! BOO!'});
        }

        this.handleOpen();
        this.goToNextQuestion();
    }

    goToNextQuestion(){
        if(this.state.index+1!=this.state.questions.length)
        this.setState({
            index: this.state.index+1
        })
        else{
            this.submit();
        }
    }

    submit(){
        // let send = {
        //     user: 
        // }
        axios.post(apiBaseUrl+'questions')
        .then( (response) => {
                console.log(response.data);
                this.setState({questions:response.data})
        })
    }

    handleOpen() {
        this.setState({
            dialogOpen: true});
      };
    
    handleClose() {
        this.setState({
            dialogOpen: false});
    };

    render(){
        const index = this.state.index;
      return(
        <div className="App">
            <MuiThemeProvider>

            <Grid columns={2}>
                <Cell width={1} height={8} style={style1} onClick={this.answer1}>
                    {this.state.questions[index] &&
                    this.state.questions[index][3]}
                
                </Cell>
                <Cell width={1} height={8} style={style2} onClick={this.answer2}>
                    {this.state.questions[index] &&
                    this.state.questions[index][4]}
                
                </Cell>
                <Cell width={1} height={8} style={style3} onClick={this.answer3}>
                    {this.state.questions[index] &&
                    this.state.questions[index][5]}
                
                </Cell>
                <Cell width={1} height={8} style={style4} onClick={this.answer4}>
                    {this.state.questions[index] &&
                    this.state.questions[index][6]}
                
                </Cell>

            </Grid>
            <button onClick={()=>console.log(this.state)}>Check state</button>
            <button onClick={()=>this.setState({dialogOpen:true})}>Check dialog</button>


            <Dialog
                open={this.state.dialogOpen}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {this.state.dialogText}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Close
                </Button>
                </DialogActions>
            </Dialog>
            </MuiThemeProvider>

        </div>
      )
  }
}

export default Questions;
