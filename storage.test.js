mockgm()

import { describe, test, expect, beforeAll } from 'vitest'
import Storage from './src'

describe('userscript with scope', () => {
  const store = new Storage({ scope: 'scope' })
  run(store)
})

describe('userscript without scope', () => {
  const store = new Storage()
  run(store)
})

function run(store) {
  beforeAll(async () => {
    await store.set('string', 'value')
    await store.set('object', { value: 'value' })
  })

  test('set & get', async () => {
    expect(await store.get('string')).toBe('value')
    expect(await store.get('object')).toEqual({ value: 'value' })
    expect(await store.get('notExist')).toBeUndefined()
  })

  test('list & scope', async () => {
    expect(await store.list()).toEqual({
      string: 'value',
      object: { value: 'value' }
    })
  })

  test('size & remove', async () => {
    expect(await store.size).toBe(2)
    await store.remove('string')
    expect(await store.get('string')).toBeUndefined()
    expect(await store.size).toBe(1)
  })

  test('clear', async () => {
    await store.clear()
    expect(await store.size).toBe(0)
  })
}

function mockgm() {
  const GM = {
    data: {},

    async getValue(key, defaultValue) {
      return GM.data[key] || defaultValue
    },

    async getValues(keys) {
      return Object.fromEntries(keys.map(key => [key, GM.data[key]]))
    },

    async setValue(key, value) {
      GM.data[key] = value
    },

    async setValues(object) {
      GM.data = { ...GM.data, ...object }
    },

    async deleteValue(key) {
      delete GM.data[key]
    },

    async deleteValues(keys = []) {
      for (const key of keys) {
        delete GM.data[key]
      }
    },

    async listValues() {
      return Object.keys(GM.data)
    },

    info: {
      script: {
        grant: [
          'GM.getValue',
          'GM.getValues',
          'GM.setValue',
          'GM.setValues',
          'GM.deleteValue',
          'GM.deleteValues',
          'GM.listValues'
        ]
      }
    }
  }

  Object.defineProperty(globalThis, 'GM', { value: GM })
}