import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { GitHub, Linkedin, Twitter, Sun, Moon, Mail } from "react-feather";
import favicon from "./assets/img/favicon.ico";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/main.css";

import Home from "./assets/components/Home";
import Emotorad from "./assets/components/Emotorad";
import A11y from "./assets/components/A11y";
import Muniversiti from "./assets/components/Muniversiti";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <Router>
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

            {/* Routes */}
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/emotorad" element={<Emotorad />} />
              <Route path="/a11y" element={<A11y />} />
              <Route path="/muniversiti" element={<Muniversiti />} />
            </Routes>

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
              | ⚡️ 2024 © Tanuj |
              <a className="ms-2" href="#">
                Resume
              </a>
              |
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                <img src={favicon} />
              </a>
            </footer>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
