// Game Title: Nerd Punch!

var config = {
    parent: 'phaser-game',
    type: Phaser.WEBGL,
    width: 640,
    height: 320,
    zoom: 2,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            wrap: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Menu, Play, Credits, GameOver ]
}

let game = new Phaser.Game(config)

let cursors

let pow = {
    x: 0,
    y: 0
}

let nerdAngle = 0

let punchable = false

let escaped = false

let f1 = true
let f2 = false

let currentScore = 0