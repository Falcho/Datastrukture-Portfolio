export default class Grid {
  constructor(rows, cols) {
    this._rows = rows;
    this._cols = cols;
    this._data = new Array(rows * cols);
  }

  // Sætte og hente værdier
  set({ row, col }, value) {
    const index = this.indexFor({ row, col });
    if (index === undefined) {
      return undefined;
    }
    this._data[index] = value;
    return value;
  }

  get({ row, col }) {
    const index = this.indexFor({ row, col });
    if (index === undefined) {
      return undefined;
    }
    return this._data[index];
  }

  // Konvertering mellem (row, col) og index
  indexFor({ row, col }) {
    if (row > this.rows || col > this.cols || col < 0 || row < 0) {
      return undefined;
    }
    return row * this._cols + col;
  }

  rowColFor(index) {
    const row = Math.floor(index / this._cols);
    const col = index - row * this._cols;
    return { row, col };
  }

  // Naboer
  neighbours({ row, col }) {
        const coords = [];
    if (this.indexFor({ row: row - 1, col }) !== undefined){
        coords.push({ row: row - 1, col });
    }
    if (this.indexFor({ row: row + 1, col }) !== undefined){
        coords.push({ row: row + 1, col });
    }
    if (this.indexFor({ row, col: col - 1 }) !== undefined){
        coords.push({ row, col: col - 1 });
    }
    if (this.indexFor({ row, col: col + 1 }) !== undefined){
        coords.push({ row, col: col + 1 });
    }
    return coords;
  }

  neighbourValues({ row, col }) {
    const values = [];
    if (this.north({ row, col }) !== undefined){
        values.push(this.north({ row, col }));
    }
    if (this.south({ row, col }) !== undefined){
        values.push(this.south({ row, col }));
    }
    if (this.west({ row, col }) !== undefined){
        values.push(this.west({ row, col }));
    }
    if (this.east({ row, col }) !== undefined){
        values.push(this.east({ row, col }));
    }
    return values;
  }

  // Navigation i grid – returnerer { row, col, value } eller undefined
  nextInRow({ row, col }) {
    return this.get({ row, col: col + 1 });
  }

  nextInCol({ row, col }) {
    return this.get({ row: row + 1, col });
  }

  north({ row, col }) {
    return this.get({ row: row - 1, col });
  }

  south({ row, col }) {
    return this.get({ row: row + 1, col });
  }

  west({ row, col }) {
    return this.get({ row, col: col - 1 });
  }

  east({ row, col }) {
    return this.get({ row, col: col + 1 });
  }

  // Info om struktur
  rows() {
    return this._rows;
  }

  cols() {
    return this._cols;
  }

  size() {
    return this._data.length;
  }

  // Fyld hele griddet
  fill(value) {
    this._data.fill(value);
  }
}
