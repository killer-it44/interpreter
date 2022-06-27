const Player = function (world) {
    let x = 0, y = 0, deg = 0, items = 0

    this.getPosition = () => ({ x, y })

    this.getDirection = () => deg

    this.pick = () => {
        if (world(x, y)) {
            items.push(world(x, y))
        }
    }

    this.turn = (degree = 90) => {
        deg = (deg + degree) % 360
    }

    this.move = (steps = 1) => {
        y = y + Math.sin(deg * 2 * Math.PI / 360)
        x = x + steps * Math.cos(deg * 2 * Math.PI / 360)
    }
}

export default Player