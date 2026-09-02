// Printed once on load, for whoever opens devtools.
const consoleGreeting = () => {
  const art = `
 _____                  _ 
|_   _|_ _ _ __  _   _ (_)
  | |/ _\` | '_ \\| | | || |
  | | (_| | | | | |_| || |
  |_|\\__,_|_| |_|\\__,_|/ |
                     |__/ 
`;

  const accent = "color:#50fa7b; font-family:monospace;";
  const plain = "color:#888; font-family:monospace;";

  console.log(`%c${art}`, accent);
  console.log(
    "%cSince you're already in here — the Konami code works on this page.",
    plain
  );
  console.log("%c↑ ↑ ↓ ↓ ← → ← → B A", accent);
  console.log(
    "%cSource: https://github.com/tanujn45/tanujnamdeo.me",
    plain
  );
};

export default consoleGreeting;
