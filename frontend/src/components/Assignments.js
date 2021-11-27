import { useState, useEffect } from "react";
import "../assets/styles/Assignments.css";
import StudentAssignmentSubmissionForm from "./StudentAssignmentSubmissionForm";
import EditScoreForm from "./EditScoreForm";
function Assignments(props) {
  console.log(props);
  const [isOpen, setIsOpen] = useState(false);
  const [viewMessage, setViewMessage] = useState(
    props.page === "Assignments Submitted"
      ? "View Submission"
      : "View Assignment"
  );
  console.log("re - rendering");
  const [page, setPage] = useState(props.page);
  const [assignments, setAssignment] = useState(props.assignments);
  const [editScore, setEditScore] = useState(false);
  const [scoreChange, setScoreChange] = useState(false);
  const [edittingAssignment, setedittingAssignment] = useState(null);
  const [submitMessage, setSubmitMessage] = useState(
    props.user === "teacher"
      ? ""
      : page === "Assignments Given"
      ? "Submit Assignment"
      : ""
  );
  console.log(submitMessage);
  console.log(page);
  const [user, setUser] = useState(props.user);
  const [arePresent, setArePresent] = useState(
    props.assignments.length === 0 ? false : true
  );
  console.log(props.assignments.length);
  console.log(arePresent);
  const [assignmentBeingSubmitted, setAssignmentBeingSubmitted] =
    useState(null);
  const id = [];
  const userId = props.userId;
  const schoolName = props.schoolName;
  if (assignments.length > 0) {
    props.assignments.forEach((assignment) => {
      id.push({ _id: assignment._id + "isReadMore", status: true });
    });
  }
  const [readMore, setReadMore] = useState(id);
  console.log(props.assignments);
  async function findElement(assignment) {
    console.log(assignment);
    return await readMore.find((element) => {
      return element._id === assignment._id + "isReadMore";
    });
  }
  function changeState(timer) {
    setIsOpen(!isOpen);
    clearTimeout(timer);
  }
  function changeScore() {
    setScoreChange(!scoreChange);
  }
  function manageEditScore(timer) {
    setEditScore(!editScore);
    clearTimeout(timer);
  }

  //useEffect
  useEffect(() => {
    props.activate(page);
  }, [editScore]);
  return (
    <div class="container py-2">
      <div class="row">
        {props.assignments.length > 0 ? (
          props.assignments.map((assignment) => {
            console.log("Executing ti");
            const foundElement = findElement(assignment);
            return (
              <div class="col-xxl-4 col-xl-6 col-md-12 col-sm-12 py-3">
                <div
                  class="card"
                  style={{
                    width: "24rem",
                    marginBottom: "1rem",
                    marginLeft: "1rem",
                    marginRight: "1rem",
                  }}
                >
                  <div class="card-body">
                    <div>
                      <h5 class="card-title d-flex justify-content-between">
                        {assignment.topic}
                        {page === "Assignments Submitted" && (
                          <span>
                            {assignment.grade.marks === null ? (
                              <button type="button" class="btn btn-danger">
                                not scored
                              </button>
                            ) : (
                              <button type="button" class="btn btn-success">
                                {assignment.grade.marks}/
                                {assignment.grade.total}
                              </button>
                            )}
                          </span>
                        )}
                      </h5>
                    </div>
                    <p>
                      {/* {foundElement.status
                        ? assignment.description.slice(0, 50)
                        : assignment.description}
                      <span
                        onClick={() => {
                          const element = foundElement;
                          const id = element._id;
                          const oldStatus = element.status;
                          const newReadMore = readMore.filter((eachElement) => {
                            return eachElement._id !== id;
                          });
                          setReadMore([
                            ...newReadMore,
                            { _id: id, status: !oldStatus },
                          ]);
                        }}
                        className="read-or-hide"
                      >
                        {console.log(foundElement.status)}
                        {console.log(foundElement)}
                        {foundElement.status ? "...read more" : " show less"}
                      </span> */}
                      {assignment.description.slice(0, 50)}
                    </p>
                    <div class="assignments">
                      <a
                        href={assignment.assignmentPdf}
                        class="btn btn-primary mx-2"
                      >
                        {viewMessage}
                      </a>
                      {submitMessage !== "" && (
                        <a
                          href="/"
                          class="btn btn-primary mx-2"
                          onClick={(event) => {
                            console.log("Submit Clicked");
                            event.preventDefault();
                            setAssignmentBeingSubmitted(assignment);
                            changeState();
                          }}
                        >
                          {submitMessage}
                        </a>
                      )}
                      {user === "teacher" && page === "Assignments Submitted" && (
                        <a
                          href="/"
                          class="btn btn-primary mx-2"
                          onClick={(event) => {
                            event.preventDefault();
                            setedittingAssignment(assignment);
                            manageEditScore();
                          }}
                        >
                          {assignment.grade.marks === null
                            ? "Score Assignment"
                            : "Modify Score"}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : page === "Assignments Given" ? (
          <h1>Assignments not given yet</h1>
        ) : (
          <h1>Assignments not submitted yet</h1>
        )}
      </div>
      {isOpen && (
        <StudentAssignmentSubmissionForm
          changeState={changeState}
          userId={userId}
          assignment={assignmentBeingSubmitted}
        />
      )}
      {editScore && (
        <EditScoreForm
          assignment={edittingAssignment}
          manageEditScore={manageEditScore}
        />
      )}
    </div>
  );
}

export default Assignments;
