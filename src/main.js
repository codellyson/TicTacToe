import "./index.css";
import TicTacToe from "./tictactoe.js";

// let board = getNewArray();
const { draw, board } = TicTacToe();
document.addEventListener("DOMContentLoaded", () => {
  draw(board, function (state) {
    console.log(state);
  });
  // tictactoe.setPlayer();
  // tictactoe.play();
  // tictactoe.checkWin();
});
