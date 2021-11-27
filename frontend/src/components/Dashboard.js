import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import SideNav from "./SideNav";
import http from "../http-common.js";
import "../App.css";
import Assignments from "./Assignments";
function Dashboard(props) {
  const location = useLocation();
  console.log(location.state);
  console.log(location.state.data);
  const navigate = useNavigate();
  const [assignmentsData, setassignmentsData] = useState(
    location.state.data.data
  );
  const [userId, setUserId] = useState(location.state.data.userId);
  const schoolName = location.state.data.schoolName;
  const userName = location.state.data.name;
  const classStudying = location.state.data.class;
  const [assignmentsSubmitted, setAssignmentsSubmitted] = useState([]);
  const [page, setPage] = useState("Assignments Given");
  const [user, setUser] = useState(location.state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [period, setPeriod] = useState(7);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const menuClass = `dropdown-menu${isOpen ? " show" : ""}`;
  //setScreenChange(screenChange + 1);
  async function getAssignments(url) {
    await http
      .get(url)
      .then((response) => {
        console.log(response);
        if (response.data.status === false) {
        } //error response
        else {
          setassignmentsData(response.data.data);
        } //success response
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    console.log("period changed to " + period);
    let url =
      "/assignment?id=" +
      userId +
      "&schoolName=" +
      schoolName +
      "&period=" +
      period;
    if (user === "teacher") {
      getAssignments(url);
    } else {
      url =
        "/assignment?class=" +
        classStudying +
        "&schoolName=" +
        schoolName +
        "&period=" +
        period;
      getAssignments(url);
    }
    console.log("activating" + page);
    activate(page);
  }, [period]);
  async function activate(page) {
    let url;
    if (page === "Assignments Submitted") {
      if (user === "student")
        url =
          "/assignment?id=" +
          userId +
          "&schoolName=" +
          schoolName +
          "&period=" +
          period;
      else
        url =
          "/assignment/submitted?id=" +
          userId +
          "&schoolName=" +
          schoolName +
          "&period=" +
          period;
      console.log(url);
      await http
        .get(url)
        .then((response) => {
          console.log(response);
          if (response.data.status === false) {
          } //error response
          else {
            setAssignmentsSubmitted(response.data.data);
          } //success response
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setPage(page);
  }
  return (
    <>
      <Header isDashBoard={true} user={user} name={userName} />
      <SideNav activate={activate} />
      <div className="trial">
        <div class="d-flex flex-row-reverse bd-highlight justify-content align-items-center">
          <div className="dropdown mx-5" onClick={toggleOpen}>
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
            >
              Retrieving past {period} days assignments
            </button>
            <div className={menuClass} aria-labelledby="dropdownMenuButton">
              <a
                className="dropdown-item"
                href="/"
                onClick={(event) => {
                  event.preventDefault();
                  setPeriod(2);
                }}
              >
                2 days
              </a>
              <a
                className="dropdown-item"
                href="/"
                onClick={(event) => {
                  event.preventDefault();
                  setPeriod(3);
                }}
              >
                3 days
              </a>
              <a
                className="dropdown-item"
                href="/"
                onClick={(event) => {
                  event.preventDefault();
                  setPeriod(7);
                }}
              >
                7 days
              </a>
              <a
                className="dropdown-item"
                href="/"
                onClick={(event) => {
                  event.preventDefault();
                  setPeriod(30);
                }}
              >
                30 days
              </a>
            </div>
          </div>
          {user === "teacher" && (
            <div
              class="p-2 bd-highlight mx-auto"
              style={{ background: "rgb(220,220,220)" }}
            >
              <span style={{ fontWeight: "bold" }}>
                Want to give assignment?
              </span>
              <button
                type="button"
                class="btn btn-dark m-3"
                onClick={() => {
                  navigate("/submissionForm", {
                    state: {
                      userId: { userId },
                      schoolName: { schoolName },
                    },
                  });
                }}
              >
                Give Assignment
              </button>
            </div>
          )}
        </div>
        {page === "Assignments Given" && (
          <Assignments
            assignments={assignmentsData}
            page={page}
            userId={userId}
            schoolName={schoolName}
            user={user}
            activate={activate}
          />
        )}
        {page === "Assignments Submitted" && (
          <Assignments
            assignments={assignmentsSubmitted}
            page={page}
            userId={userId}
            schoolName={schoolName}
            user={user}
            activate={activate}
          />
        )}
      </div>
      {/* <TeacherAssignmentCreationForm /> */}
    </>
  );
}

export default Dashboard;
