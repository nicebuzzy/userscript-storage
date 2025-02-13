# Userscript Storage

## Overview

Userscript Storage is a simple wrapper for `GM.getValue`, `GM.setValue`, `GM.deleteValue`, etc.

---

## Installation

### Node

```bash
npm install @nicebuzzy/userscript-storage
```

### Userscripts

```js
// @require https://cdn.jsdelivr.net/npm/@nicebuzzy/userscript-storage/dist/userscript-storage.umd.js
```

---

## Usage

```js
const store = new Storage()

store.set('foo', 'bar')
store.set('baz', { qux: 'qux' })

store.get('foo') // 'bar'
store.get('baz') // { qux: 'qux' }
store.list() // { foo: 'bar', baz: { qux: 'qux' } }

store.insert('baz', { foo: 'bar' })
store.list() // { foo: 'bar', baz: { qux: 'qux', foo: 'bar' } }

store.remove('baz')
store.get('baz') // undefined
store.list() // { foo: 'bar' }

store.clear()
store.list() // {}
```

#### Using scopes

The `scope` option allows customization of key storage:

```js
const settings = new Storage({ scope: 'settings' })
```

Scoped instances only work with keys that match their scope:

```js
store.set('foo', 'bar')
settings.set('foo', 'bar')

store.list() // { foo: 'bar', settings: { foo: 'bar' } }
settings.list() // { foo: 'bar' }

settings.clear()
settings.list() // {}
store.list() // { foo: 'bar' }

store.clear() // clears all keys, including scoped ones
```

---

## API Reference

### Constructor

```js
const store = new Storage(options = {})
```

- `options`: `Object`  
  - `options.scope`: `String`


### Methods

#### `store.clear()`

Clears all entries in the storage.

#### `store.get(key, defaultValue = undefined)`

Retrieves the value for the given key. Returns `defaultValue` if the key is not found.

#### `store.keys()`

Returns all keys in the storage.

#### `store.list()`

Lists all key-value pairs in the storage.

#### `store.remove(key)`

Removes the specified key and its value from the storage.

#### `store.set(key, value)`

Adds or updates a key-value pair in the storage.

#### `store.insert(key, value)`

Adds values to an existing `key` whose value is an object or an array.

### Properties

#### `store.size`

Returns the number of keys stored.

#### static `Storage.grants`

A list of required `@grant` keys.

---