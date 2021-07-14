import React from 'react'
import './Typing.css'

class Typing extends React.Component
{
    render()
    {
        return (
            <div id='typing'>
                <div class='dot a'></div>
                <div class='dot b'></div>
                <div class='dot c'></div>
            </div>
        )
    }
} 

export default Typing;