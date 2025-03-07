class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.DRAG = 50
        this.physics.world.gravity.y = 1000
        this.SCORE = 0
        this.MISSES = 0
    }

    create() {
        // add in-game background
        this.background = this.add.tileSprite(0, 0, 640, 320, 'background').setOrigin(0, 0)

        // add platform
        this.platform = this.physics.add.sprite(game.config.width / 2, game.config.height + 100, 'platform')
        this.platform.setScale(2, 1)
        this.platform.body.setAllowGravity(false)
        this.platform.body.setImmovable(true)

        // add scoreboard
        this.scoreboard = this.add.image(game.config.width / 2, 25, 'score')

        // add score instruction
        this.highText = this.add.bitmapText(game.config.width / 2, game.config.height / 2 - 60, 'retro-font', 'Reach 10,000 Points!', 36).setOrigin(0.5, 0)

        // add escape button
        this.escape = this.add.image(20, 20, 'escape')

        // add selections
        this.f1Selection = this.physics.add.sprite(game.config.width - 50, 50, 'fist1-select', 0)
        this.f1Selection.body.setAllowGravity(false)
        this.f1Selection.body.setImmovable(true)

        this.f2Selection = this.physics.add.sprite(game.config.width - 142, 50, 'empty-select', 1)
        this.f2Selection.body.setAllowGravity(false)
        this.f2Selection.body.setImmovable(true)

        // add nerd
        this.nerd = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'nerd', 0)

        // selection animations
        this.anims.create({                                                         // fist in-use
            key: 'used-fist',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('fist1-select', {
                start: 0,
                end: 0
            })
        })
        this.anims.create({                                                         // fist not in-use
            key: 'unused-fist',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('fist1-select', {
                start: 1,
                end: 1
            })
        })

        this.anims.create({                                                         // empty in-use
            key: 'used-empty',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('empty-select', {
                start: 0,
                end: 0
            })
        })
        this.anims.create({                                                         // empty not in-use
            key: 'unused-empty',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('empty-select', {
                start: 1,
                end: 1
            })
        })

        // nerd animations
        this.anims.create({
            key: 'idle',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('nerd', {
                start: 0,
                end: 1
            })
        })

        this.anims.create({
            key: 'hurt',
            frameRate: 0,
            repeate: -1,
            frames: this.anims.generateFrameNumbers('nerd', {
                start: 2,
                end: 2
            })
        })

        // add pow on cursor input
        this.nerd.setInteractive()
        this.input.on('pointerdown', () => {                        // create a pow physics sprite that can overlap with the nerd
            pow = this.physics.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, this.randomEffect())
            pow.body.setAllowGravity(false)
            pow.body.setImmovable(true)
            pow.body.setSize(50, 32)

            this.justdown = true                                    // create a variable that only responds when the pointer is clicked
        })
        this.input.on('pointerup', () => {                          // destroy the pow physics sprite on pointer release
            pow.destroy()
        })

        // add physics collider
        this.physics.add.collider(this.nerd, this.platform)

        // add physics overlap
        this.physics.add.overlap(this.nerd, this.pow)

        // add world bounds
        this.physics.world.setBounds(0, 0, game.config.width, game.config.height)

        // switch between selections
        this.input.keyboard.on('keydown-SPACE', function() {
           f1 = !f1
           f2 = !f2
        })

        // timer
        this.timer = this.time.addEvent({
            delay: 60000,
            args: [],
            startAt: 0,
            timeScale: 1,
            paused: false,
            loop: true
        })

        // add escape button to go back to menu
        this.escape.setInteractive()
        this.escape.on('pointerdown', () => {
            this.scene.start('menuScene')
        })

        // change cursor and damage
        this.input.manager.canvas.style.cursor = 'url(assets/img/Fist1.png), pointer'
        this.damage = 100

        // add debug
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)
    }

    update() {
        // switch between selections
        if(this.SCORE >= 1200) {
            if(f1) {
                this.f1Selection.anims.play('used-fist', true)
                this.damage = 100
                this.escape.on('pointerover', () => {
                    this.input.manager.canvas.style.cursor = 'pointer'
                })
                this.escape.on('pointerout', () => {
                    this.input.manager.canvas.style.cursor = 'url(assets/img/Fist1.png), pointer'
                })
            } else if(!f1) {
                this.f1Selection.anims.play('unused-fist', true)
            }
    
            if(f2) {
                this.f2Selection.anims.play('used-empty', true)
                // this.input.manager.canvas.style.cursor = 'url(assets/img/Pow.png), pointer'
                this.damage = 300
                this.escape.on('pointerover', () => {
                    this.input.manager.canvas.style.cursor = 'pointer'
                })
                this.escape.on('pointerout', () => {
                    this.input.manager.canvas.style.cursor = 'url(assets/img/Fist1.png), pointer'
                })
            } else if(!f2) {
                this.f2Selection.anims.play('unused-empty', true)
            }
        }

        if(this.SCORE < 1200) {                                                                 // add pointer for escape button
            this.escape.on('pointerover', () => {
                this.input.manager.canvas.style.cursor = 'pointer'
            })
            this.escape.on('pointerout', () => {
                this.input.manager.canvas.style.cursor = 'url(assets/img/Fist1.png), pointer'
            })
        }

        // play nerd idle animation
        if(this.nerd.body.touching.down && this.nerd.angle == 0) {
            this.nerd.anims.play('idle', true)
            punchable = true
        }

        // if nerd is punched: flip and set size && nerd is missed add to miss count
        if(this.nerd.body.touching.down && 
            this.justdown &&
            this.nerd.angle == 0 &&
            punchable &&
            pow.x < this.nerd.x + this.nerd.width &&
            pow.x + pow.width > this.nerd.x &&
            pow.y < this.nerd.y + this.nerd.height &&
            pow.y + pow.height > this.nerd.y) {
                this.nerd.angle = this.randomAngle()
                nerdAngle = this.nerd.angle
                this.nerd.body.setSize(70, 22)
                this.nerd.anims.play('hurt', true)
            } else if(this.justdown) {
                this.MISSES += 1
                this.justdown = false
            }
        
        // if missed too many times game over
        if(this.MISSES > 10) {
            this.scene.start('gameOverScene')
        }

        // nerd random knockback
        if(this.justdown && nerdAngle == 90 && punchable) {                  // knockback to the right
            this.nerd.body.setVelocityX(100)
            this.nerd.body.setVelocityY(-300)
            this.justdown = false
            punchable = false
            this.SCORE += this.damage
        } else {
            this.nerd.body.setDragX(this.DRAG)
        }
        
        if(this.justdown && nerdAngle == -90 && punchable) {                // knockback to the left
            this.nerd.body.setVelocityX(-100)
            this.nerd.body.setVelocityY(-300)
            this.justdown = false
            punchable = false
            this.SCORE += this.damage
        } else {
            this.nerd.body.setDragX(this.DRAG)
        }

        // nerd can't be punched on the ground
        if(this.nerd.angle != 0 && this.nerd.body.velocity.x != 0) {
            this.justdown = false
        }

        // reset the nerd to its previous state
        if(this.nerd.body.touching.down && this.nerd.angle != 0 && this.nerd.body.velocity.x == 0) {
            this.nerd.angle = 0
            this.nerd.anims.play('idle', true)
            this.nerd.body.setSize(22, 70)
            this.nerd.body.y -= 50
            this.tweens.add({
                targets: this.nerd,
                alpha: {
                    from: 1,
                    to: 0,
                    duration: 200,
                    ease: 'linear',
                    repeat: 2,
                    yoyo: 'true'
                }
            })
            nerdAngle = 0
            punchable = true
        }

        // after a certain amount of time nerd runs back and forth
        this.elapsed = this.timer.getElapsed()
        this.elapsed = Math.ceil(this.elapsed)
        if(this.SCORE < 1200 && this.elapsed > 8000) {
            if(this.elapsed % 30 == 0 && this.nerd.angle == 0 && this.nerd.body.touching.down) {
                this.nerd.body.setVelocityX(this.randMovement())
            }
        }
        if(this.SCORE >= 1200 && this.elapsed > 8000) {
            if(this.elapsed % 30 == 0 && this.nerd.angle == 0 && this.nerd.body.touching.down) {
                this.nerd.body.setVelocityX(this.randMovement() * 2)
            }
        }

        // keeping score
        let scoreConfig = {
            fontFamily: 'Impact',
            fontSize: '32px',
            backgroundColor: '#000000',
            color: '#F05F88',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 80
        }
        if(this.SCORE > highScore) {                                // i decided to scratch this and use the current score instead
            highScore = this.SCORE
        }
        this.scoreText = this.add.text(game.config.width / 2 - 38,  4, this.SCORE, scoreConfig).setOrigin(0, 0)

        // miss count
        let miss1Config = {
            fontFamily: 'Impact',
            fontSize: '32px',
            backgroundColor: '#000000',
            color: '#F05F88',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }
        let miss2Config = {
            fontFamily: 'Impact',
            fontSize: '32px',
            backgroundColor: '#000000',
            color: '#F05F88',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 32
        }
        this.miss1Text = this.add.text(game.config.width - 150, game.config.height - 50, 'Missed:', miss1Config)
        this.miss1Text = this.add.text(game.config.width - 40, game.config.height - 50, this.MISSES, miss2Config)

        // timed instructions
        let instruct1Config = {
            fontFamily: 'Impact',
            fontSize: '16px',
            backgroundColor: '#000000',
            color: '#F05F88',
            align: 'center',
            padding: {
                top: 0,
                bottom: 0
            },
            fixedWidth: 80
        }
        let instruct2Config = {
            fontFamily: 'Impact',
            fontSize: '16px',
            backgroundColor: '#000000',
            color: '#F05F88',
            align: 'center',
            padding: {
                top: 0,
                bottom: 0
            },
            fixedWidth: 176
        }
        let instruct3Config = {
            fontFamily: 'Impact',
            fontSize: '16px',
            backgroundColor: '#000000',
            color: '#F05F88',
            align: 'center',
            padding: {
                top: 0,
                bottom: 0
            },
            fixedWidth: 155
        }
        this.elapsedS = this.timer.getElapsedSeconds()
        this.elapsedS = Math.ceil(this.elapsedS)
        if(this.elapsedS == 2) {
            this.tweens.add({
                targets: this.highText,
                alpha: {
                    from: 1,
                    to: 0,
                    duration: 500,
                    ease: 'linear',
                    repeat: 0
                }
            })
        }
        this.add.text(0, game.config.height - 59, 'Click to Hit', instruct1Config)
        this.add.text(0, game.config.height - 40, 'Space to Switch Weapons', instruct2Config)
        this.add.text(0, game.config.height - 20, 'Don\'t miss over 10 Hits', instruct3Config)

        // nerd wraps around
        this.physics.world.wrap(this.nerd, this.nerd.width / 2)

        // win the game at a certain score
        if(this.SCORE == 10000) {
            this.scene.start('gameOverScene')
        }
    }

    randomAngle() {
        switch(Math.floor(Math.random() * 2)) {
            case 0:
                return 90
            case 1:
                return -90
            default:
                console.log('Error: Invalid Angle')
        }
    }

    randomEffect() {
        switch(Math.floor(Math.random() * 2)) {
            case 0:
                return 'pow'
            case 1:
                return 'whap'
            default:
                console.log('Error: Invalid Effect')
        }
    }

    randMovement() {
        switch(Math.floor(Math.random() * 2)) {
            case 0:
                return Phaser.Math.Between(-50, -100)
            case 1:
                return Phaser.Math.Between(50, 100)
            default:
                console.log('Error: Invalid Movement')
        }
    }
}