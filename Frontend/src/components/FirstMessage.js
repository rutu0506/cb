import React from 'react'
import './FirstMessage.css'
import Typing from './Typing'

class FirstMessage extends React.Component
{
    getTime = () => {
        var t=new Date()
        return t.getHours()+':'+t.getMinutes()
    }
    render()
    {
        return (
            <div class='msgarea'>
                <Typing/>
                <div class='textarea' id='bot'>
                    <p  style={{width:'100%',float:'left'}}>Hi! How may I help you?</p>
                    <span class='timespan'>{this.getTime()}</span>
                </div>
            </div>
        )
    }
}

export default FirstMessage;