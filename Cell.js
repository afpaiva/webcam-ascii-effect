class Cell {

  constructor(x, y, symbol, color) {
    this.x = x;
    this.y = y;
    this.symbol = symbol;
    this.color = color;
  }

  draw(ctx, cellSize) {
    ctx.fillStyle = "lightgreen"; // this.color;
    ctx.font = `${cellSize}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.symbol, this.x + cellSize / 2, this.y + cellSize / 2);
  }
}

export default Cell;
