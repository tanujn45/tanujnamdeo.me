import React, { useState, useEffect } from "react";
import { GitHub, Linkedin, Twitter, Mail } from "react-feather";
import WakaTime from "./WakaTime";
import { Link } from "react-router-dom";
import experienceData from "../../json/experience.json";
import favicon from "../img/favicon.ico";

function Home() {
  const [timeData, setTimeData] = useState([]);

  const jsonApiLang =
    "https://wakatime.com/share/@018e9abd-1aa4-4aa6-9db7-5ca3b999e810/179e4382-0d9b-47bf-a51c-c414547342ed.json";

  const jsonApiTime =
    "https://wakatime.com/share/@018e9abd-1aa4-4aa6-9db7-5ca3b999e810/1f46857c-265e-4a00-898e-c54ff2d6b04c.json";

  useEffect(() => {
    fetch(jsonApiTime)
      .then((response) => response.json())
      .then((data) => setTimeData(data));
  }, [jsonApiTime]);

  function wakaMetaTime() {
    timeData.data?.sort(
      (a, b) => new Date(a.range.start) - new Date(b.range.start)
    );

    const firstDate = timeData.data?.[0]?.range.text;
    const lastDate = timeData.data?.[timeData.data?.length - 1]?.range?.text;

    const totalSeconds = timeData.data?.reduce(
      (total, current) => total + current.grand_total.total_seconds,
      0
    );

    if (!totalSeconds) return { firstDate, lastDate, formattedTime: "" };

    const totalSecondsInDay = 24 * 60 * 60;
    const totalSecondsInHour = 60 * 60;
    const totalSecondsInMinute = 60;

    const days = Math.floor(totalSeconds / totalSecondsInDay);
    const hours = Math.floor(
      (totalSeconds % totalSecondsInDay) / totalSecondsInHour
    );
    const minutes = Math.floor(
      (totalSeconds % totalSecondsInHour) / totalSecondsInMinute
    );
    const seconds = Math.floor(totalSeconds % totalSecondsInMinute);

    const formattedTime = `${days ? `${days} days ` : ""}${
      hours ? `${hours} hrs ` : ""
    }${minutes ? `${minutes} mins ` : ""}${seconds ? `${seconds} secs` : ""}`
      .trim()
      .replace(/,$/, "");

    return { firstDate, lastDate, formattedTime };
  }

  // Get time data
  const { firstDate, lastDate, formattedTime } = wakaMetaTime(timeData);

  return (
    <main>
      {/* Weekly development breakdown */}
      <section className="wakaTime">
        <h1>Weekly development breakdown</h1>
        <div>
          <p>
            From: {firstDate} - To: {lastDate}
          </p>
          <p>Total time: {formattedTime}</p>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <WakaTime type={"lang"} api={jsonApiLang} />
          </div>
          <div className="col-lg-6">
            <WakaTime type={"time"} api={jsonApiTime} />
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="intro">
        <h1>Introduction</h1>
        <p className="description">
          🔬 Software Developer:{" "}
          <a href="https://a11y.ist.psu.edu/" target="_blank">
            A11y Labs
          </a>{" "}
          @ Penn State
        </p>
        <p className="description">
          🔭 Personal projects I am working on:{" "}
          <a
            href="https://tanujn45.notion.site/2fb9b63c4ab74a8e980b10a041b09866?v=83bc88bdb1a84582ab3a4d8f8ff6c71d&pvs=4"
            target="_blank"
          >
            Project Management Board
          </a>
        </p>
        <p className="description">🌱 Currently learning: Blockchain</p>
        <p className="description">
          📫 Reach out:
          <a href="mailto:tanujn45@gmail.com" title="Mail">
            tanujn45@gmail.com
          </a>
        </p>
      </section>

      {/* Work Experience */}
      <section>
        <h1>Work Experience</h1>
        {experienceData.experience.map((job, index) => (
          <div className="read-more" key={index}>
            <h2>
              <a>{job.company}</a>
            </h2>
            <time>{job.duration}</time>
            <ul>
              {job.responsibilities.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
            </ul>
            <Link className="read-more-button" to={job.link}>
              Read more ⟶
            </Link>
          </div>
        ))}
      </section>

      {/* Education */}
      <section>
        <h1>Education</h1>
        <div>
          <h2>
            <a>The Pennsylvania State University</a>
          </h2>
          <time>Aug 2021 - Aug 2023, University Park</time>
          <p>MS, Computer Science & Engineering</p>
        </div>
        <div>
          <h2>
            <a>Symbiosis University of Applied Sciences</a>
          </h2>
          <time>Aug 2017 - May 2021, Indore</time>
          <p>BTech, Computer Science & Information Technology</p>
          <ul>
            <li>
              Made the Dean's list for all semesters, demonstrating exceptional
              academic achievement and dedication to excellence.
            </li>
            <li>
              Founded and led a thriving coding club, expanding its membership
              to over 200 individuals and orchestrating engaging events
              including hackathons and workshops, enhancing practical skill
              development.
            </li>
          </ul>
        </div>
      </section>

      {/* Projects */}
      <section className="projects">
        <h1>Projects</h1>
        <div className="read-more">
          <h2>
            <a>Global TweetScan: Unveiling Agendas in Digital Shadows</a>
          </h2>
          <p>
            In this project, I spearheaded an advanced analysis of the Twitter
            Information Operations (IO) dataset, employing cutting-edge
            translation and natural language processing techniques to decode and
            scrutinize tweets and associated media from various countries. The
            focus was on applying sentiment and topic analysis to uncover
            potential agendas, without delving into specific results. This
            approach involved a meticulous examination of digital content to
            understand the dynamics of information dissemination and the
            strategic use of social media by government and non-government
            entities for potential agenda propagation.
          </p>
          <a
            className="read-more-button"
            href="https://github.com/tanujn45/Twitter-IO"
            target="_blank"
          >
            Github ⟶
          </a>
        </div>
        <div className="read-more">
          <h2>
            <a>CosmoNFT</a>
          </h2>
          <p>
            At the helm of CosmoPunk Studio, I engineered a groundbreaking
            platform democratizing NFT creation. With a single click, users
            generate their distinctive NFTs using the ERC-721 standard, directly
            on the blockchain. Upon minting, they receive a unique link
            redirecting them to OpenSea, where they can proudly view and
            showcase their newly minted digital assets. This seamless
            integration enriches the user experience, facilitating exploration
            and engagement within the vibrant NFT ecosystem.
          </p>
          <a className="read-more-button" href="https://cosmopunk.netlify.app/">
            Try it ⟶
          </a>
        </div>
        <div className="read-more">
          <h2>
            <a>CosmoChat</a>
          </h2>
          <p>
            CosmoChat is a dynamic project I spearheaded, leveraging blockchain
            technology to transform communication. With a focus on simplicity
            and security, users connect their crypto wallets to exchange
            messages directly on the blockchain. By prioritizing privacy and
            efficiency, CosmoChat pioneers a new era of decentralized messaging,
            setting a standard for secure digital interactions.
          </p>
          <a className="read-more-button" href="https://cosmochat.netlify.app/">
            Try it ⟶
          </a>
        </div>
        <div className="read-more">
          <h2>
            <a>
              Spatial-Temporal Deep Leaning for Preference Prediction based on
              EEG Brainware data
            </a>
          </h2>
          <p>
            Leveraged cutting-edge deep learning methodologies, specifically
            employing a BiLSTM model, to accurately forecast user preferences
            via EEG brainwave data analysis. Executed comprehensive model
            training and rigorous testing procedures utilizing the DEAP dataset,
            showcasing adeptness in both innovation and practical application
            within the field.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;
