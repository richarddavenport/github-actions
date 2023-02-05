import { getInput, setOutput, setFailed } from "@actions/core";
import { context } from "@actions/github";
import io from "@actions/io";
import { exec as _exec } from "@actions/exec";

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = getInput("who-to-greet");
  console.log(`Hello ${nameToGreet}!`);
  const time = new Date().toTimeString();
  setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);

  const options = {};
  // options.listeners = {
  //   stdout: (data) => {
  //     myOutput += data.toString();
  //   },
  //   stderr: (data) => {
  //     myError += data.toString();
  //   },
  // };
  options.cwd = "./.github/custom-action";

  await _exec("node", ["custom.js", "foo=bar"], options);
} catch (error) {
  setFailed(error.message);
}
