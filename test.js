const assert = require('assert')
const { test, describe } = require('node:test')
const bb = require('./index.js')

describe('bb function', () => {
  const obj = { left: 221, top: 211, height: 220, width: 586 }

  test('No angle just returns itself', () => {
    assert.deepEqual(bb(obj), obj)
    assert.equal(obj.right, obj.left + obj.width)
    assert.equal(obj.bottom, obj.top + obj.height)
  })

  test('Angle 0 returns same object', () => {
    assert.deepEqual(bb(obj, 0), obj)
    assert.equal(obj.right, obj.left + obj.width)
    assert.equal(obj.bottom, obj.top + obj.height)
  })

  test('Angle 90 rotation', () => {
    assert.deepEqual(bb(obj, 90), {
      bottom: 614,
      height: 586,
      left: 404,
      right: 624,
      top: 28,
      width: 220
    })
  })

  test('Angle 90 with pivot point', () => {
    assert.deepEqual(bb(obj, 90, {
      x: 221,
      y: 211
    }), {
      bottom: 797,
      height: 586,
      left: 1,
      right: 221.00000000000003,
      top: 211,
      width: 220.00000000000003
    })
  })

  test('Angle 45 rotation approximate check', () => {
    const _45 = bb(obj, 45)
    assert.equal(parseInt(_45.bottom, 10), 605)
    assert.equal(parseInt(_45.height, 10), 569)
    assert.equal(parseInt(_45.left, 10), 229)
    assert.equal(parseInt(_45.right, 10), 798)
    assert.equal(parseInt(_45.top, 10), 36)
    assert.equal(parseInt(_45.width, 10), 569)
  })

  test('Throws on missing left/top', () => {
    assert.throws(() => {
      bb({ width: 10, height: 10 })
    }, /missing/)
  })
})
