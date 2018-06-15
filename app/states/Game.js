/* globals __DEV__ */
import Phaser from 'phaser'
import Dog from '../sprites/Dog'
import { DOG } from '../constants/assets'

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
    const bannerText = 'Scraps'
    let banner = this.add.text(this.world.centerX, this.game.height - 60, bannerText, {
      font: '30px Bangers',
      fill: '#000',
      smoothed: false
    })

    banner.padding.set(10, 16)
    banner.anchor.setTo(0.5)

    this.dog = new Dog({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: DOG
    })

    this.game.add.existing(this.dog)
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.dog, 32, 32)
    }
  }
}
