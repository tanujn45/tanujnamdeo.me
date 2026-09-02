import React from "react";
import { Link } from "react-router-dom";
import app1 from "../img/a11y/app_1.png";
import app2 from "../img/a11y/app_2.png";
import annotateTool from "../img/a11y/annotate_tool.png";

const A11y = () => {
  return (
    <main>
      <h1>
        <a>A11y Lab @ Penn State</a>
      </h1>
      <time>Research Associate</time>

      <section>
        <h2>About A11y</h2>
        <p>
          <a>A11y Lab</a> is a research group in Penn State's College of
          Information Sciences and Technology. It works on human-computer
          interaction, specifically accessible computing — making technology
          work well for people across a wide range of abilities.
        </p>
        <p>
          The lab's approach combines human-AI teaming with inclusive design,
          building tools that fit the people using them rather than the other
          way around.
        </p>
      </section>

      <section>
        <h2>What I worked on</h2>
        <p>
          I built an Android app that records motion data from a Movesense IMU
          sensor. This was the starting point for the rest of the project.
        </p>
        <p>
          I added a Bluetooth screen that remembers previously paired sensors
          and scans for new ones, so getting connected takes a couple of taps
          instead of a trip through system settings.
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
        <p>
          I ran a data collection session with a participant with special
          needs, and adjusted how we recorded based on what came out of it.
        </p>
        <p>
          I compared several machine learning algorithms to see which one
          detected gestures most accurately.
        </p>
        <p>
          It became clear we needed video alongside the sensor data to label it
          properly, so I added camera recording to the app.
        </p>
        <p>
          I started a Python tool for labelling and viewing the recorded data.
          In early testing it cut processing time by at least 80%.
        </p>

        <figure>
          <img src={annotateTool} alt="annotateTool" />
          <figcaption>
            <h4>Annotation tool</h4>
          </figcaption>
        </figure>
      </section>
      <section>
        <h2>Where it was headed</h2>
        <p>
          The labelling and visualization tools were built and in testing when
          I left.
        </p>
        <p>
          The next step was collecting data from a wider group of participants,
          so the dataset covered more kinds of people.
        </p>
        <p>
          After that, the plan was to fold the labelling tools into the Android
          app itself, so people could record and process their own data and tune
          the model to themselves.
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

export default A11y;
