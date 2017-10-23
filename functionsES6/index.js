// @flow

import commander from 'commander';
import childProcess from 'child_process';

import packageFile from '../package.json';

const exec = childProcess.exec;
const packageVersion = packageFile['version'];

commander.version(packageVersion);
commander.option(
  '-e, --environment [environment]',
  'NODE_ENV to use when packing',
  'local',
);
commander.parse(process.argv);

console.log('commander env', commander.environment);

let environment = 'local';
if (commander.environment) {
  environment = commander.environment;
}

function logResult(error, stdout, stderr) {
  if (error !== null) {
    console.error('exec error: ' + error);
    return;
  }

  if (stderr) {
    console.error('stderr: ' + stderr);
    return;
  }

  console.log(stdout);
}

const rimrafPromise = new Promise((resolve, reject) => {
  exec(`rimraf functions`, (error, stdout, stderr) => {
    logResult(error, stdout, stderr);
    resolve();
  });
})

const babelPromise = rimrafPromise.then(() => {
  return new Promise((resolve, reject) => {
    exec(`NODE_ENV='${environment}' babel 'functionsES6' --out-dir 'functions' --copy-files --ignore 'node_modules'`, (error, stdout, stderr) => {
      logResult(error, stdout, stderr) ;
    });
  })
});

babelPromise.then(() => {
  console.log('functions fun-packed');
});
