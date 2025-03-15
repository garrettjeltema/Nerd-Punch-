// Game Title: Nerd Punch!
// Garrett Jeltema and Updated Last 3/15/2025
// Technical Execution:
// Arcade Physics, Text Objects, Animation Manager, Tween Manager, Timers
// Tilt:
// In the original game, there is only two buttons and a joystick on the configuration, so I
// made sure to incorporate two main pressing buttons (for weapon switching and for hitting)
// for the games functions and a way to aim around the screen. I also thought my way of 
// incorporating the aiming through the cursor as the weapon was an interesting and unique 
// way of implementing this aiming function. I, also, found that being able to change it to 
// a different cursor based upon which weapon is being used is particularly cool. In terms 
// of creativity with the visuals, I felt that the design of the my background in particular 
// fit the theme of the arcade style and I was proud of the way it looks.

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
    scene: [ Menu, Play, Credits, GameOver, YouWin ]
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
let currentMisses = 0