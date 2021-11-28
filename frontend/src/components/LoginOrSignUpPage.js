import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "font-awesome/css/font-awesome.min.css";
import "../assets/styles/LoginOrSignUp.css";
import http from "../http-common.js";
function LoginOrSignUpPage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const location = useLocation();
  const [user, setUser] = useState(location.state.user);
  const signinForm = useRef(null);
  const signUpForm = useRef(null);
  const [error, setError] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  async function retrieveAssignments(event) {
    event.preventDefault();
    const actionType = event.target.id;
    let formData,
      data = {},
      json;
    if (actionType === "register") {
      formData = new FormData(signUpForm.current);
    } else {
      formData = new FormData(signinForm.current);
    }
    formData.forEach((value, key) => (data[key] = value));
    json = JSON.stringify(data);
    await http
      .post("/" + user + "/" + actionType, json)
      .then((response) => {
        if (response.data.status === false) {
          if (actionType === "register") {
            setError(1);
          } else {
            setError(2);
          }
          setErrorMessage(response.data.message);
        } //error response
        else {
          console.log(response.data);
          navigate("/dashboard", {
            state: {
              data: response.data,
              user: user,
            },
          });
        } //success response
      })
      .catch((error) => {
        if (error.response) {
          //statements that help to debug for the developer
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }
  return (
    <section id="loginSection" class="loginSection">
      <div class="loginContainer" id="loginContainer">
        <div class="form-container sign-up-container">
          <form
            action="#"
            class="form"
            id="register"
            ref={signUpForm}
            name="register"
            onSubmit={retrieveAssignments}
          >
            <div style={{ display: "flex" }}>
              <h1 class="h1">Create Account</h1>
            </div>
            {error === 1 && (
              <Alert variant="danger">
                <p>{errorMessage}</p>
              </Alert>
            )}
            <input
              type="text"
              placeholder="Name"
              class="input"
              name="name"
              required
            />
            <input
              type="email"
              placeholder="Email"
              class="input"
              name="emailid"
              required
            />
            {user === "student" && (
              <input
                type="number"
                placeholder="Class"
                class="input"
                name="class"
                max="10"
                min="1"
                required
              />
            )}
            <input
              type="text"
              placeholder="School Name"
              class="input"
              name="schoolName"
              required
            />
            <input
              type="password"
              placeholder="Password"
              class="input"
              name="password"
              required
            />
            <button style={{ cursor: "pointer" }} type="submit" class="button">
              Sign Up
            </button>
          </form>
        </div>
        <div class="form-container sign-in-container">
          <form
            action="#"
            class="form"
            id="login"
            name="login"
            ref={signinForm}
            onSubmit={retrieveAssignments}
          >
            <h1 class="h1">Sign in</h1>
            {error === 2 && (
              <Alert variant="danger">
                <p>{errorMessage}</p>
              </Alert>
            )}
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
            <a
              href="/"
              class="link"
              onClick={(event) => {
                event.preventDefault();
                navigate("/forgotPassword", {
                  state: {
                    user: user,
                  },
                });
              }}
            >
              Forgot your password?
            </a>
            <button style={{ cursor: "pointer" }} class="button" type="submit">
              Sign In
            </button>
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1 class="h1">Welcome Back!</h1>
              <p class="p">
                To keep connected with us please login with your personal info
              </p>
              <button
                class="ghost button"
                id="signIn"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  const container = document.getElementById("loginContainer");
                  container.classList.remove("right-panel-active");
                }}
              >
                Sign In
              </button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1 class="h1">Hello, {user}!</h1>
              <p class="p">
                Enter your personal details and start journey with us
              </p>
              <button
                class="ghost button"
                id="signUp"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  const container = document.getElementById("loginContainer");
                  container.classList.add("right-panel-active");
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default LoginOrSignUpPage;
