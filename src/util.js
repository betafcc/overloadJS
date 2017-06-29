const {inspect} = require('util');

const zipWith = require('lodash.zipwith');
const cloneDeep = require('lodash.clonedeep');


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


const concat = arrA => arrB =>
  cloneDeep(arrA).concat(cloneDeep(arrB));


module.exports = {
  inspect,
  match,
  concat,
};
