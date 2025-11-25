
export default class Grid {
  constructor(rows, cols) {
    this._rows = rows;
    this._cols = cols;

    this._data = new Array(rows * cols).fill(undefined);
  }


  _inBounds(row, col) {
    return (
      Number.isInteger(row) &&
      Number.isInteger(col) &&
      row >= 0 && row < this._rows &&
      col >= 0 && col < this._cols
    );
  }

  _index(row, col) {
    if (!this._inBounds(row, col)) return undefined;
    return row * this._cols + col;
  }

  _cellOrUndefined(row, col) {
    if (!this._inBounds(row, col)) return undefined;
    return {
      row,
      col,
      value: this.get({ row, col })
    };
  }


  set({ row, col }, value) {
    const idx = this._index(row, col);
    if (idx === undefined) return; // out-of-bounds: ignorer
    this._data[idx] = value;
  }

  get({ row, col }) {
    const idx = this._index(row, col);
    if (idx === undefined) return undefined;
    return this._data[idx];
  }

  indexFor({ row, col }) {
    return this._index(row, col); 
  }

  rowColFor(index) {
    if (
      !Number.isInteger(index) ||
      index < 0 ||
      index >= this._data.length
    ) {
      return undefined;
    }
    const row = Math.floor(index / this._cols);
    const col = index % this._cols;
    return { row, col };
  }

  neighbours({ row, col }) {
    const deltas = [
      { dr: -1, dc: -1 },
      { dr: -1, dc:  0 },
      { dr: -1, dc:  1 },
      { dr:  0, dc: -1 },
      { dr:  0, dc:  1 },
      { dr:  1, dc: -1 },
      { dr:  1, dc:  0 },
      { dr:  1, dc:  1 }
    ];

    const result = [];

    for (const { dr, dc } of deltas) {
      const r = row + dr;
      const c = col + dc;
      if (this._inBounds(r, c)) {
        result.push({ row: r, col: c });
      }
    }

    return result;
  }

  neighbourValues(pos) {
    return this.neighbours(pos).map(({ row, col }) =>
      this.get({ row, col })
    );
  }


  nextInRow({ row, col }) {
    const c = col + 1;
    return this._cellOrUndefined(row, c);
  }

  nextInCol({ row, col }) {
    const r = row + 1;
    return this._cellOrUndefined(r, col);
  }

  north({ row, col }) {
    const r = row - 1;
    return this._cellOrUndefined(r, col);
  }

  south({ row, col }) {
    const r = row + 1;
    return this._cellOrUndefined(r, col);
  }

  west({ row, col }) {
    const c = col - 1;
    return this._cellOrUndefined(row, c);
  }

  east({ row, col }) {
    const c = col + 1;
    return this._cellOrUndefined(row, c);
  }


  rows() {
    return this._rows;
  }

  cols() {
    return this._cols;
  }

  size() {
    return this._rows * this._cols;
  }


  fill(value) {
    this._data.fill(value);
  }
}
