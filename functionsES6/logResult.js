// @flow

function logResult(error, stdout, stderr) {
  if (error !== null) {
    console.error(`exec error: ${error}`);
    return;
  }

  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log(stdout);
}

export default logResult;
