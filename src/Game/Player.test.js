import Player, {autoPlayer} from './Player';

let player;
let computer;

describe("ship addition for each player possible", () => {
    beforeEach(() => {
        player = Player("Rizwan");
        computer = Player("Computer");
        player.enemy = computer;
        computer.enemy = player;
    })

    it("Test whether it ship of size greater than the remaining length can be added", () => {
        expect(player.playerBoard.addShip(4, 0, 7))
        .toBeFalsy();
    })

    it("Test whether ship can be added", () => {
        expect(player.playerBoard.addShip(4, 0, 4))
        .toBeTruthy();
    })
})

describe("testing the gameplay", () => {
    beforeEach(() => {
        player = Player("Rizwan");
        computer = Player("Computer");
        player.enemy = computer;
        computer.enemy = player;

        player.playerBoard.addShip(4, 0, 0);
        player.playerBoard.addShip(4, 0, 3);
        player.playerBoard.addShip(3, 1, 0);
        player.playerBoard.addShip(2, 5, 0);

        computer.playerBoard.addShip(4, 1, 0);
        computer.playerBoard.addShip(4, 2, 0);
        computer.playerBoard.addShip(3, 3, 0);
        computer.playerBoard.addShip(2, 4, 0);

        let winner = false;
    })

    it("Testing auto gameplay vs both players", () => {
        expect(autoPlayer(player, computer))
        .toBeTruthy();
    })

    it("Testing if spot attacked on the board without ship is recorded", () => {
        expect(player.playTurn(player.enemy, 7, 0))
        .toBeFalsy();
    })
})