const OP_METHOD_REGEX = /^(add|endOf|set|startOf|subtract)$/

/**
 * Manipulate a moment given an array of operations.
 */
export default function manipulateMoment (value, ops, errorCb) {
  ops.forEach(op => {
    try {
      if (!OP_METHOD_REGEX.test(op.m)) {
        // No-op
      } else if (Array.isArray(op.p)) {
        value[op.m](...op.p)
      } else {
        value[op.m](op.p)
      }
    } catch (err) {
      if (typeof errorCb === 'function') errorCb(err)
      else throw err
    }
  })

  return value
}
