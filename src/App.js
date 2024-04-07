import React, { useState, useEffect } from "react";
import WakaTime from "./assets/components/WakaTime";
import { GitHub, Linkedin, Twitter, Sun, Moon, Mail } from "react-feather";
import experienceData from "./json/experience.json";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/main.css";

function App() {
  const [timeData, setTimeData] = useState([]);

  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

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
    <div className={`${darkMode ? "dark-mode" : ""}`}>
      <div className="container">
        <div className="content">
          {/* Navigation bar */}
          <header>
            <div className="main">
              <a href="/">Tanuj Namdeo</a>
            </div>
            <nav>
              <a href="https://github.com/tanujn45">
                <GitHub />
              </a>
              <a href="https://linkedin.com/in/tanujn45">
                <Linkedin />
              </a>
              <a href="https://twitter.com/tanujn45">
                <Twitter />
              </a>
              <span>|</span>
              <button onClick={toggleDarkMode} href="/">
                {darkMode ? <Sun /> : <Moon />}
              </button>
            </nav>
          </header>

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
            <section>
              <h1>Introduction</h1>
              <ul>
                <li>
                  Research Associate @ <a>A11y lab</a> | Penn State
                </li>
              </ul>
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
                    <li>
                      Description of the project. Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit.
                    </li>
                    <li>
                      Description of the project. Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit.
                    </li>
                  </ul>
                  <a href="">Read more ⟶</a>
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
                <time>Aug 2023, University Park</time>
                <p>MS, Computer Science & Engineering</p>
              </div>
              <div>
                <h2>
                  <a>Symbiosis University of Applied Sciences</a>
                </h2>
                <time>Aug 2023, Indore</time>
                <p>BTech, Computer Science & Information Technology</p>
                <ul>
                  <li>
                    Made the Dean's list for all semesters, demonstrating
                    exceptional academic achievement and dedication to
                    excellence.
                  </li>
                  <li>
                    Founded and led a thriving coding club, expanding its
                    membership to over 200 individuals and orchestrating
                    engaging events including hackathons and workshops,
                    enhancing practical skill development.
                  </li>
                </ul>
              </div>
            </section>

            {/* Projects */}
            <section className="projects">
              <h1>Projects</h1>
              <div className="read-more">
                <h2>
                  <a>Project 1</a>
                </h2>
                <p>
                  Description of the project. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.
                </p>
                <a>Read more ⟶</a>
              </div>
              <div className="read-more">
                <h2>
                  <a>Project 2</a>
                </h2>
                <p>
                  Description of the project. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.
                </p>
                <a>Read more ⟶</a>
              </div>
              <div className="read-more">
                <h2>
                  <a>Project 3</a>
                </h2>
                <p>
                  Description of the project. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.
                </p>
                <a>Read more ⟶</a>
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer>
            <a href="https://github.com/athul/archie" title="GitHub">
              <GitHub />
            </a>
            |
            <a href="https://gitlab.com/athul/" title="LinkedIn">
              <Linkedin />
            </a>
            |
            <a href="https://twitter.com/tanujn45" title="Twitter">
              <Twitter />
            </a>
            |
            <a href="mailto:tanujn45@gmail.com" title="Mail">
              <Mail />
            </a>
            | ⚡️ 2024 © Tanuj | My
            <a className="ms-2" href="#">
              Resume
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
