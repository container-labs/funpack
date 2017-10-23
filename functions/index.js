"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interopRequireDefault");

var _promise = _interopRequireDefault(require("babel-runtime/core-js/promise"));

var _commander = _interopRequireDefault(require("commander"));

var _child_process = _interopRequireDefault(require("child_process"));

var _package = _interopRequireDefault(require("../package.json"));

var _logResult = _interopRequireDefault(require("./logResult"));

const exec = _child_process.default.exec;
const packageVersion = _package.default.version;

_commander.default.version(packageVersion);

_commander.default.option('-e, --environment [environment]', 'NODE_ENV to use when packing', 'local');

_commander.default.parse(process.argv);

console.log('commander env', _commander.default.environment);
let environment;

if (_commander.default.environment) {
  environment = _commander.default.environment;
} // 1. delete the output directory
// 2. use babel cli to transpile


new _promise.default((resolve, reject) => {
  exec('rimraf functions', (error, stdout, stderr) => {
    (0, _logResult.default)(error, stdout, stderr);

    if (error || stderr) {
      reject();
      return;
    }

    resolve();
  });
}).then(() => new _promise.default((resolve, reject) => {
  exec(`NODE_ENV='${environment}' babel 'functionsES6' --out-dir 'functions' --copy-files --ignore 'node_modules'`, (error, stdout, stderr) => {
    (0, _logResult.default)(error, stdout, stderr);

    if (error || stderr) {
      reject();
      return;
    }

    resolve();
  });
})).then(() => {
  console.log('functions fun-packed');
}).catch(error => {
  console.error(error);
  process.exit(1);
});