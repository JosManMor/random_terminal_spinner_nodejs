async function loadRandomTerminalSpinner(text, spinnerVelocity, asyncFn) {
  const frames1 = ["⠁", "⠂", "⠄", "⡀", "⢀", "⠠", "⠐", "⠈"];
  const frames2 = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  const frames3 = ["◐", "◓", "◑", "◒"];
  const frames4 = [".  ", ".. ", "...", " ..", "  .", "   "];
  const frames5 = [
    "▁",
    "▂",
    "▃",
    "▄",
    "▅",
    "▆",
    "▇",
    "█",
    "▇",
    "▆",
    "▅",
    "▄",
    "▃",
    "▂",
  ];
  let i = 0;

  const frames = [frames1, frames2, frames3, frames4, frames5];
  const randomFrames = frames[Math.floor(Math.random() * frames.length)];

  const interval = setInterval(() => {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(`${text} ${randomFrames[i % randomFrames.length]}`);
    i++;
  }, spinnerVelocity);

  try {
    const result = await asyncFn();

    clearInterval(interval);
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(`${text} ✔\n`);

    return result;
  } catch (err) {
    clearInterval(interval);
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(`${text} ✖\n`);
    throw err;
  }
}

export default loadRandomTerminalSpinner;