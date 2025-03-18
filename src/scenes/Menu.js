class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        this.load.path = "./assets/"

        // load background screens
        this.load.image('menu', 'img/Nerd Menu-01.png')
        this.load.image('background', 'img/Nerd Background-01.png')
        this.load.image('platform', 'img/Platform-01.png')
        this.load.image('gameover', 'img/Game Over-01.png')
        this.load.image('youwin', 'img/You Win-01.png')
        this.load.image('credits', 'img/Credits Nerd-01.png')

        // load buttons
        this.load.spritesheet('cred-button', 'img/Cred Button.png', {
            frameWidth: 158,
            frameHeight: 65,
            startFrame: 0,
            endFrame: 1
        })
        this.load.spritesheet('menu-button', 'img/Menu Button (1).png', {
            frameWidth: 158,
            frameHeight: 65,
            startFrame: 0,
            endFrame: 1
        })
        this.load.spritesheet('restart-button', 'img/Restart Button (1).png', {
            frameWidth: 158,
            frameHeight: 65,
            startFrame: 0,
            endFrame: 1
        })

        // load fist selections
        this.load.spritesheet('fist1-select', 'img/Fist Selection1.png', {              // fist 1
            frameWidth: 82,
            frameHeight: 78,
            startFrame: 0,
            endFrame: 1
        })

        this.load.spritesheet('fist2-select', 'img/Fist Selection2.png', {
            frameWidth: 82,
            frameHeight: 78,
            startFrame: 0,
            endFrame: 2
        })

        this.load.spritesheet('empty-select', 'img/Empty Fist Selection.png', {         // empty selection
            frameWidth: 82,
            frameHeight: 78,
            startFrame: 0,
            endFrame: 1
        })

        // load nerd character
        this.load.spritesheet('nerd', 'img/Nerd Animations.png', {
            frameWidth: 22,
            frameHeight: 70,
            startFrame: 0,
            endFrame: 6
        })

        // load fists
        this.load.image('fist1', 'img/Fist1.png')
        this.load.image('fist2', 'img/Fist2.png')

        // load pow
        this.load.image('pow', 'img/Pow.png')
        this.load.image('whap', 'img/Whap.png')

        // load scoreboard
        this.load.image('score', 'img/Scoreboard.png')

        // load escape button
        this.load.image('escape', 'img/EscButton.png')

        // load audio
        this.load.audio('hurt', 'audio/hurt.wav')
        this.load.audio('point', 'audio/point.wav')
        this.load.audio('startgame', 'audio/startgame.wav')
        this.load.audio('endgame', 'audio/endgame.wav')
        this.load.audio('wingame', 'audio/winscreen.wav')

        this.load.audio('song', 'audio/Nerd Punch!.wav')

        // load bitmap font
        this.load.bitmapFont('retro-font', 'font/Upheaval2.png', 'font/Upheaval2.xml')
    }

    create() {
        // add menu background
        this.add.image(game.config.width / 2, game.config.height / 2, 'menu')

        // add instruction text
        this.startText = this.add.bitmapText(game.config.width / 2, game.config.height / 2, 'retro-font', 'PRESS SPACE TO START', 24).setOrigin(0.5)

        // make text flash
        this.tweens.add({
            targets: this.startText,
            alpha: {
                from: 1,
                to: 0,
                duration: 750,
                ease: 'linear',
                repeat: -1,
                yoyo: 'true'
            }
        })

        // add credits button
        this.credit = this.add.sprite(game.config.width - game.config.width / 11, game.config.height / 10, 'cred-button', 0)
        this.credit.setScale(0.5, 0.5)

        // credits button animations
        this.anims.create({
            key: 'credits-out',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('cred-button', {
                start: 0,
                end: 0
            })
        })
        this.anims.create({
            key: 'credits-hover',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('cred-button', {
                start: 1,
                end: 1
            })
        })

        // add music
        this.loop = this.sound.add('song', {
            mute: false,
            volume: 1,
            rate: 1,
            loop: true
        })
        this.loop.play()

        cursors = this.input.keyboard.createCursorKeys()

        // credit interactions
        this.credit.setInteractive({
            useHandCursor: true,
        })
        this.credit.on('pointerover', () => {                   // when mouse is over
            this.credit.play('credits-hover', true)
        })
        this.credit.on('pointerout', () => {                    // when mouse isn't over
            this.credit.play('credits-out', true)
        })
        this.credit.on('pointerdown', () => {  
            this.loop.stop()                 // when mouse is clicked
            this.scene.start('creditsScene')
        })
    }

    update() {
        // change scenes
        if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.sound.play('startgame')
            this.loop.stop()
            escaped = false
            this.scene.start('playScene')
        }
    }
}