import axios from 'axios';
import React from 'react'
import './Administrator.css'

class Administrator extends React.Component
{
    state={
        patterns:'',  //for question and keywords
        responses:'',  //for the response
        status:''  //to show status
    }
    //change patterns value as per given input
    patternsChange = (e)=> {
        console.log(e.target.value);
        this.setState({patterns:e.target.value});
    }
    //change responses value as per given input
    responsesChange = (e)=> {
        console.log(e.target.value);
        this.setState({responses:e.target.value});
    }
    //to send at press of enter
    pressKey = (e) => {
        if(e.keyCode === 13 || e.which === 13)
        {
            this.handleAdd();
        }
    }
    //add the document in collection in mongodb by sending http request
    handleAdd = () => {
        //check if patterns and response field are not empty
        if(this.state.patterns !== '' && this.state.responses !== '')
        {
            //post patterns and response to backend
            axios.post('http://127.0.0.1:5000/admin',{'patterns':this.state.patterns,'responses':this.state.responses})
            .then(res=>{
            this.setState({patterns:'',responses:'',status:'Question Added!'});
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        });
        }
    }
    render()
    {
        return (
            <div class='faq'>
                <p id='txt'>FAQ</p>
                <p id='label'>Question (in small with ',' to separate keywords)</p>
                {/*question input*/}
                <input id='in' 
                       type='text' 
                       name='ques' 
                       value={this.state.patterns} 
                       placeholder='Question' 
                       onChange={(e) => this.patternsChange(e)}
                       onKeyPress={(e) => this.pressKey(e)} />
                <p id='label'>Answer (for separating points use ' -' to separate and for adding url with a message ie. -To download Click http://url)</p>
                {/*Answer input*/}
                <input id='in' 
                       type='text' 
                       name='ans' 
                       value={this.state.responses} 
                       placeholder='Answer'
                       onChange={(e) => this.responsesChange(e)}
                       onKeyPress={(e) => this.pressKey(e)} />
                {/*aad button*/}
                <button id='btnsend' onClick={() => this.handleAdd()}>Add</button>
                {/*status show*/}
                <p id='status'>{this.state.status}</p>
            </div>
        );
    }
}

export default Administrator;