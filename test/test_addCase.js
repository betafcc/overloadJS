const {expect} = require('chai');
const {
  number, string, dict
} = require('@betafcc/is');

const overload = require('../src/index.js');


describe('addCase and addCases', () => {
  const add = overload(
    [ [number, number], (a, b) => a + b                   ],
    [ [string, string], (a, b) => a.concat(b)             ],
    [ [dict,     dict], (a, b) => Object.assign({}, a, b) ]
  );


  describe('addCase', () => {
    const newAdd = add.addCase( // does no mutate
      [dict, string, number], (a, b, c) => newAdd(a, {[b]: c})
    );

    it('Should not mutate', () => {
      expect(add.cases).to.not.equal(newAdd.cases);
      expect(add.cases[0]).to.deep.equal(newAdd.cases[0]);
    });

    it('Should work with new case', () => {
      expect(newAdd({a: 2}, 'b', 3)).to.deep.equal({a: 2, b: 3});
    });

  });



  describe('addCases', () => {
    const newAdd = add.addCases(
      [[dict, string, number], (a, b, c) => newAdd(a, {[b]: c})],
      [[string, number, dict], (a, b, c) => newAdd(c, a, b) ],
      [[string, dict, number], (a, b, c) => newAdd(c, b, a) ]
    )

    it('Should not mutate', () => {
      expect(add.cases).to.not.equal(newAdd.cases);
      expect(add.cases[0]).to.deep.equal(newAdd.cases[0]);
    });

    it('Should work with new case', () => {
      expect(newAdd({a: 2}, 'b', 3)).to.deep.equal({a: 2, b: 3});
      expect(newAdd('b', 3, {a: 2})).to.deep.equal({a: 2, b: 3})
    });


  });


});