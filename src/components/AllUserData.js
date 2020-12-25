import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
const usersBackendURL = "http://localhost:2000";


class AllUserData extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            DeleteData:"",
            successResponse:"",
            errorMessage:""
        }
    }
DeleteData=(e)=>{
e.preventDefault();
var data=e.target.getAttribute("name");
this.Delete(data)
}
Delete=(data)=>{
  var obj={
    uName:data
  }
    axios.put(usersBackendURL + '/delete', obj)
      .then(response =>{this.setState({ data: response.data})
      })
      .catch(error => {
        this.setState({ errorMessage: error.response ? error.response.data.message : error.message })
      })
  }
  render(){
      return (
        <React.Fragment>
          <ul>
            {this.state.data.map(data=><li className="row py-3 text-info" key={data.userId} >{data.uName} <Link className="btn btn-sm btn-primary offset-5  col-1" name={data.uName} onClick={this.DeleteData}>Delete</Link></li>)}
          </ul>
        </React.Fragment>
      );
}
}


export default AllUserData
