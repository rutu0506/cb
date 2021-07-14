import React from 'react'
import axios from 'axios'
import FirstMessage from './FirstMessage.js'
import './Message.css'
import Typing from './Typing'

class Message extends React.Component
{
    state = {
        chat:[],
        msg:''
    }
    handleChange = (e)=> {
        console.log(e.target.value);
        this.setState({msg:e.target.value});
    }
    handleSend = () => {
        if(this.state.msg !== '')
        {
            axios.post('http://127.0.0.1:5000/user',{'msg':this.state.msg})
            .then(res=>{
                let ch = this.state.chat;
                ch.push({from:'our',msag:this.state.msg});
                ch.push({from:'cb',msag:res.data});
                this.setState({chat:ch,msg:''});
                console.log(this.state);
                

            })
            .catch(err=>{
                console.log(err);
            });
            
            this.forceUpdate();
        }
        var interval1 = window.setInterval(()=> {
            var elem = document.getElementById('chatboard');
            elem.scrollTop=elem.scrollHeight;
            window.clearInterval(interval1);
        },500);
        var interval2 = window.setInterval(()=> {
            var elem = document.getElementById('chatboard');
            elem.scrollTop=elem.scrollHeight;
            window.clearInterval(interval2);
        },1500);
    }
    pressEnter=(e) => {
        if(e.keyCode === 13 || e.which === 13)
        {
            this.handleSend();
        }
    }
    getTime = () => {
        var t=new Date()
        return t.getHours()+':'+t.getMinutes();
    }
    render()
    {
        return (
            
            <div class='container'>
                <div id='chatboard'>
                    <FirstMessage/>
                    {
                        this.state.chat.map((msg)=>{
                            if(msg.from === 'cb')
                            {
                                return <div class='msgarea'>
                                    <Typing/>
                                    <div class='textarea' id='bot'>
                                    <p style={{width:'100%',float:'left'}}>
                                        {msg.msag.split(' -').map((item) =>
                                            {
                                                if(item.search('http') !== -1)
                                                {
                                                    return <p><br/>{item.substr(0,item.search('http'))}<a rel="noreferrer" target='_blank' href={item.substr(item.search('http'))}>here</a>.<br/></p>
                                                }
                                                else
                                                {
                                                    return <li> {item} <br/></li>
                                                }
                                            }
                                        )}
                                    </p>
                                    <span class='timespan'>{this.getTime()}</span>
                                    </div>
                                </div>
                            }
                            else
                            {
                                return <div class='msgarea'>
                                    <div class='textarea usertext'>
                                    <p style={{width:'100%',float:'left'}}>{msg.msag}</p>
                                    <span class='timespan'>{this.getTime()}</span>
                                    </div>
                                </div>
                            }
                        })
                    }
                </div>
                <div class='textenter'>
                    <input class='enter' type='text' name='msg' 
                      onChange={(e)=>this.handleChange(e)}
                      onKeyPress={(e)=>this.pressEnter(e)}
                      value={this.state.msg} 
                      placeholder='Type a message'/>
                    <button onClick={()=>this.handleSend()} class="glyphicon glyphicon-send"></button>
                </div>
            </div>
        );
    }
}
export default Message;