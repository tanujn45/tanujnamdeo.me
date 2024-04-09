import React from "react";
import { Link } from "react-router-dom";

const PennState = () => {
  return (
    <div>
      <main>
        <h1>
          <a>Graduate Teaching Assistant</a>
        </h1>

        <section>
          <h2>CMPCS 201: Programming for Engineers with C++</h2>
          <time>Dr. Susan Quick</time>
          <br />
          <time>Fall 2021</time>
          <p>
            <a>A11y Lab</a>, a research unit within Penn State's College of
            Information Science and Technology (IST), specializes in
            Human-Computer Interaction (HCI) with a focus on Accessible
            Computing. Its mission is to understand and enhance technology's
            interaction with human abilities.
          </p>
          <p>
            Through innovative methodologies such as human-AI teaming and
            inclusive design, it develops intelligent technologies catering to
            diverse needs. The lab pioneers solutions fostering inclusivity and
            accessibility, creating opportunities for individuals from all
            backgrounds.
          </p>
        </section>

        <section>
          <h2>CMPSC 101: Introduction to Programming</h2>
          <time>Dr. Roger Christman</time>
          <br />
          <time>Spring 2022, Fall 2022</time>
          <p>
            This course teaches the basics of computer programming and
            computational thinking, including core concepts like loops,
            conditions, functions, and data types.
          </p>
          <p>
            Students will learn to solve problems by breaking them down into
            smaller parts, implementing solutions step by step, and evaluating
            their effectiveness. The emphasis is on understanding
            problem-solving techniques, abstraction, and evaluating code for
            correctness and efficiency.
          </p>
          <p>
            By the end, students will be skilled in designing and analyzing
            computational solutions across various levels of abstraction, using
            imperative programming principles.
          </p>
        </section>

        <section>
          <h2>AERSP 424: Advanced Computer Programming</h2>
          <time>Dr. Thanakorn Khamvilai</time>
          <br />
          <time>Fall 2023</time>
          <p>
            AERSP 424 Advanced Computer Programming is a course focusing on
            advanced programming techniques using Java, C++, and Ada95,
            alongside current operating systems like Linux and Unix, and
            compilers such as gcc. It emphasizes Object-Oriented Programming
            (OOP), comparing and contrasting OOP with functional and procedural
            programming, and explores the differences and similarities among
            Java, C++, and Ada95.
          </p>
          <p>
            The course includes hands-on programming exercises and serves as a
            core course for the Graduate Minor in High Performance Computing, as
            well as a technical elective in Aerospace Engineering.
          </p>
        </section>

        <section>
          <h2>Description of my work</h2>
          <ul>
            <li>
              Mentored and guided over 320 students, with student evaluations
              indicating a 97% satisfaction rate and improvement in
              troubleshooting proficiency.
            </li>
            <li>
              Assisted in grading over 1,000 assignments and exams, with my
              structured feedback approach adopted across the course for its
              effectiveness in student improvement.
            </li>
          </ul>
          <p>
            The assistantships offered comprehensive coverage of full tuition in
            addition to a monthly stipend.
          </p>
        </section>

        <ul>
          <Link className="read-more-button" to="/">
            ← Home
          </Link>
        </ul>
      </main>
    </div>
  );
};

export default PennState;
