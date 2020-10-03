"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

var _rimraf = _interopRequireDefault(require("rimraf"));

var _commander = _interopRequireDefault(require("commander"));

var _child_process = _interopRequireDefault(require("child_process"));

var _package = _interopRequireDefault(require("../package.json"));

var _logResult = _interopRequireDefault(require("./logResult"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var exec = _child_process["default"].exec;
var packageVersion = _package["default"].version;

_commander["default"].version(packageVersion);

_commander["default"].option('-e, --environment [environment]', 'NODE_ENV to use when packing', 'local');

_commander["default"].parse(process.argv);

console.log('commander env', _commander["default"].environment);
var environment;

if (_commander["default"].environment) {
  environment = _commander["default"].environment;
} // 1. delete the output directory
// 2. use babel cli to transpile


new Promise(function (resolve, reject) {
  (0, _rimraf["default"])('functions/*', function (error) {
    if (error) {
      reject();
      return;
    }

    resolve();
  });
}).then(function () {
  return new Promise(function (resolve, reject) {
    exec("NODE_ENV='".concat(environment, "' babel 'functionsES6' --out-dir 'functions' --copy-files --ignore 'node_modules'"), function (error, stdout, stderr) {
      (0, _logResult["default"])(error, stdout, stderr);

      if (error || stderr) {
        reject();
        return;
      }

      resolve();
    });
  });
}).then(function () {
  console.log('functions fun-packed');
})["catch"](function (error) {
  console.error(error);
  process.exit(1);
});