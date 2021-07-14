import React from 'react'
import './Login.css'
import BotImage from './components/BotImage.jpg'

class Login extends React.Component
{
    state={
        user:'',
        pass:'',
        invalid:''
    }
    userChange = (e)=> {
        console.log(e.target.value);
        this.setState({user:e.target.value});
    }
    passChange = (e)=> {
        console.log(e.target.value);
        this.setState({pass:e.target.value});
    }
    handleLogin = () => {
        if(this.state.user !== '' && this.state.pass !== '')
        {
            if(this.state.user === '123' && this.state.pass === 'abc')
            {
                console.log("Success")
                window.location.assign('/next');
            }
            else
            {
                this.setState({user:'',pass:'',invalid:'Invalid Username or Password'})
                console.log('Invalid')
            }
        }
        else if(this.state.user !== '' && this.state.pass === '')
        {
            this.setState({pass:'',invalid:'Enter Password'})
                console.log('Invalid')
        }
        else if(this.state.user === '' && this.state.pass !== '')
        {
            this.setState({user:'',invalid:'Enter Username'})
                console.log('Invalid')
        }
        else
        {
            this.setState({invalid:'Enter Username and Password'})
                console.log('Invalid')
        }
    }
    handleAdminLogin = () => {
        if(this.state.user !== '' && this.state.pass !== '')
        {
            if(this.state.user === 'admin' && this.state.pass === 'admin')
            {
                console.log("Success")
                window.location.assign('/admin');
            }
            else
            {
                this.setState({user:'',pass:'',invalid:'Invalid Username or Password'})
                console.log('Invalid')
            }
        }
        else if(this.state.user !== '' && this.state.pass === '')
        {
            this.setState({pass:'',invalid:'Enter Password'})
                console.log('Invalid')
        }
        else if(this.state.user === '' && this.state.pass !== '')
        {
            this.setState({user:'',invalid:'Enter Username'})
                console.log('Invalid')
        }
        else
        {
            this.setState({invalid:'Enter Username and Password'})
                console.log('Invalid')
        }
    }
    render()
    {
        return (
            <div class='start'>
                <img id='logo' src={BotImage} alt='bot'></img>
                <p id ='txt'>App Support</p>
                <div class='box'>
                    <div class='login'>
                        <p id='invalid'>{this.state.invalid}</p>
                        <p id='tag'>Username*</p>
                        <input id='in' 
                               type='text' 
                               name='user' 
                               value={this.state.user} 
                               placeholder='Username' 
                               onChange={(e) => this.userChange(e)} />
                        <p id='tag'>Password*</p>
                        <input id='in' 
                               type='password' 
                               name='pass' 
                               value={this.state.pass} 
                               placeholder='Password'
                               onChange={(e) => this.passChange(e)} />
                    </div>
                    <div class='btndiv'>
                    <button id='btn1' onClick={() => this.handleAdminLogin()}>Admin Login</button>
                    <button id='btn2' onClick={() => this.handleLogin()}>Login</button>
                    </div>
               </div>
            </div>
        );
    }
}

export default Login;