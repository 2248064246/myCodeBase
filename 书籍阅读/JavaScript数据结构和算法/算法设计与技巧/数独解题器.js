/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-03 14:58:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-03 16:56:40
 * @Description: 
 */


const UNASSIGNED = 0;

function usedInRow(matrix, row, num) {
  for (let col = 0; col < matrix.length; col++) {
    if (matrix[row][col] === num) {
      return true;
    }
  }
  return false;
}

function usedInCol(matrix, col, num) {
  for (let row = 0; row < matrix.length; row++) {
    if (matrix[row][col] === num) {
      return true;
    }
  }
  return false;
}

function usedInBox(matrix, boxStartRow, boxStartCol, num) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (matrix[row + boxStartRow][col + boxStartCol] === num) {
        return true;
      }
    }
  }
  return false;
}

function isSafe(matrix, row, col, num) {
  return (
    !usedInRow(matrix, row, num) &&
    !usedInCol(matrix, col, num) &&
    !usedInBox(matrix, row - (row % 3), col - (col % 3), num)
  );
}

function solveSudoku(matrix) {
  let row = 0;
  let col = 0;
  let checkBlankSpaces = false;

  for (row = 0; row < matrix.length; row++) {
    for (col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === UNASSIGNED) {
        checkBlankSpaces = true;
        break;
      }
    }
    if (checkBlankSpaces === true) {
      break;
    }
  }
  if (checkBlankSpaces === false) {
    return true;
  }

  for (let num = 1; num <= 9; num++) {
    if (isSafe(matrix, row, col, num)) {
      matrix[row][col] = num;
      if (solveSudoku(matrix)) {
        return true;
      }
      matrix[row][col] = UNASSIGNED;
    }
  }
  return false;
}

function sudokuSolver(matrix) {
  if (solveSudoku(matrix) === true) {
    return matrix;
  }
  return 'NO SOLUTION EXISTS!';
}


// let sudokuGrid = createSudoku()
// console.table(sudokuGrid)

// console.table(sudokuSolver(sudokuGrid))


class Sudoku {

  constructor() {
    this.digits = this.blankMatrix(9);
  }

  blankMatrix(size) {
    let newMatrix = [];
    for (let i = 0; i < size; i++) {
      newMatrix.push([]);
    }
    return newMatrix;
  }

  makeDigits() {
    let colLists = this.blankMatrix(9);
    let areaLists = this.blankMatrix(3);
    let nine = this.randNine();
    let i = 0,
      j = 0,
      areaIndex = 0,
      count = 0,
      error = false,
      first = 0;
    for (i = 0; i < 9; i++) {
      colLists[i].push(nine[i]);
    }
    areaLists[0] = nine.slice(0, 3);
    areaLists[1] = nine.slice(3, 6);
    areaLists[2] = nine.slice(6);

    for (i = 0; i < 8; i++) {
      nine = this.randNine();
      if (i % 3 == 2) {
        areaLists = this.blankMatrix(3);
      }

      for (j = 0; j < 9; j++) {
        areaIndex = Math.floor(j / 3);
        count = 0;
        error = false;
        while (colLists[j].includes(nine[0]) || areaLists[areaIndex].includes(nine[0])) {
          if (++count >= nine.length) {
            error = true;
            break;
          }
          nine.push(nine.shift());
        }
        if (error) return false;
        first = nine.shift();
        colLists[j].push(first);
        areaLists[areaIndex].push(first);
      }
    }
    this.digits = colLists;
    return true;
  }

  randNine() {
    const nine = this.nine();
    let index = 0;

    for (let i = 0; i < 5; i++) {
      index = this.randIndex();
      [nine[0], nine[index]] = [nine[index], nine[0]];
    }

    return nine;
  }

  nine() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  randIndex() {
    return Math.floor(Math.random() * 9);
  }
}

console.time('生成数独')
let sudoku = new Sudoku()
while (!sudoku.makeDigits());
console.timeEnd('生成数独')
console.table(sudoku.digits)
sudoku.digits[0][8] = 0
sudoku.digits[0][2] = 0
sudoku.digits[4][3] = 0
sudoku.digits[0][1] = 0


console.table(sudokuSolver(sudoku.digits))