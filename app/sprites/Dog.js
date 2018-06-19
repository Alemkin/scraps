import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, platforms, physics, cursors, time }) {
    super(game, x, y, asset)
    this.platforms = platforms
    this.physics = physics
    this.cursors = cursors
    this.time = time
    this.facing = 'left'
    this.jumpTimer = 0
    this.scale.setTo(.5, .5)
  }
  wrapPlatform (platform) {
    if (platform.body.velocity.x < 0 && platform.x <= -160) {
        platform.x = 640
    } else if (platform.body.velocity.x > 0 && platform.x >= 640) {
        platform.x = -160
    }
  }
  setFriction (player, platform) {
    if (platform.key === 'ice-platform') {
        player.body.x -= platform.body.x - platform.body.prev.x
    }
  }
  update () {
    this.platforms.forEach(this.wrapPlatform, this)

    this.physics.arcade.collide(this, this.platforms, this.setFriction, null, this)

    //  Do this AFTER the collide check, or we won't have blocked/touching set
    var standing = this.body.blocked.down || this.body.touching.down

    this.body.velocity.x = 0

    if (this.cursors.left.isDown) {
      this.body.velocity.x = -200
    } else if (this.cursors.right.isDown) {
      this.body.velocity.x = 200
    } else {
      if (this.facing !== 'idle') {
        if (this.facing === 'left') {
          this.frame = 0
        } else {
          this.frame = 5
        }
        this.facing = 'idle'
      }
    }
    if (standing && this.cursors.up.isDown && this.time.time > this.jumpTimer) {
      this.body.velocity.y = -500
      this.jumpTimer = this.time.time + 750
    }
  }
}
