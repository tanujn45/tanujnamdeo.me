import React from "react";
import WakaTime from "./components/WakaTime";
import { GitHub, Linkedin, Twitter, Sun } from "react-feather";
import experienceData from "./json/experience.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const toggleTheme = () => {
    // Implement your theme toggle logic here
  };

  const jsonApiLang =
    "https://wakatime.com/share/@018e9abd-1aa4-4aa6-9db7-5ca3b999e810/179e4382-0d9b-47bf-a51c-c414547342ed.json";

  return (
    <div className="container">
      <div className="content">
        <header>
          <div className="main">
            <a href="/">Tanuj Namdeo</a>
          </div>
          <nav>
            <a href="">
              <GitHub />
            </a>
            <a href="">
              <Linkedin />
            </a>
            <a href="">
              <Twitter />
            </a>
            <span>|</span>
            <a id="dark-mode-toggle" onClick={toggleTheme} href="/">
              <Sun />
            </a>
          </nav>
        </header>
        <WakaTime langApi={jsonApiLang} />
        <main className="list">
          <section>
            <h1>Introduction</h1>
            <ul>
              <li>
                Research Associate @ <a>A11y lab</a> | Penn State
              </li>
            </ul>
          </section>
          <section>
            <h1>Work Experience</h1>
            {experienceData.experience.map((job, index) => (
              <div key={index}>
                <h2>{job.company}</h2>
                <time>{job.duration}</time>
                <ul>
                  {job.responsibilities.map((responsibility, i) => (
                    <li key={i}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section>
            <h1>Education</h1>
            <div>
              <h2>
                <a>The Pennsylvania State University</a>
              </h2>
              <time>Aug 2023</time>
              <p>MS, Computer Science & Engineering</p>
            </div>
            <div>
              <h2>
                <a>Symbiosis University of Applied Sciences</a>
              </h2>
              <time>Aug 2023</time>
              <p>MS, Computer Science & Engineering</p>
              <ul>
                <li></li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
