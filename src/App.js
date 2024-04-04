import "./App.css";
import experienceData from "./json/experience.json";

function App() {
  const toggleTheme = () => {
    // Implement your theme toggle logic here
  };

  return (
    <div className="content">
      <header>
        <div className="main">
          <a href="/">Tanuj Namdeo</a>
        </div>
        <nav>
          <a href="">Home</a>
          <a href="">All posts</a>
          <a href="">About</a>
          <a href="">Tags</a>
          <span>|</span>
          <a id="dark-mode-toggle" onClick={toggleTheme} href="/">
            Toggle Theme
          </a>
        </nav>
      </header>

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
              <h2 className="margin-reset">{job.company}</h2>
              <time>{job.duration}</time>
              <ul>
                {job.responsibilities.map((responsibility, i) => (
                  <li key={i}>{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
