import React, { Component } from "react";
import axios from "axios";
import AllUserData from "./AllUserData"

const usersBackendURL = "http://localhost:2000";

class AdminComponent extends Component {
  state = {
    form: {
      userName: '',
      password: '',
    },
    formErrMsg: {
      userName: '',
      password: '',
    },
    formValid: {
      userName: false,
      password: false,
      buttonActive: false
    },
    successResponse:null,
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
        let passRegex = new RegExp(/(?=.*[A-Z])(?=.*[!@#$&*%&])(?=.*[0-9])(?=.*[a-z])./);
        value === "" ? message = "Please enter your password" : passRegex.test(value) ? message = "" : message = "Invalid password"
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
    this.setState({successResponse:null,errorMessage:""})
    axios.post(usersBackendURL + '/adminLogin', this.state.form)
      .then(response =>{this.setState({ successResponse: response.data})
      })
      .catch(error => {
        this.setState({ errorMessage: error.response ? error.response.data.message : error.message })
      })
  }

  render() {
    const { userName, password } = this.state.form;
    const { formErrMsg } = this.state
    if (!this.state.successResponse==""){
      return <AllUserData data={this.state.successResponse}></AllUserData>
    }
    return (
      <React.Fragment>
        <br/>
        <div className="col-md-4 offset-4 mt-5 card rounded pt-5 pb-5 px-4">
              <form className="form-group" onSubmit={this.submitSignIn}>
              <h4 className="text-center text-info pb-3">Admin Login</h4>
                  <label For="userName">Username</label>
                  <input className="form-control" id="userName" type="text" name="userName" value={userName} onChange={this.handleInputChange} />
                  <span className="text-danger">{formErrMsg.userName}</span>
                  <br/>
                  <label For="uPass">Password</label>
                  <input name="password" type="password" className="form-control" value={password} onChange={this.handleInputChange} id="password" required />
                  <span className="text-danger">{formErrMsg.password}</span><br />

                  <button className="btn btn-primary offset-5" type="submit" disabled={!this.state.formValid.buttonActive} >Login </button>
              </form><br />
              <div className="text-center text-info">Only For Admin Login </div>
              <span className={'text-danger text-center'}>{this.state.errorMessage}</span>
        </div>
      </React.Fragment>
    )
  }
}

export default AdminComponent