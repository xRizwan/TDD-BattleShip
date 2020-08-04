function Ship(num, name, x, y){
    let size = num;
    let coords = [x,y];
    
    let length = new Array(num)
    for (let i = 0; i < length.length; i++){
        let shipName = name + i + "";
        length[i] = shipName;
    }

    let hit = (spot) => {
        if (spot > length.length -1 || spot === undefined){
            throw Error("No Such Spot Exists")
        }
        length[spot] = "x";
        return length.reduce((acc, cur) => (cur === 'x' ? acc + 1 : acc), 0)
    }

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

//module.exports = Ship;
export default Ship;