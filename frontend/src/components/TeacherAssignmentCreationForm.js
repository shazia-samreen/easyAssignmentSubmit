import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import http from "../http-common.js";
import { useNavigate, useLocation } from "react-router-dom";

function TeacherAssignmentCreationForm(props) {
  const assignmentForm = useRef(null);
  const location = useLocation();
  console.log(location.state);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");
  const [response, setResponse] = useState(false);
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;
  function submitAssignments(event) {
    event.preventDefault();
    const formData = new FormData(assignmentForm.current);
    formData.append("userId", location.state.userId.userId);
    formData.append("status", "assigned");
    formData.append("schoolName", location.state.schoolName.schoolName);
    //console.log(formData);
    http
      .post("/assignment/submit", formData)
      .then((response) => {
        console.log(response);
        if (response.data.status === false) {
          setResponse(true);
          setMessage(response.data.errorMessage);
        } //error response
        else {
          // console.log("post request successfull");
          navigate(-1);
        } //success response
      })
      .catch((error) => {
        setResponse(true);
        setMessage(response.data.errorMessage);
      });
  }
  return (
    <div class="submissionForm">
      <div class="submissionForm-inner">
        <button
          class="close-btn"
          onClick={() => {
            navigate(-1, { state: { count: 1 } });
          }}
        >
          <i class="bi bi-arrow-left"></i>
          <span>back</span>
        </button>
        <form action="#" ref={assignmentForm} onSubmit={submitAssignments}>
          {/* <!-- Name input --> */}
          {response && (
            <Alert variant={variant}>
              <p>{message}</p>
            </Alert>
          )}
          <div class="form-outline mb-4">
            <label class="form-label" for="form4Example1">
              Topic
            </label>
            <input
              type="text"
              id="form4Example1"
              class="form-control"
              name="topic"
            />
          </div>
          <label class="form-label" for="form4Example2">
            Description
          </label>
          <div class="form-outline mb-4">
            <textarea
              class="form-control"
              id="form4Example2"
              rows="2"
              name="description"
            ></textarea>
          </div>
          <div class="form-outline mb-4">
            <label class="form-label" for="form4Example3">
              Class
            </label>
            <input
              type="number"
              id="form4Example3"
              class="form-control"
              name="class"
              max="10"
              min="1"
            />
          </div>
          <div class="form-outline mb-4">
            <label class="form-label" for="form4Example3">
              Total Marks
            </label>
            <input
              type="number"
              id="form4Example3"
              class="form-control"
              name="totalMarks"
              max="100"
              min="10"
            />
          </div>
          <div class="form-outline mb-4">
            <label class="form-label" for="datePickedId">
              Deadline
            </label>
            <input
              type="date"
              id="datePickedId"
              class="form-control"
              name="deadline"
              min={today}
            />
          </div>
          <div class="form-outline mb-4">
            <label class="form-label" for="file">
              Assignment File
            </label>
            <input
              type="file"
              id="file"
              class="form-control"
              name="assignment"
            />
          </div>
          {/* <!-- Submit button --> */}
          <button type="submit" class="btn btn-primary btn-block mb-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default TeacherAssignmentCreationForm;
