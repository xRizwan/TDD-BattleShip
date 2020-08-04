import Ship from './Ship';

let ship;

describe("Ships of size 2 testing", () => {
    beforeEach(() => {
        ship = Ship(2);
    })

    it("ship takes 1 damage", () => {
        expect(ship.hit(1))
        .toBe(1);
    })

    it("ship takes 2 damage and sinks", () => {
        ship.hit(1);
        ship.hit(0);
        expect(ship.isSunk())
        .toBeTruthy;
    })

})

describe("Ships of size 2 testing", () => {
    beforeEach(() => {
        ship = Ship(4);
    })

    it("ship takes 1 damage", () => {
        expect(ship.hit(1))
        .toBe(1);
    })

    it("ship takes 2 damage", () => {
        ship.hit(1);
        ship.hit(0);
        ship.hit(2);
        ship.hit(3);
        expect(ship.isSunk())
        .toBeTruthy();
    })

})