const {expect} = require('chai');
const {
  number, string, dict
} = require('@betafcc/is');

const overload = require('../src/index.js');


describe('setCase and setCases', () => {
  const addFactory = () =>
    overload(
      [ [number, number], (a, b) => a + b                   ],
      [ [string, string], (a, b) => a.concat(b)             ],
      [ [dict,     dict], (a, b) => Object.assign({}, a, b) ]
    );


  describe('setCase', () => {
    const addInstance = addFactory();
    addInstance.setCase(
      [dict, string, number], (a, b, c) => addInstance(a, {[b]: c})
    );

    it('Should work with new case', () => {
      expect(addInstance({a: 2}, 'b', 3)).to.deep.equal({a: 2, b: 3});
    });

  });



  describe('setCases', () => {
    const addInstance = addFactory();
    addInstance.setCases(
      [[dict, string, number], (a, b, c) => addInstance(a, {[b]: c})],
      [[string, number, dict], (a, b, c) => addInstance(c, a, b) ],
      [[string, dict, number], (a, b, c) => addInstance(c, b, a) ]
    );

    it('Should work with new case', () => {
      expect(addInstance({a: 2}, 'b', 3)).to.deep.equal({a: 2, b: 3});
      expect(addInstance('b', 3, {a: 2})).to.deep.equal({a: 2, b: 3})
    });


  });


});