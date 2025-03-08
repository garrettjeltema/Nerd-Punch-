class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene')
    }

    create() {
        // add background
        this.add.image(game.config.width / 2, game.config.height / 2, 'credits')

        // add music
        this.loop = this.sound.add('song', {
            mute: false,
            volume: 1,
            rate: 1,
            loop: true
        })
        this.loop.play()

         // menu button animations
         this.anims.create({
            key: 'menu-out',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('menu-button', {
                start: 0,
                end: 0
            })
        })
        this.anims.create({
            key: 'menu-hover',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('menu-button', {
                start: 1,
                end: 1
            })
        })

        // add menu button
        this.menu = this.add.sprite(game.config.width - 100, 50, 'menu-button', 0)

        // menu button interactions
        this.menu.setInteractive({
            useHandCursor: true,
        })
        this.menu.on('pointerover', () => {                   // when mouse is over
            this.menu.play('menu-hover', true)
        })
        this.menu.on('pointerout', () => {                    // when mouse isn't over
            this.menu.play('menu-out', true)
        })
        this.menu.on('pointerdown', () => {                   // when mouse is clicked
            this.loop.stop()
            this.scene.start('menuScene')
        })
    }
}