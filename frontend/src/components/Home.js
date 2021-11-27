import { useEffect } from "react";
import Header from "./Header.js";
import Hero from "./Hero.js";
import About from "./About.js";
import GetStarted from "./GetStarted.js";
import Features from "./Features.js";
import Footer from "./Footer.js";
function Home(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div>
      <Header isDashBoard={false} />
      <Hero />
      <About />
      <GetStarted home={props.home} changeState={props.changeState} />
      <Features />
      <Footer />
    </div>
  );
}
export default Home;
