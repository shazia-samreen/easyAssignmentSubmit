import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import http from "../http-common.js";
function EditScoreForm(props) {
  const editForm = useRef(null);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");
  const [response, setResponse] = useState(false);
  function submitAssignment(event) {
    event.preventDefault();
    let data = {};
    const formData = new FormData(editForm.current);
    formData.forEach((value, key) => {
      data[key] = value;
    });
    http
      .patch(
        `/assignment?id=${props.assignment._id}&marks=${data.marks}&total=${props.assignment.grade.total} `,
        formData
      )
      .then((response) => {
        console.log(response);
        if (response.data.status === false) {
          setResponse(true);
          setVariant("danger");
          setMessage(response.data.errorMessage);
        } //error response
        else {
          setResponse(true);
          setMessage(
            "Score updated successsfully...Redirecting to dashboard in 2 seconds"
          );
          const timer = setInterval(() => {
            props.manageEditScore(timer);
          }, 3000);
        } //success response
      })
      .catch((error) => {
        setResponse(true);
        setVariant("danger");
        setMessage(response.data.errorMessage);
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
              props.manageEditScore();
            }}
          >
            <i class="bi bi-x"></i>
          </button>
          <form action="#" ref={editForm} onSubmit={submitAssignment}>
            {response && (
              <Alert variant={variant}>
                <p>{message}</p>
              </Alert>
            )}
            <div class="form-group">
              <span class="inline-spacing">Enter Score</span>
              <input
                type="number"
                min="0"
                max={props.assignment.grade.total}
                name="marks"
                id="marks"
                required
              />
              / {props.assignment.grade.total}
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

export default EditScoreForm;
