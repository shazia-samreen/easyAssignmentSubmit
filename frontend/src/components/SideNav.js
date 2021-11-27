import React, { useState } from "react";
import "../assets/styles/sideNav.css";
function SideNav(props) {
  const [link, setLink] = useState(1);
  return (
    <aside id="sidebar" class="sidebar">
      <ul class="sidebar-nav" id="sidebar-nav">
        <li class="nav-item">
          <a
            class="nav-link"
            style={link !== 1 ? { color: "#012970", background: "#fff" } : null}
            href="index.html"
            onClick={(event) => {
              event.preventDefault();
              setLink(1);
              props.activate("Assignments Given");
            }}
          >
            <span>Assignments Given</span>
          </a>
        </li>

        <li class="nav-item">
          <a
            class="nav-link"
            style={link !== 2 ? { color: "#012970", background: "#fff" } : null}
            data-bs-target="#components-nav"
            data-bs-toggle="collapse"
            href="/"
            onClick={(event) => {
              event.preventDefault();
              setLink(2);
              props.activate("Assignments Submitted");
            }}
          >
            <span>Assignments Submitted</span>
          </a>
        </li>
      </ul>
    </aside>
  );
}
export default SideNav;
