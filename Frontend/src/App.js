import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './Login';
import Next from './Next';
import Administrator from './Administrator';

class App extends React.Component 
{
  render() {
    return (
       <Router>
           <div className="App">
            <Switch>
              <Route exact path='/' component={Login}></Route>
              <Route exact path='/next' component={Next}></Route>
              <Route exact path='/admin' component={Administrator}></Route>
            </Switch>
          </div>
       </Router>
    );
  }
}

export default App;