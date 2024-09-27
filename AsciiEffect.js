import Cell from "./Cell.js";

class AsciiEffect {
  #imageCellArray = [];
  #pixels = [];
  #ctx;
  #canvas;

  constructor(canvas) {
    this.#canvas = canvas;
    this.#ctx = canvas.getContext('2d');
  }

  renderImage(image) {
    this.#canvas.width = image.width;
    this.#canvas.height = image.height;
    this.#ctx.drawImage(image, 0, 0);
    this.#pixels = this.#ctx.getImageData(0, 0, image.width, image.height);
    this.#scanImage(5);
  }

  #scanImage(windowSize) {
    this.#imageCellArray = [];

    for (let i = 0; i < this.#pixels.width; i += windowSize) {
      for (let j = 0; j < this.#pixels.height; j += windowSize) {
        const posX = i * 4;
        const posY = j * 4;
        const pos = (posY * this.#pixels.width) + posX;

        if (this.#pixels.data[pos + 3] > 128) {
          const red = this.#pixels.data[pos];
          const green = this.#pixels.data[pos + 1];
          const blue = this.#pixels.data[pos + 2];
          const total = red + green + blue;
          const averageColor = total / 3;
          const color = "rgb(" + averageColor + "," + averageColor + "," + averageColor + ")";
          const symbol = this.#convertToSymbol(averageColor);

          if (total > 200) {
            this.#imageCellArray.push(new Cell(i, j, symbol, color));
          }
        }
      }
    }
  }

  #convertToSymbol(g) {
    if (g > 250) return '@';
    else if (g < 240) return '#';
    else if (g < 220) return '&';
    else if (g < 200) return '*';
    else if (g < 180) return '%';
    else if (g < 160) return '$';
    else if (g < 140) return 'W';
    else if (g < 120) return 'X';
    else if (g < 100) return '';
    else if (g < 80) return '/';
    else if (g < 60) return '-';
    else if (g < 40) return 'X';
    else if (g < 20) return '.';
    else return '~';
  }

  draw(cellSize) {
    this.#scanImage(cellSize);
    this.#drawAscii(cellSize);
  }

  #drawAscii(cellSize) {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    for (let i = 0; i < this.#imageCellArray.length; i++) {
      this.#imageCellArray[i].draw(this.#ctx, cellSize);
    }
  }
}

export default AsciiEffect;
