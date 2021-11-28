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
import ForgotPassword from "./components/ForgotPassword";

function App() {
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginOrSignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/submissionForm"
          element={<TeacherAssignmentCreationForm />}
        />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
