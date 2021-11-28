import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import http from "../http-common.js";
import { Alert } from "react-bootstrap";

function ForgotPassword(props) {
  const forgotPasswordForm = useRef(null);
  const [error, setError] = useState(false);
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  async function changePassword(event) {
    event.preventDefault();
    let data = {};
    const formData = new FormData(forgotPasswordForm.current);
    formData.forEach((value, key) => {
      console.log(key);
      console.log(value);
    });
    formData.forEach((value, key) => (data[key] = value));
    const json = JSON.stringify(data);
    await http
      .post(location.state.user + "/forgotPassword", json)
      .then((response) => {
        if (response.data.status === false) {
          setError(true);
          setErrorMessage(response.data.message);
        } //error response
        else {
          console.log(response.data);
          navigate(-1);
        } //success response
      })
      .catch();
  }
  return (
    <div class="container ">
      <div class="row d-flex justify-content-center align-items-center my-5">
        <div class="col-md-4 col-md-offset-4">
          <div class="panel panel-default">
            <div class="panel-body">
              <div class="text-center">
                <h3>
                  <i class="fa fa-lock fa-4x"></i>
                </h3>
                <h2 class="text-center">Forgot Password?</h2>
                <p>You can reset your password here.</p>
                <div class="panel-body">
                  <form
                    id="register-form"
                    class="form"
                    ref={forgotPasswordForm}
                    onSubmit={changePassword}
                  >
                    {error && (
                      <Alert variant="danger">
                        <p>{errorMessage}</p>
                      </Alert>
                    )}
                    <div class="form-group">
                      <div class="input-group">
                        <span class="input-group-addon">
                          <i class="glyphicon glyphicon-envelope color-blue"></i>
                        </span>
                        <input
                          type="email"
                          placeholder="Email"
                          class="input"
                          name="emailid"
                          required
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          class="input"
                          name="password"
                          required
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <input
                        name="recover-submit"
                        class="btn btn-lg my-4 btn-primary btn-block"
                        value="Reset Password"
                        type="submit"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
