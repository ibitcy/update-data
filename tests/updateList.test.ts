import expect from 'expect';
import { updateList } from '../src';

interface IDoc {
  id: string;
  title: string;
  status: 'upd' | 'old' | 'new';
  updated: Date;
}

let dataResult: IDoc[] = [];

const docsOriginal: IDoc[] = [
  { id: 'abc1', title: 'Document 1', status: 'old', updated: new Date(1000) },
  { id: 'abc2', title: 'Document 2', status: 'old', updated: new Date(2000) },
  { id: 'abc3', title: 'Document 3', status: 'old', updated: new Date(3000) },
  { id: 'abc4', title: 'Document 4', status: 'old', updated: new Date(4000) },
];

const docsUpdate1: IDoc[] = [
  { id: 'abc5', title: 'Document 5', status: 'new', updated: new Date(5000) },
  { id: 'abc1', title: 'Document 1', status: 'upd', updated: new Date(6000) },
];

const docsUpdate2: IDoc[] = [{ id: 'abc1', title: 'Document 1', status: 'upd', updated: new Date(7000) }];

function resetDataResult() {
  dataResult = [...docsOriginal];
}

describe('updateList', () => {
  beforeEach(resetDataResult);

  it('check original data consistency', done => {
    dataResult = updateList(
      docsOriginal,
      [],
      () => true,
      () => true,
    );

    expect(JSON.stringify(dataResult)).toEqual(JSON.stringify(docsOriginal));
    done();
  });

  it('simple default updates', done => {
    dataResult = updateList(docsOriginal, docsUpdate1, (docA, docB) => docA.id === docB.id);

    expect(dataResult[0].status).toEqual('upd');
    expect(dataResult[4].status).toEqual('new');
    done();
  });

  it('check result immutability', done => {
    dataResult = updateList(
      docsOriginal,
      docsUpdate1,
      () => true,
      () => true,
    );

    expect(docsOriginal[0].status).toEqual('old');
    expect(dataResult[0].status).toEqual('upd');
    done();
  });

  it('check add new and update oldm compared by id, compete with timestamp', done => {
    dataResult = updateList(
      docsOriginal,
      docsUpdate1,
      (docA, docB) => docA.id === docB.id,
      (docA, docB) => docB.updated.getTime() > docA.updated.getTime(),
    );

    expect(docsOriginal[0].status).toEqual('old');
    expect(dataResult[0].status).toEqual('upd');
    expect(dataResult[0].updated.getTime()).toEqual(6000);
    expect(dataResult[4].status).toEqual('new');
    done();
  });

  it('multiple updates', done => {
    dataResult = updateList(
      docsOriginal,
      docsUpdate1,
      (docA, docB) => docA.id === docB.id,
      (docA, docB) => docB.updated.getTime() > docA.updated.getTime(),
    );

    dataResult = updateList(
      dataResult,
      docsUpdate2,
      (docA, docB) => docA.id === docB.id,
      (docA, docB) => docB.updated.getTime() > docA.updated.getTime(),
    );

    expect(docsOriginal[0].status).toEqual('old');
    expect(dataResult[0].status).toEqual('upd');
    expect(dataResult[0].updated.getTime()).toEqual(7000);
    expect(dataResult[4].status).toEqual('new');

    done();
  });
});
