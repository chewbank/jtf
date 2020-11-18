"use strict"

const fs = require('fs-extra')
const path = require('path')
const cwd = process.cwd()

module.exports = {
   cwd,
   /**
    * 获取当前本地格式化时间
    */
   getDate() {

      const nowDate = new Date()

      const hours = nowDate.getHours()

      const minutes = nowDate.getMinutes()

      const seconds = nowDate.getSeconds()

      return `${hours}:${minutes}:${seconds}`

   },
   /**
    * 获取测试函数队列
    * @param {Array} loads path数组
    */
   getTests(loads) {

      let jtfPath = path.join(cwd, 'node_modules', 'jtf')

      const { version } = require(path.join(cwd, 'package.json'));

      try {

         const packageJson = require(path.join(jtfPath, 'package.json'));

         if (packageJson.version !== version) {
            throw new Error('版本不一致，重新注入！')
         }

      } catch (error) {

         const copyPath = require.resolve('./@injection.js');

         fs.copySync(copyPath, path.join(jtfPath, 'index.js'));

         fs.outputFileSync(path.join(jtfPath, 'package.json'),
            `{"version": "${version}","main": "index.js"}`
         );

      }

      const jtf = require(jtfPath)

      const { tests } = jtf;

      for (let filePath of loads) {

         tests.push(filePath)

         require(filePath)

      }

      return tests

   },
   /**
    * 加载本地模块，忽略错误
    * @param  {...any} modulePath 模块路径
    */
   require(...modulePath) {

      try {
         modulePath = path.join(cwd, ...modulePath)
         return require(modulePath)
      } catch (error) {
         console.log(error)
      }

   }
}