import React from "react";
import { Link } from "react-router-dom";
import upSkill from "../img/muniversiti/upskill.png";
import upSkill2 from "../img/muniversiti/upskill2.png";
import muniversiti from "../img/muniversiti/muniversiti.png";

const Muniversiti = () => {
  return (
    <main>
      <h1>Muniversiti</h1>
      <time>Software Development Engineer</time>

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
          Spearheaded full-cycle development of educational platforms, achieving
          a 40% increase in user activity and reducing operational costs by 30%.
        </p>
        <figure>
          <img src={muniversiti} alt="muniversiti" />
          <figcaption>
            <h4>Landing screen</h4>
          </figcaption>
        </figure>
        <p>
          Led Agile team through daily stand-ups and bi-weekly sprints,
          optimizing project execution and fostering continuous improvement.
        </p>
        <p>
          Engineered scalable web architecture using React, Node.js, Express,
          and MongoDB, enhancing dynamic content management and system
          performance.
        </p>
        <p>
          Developed feature-rich cross-platform mobile app with React Native,
          enabling offline access, push notifications, and real-time
          interactions.
        </p>
        <p>
          mplemented Jest and Detox testing frameworks, managing CI/CD pipelines
          with Jenkins, Docker, and Kubernetes on AWS to ensure robust product
          quality and reliability.
        </p>
        <p>
          Facilitated collaborative development environment with Git,
          emphasizing feature-branch strategy and rigorous code reviews via pull
          requests for enhanced code stability and system integrity.
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
