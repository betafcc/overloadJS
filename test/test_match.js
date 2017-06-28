const {expect} = require('chai');
const zipWith  = require('lodash.zipwith');
const {number, equal, string} = require('@betafcc/is');


const match = require('../src/match.js');



const keys = [0, 'foo', 'bar'];

const mapping = [
  [[number, number],                       false],
  [[number, equal('foo'), number],         false],
  [[number, equal('foo'), string, string], false], // wrong arity
  [[number, equal('foo'), string],          true],
  [[number, string, string],                true], // but wont match
];


describe('match', () => {
  it('basic test', () =>
    expect( match(mapping)(keys)[1] ).to.be.true
  );

  it('not in mapping', () =>
    expect( match(mapping)(['foo']) ).to.be.undefined
  );
});
