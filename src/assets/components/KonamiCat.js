import React, { useEffect, useState } from "react";
import cat from "../img/cat.png";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

// Up up down down left right left right B A reveals the cat.
const KonamiCat = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let progress = 0;

    const onKeyDown = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      if (key === SEQUENCE[progress]) {
        progress += 1;
        if (progress === SEQUENCE.length) {
          progress = 0;
          setVisible(true);
        }
      } else {
        // Allow a wrong key to start a fresh attempt.
        progress = key === SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!visible) return undefined;
    const onKeyDown = (e) => e.key === "Escape" && setVisible(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="konami-cat"
      role="button"
      tabIndex={0}
      aria-label="Dismiss"
      onClick={() => setVisible(false)}
      onKeyDown={(e) => e.key === "Enter" && setVisible(false)}
    >
      <figure>
        <img src={cat} alt="A deeply unimpressed cat" />
        <figcaption>you found the cat. click anywhere to dismiss.</figcaption>
      </figure>
    </div>
  );
};

export default KonamiCat;
