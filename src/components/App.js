import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./Login";
import Register from "./Register"
import Navbar from "./Navbar"
import Admin from "./Admin"
import Password from './ChangePass'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <Fragment>
            <Switch>
              <Route exact path='/' component={Login}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/admin" component={Admin}/>
              <Route exact path="/passwordChange" component={Password}/>
            </Switch>
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App