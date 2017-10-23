"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interopRequireDefault");

var _promise = _interopRequireDefault(require("babel-runtime/core-js/promise"));

var _commander = _interopRequireDefault(require("commander"));

var _child_process = _interopRequireDefault(require("child_process"));

var _package = _interopRequireDefault(require("../package.json"));

const exec = _child_process.default.exec;
const packageVersion = _package.default['version'];

_commander.default.version(packageVersion);

_commander.default.option('-e, --environment [environment]', 'NODE_ENV to use when packing', 'local');

_commander.default.parse(process.argv);

console.log('commander env', _commander.default.environment);
let environment = 'local';

if (_commander.default.environment) {
  environment = _commander.default.environment;
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

const rimrafPromise = new _promise.default((resolve, reject) => {
  exec(`rimraf functions`, (error, stdout, stderr) => {
    logResult(error, stdout, stderr);
    resolve();
  });
});
const babelPromise = rimrafPromise.then(() => {
  return new _promise.default((resolve, reject) => {
    exec(`NODE_ENV='${environment}' babel 'functionsES6' --out-dir 'functions' --copy-files --ignore 'node_modules'`, (error, stdout, stderr) => {
      logResult(error, stdout, stderr);
    });
  });
});
babelPromise.then(() => {
  console.log('functions fun-packed');
});