'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var editors = {
  ad: function ad(ctx) {
    var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'd';

    var n = num | 0;

    return ctx.m.add(n, unit);
  },
  dn: function dn(ctx) {
    var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
    var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'm';

    var n = num | 0;
    var v = ctx.m.get(unit);

    return ctx.m.startOf(unit).set(unit, Math.floor(v / n) * n);
  },
  eo: function eo(ctx) {
    var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'd';

    return ctx.m.endOf(unit);
  },
  so: function so(ctx) {
    var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'd';

    return ctx.m.startOf(unit);
  },
  su: function su(ctx) {
    var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'd';

    var n = num | 0;

    return ctx.m.subtract(n, unit);
  }
};

/**
 * Editor class to manipulate a moment given a format string.
 */

var MomentEditor = function () {
  function MomentEditor(format) {
    _classCallCheck(this, MomentEditor);

    this.format = format;

    var ctx = this.ctx = {}; // Editor context
    var fns = this.fns = []; // Editor functions bound to the context and format args

    // Pre-process the format string
    format.split(',').forEach(function (spec) {
      var args = spec.split('_');
      var editor = editors[args[0]];

      if (editor) {
        fns.push(editor.bind.apply(editor, [null, ctx].concat(_toConsumableArray(args.slice(1)))));
      }
    });
  }

  /**
   * Apply edits to a moment.
   */


  _createClass(MomentEditor, [{
    key: 'edit',
    value: function edit(m) {
      var _this = this;

      this.ctx.m = m.clone();
      this.fns.forEach(function (fn) {
        _this.ctx.m = fn();
      });

      return this.ctx.m;
    }
  }]);

  return MomentEditor;
}();

exports.default = MomentEditor;
module.exports = exports['default'];