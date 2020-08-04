import gameBoard from './Gameboard';
//let gameBoard = require('./Gameboard');

function Player(playerName) {
    let name = playerName;
    let playerBoard = gameBoard();
    let enemy;

    let playTurn = (enemy, x, y) => {
        let won = !enemy.playerBoard.containsShips();
        if (won){
            console.log("Won Already");
            return;
        }

        let result = enemy.playerBoard.recieveAttack(x, y);
        result ? console.log("You Got HIM!"): console.log("Fail");

        won = !enemy.playerBoard.containsShips();
        if (won) {
            console.log("WON!");
        }
    }

    let autoTurn = (enemy) => {
        let won = !enemy.playerBoard.containsShips();
        if (won){
            console.log("Won Already");
            return true;
        }
        // implement auto turns for both computer and normal players
        let randomX = Math.floor(Math.random() * 8);
        let randomY = Math.floor(Math.random() * 8);
        let eBoardSpot = enemy.playerBoard.board[randomX][randomY]

        if (eBoardSpot !== '.' && eBoardSpot !== 'x'){
            let result = enemy.playerBoard.recieveAttack(randomX, randomY);
            if (result) {
                console.log("Got Him!")
            }
            else {
                console.log("Fail!");
            }
            if (won) {
                console.log("WON!");
            }
        }
        else {
            return autoTurn(enemy);
        }
        won = !enemy.playerBoard.containsShips();
    }

    return{
        name,
        playerBoard,
        enemy,
        playTurn,
        autoTurn,
    }
}

let player1 = Player("Rizwan");
let player2 = Player("Computer");
player1.enemy = player2;
player2.enemy = player1;

// computer ships
player2.playerBoard.addShip(1, 7, 0);
player2.playerBoard.addShip(1, 6, 0);
player2.playerBoard.addShip(1, 5, 0);

//playerships
player1.playerBoard.addShip(1, 4, 0);
player1.playerBoard.addShip(1, 6, 0);
player1.playerBoard.addShip(1, 7, 0);


//

//let winner = false;
// while(winner !== true){
//     player1.autoTurn(player1.enemy);
//     player2.autoTurn(player2.enemy);
//     console.log(player1.playerBoard.board);
//     console.log(player2.playerBoard.board);
//     if (!player1.playerBoard.containsShips() || !player2.playerBoard.containsShips()){
//         if (!player1.playerBoard.containsShips()){
//             winner = true;
//             console.log("player1");
//         }
//         else {
//             console.log("computer")
//             winner = true;
//         }
//     }
// }

// Mock Function
let autoPlayer = (player, computer) => {
    let winner;
    while(winner !== true){
        player.autoTurn(player.enemy);
        computer.autoTurn(computer.enemy);

        if(!player.playerBoard.containsShips()){
            console.log("Player1 has won")
            winner = true;
            return true;
        }
        else if(!computer.playerBoard.containsShips()){
            console.log("Computer has Won!");
            winner = true;
            return true;
        }
    }
}

export default Player;
export { autoPlayer };