import { useNavigate } from "react-router-dom";
function Login(props) {
  const navigate = useNavigate();
  return (
    <section id="login" class="login">
      <div class="container" data-aos="fade-up">
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div class="card" style={{ width: "20rem", height: "25rem" }}>
            <img
              src={require("../assets/images/login-Image.png").default}
              class="card-img-top"
              alt=""
              style={{ marginBottom: "1.5rem" }}
            />
            <div
              class="
                card-body 
                align-items-center
                justify-content-center
                align-self-center"
            >
              <a
                href="www.google.com"
                class="btn btn-primary"
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/login", {
                    state: {
                      user: "student",
                    },
                  });
                }}
              >
                Login as Student
              </a>
            </div>
          </div>
          <div class="card" style={{ width: "20rem", height: "25rem" }}>
            <img
              src={require("../assets/images/login-Image.png").default}
              class="card-img-top"
              alt=""
              style={{ marginBottom: "1.5rem" }}
            />
            <div
              class="
                card-body 
                align-items-center
                justify-content-center
                align-self-center"
            >
              <a
                href="www.google.com"
                class="btn btn-primary"
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/login", {
                    state: {
                      user: "teacher",
                    },
                  });
                }}
              >
                Login as Teacher
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
