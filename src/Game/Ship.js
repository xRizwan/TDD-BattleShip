
// main function to
// create a ship of size num and name of name
// at x,y coords on the board
function Ship(num, name, x, y){
    let size = num;
    let coords = [x,y];

    // length holds all the ship data in an array
    // NAME MIGHT BE CONFUSING
    // NAMED AS SUCH BECAUSE WAS EASIER TO REMEMBER
    let length = new Array(num)
    for (let i = 0; i < length.length; i++){
        let shipName = name + i + "";
        length[i] = shipName;
    }

    // hit function to take a spot and attack that spot
    // REMOVES THAT SPOT OF THE SHIP FROM THE LENGTH ARRAY
    let hit = (spot) => {
        if (spot > length.length -1 || spot === undefined){
            throw Error("No Such Spot Exists")
        }
        length[spot] = "x";
        return length.reduce((acc, cur) => (cur === 'x' ? acc + 1 : acc), 0)
    }

    // function that checks all the remaining parts of the ship
    // if none found that ship has sunk
    let isSunk = () => {
        let damageTaken = length.reduce((acc, cur) => (cur === 'x' ? acc + 1 : acc), 0);
        if(damageTaken === size){
            return true;
        }
        else {
            return false;
        }
    }

    return {
        hit,
        isSunk,
        length,
        size,
        coords
    }
}

// exports
export default Ship;