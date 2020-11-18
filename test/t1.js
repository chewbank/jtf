const test = require('jtf');

const { sleep } = require('./helpers/');

test.before('test.before', async t => {

   t.ok(true);

})

test('deepEqual', async t => {

   t.deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 });

})


test('equal', async t => {

   t.equal(12121, 12121);

})


test('test.default', t => {

   t.ok(!false, '值必须为true');

})

test.skip('test.skip', t => {

   t.ok(true);

})

test.after('test.after', t => {

   t.ok(true);

})