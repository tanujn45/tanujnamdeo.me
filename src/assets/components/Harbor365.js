import React, { useEffect, useRef } from "react";

function Harbor365() {
  const frameCount = 480;

  const currentFrame = (index) =>
    `../img/harbor365/anim/${index.toString().padStart(4, "0")}.jpg`;

  const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
    }
  };
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const img = new Image();
    img.src = currentFrame(1);
    img.onload = function () {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      context.drawImage(img, 0, 0);
    };

    const updateImage = (index) => {
      img.onload = () => {
        context.drawImage(img, 0, 0);
      };
      img.src = currentFrame(index);
    };

    window.addEventListener("scroll", () => {
      const scrollTop = document.documentElement.scrollTop;
      const maxScrollTop =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil(scrollFraction * frameCount)
      );

      requestAnimationFrame(() => updateImage(frameIndex + 1));
    });

    preloadImages();
  }, []);

  return (
    <main>
      <h1>Harbor365</h1>
      <time>Software Developer</time>
      <section>
        <h2>About Harbor365</h2>
        <p>
          Harbor365 is a Singapore-based protective clothing company
          specializing in flame-resistant wear. With two decades of experience,
          they offer region-specific solutions developed through extensive
          research. The brand has sold over 375,000 garments in the MENA region
          in the past six years, positioning itself as a revolutionary force in
          the industry. By addressing longstanding issues and delivering
          innovative products, Harbor365 aims to redefine protective wear with
          simplicity and effectiveness.
        </p>
      </section>
      <div class="canvas-container row justify-content-center align-items-center">
        <canvas id="hero-lightpass" ref={canvasRef}></canvas>
      </div>
    </main>
  );
}
export default Harbor365;
