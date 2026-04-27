# Terminal Spinner Usage Guide

## Purpose

This utility provides a simple way to display a loading spinner in the terminal while executing asynchronous code. It automatically handles animation, success, and error states.

---

## Basic Usage

Call `loadRandomTerminalSpinner` with:

```js
await loadRandomTerminalSpinner(text, spinnerVelocity, asyncFn);
```

### Parameters

* **text** (`string`)
  Message displayed next to the spinner.

* **spinnerVelocity** (`number`)
  Interval in milliseconds between frame updates (lower = faster animation).

* **asyncFn** (`function`)
  An asynchronous function that contains the task you want to execute.

---

## Example

```js
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

await loadRandomTerminalSpinner("Processing...", 70, async () => {
  await delay(2000);
});
```

### Behavior

* While `asyncFn` is running:

  * A spinner animation is rendered in place
  * The text is updated continuously on the same line

* When the function resolves:

  * Spinner stops
  * A ✔ symbol is shown

* If the function throws an error:

  * Spinner stops
  * A ✖ symbol is shown
  * The error is propagated

---

## Running Multiple Processes

You can execute multiple tasks sequentially using a loop:

```js
async function execProcess(processName, proccessNumber) {
  for (let i = 0; i < proccessNumber; i++) {
    await loadRandomTerminalSpinner(
      `${processName} ${i + 1}/${proccessNumber}`,
      70,
      async () => {
        await delay(i * 1000);
      },
    );
  }
}

execProcess("Processing file", 10);
```

### What this does

* Runs tasks one by one (not in parallel)
* Displays progress like: `Processing file 3/10`
* Each iteration waits longer than the previous one
* Each task uses a randomly selected spinner style

---

## Notes

* Designed for Node.js (uses `process.stdout`)
* Spinner styles are chosen randomly on each execution
* Works best in terminals that support Unicode characters
* The animation runs in a single line (no scrolling output)

---

## Minimal Pattern

```js
await loadRandomTerminalSpinner("Task name", 70, async () => {
  // your async logic here
});
```

---

## Expected Output (Conceptual)

```
Processing file 1/10 ⠋
Processing file 2/10 ✔
Processing file 3/10 ⠹
...
Processing file 10/10 ✔
```

---
