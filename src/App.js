import React, { useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import { GitHub, Linkedin, Twitter, Sun, Moon, Mail } from "react-feather";
import YouTube from "react-youtube";
import favicon from "./assets/img/favicon.ico";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/main.css";

import Home from "./assets/components/Home";
import Emotorad from "./assets/components/Emotorad";
import A11y from "./assets/components/A11y";
import Muniversiti from "./assets/components/Muniversiti";
import PennState from "./assets/components/PennState";
import Harbor365 from "./assets/components/Harbor365";
import Explodely from "./assets/components/Explodely";
import ScrollToTop from "./assets/components/ScrollToTop.js";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0, // This removes the controls
      showinfo: 0, // This removes the video title and player actions
      modestbranding: 1, // This removes the YouTube logo
      loop: 1, // This makes the video loop
      playlist: "hvL1339luv0", // This is needed for the loop to work, replace 'hvL1339luv0' with your video ID
    },
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className={`${darkMode ? "dark-mode" : ""}`}>
        <div className="container">
          <div className="content">
            {/* Navigation bar */}
            <header>
              <div className="main">
                <a href="/">Tanuj Namdeo</a>
              </div>
              <nav>
                <a href="https://github.com/tanujn45" target="_blank">
                  <GitHub />
                </a>
                <a href="https://linkedin.com/in/tanujn45" target="_blank">
                  <Linkedin />
                </a>
                <a href="https://twitter.com/tanujn45" target="_blank">
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
              <Route path="/psu" element={<PennState />} />
              <Route path="/harbor365" element={<Harbor365 />} />
              <Route path="/explodely" element={<Explodely />} />
            </Routes>

            {/* Footer */}
            <footer>
              <a
                href="https://github.com/tanujn45"
                title="GitHub"
                target="_blank"
              >
                <GitHub />
              </a>
              |
              <a
                href="https://linkedin.com/in/tanujn45"
                title="LinkedIn"
                target="_blank"
              >
                <Linkedin />
              </a>
              |
              <a
                href="https://twitter.com/tanujn45"
                title="Twitter"
                target="_blank"
              >
                <Twitter />
              </a>
              |
              <a href="mailto:tanujn45@gmail.com" title="Mail" target="_blank">
                <Mail />
              </a>
              | ⚡️ 2024 © Tanuj |
              <a
                className="ms-2"
                href="https://drive.google.com/file/d/1a0z_4PMKX9yhtR1hxoiCw6392CR-yBil/view?usp=sharing"
                target="_blank"
              >
                Resume
              </a>
              |
              <button onClick={() => setShowVideo(true)}>
                <img src={favicon} />
              </button>
            </footer>
          </div>
        </div>
        {showVideo && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: 0,
                paddingBottom: "56.25%",
              }}
            >
              <YouTube
                videoId="hvL1339luv0"
                opts={opts}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "30px",
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
                }}
              ></div>
            </div>
            <button
              style={{ position: "absolute", top: 0, right: 0 }}
              onClick={() => setShowVideo(false)}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
