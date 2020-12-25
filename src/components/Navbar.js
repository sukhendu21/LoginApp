import React, { Component } from 'react';
import { Link} from 'react-router-dom';

class NavBar extends Component {

  logOut=()=>{
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("msg")
    alert("You will be logged out")
    window.location.reload(false)
  }
  render(){
    if(sessionStorage.getItem("login")!=null){
      return (
        <React.Fragment>
            <nav className="nav bg-primary">
              <h5 className="text-warning ml-auto">Welcome &nbsp;<span><i>{sessionStorage.getItem("login")}</i></span></h5>
              <Link className="text-white ml-4 nav-link" style={{fontSize:18,textDecoration:"none"}} onClick={this.logOut} >Logout</Link> 
              <Link className="text-white ml-4 nav-link pr-5" style={{fontSize:18,textDecoration:"none"}} to="/admin" >Admin</Link> 
              </nav>
        </React.Fragment>
      );
    }
    else return (
        <React.Fragment>
            <nav className="nav bg-primary">
              <Link  className="text-white nav-link ml-auto" style={{fontSize:18,textDecoration:"none"}} to="/register" >Register</Link>
              <Link className="text-white nav-link ml-4" style={{fontSize:18,textDecoration:"none"}} to="/login" >Login</Link> 
              <Link className="text-white ml-3 nav-link pr-5" style={{fontSize:18,textDecoration:"none"}} to="/admin" >Admin</Link> 
              </nav>
        </React.Fragment>
      );
    }
}


export default NavBar
