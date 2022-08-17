const core = require("@actions/core");
const github = require("@actions/github");
const io = require("@actions/io");
const exec = require("@actions/exec");

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput("who-to-greet");
  console.log(`Hello ${nameToGreet}!`);
  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);

  let myOutput = "";
  let myError = "";

  const options = {};
  // options.listeners = {
  //   stdout: (data) => {
  //     myOutput += data.toString();
  //   },
  //   stderr: (data) => {
  //     myError += data.toString();
  //   },
  // };
  // options.cwd = "./lib";

  await exec.exec("node", ["custom.js", "foo=bar"], options);
} catch (error) {
  core.setFailed(error.message);
}
