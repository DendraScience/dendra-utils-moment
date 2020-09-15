"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const editors = {
  ad(ctx, num = 1, unit = 'd') {
    const n = num | 0;
    return ctx.m.add(n, unit);
  },

  dn(ctx, num = 30, unit = 'm') {
    const n = num | 0;
    const v = ctx.m.get(unit);
    return ctx.m.startOf(unit).set(unit, Math.floor(v / n) * n);
  },

  eo(ctx, unit = 'd') {
    return ctx.m.endOf(unit);
  },

  so(ctx, unit = 'd') {
    return ctx.m.startOf(unit);
  },

  su(ctx, num = 1, unit = 'd') {
    const n = num | 0;
    return ctx.m.subtract(n, unit);
  }

};
/**
 * Editor class to manipulate a moment given a format string.
 */

class MomentEditor {
  constructor(format) {
    this.format = format;
    const ctx = this.ctx = {}; // Editor context

    const fns = this.fns = []; // Editor functions bound to the context and format args
    // Pre-process the format string

    format.split(',').forEach(spec => {
      const args = spec.split('_');
      const editor = editors[args[0]];

      if (editor) {
        fns.push(editor.bind(null, ctx, ...args.slice(1)));
      }
    });
  }
  /**
   * Apply edits to a moment.
   */


  edit(m) {
    this.ctx.m = m.clone();
    this.fns.forEach(fn => {
      this.ctx.m = fn();
    });
    return this.ctx.m;
  }

}

exports.default = MomentEditor;