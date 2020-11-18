'use strict';

/**
 * 仅作为容器使用，搜集并保存测试函数，供全局jtf调用
 */

const tests = [];

/**
 * 
 * @param {String} name 测试名
 * @param {Function} func 测试方法
 */
function jtf(name, func) {

   tests.push({ name, func })

}

jtf.tests = tests

/**
 * 跳过执行
 * @param {String} name 测试名
 * @param {Function} func 测试方法
 */
jtf.skip = function (name, func) {

   tests.push({ type: 'skip', name, func })

}

/**
 * 前置钩子
 * @param {String} name 测试名
 * @param {Function} func 测试方法
 */
jtf.before = function (name, func) {

   tests.push({ type: 'before', name, func })

}

/**
 * 后置钩子
 * @param {String} name 测试名
 * @param {Function} func 测试方法
 */
jtf.after = function (name, func) {

   tests.push({ type: 'after', name, func })

}

module.exports = jtf