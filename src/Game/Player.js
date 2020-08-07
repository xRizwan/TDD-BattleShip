import gameBoard from './Gameboard';

function Player(playerName) {

    // main startup
    let name = playerName;
    let playerBoard = gameBoard();
    let enemy;

    // function to play the turn
    let playTurn = (enemy, x, y) => {

        // check if enemy board still has ships or not
        let won = !enemy.playerBoard.containsShips();

        // if no ships are on the enemy board then player has won
        if (won){
            return true;
        }

        // attack the board and save the result
        let result = enemy.playerBoard.recieveAttack(x, y);
        
        if (!result){
            // if board couldn't record damage
            // coordinates are invalid
            return false
        }

        // check if board has ships again
        won = !enemy.playerBoard.containsShips();
        if (won) {
            return true;
        }
        return true;
    }

    // implement auto turns for both computer and normal players
    let autoTurn = (enemy) => {
        let won = !enemy.playerBoard.containsShips();
        if (won){
            console.log("Won Already");
            return true;
        }

        // generate random coordinates
        let randomX = Math.floor(Math.random() * 10);
        let randomY = Math.floor(Math.random() * 10);
        let eBoardSpot = enemy.playerBoard.board[randomX][randomY]

        // if coordinates empty then continue
        if (eBoardSpot !== '.' && eBoardSpot !== 'x'){

            // attack and save the result
            enemy.playerBoard.recieveAttack(randomX, randomY);
        }
        else {
            return autoTurn(enemy);
        }
        won = !enemy.playerBoard.containsShips();
    }

    let autoPlace = (size) => {

        // generating random coords
        let randomX = Math.floor(Math.random() * 10);
        let randomY = Math.floor(Math.random() * 10);
        let result = playerBoard.addShip(size, randomX, randomY);

        // if board failed to record the ships
        // invalid coordinates
        // try again
        if (result === false){
            return autoPlace(size)
        }
    }

    // function to provide data to autoPlace function
    let autoShipsAdd = () => {
        let ships = [1,2,3,3,4,5];

        // for each number in the ships array
        // create a new ship of that size
        for (let ship of ships){
            autoPlace(ship);
        }
    }

    return{
        name,
        playerBoard,
        enemy,
        playTurn,
        autoTurn,
        autoShipsAdd,
    }
}


// Mock Function to test auto playing capability of both players
// without outside intervention
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

// exports
export default Player;
export { autoPlayer };