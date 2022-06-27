import Player from './player.js'

describe('Player', () => {
    let player

    const expectEqual = (val1, val2) => {
        expect(String(val1).substring(0, 10)).toEqual(String(val2).substring(0, 10))
    }
    const expectPosition = (expectedPos) => {
        const pos = player.getPosition()
        expectEqual(pos.x, expectedPos.x)
        expectEqual(pos.y, expectedPos.y)
    }

    beforeEach(() => {
        player = new Player()
        expectPosition({ x: 0, y: 0 })
    })

    it('can move', () => {
        player.move()
        expectPosition({ x: 1, y: 0 })
    })

    it('can turn and move', () => {
        player.turn(45)
        player.move()
        expectPosition({ x: Math.sqrt(.5), y: Math.sqrt(.5) })
    })

    it('can make bigger steps', () => {
        player.move(2)
        expectPosition({ x: 2, y: 0 })
    })
})
