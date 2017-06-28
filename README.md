# overloadJS

Utility for creating polymorphic functions in JS


Install
-------

    npm install @betafcc/overload


Usage
-----

```js
// Here I use the sister lib 'isJS' https://github.com/betafcc/isJS
// But note these are just simple functions that return boolean
// eg: is.integer = n => Number.isInteger(n)
const {number, string, dict} = require('@betafcc/is');
const overload = require('@betafcc/overload');


const add = overload([
  [ [number, number], (a, b) => a + b                   ],
  [ [string, string], (a, b) => a.concat(b)             ],
  [ [dict,     dict], (a, b) => Object.assign({}, a, b) ],
]);

add(2, 3) // 5
add('hello', 'world') // 'helloworld'
add({a: 2}, {b: 3}) // {a: 2, b: 3}

add(1, 2, 3) // TypeError for no matching arity
add([1, 2], [3, 4]) // TypeError for no matching signature

```

Besides common Java-style overload, some useful functional patterns are also unlocked,
for example, a curried polymorphic functor map function:


```js
const {array, set, string, promise, dict, iterator} = require('@betafcc/is');


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

```
