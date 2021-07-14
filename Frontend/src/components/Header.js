import React from 'react';
import './Header.css'
import BotImage from './BotImage.jpg'

class Header extends React.Component
{
    render()
    {
        return (
            <div class='top'>
                <img class='icon' src={BotImage} alt='Bot'/>
                <p class='name'>App Support</p>
            </div>
        );
    }
}

export default Header;