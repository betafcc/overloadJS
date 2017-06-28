const match = require('./match.js');


const overload = (definitions) => {
  const overloaded = (...args) => {
    const arity = args.length;

    const _definitions = definitions
      .filter(rule => rule[0].length === arity);

    if (_definitions.length === 0)
      throw TypeError(`No definition set for arity ${arity}`);

    const _needle = match(_definitions)(args);

    if (_needle === undefined)
      throw TypeError(`No definition set for (${args.join(', ')})`);

    const _f = _needle.slice(-1)[0];

    return _f(...args);
  };


  overloaded.definitions = definitions;
  overloaded.signatures  = definitions.map(([tests, _]) => tests);

  return overloaded;
};


module.exports = overload;
