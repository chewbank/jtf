'use strict';

const assert = require('./assert')
const { success, error } = require('./console')
const { getDate } = require('../common')

module.exports = async function run(tests) {

   console.log(`\n\x1b[30m»»»»»»»»»»»»»»» ${getDate()} «««««««««««««««`)

   for (const item of tests) {

      if (item instanceof Object) {

         const { type, name, func } = item

         if (type === 'skip') {

            console.log(`\n  \x1b[33m» ${name}\x1b[30m`)

         } else {

            const timestamp = Date.now()

            assert.state = false

            if (func.constructor.name === 'AsyncFunction') {

               await func(assert).then(data => {

                  if (assert.state === true) {

                     success(name, timestamp)

                  } else {

                     error(name, timestamp, '未执行断言')

                  }

               }).catch(e => {

                  error(name, timestamp, e.stack)

               })

            } else {

               try {

                  func(assert)

                  if (assert.state === true) {

                     success(name, timestamp)

                  } else {

                     error(name, timestamp, '未执行断言')

                  }

               } catch (e) {

                  error(name, timestamp, e.stack)

               }

            }

         }

      } else {

         const filePath = item.split(/[\\/]/).slice(-3).join(' » ')

         console.log(`\n\x1b[35m${filePath}\x1b[30m`)

      }

   }

}