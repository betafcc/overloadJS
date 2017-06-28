# overloadJS



// Here I use the sister lib https://github.com/betafcc/isJS
// But note they are just simple functions that return boolean
// eg: is.integer = n => Number.isInteger(n)
const {
    integer,
    float,
    string,
    arrayOf
} = require('@betafcc/is');

const myfunction = require('@betafcc/overload')([
    [[number, string],            (n, s) =>  ],
    [[number, number, string],               ],
    [[], ],
    [[], ],
    [[], ],
    [[], ],
]);
arrayOf(number), arrayOf(number)
arrayOf()


For example a curried polymorphic functor map function:


const fmap = f => overload([
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
                 }                                  ],
]);
// this is minimal for demonstration but you should
// probably cache the overload object and curry after
