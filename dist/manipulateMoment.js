'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = manipulateMoment;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var OP_METHOD_REGEX = /^(add|endOf|set|startOf|subtract)$/;

/**
 * Manipulate a moment given an array of operations.
 */
function manipulateMoment(value, ops, errorCb) {
  ops.forEach(function (op) {
    try {
      if (!OP_METHOD_REGEX.test(op.m)) {
        // No-op
      } else if (Array.isArray(op.p)) {
        value[op.m].apply(value, _toConsumableArray(op.p));
      } else {
        value[op.m](op.p);
      }
    } catch (err) {
      if (typeof errorCb === 'function') errorCb(err);else throw err;
    }
  });

  return value;
}
module.exports = exports['default'];