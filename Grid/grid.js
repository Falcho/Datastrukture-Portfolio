export default class Grid {
  // Én flad array som backing; out-of-bounds ignoreres (returnerer undefined)
  constructor(rows, cols) {
    this._rows = Number.isInteger(rows) && rows > 0 ? rows : 0;
    this._cols = Number.isInteger(cols) && cols > 0 ? cols : 0;
    this._data = new Array(this._rows * this._cols).fill(undefined);
  }

  rows() {
    return this._rows;
  }

  cols() {
    return this._cols;
  }

  size() {
    return this._data.length;
  }

  fill(value) {
    this._data.fill(value);
  }

  set(pos, value) {
    const index = this.indexFor(pos);
    if (index === undefined) return undefined;
    this._data[index] = value;
  }

  get(pos) {
    const index = this.indexFor(pos);
    if (index === undefined) return undefined;
    return this._data[index];
  }

  indexFor(pos) {
    const { row, col } = this._normalizePos(pos);
    if (!this._inBounds(row, col)) return undefined;
    return row * this._cols + col;
  }

  rowColFor(index) {
    if (!Number.isInteger(index) || index < 0 || index >= this.size()) return undefined;
    const row = Math.floor(index / this._cols);
    const col = index % this._cols;
    return { row, col };
  }

  neighbours(pos) {
    const { row, col } = this._normalizePos(pos);
    if (!this._inBounds(row, col)) return [];
    const deltas = [
      [-1, -1], [-1, 0], [-1, 1],
      [ 0, -1],          [ 0, 1],
      [ 1, -1], [ 1, 0], [ 1, 1],
    ];
    const list = [];
    for (const [dr, dc] of deltas) {
      const r = row + dr;
      const c = col + dc;
      if (this._inBounds(r, c)) list.push({ row: r, col: c });
    }
    return list;
  }

  neighbourValues(pos) {
    return this.neighbours(pos).map(p => this.get(p));
  }

  nextInRow(pos) {
    const { row, col } = this._normalizePos(pos);
    const nextCol = col + 1;
    if (!this._inBounds(row, col) || !this._inBounds(row, nextCol)) return undefined;
    return this._cell(row, nextCol);
  }

  nextInCol(pos) {
    const { row, col } = this._normalizePos(pos);
    const nextRow = row + 1;
    if (!this._inBounds(row, col) || !this._inBounds(nextRow, col)) return undefined;
    return this._cell(nextRow, col);
  }

  north(pos) {
    const { row, col } = this._normalizePos(pos);
    const r = row - 1;
    if (!this._inBounds(r, col)) return undefined;
    return this._cell(r, col);
  }

  south(pos) {
    const { row, col } = this._normalizePos(pos);
    const r = row + 1;
    if (!this._inBounds(r, col)) return undefined;
    return this._cell(r, col);
  }

  west(pos) {
    const { row, col } = this._normalizePos(pos);
    const c = col - 1;
    if (!this._inBounds(row, c)) return undefined;
    return this._cell(row, c);
  }

  east(pos) {
    const { row, col } = this._normalizePos(pos);
    const c = col + 1;
    if (!this._inBounds(row, c)) return undefined;
    return this._cell(row, c);
  }

  // Hjælpere
  _inBounds(row, col) {
    return (
      Number.isInteger(row) &&
      Number.isInteger(col) &&
      row >= 0 &&
      col >= 0 &&
      row < this._rows &&
      col < this._cols
    );
  }

  _normalizePos(pos) {
    const row = Number.isFinite(pos?.row) ? Math.trunc(pos.row) : NaN;
    const col = Number.isFinite(pos?.col) ? Math.trunc(pos.col) : NaN;
    return { row, col };
  }

  _cell(row, col) {
    return { row, col, value: this.get({ row, col }) };
  }
}