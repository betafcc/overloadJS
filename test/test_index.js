const zipWith = require('lodash.zipwith');
const isEqual = require('lodash.isequal');
const {
  number, array, set,
  string, promise, dict, iterator
} = require('@betafcc/is');
const overload = require('../src/index.js');


const add = overload(
  [[number, number], (a, b) => a + b             ],
  [[string, string], (a, b) => a.concat(b)       ],
  [[array,   array], (a, b) => zipWith(a, b, add)]
);


const fmap = f => overload(
  [ [array]    , (arr)  => arr.map(f)               ],
  [ [set]      , (s)    => new Set([...s].map(f))   ],
  [ [string]   , (str)  => [...str].map(f).join('') ],
  [ [promise]  , (p)    => p.then(f)                ],
  [ [dict]     , (dick) => Object.entries(dick)
                          .reduce((acc, [k, v]) =>
                            (acc[k] = f(v), acc)
                          , {})                     ],
  [ [iterator] , function* (it) {
                   for (const el of it) yield f(el)
                 }                                  ]
);

const fsquare = fmap(x => x*x);

const examples = [
  [ add(2, 10),                              12 ],
  [ add('hello ', 'world'),       'hello world' ],
  [ add([1, 2, 3], [4, 5, 1]),        [5, 7, 4] ],
  [ add(['hello '], ['world']), ['hello world'] ],
  [ fsquare([1, 2, 3, 4]),        [1, 4, 9, 16] ],
  [ fsquare(new Set([3, 4])),  new Set([9, 16]) ],
  [ fsquare({a: 4, b: 5}),       {a: 16, b: 25} ],
];


describe('overload', () => {

  it('basic handmade examples', () =>
    examples
      .forEach(([result, expected]) => {
        isEqual(result, expected);
      })
  );

});
