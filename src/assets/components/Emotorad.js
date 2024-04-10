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
      <time>Software Developer [Freelance]</time>

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
        <p>
          Led the development of Emotorad's e-commerce platform, resulting in a
          37% increase in website traffic within the first three months
          post-launch.
        </p>
        <p>
          Designed a visually appealing website interface using Figma, which
          significantly reduced bounce rate and received a notable increase in
          positive customer feedback on aesthetics and usability.
        </p>
        <p>
          Collaborated cross-functionally to align website features with
          business goals, contributing to a substantial increase in online sales
          revenue quarter-over-quarter and expanding market reach through
          targeted marketing campaigns based on analytics insights.
        </p>
        <div className="row justify-content-center align-items-center mt-4">
          <div className="col-4">
            <figure>
              <img src={homePhone} alt="homePhone" />
              <figcaption>
                <h4>Phone screen</h4>
              </figcaption>
            </figure>
          </div>
          <div className="col-8">
            <figure>
              <img src={homeDesktop} alt="homeDesktop" />
              <figcaption>
                <h4>Desktop screen</h4>
              </figcaption>
            </figure>
          </div>
        </div>
        <p>
          Collaborated cross-functionally to align website features with
          business goals, contributing to a substantial increase in online sales
          revenue quarter-over-quarter and expanding market reach through
          targeted marketing campaigns based on analytics insights.
        </p>
        <p>
          Developed Emotorad's e-commerce platform using React, Redux, Django,
          MongoDB for NoSQL database management, Python for Django backend
          development, JavaScript for front-end functionality, and Bootstrap CSS
          for styling, with Figma for design implementation.
        </p>
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
