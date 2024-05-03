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
      <time>Software Developer</time>

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
        <p>
          Developed Android application utilizing Movesense IMU sensor for
          recording IMU data, initiating the project's foundation.
        </p>
        <p>
          Spearheaded the implementation of a Bluetooth screen within the
          application, enabling seamless connectivity by storing previously
          connected devices and conducting real-time scans for new available
          devices, enhancing user experience and facilitating quick device
          pairing.
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
          Conducted data collection from a special needs participant, refining
          data acquisition techniques.
        </p>
        <p>
          Evaluated and compared various machine learning algorithms to enhance
          gesture detection accuracy, ensuring optimal performance.
        </p>
        <p>
          Recognized the necessity of video feed for precise data preparation,
          integrated camera recording functionality into the application.
        </p>
        <p>
          Initiated development of Python-based annotation and visualization
          tool to streamline data preparation, reducing processing time by a
          minimum of 80% in initial testing.
        </p>

        <figure>
          <img src={annotateTool} alt="annotateTool" />
          <figcaption>
            <h4>Annotation tool</h4>
          </figcaption>
        </figure>
      </section>
      <section>
        <h2>Future work</h2>
        <p>
          Designed and implemented annotation and visualization tools, currently
          undergoing rigorous testing phase to ensure reliability and
          functionality.
        </p>
        <p>
          Planned future data collection efforts with a diverse group of
          participants, enhancing dataset diversity and model robustness.
        </p>
        <p>
          Scheduled implementation of annotation and visualization tools into
          the Android application, enabling users to record and process their
          own data, facilitating personalized machine learning model adjustments
          for improved accuracy.
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
