function TicTacToe() {
  let x = "X";
  let o = "O";
  let getNewArray = () => [
    [new Array(3).fill(null), new Array(3).fill(null), new Array(3).fill(null)],
  ];
  let board = getNewArray();
  let player = x;

  let startGame = (i, j) => {
    console.log(board[i][j]);
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("cell")) {
        if (e.target.innerHTML === "") {
          e.target.innerHTML = player;
          if (player === x) {
            player = o;
            console.log((board[e.target.id[0]][e.target.id[2]] = x));
          } else {
            player = x;
            console.log((board[e.target.id[0]][e.target.id[2]] = o));
          }
        }
      }
    });
  };

  let renderBoard = () => {
    let i, j;
    for (let i = 0; i < board.length; i++) {
      const row = document.createElement("div");
      i = [i];
      row.classList.add("row");
      row.id = `row-${i}`;
      document.getElementById("board").appendChild(row);
      for (let j = 0; j < board[i].length; j++) {
        j = [j];
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = `${i}-${j}`;
        cell.innerHTML = "";
        row.appendChild(cell);
      }
    }
    startGame(i, j);
  };
  return {
    draw: renderBoard,
  };
}

export default TicTacToe;
