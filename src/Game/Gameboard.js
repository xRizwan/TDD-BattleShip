import Ship from './Ship';

function Gameboard() {

    // main game board
    const board = [
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
    ]

    // counter to give dynamic names to the ships
    let counter = 0; 
    // object to contain the information of the ships on the board
    let shipsContainer = {};

    // function to add the ship to the board
    let addShip = (shipSize, x, y) => {

        // if given coords are not empty return false
        // else continue
        for (let i = 0; i < shipSize; i++){
            if(board[x][y + i] === ''){
                continue;
            }
            else {
                return false;
            }
        }

        // dynamic names assigned to the ships
        let shipName = "ship" + counter + '';

        // creating a new ship with those coords,name and size
        let newShip = Ship(shipSize, shipName, x, y);

        // adding the ship to the shipsContainer object
        shipsContainer["ship" + counter + ''] = newShip;

        // adding ships parts to the board
        for(let i = 0; i < shipSize; i++){
            board[x][y + i] = shipsContainer["ship" + counter].length[i];
        }

        counter++;

        // return true when everything succeeds
        return true;
    }

    // function to check if ships still remain on the board
    let containsShips = () => {
        if (isEmpty(shipsContainer)){
            return false;
        }
        else {
            return true;
        }
    }

    // function to attack ships
    let recieveAttack = (x, y) => {
        // if given coordinated exist
        if (board[x] !== undefined && board[x][y] !== undefined){
            
            // if the spot at the given coordinantes has a part of a ship
            if (board[x][y] !== '' && board[x][y] !== 'x' && board[x][y] !== '.'){
                let name = board[x][y].substr(0, board[x][y].length - 1)
                let hitSpot = board[x][y].substr(board[x][y].length - 1, board[x][y].length - 1);

                // call the hit function on that ship
                shipsContainer[name].hit(hitSpot);

                // getting coordinates from the ship
                let [xAx, yAx] = shipsContainer[name].coords;
                let lengthOfShip = shipsContainer[name].length.length;

                // update the board after attack hits;
                for (let i = 0, c = yAx; i < lengthOfShip; i++){
                    board[xAx][c + i] = shipsContainer[name].length[i];
                }

                // if ship has sunk then remove it from the objects
                if (shipsContainer[name].isSunk()){
                    delete shipsContainer[name];
                }

                return true;
            }
            else {
                // if spot doesnt have a ship then check if it is empty;
                if (board[x][y] === ''){
                    // if empty then put . in it
                    board[x][y] = '.';
                    return true;
                }

                // return false since no ship was hit
                return false;
            }
        }
        else {
            // if coordinates dont exist on the board return true
            return false;
        }
    }

    // check if obj is empty
    function isEmpty(obj){
        for (let key in obj){
            if(obj.hasOwnProperty(key)){
                return false
            }
        }
        return true;
    }

    return {
        board,
        addShip,
        recieveAttack,
        containsShips,
    }
}

export default Gameboard;