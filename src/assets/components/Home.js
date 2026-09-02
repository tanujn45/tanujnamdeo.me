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
      {/* Weekly development breakdown — temporarily hidden.
          The WakaTime share endpoints return no data, so this rendered
          all zeros. Refresh the share URLs above, then uncomment. */}
      {/*
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
      */}

      {/* Introduction */}
      <section className="intro">
        <h1>Introduction</h1>
        <p className="description">
          🔬 Software Engineer:{" "}
          <a href="https://robinhood.com" target="_blank" rel="noreferrer">
            Robinhood
          </a>
        </p>
      {/*
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
      */}
        <p className="description">
          📫 Reach out:{" "}
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
            {job.link && (
              <Link className="read-more-button" to={job.link}>
                Read more ⟶
              </Link>
            )}
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
              On the Dean's list every semester.
            </li>
            <li>
              Started CODEC, the campus coding club. It grew past 200 members
              and we ran hackathons and workshops.
            </li>
          </ul>
        </div>
      </section>

      {/* Projects */}
      <section className="projects">
        <h1>Projects</h1>
        <div className="read-more">
          <h2>
            <a>Global TweetScan</a>
          </h2>
          <p>
            An analysis of Twitter's Information Operations dataset — tweets
            and media from state-linked accounts across a number of countries.
            I translated the non-English posts, then ran sentiment and topic
            analysis over the set to look for patterns in how those accounts
            pushed particular narratives.
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
            <a>
              Spatial-Temporal Deep Learning for Preference Prediction based on
              EEG Brainware data
            </a>
          </h2>
          <p>
            A BiLSTM model that predicts what someone will prefer from their
            EEG brainwave recordings. Trained and tested on the DEAP dataset.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;
