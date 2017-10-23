// @flow

import commander from 'commander';
import childProcess from 'child_process';

import packageFile from '../package.json';
import logResult from './logResult';

const exec: Function = childProcess.exec;
const packageVersion: string = packageFile.version;

commander.version(packageVersion);
commander.option(
  '-e, --environment [environment]',
  'NODE_ENV to use when packing',
  'local',
);
commander.parse(process.argv);

console.log('commander env', commander.environment);

let environment;
if (commander.environment) {
  environment = commander.environment;
}

// 1. delete the output directory
// 2. use babel cli to transpile
new Promise((resolve, reject) => {
  exec('rimraf functions', (error, stdout, stderr) => {
    logResult(error, stdout, stderr);
    if (error || stderr) {
      reject();
      return;
    }

    resolve();
  });
})
  .then(() => new Promise((resolve, reject) => {
    exec(`NODE_ENV='${environment}' babel 'functionsES6' --out-dir 'functions' --copy-files --ignore 'node_modules'`, (error, stdout, stderr) => {
      logResult(error, stdout, stderr);
      if (error || stderr) {
        reject();
        return;
      }
      resolve();
    });
  }),
  )
  .then(() => {
    console.log('functions fun-packed');
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
