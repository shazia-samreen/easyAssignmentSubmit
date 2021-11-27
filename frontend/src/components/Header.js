import { useEffect } from "react";
function Header(props) {
  return (
    <header
      id="header"
      class="header fixed-top"
      style={{
        background: "#fff",
        padding: "1%",
        height: "6.5rem",
        boxShadow: "3px 2px 20px rgba(41, 86, 163, 0.1)",
      }}
    >
      <div
        class="
          container-fluid container-xl
          // d-flex
          // align-items-center
          // justify-content-between
        "
      >
        <a href="/" class="logo d-flex align-items-center remove-underline">
          <img src={require("../assets/images/logo.png").default} alt="" />
          <span>EasyAssignmentSubmit</span>
        </a>

        <nav id="navbar" class="navbar">
          {/* <div> */}
          {!props.isDashBoard && (
            <div>
              <ul class="hide">
                <li>
                  <a
                    class="nav-link scrollto active remove-underline"
                    href="#hero"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a class="nav-link scrollto remove-underline" href="#about">
                    About
                  </a>
                </li>
                <li>
                  <a
                    class="nav-link scrollto remove-underline"
                    href="#features"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a class="getstarted scrollto remove-underline" href="#login">
                    Login/Signup
                  </a>
                </li>
              </ul>
              <ul id="show">
                <li>
                  <a class="getstarted scrollto remove-underline" href="#login">
                    Login/Signup
                  </a>
                </li>
              </ul>
            </div>
          )}
          {props.isDashBoard && (
            <ul>
              <i class="fa fa-user fa-3x" aria-hidden="true"></i>
              <span style={{ fontWeight: "bold" }} class="px-2">
                {props.name} ({props.user})
              </span>
              {/* <span>(teacher)</span> */}
            </ul>
          )}
          {/* </div> */}
        </nav>
        {/* <!-- .navbar --> */}
      </div>
    </header>
  );
}
export default Header;
