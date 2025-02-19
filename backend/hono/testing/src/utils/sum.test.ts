// 👉 Unit Testing

import { expect, test } from 'vitest'
import { sum } from './sum.js'

test('return must be number', () => expect(typeof sum(3, 6)).toBe('number'))

// test('3 + 6 must be 9', () => expect(sum(3, 6)).toBe(9))
// test('-3 + 6 must be 3', () => expect(sum(-3, 6)).toBe(3))
// test('-3 + -6 must be -9', () => expect(sum(-3, -6)).toBe(-9))
// test('3.5 + 6.5 must be 10', () => expect(sum(3.5, 6.5)).toBe(10))

test.each([
  { a: 3, b: 6, expected: 9 },
  { a: -3, b: 6, expected: 3 },
  { a: -3, b: -6, expected: -9 },
  { a: 3.5, b: 6.5, expected: 10 },
])('sum($a, $b) must be $expected', ({ a, b, expected }) => {
  expect(sum(a, b)).toBe(expected)
})
