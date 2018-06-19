/* globals __DEV__ */
import Phaser from 'phaser'
import Dog from '../sprites/Dog'
import { DOG } from '../constants/assets'

export default class extends Phaser.State {
  init() {
    this.game.renderer.renderSession.roundPixels = true

    this.physics.startSystem(Phaser.Physics.ARCADE)

    this.physics.arcade.gravity.y = 800
   }
  preload() { }

  create() {
    this.game.add.sprite(0, 0, 'background')

    this.platforms = this.add.physicsGroup()

    this.platforms.create(0, 64, 'ice-platform')
    this.platforms.create(200, 180, 'platform')
    this.platforms.create(400, 296, 'ice-platform')
    this.platforms.create(600, 412, 'platform')

    this.platforms.setAll('body.allowGravity', false)
    this.platforms.setAll('body.immovable', true)
    this.platforms.setAll('body.velocity.x', 100)
    this.cursors = this.input.keyboard.createCursorKeys()

    this.player = new Dog({  
      game: this.game,
      x: 320,
      y: 432,
      asset: DOG,
      platforms: this.platforms,
      cursors: this.cursors,
      physics: this.physics,
      time: this.time
    })
    this.game.add.existing(this.player)
    this.physics.arcade.enable(this.player)
    this.player.body.collideWorldBounds = true
    this.player.body.setSize(120, 95, 5, 16)
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
    }
  }
}
