var bb = require('./index')
  , assert = require('assert')

var obj = {left: 221, top: 211, height: 220, width: 586}

// No angle just returns itself
assert.deepEqual(bb(obj), obj)
assert.equal(obj.right, obj.left + obj.width)
assert.equal(obj.bottom, obj.top + obj.height)

assert.deepEqual(bb(obj, 0), obj)
assert.equal(obj.right, obj.left + obj.width)
assert.equal(obj.bottom, obj.top + obj.height)

assert.deepEqual(bb(obj, 180), obj)

assert.deepEqual(bb(obj, 90), {
  bottom: 614,
  height: 586,
  left: 404,
  right: 624,
  top: 28,
  width: 220
})

assert.deepEqual(bb(obj, 90), {
  bottom: 614,
  height: 586,
  left: 404,
  right: 624,
  top: 28,
  width: 220
})

var _45 = bb(obj, 45)
assert.equal(parseInt(_45.bottom, 10), 605)
assert.equal(parseInt(_45.height, 10), 569)
assert.equal(parseInt(_45.left, 10), 229)
assert.equal(parseInt(_45.right, 10), 798)
assert.equal(parseInt(_45.top, 10), 36)
assert.equal(parseInt(_45.width, 10), 569)

var e = null
try {
  bb({width: 10, height: 10})
} catch (err) {
  e = err
}

if (!e) {
  console.log('Should have thrown an error')
  process.exit(1)
} else {
  process.exit(0)
}