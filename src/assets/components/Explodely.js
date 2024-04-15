import React from "react";
import phoneScreen from "../img/explodely/phone_screen.png";
import analytics1 from "../img/explodely/analytics_1.png";
import analytics2 from "../img/explodely/analytics_2.png";

const Explodely = () => {
  return (
    <main>
      <h1>
        <a>Explodely</a>
      </h1>
      <time>Software Engineer</time>

      <section>
        <h2>About Explodely</h2>
        <p>
          <a>Explodely</a> is an affiliate marketing and e-commerce platform
          designed to support both affiliates and sellers. It offers affiliates
          tools for promoting products and maximizing earnings through various
          commission structures and real-time analytics. Sellers benefit from
          Explodely's vast affiliate network, simplified global market access,
          and comprehensive handling of payments, taxes, fraud, and compliance.
        </p>
        <p>
          The platform also features optimized checkout solutions to enhance
          user experience and reduce transaction friction, incorporating
          advanced anti-fraud and chargeback technology to improve financial
          security and operational efficiency.
        </p>
      </section>

      <section>
        <h2>Job Description</h2>
        <figure>
          <img src={analytics1} alt="homePhone" />
          <figcaption>
            <h4>Analytics</h4>
          </figcaption>
        </figure>
        <p>
          Developed intuitive front-end features for the affiliate portal,
          enhancing user engagement and tool accessibility.
        </p>
        <div className="row justify-content-center align-items-center mt-4">
          <div className="col-8">
            <figure>
              <img src={analytics2} alt="homePhone" />
              <figcaption>
                <h4>Analytics</h4>
              </figcaption>
            </figure>
          </div>
          <div className="col-4">
            <figure>
              <img src={phoneScreen} alt="homeDesktop" />
              <figcaption>
                <h4>Phone screen</h4>
              </figcaption>
            </figure>
          </div>
        </div>
        <p>
          Engineered responsive interfaces for the seller portal, optimizing
          transaction flows and user experience. Fixed bugs and performance
          issues to ensure that the platform was stable and reliable for users.
        </p>
      </section>
    </main>
  );
};

export default Explodely;
