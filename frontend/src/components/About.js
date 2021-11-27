function About() {
  return (
    <section id="about" class="about">
      <div class="container" data-aos="fade-up">
        <div class="row gx-0">
          <div
            class="col-lg-6 d-flex flex-column justify-content-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div class="content">
              <h3>Our Mission</h3>
              <h2>
                We are on the mission to make students and teachers life
                easier.Now you don't need to postpone your work for submitting
                assignment by going to college or workplace and waiting for
                hours.
              </h2>
              <p>
                This is a platform where teacher can give assignment easily to
                their students and students can view and submit the assignments
                assigned to them.This platform makes the evaluation of the
                assignment also easier for teachers.
              </p>
            </div>
          </div>

          <div
            class="col-lg-6 d-flex align-items-center"
            data-aos="zoom-out"
            data-aos-delay="200"
          >
            <img
              src={require("../assets/images/about.jpg").default}
              class="img-fluid"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default About;
