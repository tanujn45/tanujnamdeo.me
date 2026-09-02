import React from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <main>
      <h1>404</h1>

      <pre className="terminal">
        <span className="prompt">$</span> cd {pathname}
        {"\n"}
        bash: cd: {pathname}: No such file or directory
        {"\n"}
        <span className="prompt">$</span> ls
        {"\n"}
        about experience education projects
      </pre>

      <p>
        This page either moved or never existed. The listing above is roughly
        what you'll find back on the home page.
      </p>

      <ul>
        <Link className="read-more-button" to="/">
          ← Home
        </Link>
      </ul>
    </main>
  );
};

export default NotFound;
