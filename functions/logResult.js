"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

var _default = logResult;
exports.default = _default;
module.exports = exports["default"];