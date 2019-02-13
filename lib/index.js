'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// 获取数据类型
(function (root, globalName, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD:
    define([], factory);
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    // Node:
    module.exports = factory();
    // Use module export as simulated ES6 default export:(将模块导出用作模拟ES6默认导出)
    module.exports.default = module.exports;
  } else {
    // Browser:
    window[globalName] = factory();
  }
})(undefined, 'dataType', function () {
  'use strict';

  return function dataType(data) {
    return {}.toString.call(data).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  };
});