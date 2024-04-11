import React from "react";
import { Link } from "react-router-dom";
import upSkill from "../img/muniversiti/upskill.png";
import upSkill2 from "../img/muniversiti/upskill2.png";
import muniversiti from "../img/muniversiti/muniversiti.png";

const Muniversiti = () => {
  return (
    <main>
      <h1>Muniversiti</h1>
      <time>Software Developer</time>

      <section>
        <h2>About Muniversiti</h2>
        <p>
          MU20: School of Opportunity is an initiative focused on empowering
          educators and schools to provide high school students with
          experiential learning opportunities. It emphasizes the importance of
          real-world experiences in education, aiming to spark significant
          personal and educational growth in students by promoting a cultural
          shift towards transformative learning experiences.
        </p>
      </section>

      <section>
        <h2>Role</h2>
        <p>
          Led the creation and strategic launch of Muniversiti’s website,
          masterfully integrating Figma for designing the UI, and LAMP stack
          along with Bootstrap for development to elevate the platform's online
          presence and enhance user interactivity.
        </p>
        <figure>
          <img src={muniversiti} alt="muniversiti" />
          <figcaption>
            <h4>Landing screen</h4>
          </figcaption>
        </figure>
        <p>
          Efficiently coordinated the online registration process for the IWS
          conference, significantly boosting Muniversiti's visibility and
          outreach within the educational community and beyond, fostering
          substantial growth in participation.
        </p>
        <p>
          Spearheaded the development of the UpSkill mobile app, creatively
          integrating React Native, Express, and Firebase, to broaden
          educational offerings and provide an interactive learning experience
          for users.
        </p>
        <p>
          Implemented an innovative social media login feature for the UpSkill
          app, streamlining the access process and significantly increasing user
          engagement through easier onboarding and connectivity.
        </p>
        <p>
          Directed a dedicated team in the optimization of UpSkill's UI/UX
          design, making significant improvements in navigation and overall user
          satisfaction, resulting in a more intuitive user experience.
        </p>
        <div className="row justify-content-center mt-4">
          <div className="col">
            <figure>
              <img src={upSkill} alt="upSkill" />
              <figcaption>
                <h4>Login screen</h4>
              </figcaption>
            </figure>
          </div>
          <div className="col">
            <figure>
              <img src={upSkill2} alt="upSkill2" />
              <figcaption>
                <h4>Course screen</h4>
              </figcaption>
            </figure>
          </div>
        </div>
        <p>
          Managed cross-functional teams in the agile development and timely
          deployment of the UpSkill app, achieving top user ratings through
          meticulous attention to detail and a focus on quality.
        </p>
      </section>
      <ul>
        <Link className="read-more-button" to="/">
          ← Home
        </Link>
      </ul>
    </main>
  );
};

export default Muniversiti;
