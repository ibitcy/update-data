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

Updates array with a new array by compare, and compete between records

```typescript
function updateList<T>(
  listOld: T[],
  listNew: T[],
  compareFn: (itemOld: T, nitemNew: T) => boolean,
  competeFn?: (itemOld: T, itemNew: T) => boolean,
): T[];
```

#### Example

```typescript
const docs: any = [
  { id: '1', title: 'Document 1', status: 'old', updated: new Date(1000) },
  { id: '2', title: 'Document 2', status: 'old', updated: new Date(2000) },
];

const update: any = [
  { id: '1', title: 'Document 1', status: 'upd', updated: new Date(6000) },
  { id: '3', title: 'Document 3', status: 'new', updated: new Date(5000) },
];

console.log(
  updateList<any>(
    docs,
    update,
    (docOld: any, docNew: any) => docNew.id === docOld.id,
    (docOld: any, docNew: any) => docNew.updated.getTime() > docOld.updated.getTime(),
  ),
);
```

#### Result

```js
[
  {
    id: '1',
    title: 'Document 1',
    status: 'upd', // <--- New value
    updated: 1970-01-01T00:00:06.000Z // <--- New value
  },
  {
    id: '2',
    title: 'Document 2',
    status: 'old',
    updated: 1970-01-01T00:00:02.000Z
  },

   // New record
  {
    id: '3',
    title: 'Document 3',
    status: 'new',
    updated: 1970-01-01T00:00:05.000Z
  }
]
```
