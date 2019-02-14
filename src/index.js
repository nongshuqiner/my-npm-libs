// 获取数据类型
(function (root, pluginName, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD:
    define(factory()); // define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node:
    module.exports = factory();
    // Use module export as simulated ES6 default export:(将模块导出用作模拟ES6默认导出)
    module.exports.default = module.exports;
  } else {
    // Browser:
    if (root === undefined) {
      root = typeof global !== "undefined" ? global : window
    }
    root[pluginName] = factory();
  }
}(this, 'dataType', function () {
  'use strict';

  return function dataType (data) {
    return ({}).toString.call(data).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }
}));
