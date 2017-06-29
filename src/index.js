const {match, concat, inspect} = require('./util.js');


const overload = (...cases) => {
  const overloaded = (...args) => {
    const arity = args.length;

    const _cases = cases
      .filter(rule => rule[0].length === arity);

    if (_cases.length === 0)
      throw TypeError(`No definition set for arity ${arity}`);

    const _needle = match(_cases)(args);

    if (_needle === undefined)
      throw TypeError(`No definition set for (${args.map(inspect).join(', ')})`);

    const _f = _needle.slice(-1)[0];

    return _f(...args);
  };


  overloaded.cases = cases;
  overloaded.signatures = () =>
    cases.map(([tests, _]) => tests);

  overloaded.addCases = (...newCases) =>
    overload(...concat(cases)(newCases));

  overloaded.addCase = (signature, f) =>
    overloaded.addCases([signature, f]);

  return overloaded;
};


module.exports = overload;
