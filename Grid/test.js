import test from 'node:test';
import assert from 'node:assert/strict';
import Grid from './grid.js';

test('rows(), cols(), size()', () => {
  const g = new Grid(3, 4);
  assert.equal(g.rows(), 3);
  assert.equal(g.cols(), 4);
  assert.equal(g.size(), 12);
});

test('fill(value) sets all cells', () => {
  const g = new Grid(2, 3);
  g.fill('x');
  for (let row = 0; row < g.rows(); row++) {
    for (let col = 0; col < g.cols(); col++) {
      assert.equal(g.get({ row, col }), 'x');
    }
  }
});

test('set({row,col}, v) and get({row,col}) work in-bounds, ignore out-of-bounds', () => {
  const g = new Grid(3, 4);
  g.fill(0);

  g.set({ row: 1, col: 2 }, 42);
  assert.equal(g.get({ row: 1, col: 2 }), 42);

  // ignore/undefined strategy for out-of-bounds
  assert.equal(g.get({ row: -1, col: 0 }), undefined);
  assert.equal(g.get({ row: 3, col: 0 }), undefined);
  assert.equal(g.get({ row: 0, col: 4 }), undefined);

  // set out-of-bounds does not throw and has no effect
  assert.doesNotThrow(() => g.set({ row: 99, col: 99 }, 'oops'));
  assert.equal(g.get({ row: 1, col: 2 }), 42);
});

test('indexFor({row,col}) and rowColFor(index) mapping', () => {
  const g = new Grid(3, 4); // cols = 4
  assert.equal(g.indexFor({ row: 0, col: 0 }), 0);
  assert.equal(g.indexFor({ row: 0, col: 3 }), 3);
  assert.equal(g.indexFor({ row: 1, col: 0 }), 4);
  assert.equal(g.indexFor({ row: 1, col: 2 }), 6);
  assert.equal(g.indexFor({ row: 2, col: 3 }), 11);

  assert.deepEqual(g.rowColFor(0), { row: 0, col: 0 });
  assert.deepEqual(g.rowColFor(3), { row: 0, col: 3 });
  assert.deepEqual(g.rowColFor(4), { row: 1, col: 0 });
  assert.deepEqual(g.rowColFor(6), { row: 1, col: 2 });
  assert.deepEqual(g.rowColFor(11), { row: 2, col: 3 });

  // out-of-bounds indices return undefined
  assert.equal(g.rowColFor(-1), undefined);
  assert.equal(g.rowColFor(12), undefined);

  // out-of-bounds positions return undefined
  assert.equal(g.indexFor({ row: -1, col: 0 }), undefined);
  assert.equal(g.indexFor({ row: 3, col: 0 }), undefined);
  assert.equal(g.indexFor({ row: 0, col: 4 }), undefined);
});

test('neighbours({row,col}) in middle has 8, corners/edges fewer', () => {
  const g = new Grid(3, 4);
  const mid = { row: 1, col: 1 };
  const n = g.neighbours(mid);
  const asKey = (p) => `${p.row},${p.col}`;
  const keys = new Set(n.map(asKey));

  // Middle (1,1) in 3x4 should have 8 neighbors
  assert.equal(n.length, 8);
  const expectedMid = [
    '0,0', '0,1', '0,2',
    '1,0',        '1,2',
    '2,0', '2,1', '2,2',
  ];
  for (const k of expectedMid) assert.ok(keys.has(k), `missing ${k}`);

  // Corner (0,0) should have 3 neighbors
  const corner = g.neighbours({ row: 0, col: 0 }).map(asKey);
  assert.equal(corner.length, 3);
  const expectedCorner = new Set(['0,1', '1,0', '1,1']);
  for (const k of corner) assert.ok(expectedCorner.has(k));
});

test('neighbourValues({row,col}) matches values of neighbours', () => {
  const g = new Grid(3, 4);
  g.fill(0);

  // Put distinct values in neighbors of (1,1)
  const positions = g.neighbours({ row: 1, col: 1 });
  positions.forEach((p, i) => g.set(p, i + 1));
  const values = g.neighbourValues({ row: 1, col: 1 });

  // Compare as sets (order not required by spec)
  const sorted = [...values].sort((a, b) => a - b);
  assert.deepEqual(sorted, [1, 2, 3, 4, 5, 6, 7, 8]);
});

test('nextInRow and nextInCol', () => {
  const g = new Grid(3, 4);
  g.fill(null);

  g.set({ row: 1, col: 3 }, 'R'); // last in row
  g.set({ row: 2, col: 2 }, 'D'); // last in col for row=1 col=2 is row=2

  const a = g.nextInRow({ row: 1, col: 2 });
  assert.deepEqual(a, { row: 1, col: 3, value: 'R' });

  const b = g.nextInCol({ row: 1, col: 2 });
  assert.deepEqual(b, { row: 2, col: 2, value: 'D' });

  // At row end/col end -> undefined
  assert.equal(g.nextInRow({ row: 1, col: 3 }), undefined);
  assert.equal(g.nextInCol({ row: 2, col: 2 }), undefined);
});

test('north/south/west/east with in-bounds and out-of-bounds', () => {
  const g = new Grid(3, 4);
  g.fill(0);

  g.set({ row: 0, col: 1 }, 'N');
  g.set({ row: 2, col: 1 }, 'S');
  g.set({ row: 1, col: 0 }, 'W');
  g.set({ row: 1, col: 2 }, 'E');

  const c = { row: 1, col: 1 };
  assert.deepEqual(g.north(c), { row: 0, col: 1, value: 'N' });
  assert.deepEqual(g.south(c), { row: 2, col: 1, value: 'S' });
  assert.deepEqual(g.west(c), { row: 1, col: 0, value: 'W' });
  assert.deepEqual(g.east(c), { row: 1, col: 2, value: 'E' });

  // Out-of-bounds neighbors return undefined
  assert.equal(g.north({ row: 0, col: 1 }), undefined);
  assert.equal(g.west({ row: 1, col: 0 }), undefined);
  assert.equal(g.south({ row: 2, col: 1 }), undefined);
  assert.equal(g.east({ row: 1, col: 3 }), undefined);
});