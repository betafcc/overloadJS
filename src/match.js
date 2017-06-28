const zipWith = require('lodash.zipwith');

const match = mapping => args =>
  mapping
  .find(([tests, needle]) =>
    (tests.length === args.length)
    &&
    zipWith(
      tests, args,
      (test, arg) => test(arg)
    )
    .every(b => b === true)
  );


module.exports = match;
