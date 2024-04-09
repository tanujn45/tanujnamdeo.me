import React from "react";
import { Link } from "react-router-dom";
import app1 from "../img/a11y/app_1.png";
import app2 from "../img/a11y/app_2.png";
import annotateTool from "../img/a11y/annotate_tool.png";

const A11y = () => {
  return (
    <main>
      <h1>
        <a>A11y lab @ Penn State</a>
      </h1>
      <time>Research Associate</time>

      <section>
        <h2>About A11y</h2>
        <p>
          <a>A11y Lab</a>, a research unit within Penn State's College of
          Information Science and Technology (IST), specializes in
          Human-Computer Interaction (HCI) with a focus on Accessible Computing.
          Its mission is to understand and enhance technology's interaction with
          human abilities.
        </p>
        <p>
          Through innovative methodologies such as human-AI teaming and
          inclusive design, it develops intelligent technologies catering to
          diverse needs. The lab pioneers solutions fostering inclusivity and
          accessibility, creating opportunities for individuals from all
          backgrounds.
        </p>
      </section>

      <section>
        <h2>Job Description</h2>
        <p className="description">
          Developed a native android application using Java to record Movesense
          IMU sensor data.
        </p>
        <div className="row justify-content-center mt-4">
          <div className="col-6">
            <figure>
              <img src={app1} alt="app1" />
              <figcaption>
                <h4>Bluetooth screen</h4>
              </figcaption>
            </figure>
          </div>
          <div className="col-6">
            <figure>
              <img src={app2} alt="app2" />
              <figcaption>
                <h4>Record data screen</h4>
              </figcaption>
            </figure>
          </div>
        </div>
        <p className="description">
          Developed a Python application that can annotate the recorded data
          resulting in decreased time and effort.
        </p>
        <figure>
          <img src={annotateTool} alt="annotateTool" />
          <figcaption>
            <h4>Annotation tool</h4>
          </figcaption>
        </figure>
        <p className="description">
          Conducted comprehensive data collection from 3 disabled volunteers,
          optimizing data quality via 15 recorded daily gestures per volunteer.
        </p>
      </section>
      <section>
        <h2>Future work</h2>
        <p>Let users annotate their own data within the device itself.</p>
      </section>
      <ul>
        <Link className="read-more-button" to="/">
          ← Home
        </Link>
      </ul>
    </main>
  );
};

export default A11y;
