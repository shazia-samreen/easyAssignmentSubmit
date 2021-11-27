import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import AOS from "aos";
import LoginOrSignUpPage from "./components/LoginOrSignUpPage";
import TeacherAssignmentCreationForm from "./components/TeacherAssignmentCreationForm";
import Dashboard from "./components/Dashboard";
import "aos/dist/aos.css";

function App() {
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });
  const [home, setHome] = useState(true);
  const [userType, setUserType] = useState("student");
  function changeState(user) {
    console.log("changeState function called");
    setUserType(user);
    setHome(!home);
  }
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          // element={
          //   home ? (
          //     <Home home={home} changeState={changeState} />
          //   ) : (
          //     <LoginOrSignUpPage user={userType} />
          //   )
          // }
          element={<Home />}
        />
        <Route path="/login" element={<LoginOrSignUpPage user={userType} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/submissionForm"
          element={<TeacherAssignmentCreationForm />}
        />
      </Routes>
    </div>
  );
}

export default App;
