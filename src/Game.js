import Board from './Board';
import React from 'react';
import calculateWinner from './calculateWinner';

export default class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
            squares: Array(9).fill(null)
        }],
        xIsNext: true,
      }
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]) return;
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat({squares: squares}),
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Перейти к ходу #' + move :
        'К началу игры';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if(winner) {
        status = 'Выиграл ' + winner;
    }
    else{
        status = 'Ходит: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    if(current.squares.every(el => el != null)) 
        status = 'Ничья';

      return (
        <div className='wrapper'>
        <h1 align = "center" className='game-name'>Крестики-нолики</h1>
          <div className="game">
            <div className="game-board">
              <Board 
                squares = {current.squares}
                OnClick = {(i) => this.handleClick(i)}
              />
            </div>
            <div className="game-info">
              <div>{status}</div>
              <ol>{moves}</ol>
            </div>
          </div>
          <div className='author'>Aslanov Elton (ru.elton.aslanov@gmail.com)</div>
        </div>
      );
    }
  }