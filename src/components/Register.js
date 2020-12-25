import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const usersBackendURL = "http://localhost:2000";

class RegisterComponent extends Component {
  state = {
    form: {
        userName:'',
        password: ''
    },
    formErrMsg: {
        userName:'',
        password: ''
    },
    formValid: {
        userName:false,
        password: false,
        buttonActive: false
    },
    successResponse: "",
    errorMessage: ""
  }


  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ form: { ...this.state.form, [name]: value } });
    this.validateField(name, value);
  }

  validateField = (fieldName, value) => {
    var message;
    var { formErrMsg } = this.state;
    var { formValid } = this.state;

    switch (fieldName) {
      case 'userName':
        value === "" ? message = "Please enter your user Name" : message = "";
        break;

      case "password":
        let passRegex = new RegExp(/(?=.*[A-Z])(?=.*[!@#$&*%&])(?=.*[0-9])(?=.*[a-z])/);
        value === "" ? message = "Please enter your password" : passRegex.test(value) ? message = "" : message = "Invalid password format"
        break
    
      default:
        break;
    }
    //Form err message set
    formErrMsg[fieldName] = message;
    this.setState({ formErrMsg: formErrMsg });
    //Form Valid set
    message === "" ? formValid[fieldName] = true : formValid[fieldName] = false;
    formValid.buttonActive = formValid.userName && formValid.password;
    this.setState({ formValid: formValid });
  }

  submitSignIn = (e) => {
    e.preventDefault();
    this.setState({successResponse:"",errorMessage:""})
    axios.post(usersBackendURL + '/register', this.state.form)
      .then(response =>{this.setState({ successResponse: response.data})})
      .catch(error => {
        this.setState({ errorMessage: error.response ? error.response.data.message : error.message })
      })
    }

  render() {
    const { password,userName } = this.state.form;
    const { formErrMsg } = this.state
    return (
      <React.Fragment>
        <div className="col-md-4 offset-4 mt-5 card rounded pt-5 pb-5 px-4">
              <form className="form-group " onSubmit={this.submitSignIn}>
              <h4 className="text-center text-info pb-3">Register Yourself</h4>
                  <label For="userName">Username</label>
                  <input className="form-control" id="userName" type="text" name="userName" value={userName} onChange={this.handleInputChange} />
                  <span className="text-danger">{formErrMsg.userName}</span><br/>

                  <label For="password">Password</label>
                  <input className="form-control" name="password" type="password" value={password} onChange={this.handleInputChange} id="password" />
                  <span className="text-danger">{formErrMsg.password}</span><br/>


                <button id="regButton" type="submit" disabled={!this.state.formValid.buttonActive} className="btn btn-primary offset-5">Register</button>
              <div className="text-danger">{this.state.errorMessage}</div>
              </form><br />
              <Link className="text-center" to="/login" exact={"true"} onClick={this.handleClick}>Click Here To Login</Link><br />
              <Link className="text-center text-dark" to="/passwordChange" exact={"true"} onClick={this.handleClick}>Change Your Old Password</Link><br />
              <span className="text-success text-center">{this.state.successResponse}</span>
        </div>
      </React.Fragment>
    )}
  }

export default RegisterComponent