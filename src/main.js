import "./index.css";
import TicTacToe from "./tictactoe.js";

const tictactoe = TicTacToe();
document.addEventListener("DOMContentLoaded", () => {
  tictactoe.draw();
  // tictactoe.play();
  // tictactoe.checkWin();
});
