function TicTacToe() {
  const getNewArray = () => [
    new Array(3).fill(null),
    new Array(3).fill(null),
    new Array(3).fill(null),
  ];
  let x = "X",
    o = "O",
    board = getNewArray(),
    player = x;
  let state = {
    win: false,
    draw: false,
    clickCount: 0,
    player: player,
  };
  let $ = (selector) => document.querySelector(selector);
  let output = $("#outcome");
  let setPlayer = (player) => {
    let className =
      player === x ? "bg-green-700 text-white " : "bg-yellow-700 text-white ";
    $(
      "#player"
    ).innerHTML = `<span class=${className} > ${player}'s turn </span>`;
  };
  console.log(state);

  let setState = (newState) => {
    state = newState;
    return state;
  };

  const controller = new AbortController();

  let resetBoard = (boardX, boardO) => {
    setState(state);
  };

  let checkWin = (board, player) => {
    let win = false;
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === player &&
        board[i][1] === player &&
        board[i][2] === player
      ) {
        win = true;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] === player &&
        board[1][i] === player &&
        board[2][i] === player
      ) {
        win = true;
      }
    }
    if (
      board[0][0] === player &&
      board[1][1] === player &&
      board[2][2] === player
    ) {
      win = true;
    }
    if (
      board[0][2] === player &&
      board[1][1] === player &&
      board[2][0] === player
    ) {
      win = true;
    }

    return win;
  };
  setPlayer(state.player);
  let generateOutput = (player, outcome) => {
    output.innerHTML = `<div class="bg-gray-500 p-4 rounded-lg w-1/2 mx-auto flex-col items-center justify-center">
  <p class="text-white"> ${player} ${outcome} </p> 
  <button class="bg-slate-500 text-white p-2 rounded-lg" onclick="resetBoard()"> Reset </button>
  </div>`;
  };
  let startGame = () => {
    document.addEventListener(
      "click",
      (e) => {
        if (e.target.classList.contains("cell")) {
          if (e.target.innerHTML === "") {
            e.target.innerHTML = player;
            setPlayer(state.player === x ? o : x);
            if (state.player === x) {
              player = o;
              setState({
                ...state,
                player: player,
                clickCount: state.clickCount + 1,
              });
              board[e.target.id[0]][e.target.id[2]] = x;
              e.target.classList.add("bg-x");
              if (checkWin(board, x)) {
                setState({ ...state, win: true });
                controller.abort();
                generateOutput(x, "Wins");
              }
            } else if (state.player === o) {
              player = x;
              setState({
                ...state,
                player: player,
                clickCount: state.clickCount + 1,
              });
              board[e.target.id[0]][e.target.id[2]] = o;
              e.target.classList.add("bg-o");
              if (checkWin(board, o)) {
                setState({ ...state, win: true });
                console.log(state);
                controller.abort();
                generateOutput(o, "Wins");
              }
            }

            if (!state.win && state.clickCount >= 9) {
              setState({ ...state, draw: true });
              generateOutput("", "Draw");
            }
          }
        }
      },
      {
        signal: controller.signal,
      }
    );
  };

  let renderBoard = (board, cb) => {
    document.title = "TicTacToe Game";
    for (let i = 0; i < board.length; i++) {
      const row = document.createElement("div");
      i = [i];
      row.classList.add("row");
      row.id = `row-${i}`;
      $("#board").appendChild(row);
      for (let j = 0; j < board[i].length; j++) {
        j = [j];
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = `${i}-${j}`;
        cell.innerHTML = board[i][j];
        row.appendChild(cell);
      }
    }
    startGame();
    cb(state);
  };

  return {
    draw: renderBoard,
    board: board,
  };
}

export default TicTacToe;
