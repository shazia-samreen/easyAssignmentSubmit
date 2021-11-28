import React from "react";
import { Alert } from "react-bootstrap";
import { useRef, useState } from "react";
import http from "../http-common.js";
import "../assets/styles/Assignments.css";
function StudentAssignmentSubmissionForm(props) {
  const submitForm = useRef(null);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");
  const [response, setResponse] = useState(false);
  function submitAssignment(event) {
    event.preventDefault();
    const formData = new FormData(submitForm.current);
    formData.append("referenceAssignmentId", props.assignment._id);
    formData.append("userId", props.userId);
    formData.append("topic", props.assignment.topic);
    formData.append("description", props.assignment.description);
    formData.append("status", "submitted");
    formData.append("schoolName", props.assignment.schoolName);
    formData.append("totalMarks", props.assignment.grade.total);
    http
      .post("/assignment/submit", formData)
      .then((response) => {
        if (response.data.status === false) {
          setResponse(true);
          setVariant("danger");
          setMessage(response.data.errorMessage);
        } //error response
        else {
          setResponse(true);
          setMessage(
            "Assignment Submitted succesfully...Redirecting to dashboard in 2 seconds"
          );
          const timer = setInterval(() => {
            props.changeState(timer);
          }, 2000);
        } //success response
      })
      .catch((error) => {
        setResponse(true);
        setVariant("danger");
        setMessage("Something went wrong please try after some time");
      });
  }
  return (
    <>
      (
      <div class="submissionForm" style={{ height: "100vh" }}>
        <div class="submissionForm-inner">
          <button
            class="close-btn"
            onClick={() => {
              props.changeState();
            }}
          >
            <i class="bi bi-x"></i>
          </button>
          <form
            ref={submitForm}
            onSubmit={submitAssignment}
            enctype="multipart/form-data"
            method="post"
          >
            {response && (
              <Alert variant={variant}>
                <p>{message}</p>
              </Alert>
            )}
            <div class="form-group">
              <span class="inline-spacing">Upload your submission</span>
              <input
                type="file"
                class="form-control-file"
                name="assignment"
                id="exampleFormControlFile1"
                required
              />
              <div>
                <button type="submit" class="btn btn-primary spacing">
                  submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      )
    </>
  );
}

export default StudentAssignmentSubmissionForm;
