// 断言库 chai.js
var expect = require('chai').expect;
var dataType = require('../src/index');

// 测试脚本里面应该包括一个或多个describe块，称为测试套件（test suite）
describe('基本数据类型', function () {
  // 每个describe块应该包括一个或多个it块，称为测试用例（test case）
  // 基本数据类型
  it('undefined-类型检测测试', () => {
    // 断言
    expect(dataType(undefined)).to.equal('undefined');
  });
  it('null-类型检测测试', () => {
    expect(dataType(null)).to.equal('null');
  });
  it('string-类型检测测试', () => {
    expect(dataType('abc')).to.equal('string');
  });
  it('boolean-类型检测测试', () => {
    expect(dataType(true)).to.equal('boolean');
  });
  it('number-类型检测测试', () => {
    expect(dataType(1)).to.equal('number');
  });
});

describe('引用数据类型', function () {
  it('array-类型检测测试', () => {
    expect(dataType([1])).to.equal('array');
  });
  it('object-类型检测测试', () => {
    expect(dataType({})).to.equal('object');
  });
  it('function-类型检测测试', () => {
    expect(dataType(function () {})).to.equal('function');
  });
});

describe('其他数据类型', function () {
  it('date-类型检测测试', () => {
    expect(dataType(new Date())).to.equal('date');
  });
  it('regex-类型检测测试', () => {
    expect(dataType(new RegExp("\\w+"))).to.equal('regexp');
  });
});
