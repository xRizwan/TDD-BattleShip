import gameBoard from './Gameboard';

let board;
describe("Check if ships can be placed on the board", () => {
    beforeEach(() => {
        board = gameBoard();
    })

    it("addShip returns true", () => {
        expect(board.addShip(4, 0, 0))
        .toBeTruthy();
    })
})

describe("Check if ship take damage if found", () => {
    beforeEach(() => {
        board = gameBoard();
        board.addShip(2, 7, 0);
        board.addShip(2, 6, 0);
        board.recieveAttack(6, 0);
        board.recieveAttack(6, 1);
        board.recieveAttack(7, 0);
        board.recieveAttack(7, 1);
    })

    it("ship takes damage", () => {
        expect(board.recieveAttack(7, 0))
        .toBeFalsy();
    })

    it('ship already damaged at that spot so no damage taken', () => {
        expect(board.recieveAttack(6, 0))
        .toBeFalsy();
    })

    it('spot without ships dont take damage but are recorded', () => {
        expect(board.recieveAttack(0, 0))
        .toBeTruthy();
    })

    it('no ship remains in the board', () => {
        expect(board.containsShips())
        .toBeFalsy();
    })
})