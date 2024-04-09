import React from "react";
import { Link } from "react-router-dom";
import homePhone from "../img/emotorad/home_phone.png";
import homeDesktop from "../img/emotorad/home_desktop.png";

const Emotorad = () => {
  return (
    <div>
      <h1>
        <a>Emotorad</a>
      </h1>
      <time>
        Software Developer
        <br />
      </time>
      <time>Freelance</time>

      <section>
        <h2>About Emotorad</h2>
        <p>
          EMotorad (EM) is an electric vehicle company that strives to bring
          futuristic ebikes at an affordable price for adventure seekers, daily
          commuters, or casual riders.
        </p>
      </section>

      <section>
        <h2>Job Description</h2>
        <p className="description">
          Developed a native android application using Java to record Movesense
          IMU sensor data.
        </p>
        <div className="row justify-content-center align-items-center mt-4">
          <div className="col-4">
            <figure>
              <img src={homePhone} alt="homePhone" />
              <figcaption>
                <h4>Bluetooth screen</h4>
              </figcaption>
            </figure>
          </div>
          <div className="col-8">
            <figure>
              <img src={homeDesktop} alt="homeDesktop" />
              <figcaption>
                <h4>Record data screen</h4>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <ul>
        <Link className="read-more-button" to="/">
          ← Home
        </Link>
      </ul>
    </div>
  );
};

export default Emotorad;
