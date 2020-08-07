import React from 'react';
import Grid from './GridBoard';
import Player from '../Game/Player';
import allShips from '../Game/shipData';
import BattleShips from './BattleShips';
import Header from './Header';
import PlayButtons from './PlayButtons';
import WinnerDisplayer from './WinnerDisplayer';

class App extends React.Component{

    constructor(props){
        super(props)

        // main startup
        let player1 = Player("Player1");
        let computer = Player("Computer");
        computer.autoShipsAdd();
        player1.enemy = computer;
        computer.enemy = player1;

        // state
        this.state = {
            player1,
            computer,
            allShips,
            shipName: '',
            playable: false,
            won: false,
            winner: '',
        }
    }

    refreshState = () => {

        // basic startup
        let player1 = Player("Player1");
        let computer = Player("Computer");
        computer.autoShipsAdd();
        
        // setting enemies
        player1.enemy = computer;
        computer.enemy = player1;

        this.setState({
            player1,
            computer,
            allShips,
            shipName: '',
            playable: false,
            won: false,
            winner: '',
        })
    }

    forcePlayable = (event) => {
        this.setState({
            allShips: [],
            playable: true,
        })
    }

    

    // function run when user clicks on a box (attacks)
    playGame = (x, y) => {
        if(this.state.playable){
            let won = '';

            // check if person already won
            if(this.state.winner !== ''){
                return;
            }

            // players turn;
            let pResult = this.state.player1.playTurn(this.state.player1.enemy, x, y);
            let computerBoard = this.state.player1.enemy.playerBoard.board;
            if (pResult === false){

                // if invalid attack then quit
                return;
            }

            // check if the board still has ships
            if(!this.state.player1.enemy.playerBoard.containsShips()){
                this.setState({
                    winner : "player1",
                    playable: false,
                })
                won = "player1";
            }
            this.setState({[this.state.computer.playerBoard.board]: computerBoard})
            if (won !== ''){
                //alert(`${won} is the winner`);
                return
            }

            // computers turn
            this.state.computer.autoTurn(this.state.computer.enemy);
            let playerBoard = this.state.computer.playerBoard.board;
            // check if the board still has ships
            if(!this.state.computer.enemy.playerBoard.containsShips()){
                this.setState({
                    winner : "computer",
                    playable: false,
                })
                won = "computer";
                //alert(`${won} is the winner`);
            }

            this.setState({[this.state.player1.playerBoard.board] : playerBoard});

        } else {
            return;
        }
    }

    // adds the ship dragged onto the board on the spot it was dragged on
    changeBoard = (size, x, y) => {
        let result = this.state.player1.playerBoard.addShip(Number(size), x, y);
        let board = this.state.player1.playerBoard.board;
        if (result){
            this.setState({[this.state.player1.playerBoard.board]: board})
            return true;
        }
        else {
            return false;
        }
    }

    // changes the name of the ship to be removed
    changeShipName = (name) => {
        this.setState({shipName: name})
    }

    // removes the ship from the state when it's placed on the board
    // also checks if all the available ships were placed on the board
    // then allows the user to play the game by setting the playable state to true
    changeShips = () => {
        let name = this.state.shipName;
        this.setState({
           allShips : this.state.allShips.filter((current) => (current[1] !== name)),
           playable : (this.state.allShips.filter((current) => (current[1] !== name)).length === 0) ? true : false,
        })
    }

    render() {
        return(
            <React.Fragment>
                <Header />
                <PlayButtons play={this.forcePlayable} restart={this.refreshState}/>

                {/* */}
                {this.state.winner !== '' ? <WinnerDisplayer winner={this.state.winner}/> : null}
                <div className="GameContainer">
                    <div className="ShipsContainer">
                        <BattleShips
                            changeName={this.changeShipName}
                            shipsData={this.state.allShips}
                        />
                    </div>
                    <div className="Boards">
                        <Grid
                            class={"player"}
                            changeBoard={this.changeBoard}
                            changeShips={this.changeShips}
                            board={this.state.player1.playerBoard.board}
                            playable={(this.state.allShips.length === 0) ? true: false}
                            playGame={this.playGame}
                        />
                        <Grid 
                            class={"computer"}
                            board={this.state.computer.playerBoard.board} 
                            playGame={this.playGame}
                        />
                    </div>
                    <div className="board-name">
                        <h4 className="player-board">^Player^</h4>
                        <h4 className="computer-board">^Computer^</h4>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default App;