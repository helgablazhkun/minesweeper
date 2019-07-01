import { Component, OnInit } from '@angular/core';
import { MinesweeperApiService } from './minesweeper-api.service';
export interface Settings {
  height: number; // desired height of game, defaults to 10
  width: number; // desired width of game, defaults to 10
  count: number; // desired number of mines, defaults to 10
}

export interface Cell {
  x: number;
  y: number;
  count: number | null;
  value: number | null | 'X' | '';
}

export interface InitResponse {
  status: string;
  game: Settings;
}

export interface RevealResponse {
  status: string;
  cells: Cell[];
  game: Settings;
}

export interface Field {
  x: number[];
  y: number[];
}

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.css']
})

export class GameFieldComponent implements OnInit {
  gameField: Cell[][];
  cells: Cell[];
  gameOver: boolean;
  constructor(private minesweeperApiService: MinesweeperApiService) { }

  async ngOnInit() {
    const response = await this.minesweeperApiService.init();
    this.gameField = [];

    for (let i = 0; i < response.game.width; i++) {
      this.gameField.push([]);
      for (let j = 0; j < response.game.height; j++) {
        this.gameField[i].push({
          x: i,
          y: j,
          count: null,
          value: null
        });
      }
    }

    this.gameOver = false;
    console.log(this.gameField);
  }

  async click(cell: Cell) {
    const response = await this.minesweeperApiService.reveal(cell);

    for (let i = 0; i < response.game.width; i++) {
      this.gameField.push([]);
      for (let j = 0; j < response.game.height; j++) {
        const cellValue = response.cells.find((c: Cell) => {
          return c.x === i && c.y === j;
        });

        if (cellValue) {
          this.gameField[i][j] = {
            x: cellValue.x,
            y: cellValue.y,
            count: cellValue.count,
            value: cellValue.count === -1 ? 'X'
                : cellValue.count === 0 ? '' : cellValue.count
          };

        }
      }
    }

    this.checkGameOver(cell, response.cells);
  }

  private checkGameOver(cell: Cell, cells: Cell[]) {
    const clickedCell = cells.find((c: Cell) => {
      return c.x === cell.x && c.y === cell.y;
    });
    this.gameOver = clickedCell.count === -1;

  }

  isOpened(cell: Cell) {
    const opened = cell.count !== null ? cell.count === 0 : false;
    if (opened) {
      console.log(opened);
    }
    return opened;
  }

}
