import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const usersBackendURL = "http://localhost:2000";

class PasswordComponent extends Component {
  state = {
    form: {
        userName:'',
        password: '',
        newPassword:''
    },
    formErrMsg: {
        userName:'',
        password: '',
        newPassword:''
    },
    formValid: {
        userName:false,
        password: false,
        newPassword:false,
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
      
        case "newPassword":
          let Regex = new RegExp(/(?=.*[A-Z])(?=.*[!@#$&*%&])(?=.*[0-9])(?=.*[a-z])/);
          value === "" ? message = "Please enter your newPassword" : Regex.test(value) ? message = "" : message = "Invalid password format"
          break

      default:
        break;
    }
    //Form err message set
    formErrMsg[fieldName] = message;
    this.setState({ formErrMsg: formErrMsg });
    //Form Valid set
    message === "" ? formValid[fieldName] = true : formValid[fieldName] = false;
    formValid.buttonActive = formValid.userName && formValid.password && formValid.newPassword;
    this.setState({ formValid: formValid });
  }

  submitSignIn = (e) => {
    e.preventDefault();
    this.setState({successResponse:"",errorMessage:""})
    axios.post(usersBackendURL + '/newPassword', this.state.form)
      .then(response =>{this.setState({ successResponse: response.data})})
      .catch(error => {
        this.setState({ errorMessage: error.response ? error.response.data.message : error.message })
      })
    }

  render() {
    const { password,userName,newPassword } = this.state.form;
    const { formErrMsg } = this.state
    return (
      <React.Fragment>
        <div className="col-md-4 offset-4 mt-5 card rounded pt-5 pb-5 px-4">
              <form className="form-group " onSubmit={this.submitSignIn}>
              <h4 className="text-center text-info pb-3">Change Your Password</h4>
                  <label For="userName">Username</label>
                  <input className="form-control" id="userName" type="text" name="userName" value={userName} onChange={this.handleInputChange} />
                  <span className="text-danger">{formErrMsg.userName}</span><br/>

                  <label For="password">Old Password</label>
                  <input className="form-control" name="password" type="password" value={password} onChange={this.handleInputChange} id="password" />
                  <span className="text-danger">{formErrMsg.password}</span><br/>

                  <label For="password">New Password</label>
                  <input className="form-control" name="newPassword" type="password" value={newPassword} onChange={this.handleInputChange} id="newPassword" />
                  <span className="text-danger">{formErrMsg.newPassword}</span><br/>

                <button id="regButton" type="submit" disabled={!this.state.formValid.buttonActive} className="btn btn-primary offset-4">Change Password</button>
              <div className="text-danger">{this.state.errorMessage}</div>
              </form><br />
              <Link className="text-center" to="/register" exact={"true"} onClick={this.handleClick}>Click Here To Register</Link><br />
              <span className="text-success text-center">{this.state.successResponse}</span>
        </div>
      </React.Fragment>
    )}
  }

export default PasswordComponent