# update-data

Simple data comparsion and composition library

[![build status](https://badgen.net/travis/ibitcy/update-data?icon=travis)](https://travis-ci.org/ibitcy/update-data)
[![npm bundlephobia minzip](https://badgen.net/bundlephobia/minzip/update-data@latest?icon=awesome)
![npm version](https://badgen.net/npm/v/update-data?icon=npm&color=blue)](https://www.npmjs.com/package/update-data)

# Install

```bash
# npm
npm i update-data

# yarn
yarn add update-data
```

# Usage

### `updateList`

Updates array with a new array by match, and compete functions between records

```typescript
function updateList<T>(
  listOld: T[],
  listNew: T[],
  matchFn: (itemOld: T, nitemNew: T) => boolean,
  competeFn?: (itemOld: T, itemNew: T) => boolean,
): T[];
```

#### Example

```typescript
const docs = [
  { id: '1', title: 'Document 1', status: 'old', updated: new Date(1000) },
  { id: '2', title: 'Document 2', status: 'old', updated: new Date(2000) },
];

const update = [
  { id: '1', title: 'Document 1', status: 'upd', updated: new Date(3000) },
  { id: '3', title: 'Document 3', status: 'new', updated: new Date(4000) },
];

console.log(
  updateList(
    docs,
    update,
    (docOld, docNew) => docNew.id === docOld.id,
    (docOld, docNew) => docNew.updated.getTime() > docOld.updated.getTime(),
  ),
);
```

#### Result

```javascript
[
  {
    id: '1',
    title: 'Document 1',
    status: 'upd', // <--- New value
    updated: '1970-01-01T00:00:03.000Z', // <--- New value
  },
  {
    id: '2',
    title: 'Document 2',
    status: 'old',
    updated: '1970-01-01T00:00:02.000Z',
  },

  // New record
  {
    id: '3',
    title: 'Document 3',
    status: 'new',
    updated: '1970-01-01T00:00:05.000Z',
  },
];
```
