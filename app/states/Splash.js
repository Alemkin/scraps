import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import { DOG } from '../constants/assets'

export default class extends Phaser.State {
  init () {
  }

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    
    this.loadAssets()
  }

  loadAssets () {
    this.load.image('background', './assets/images/background.png')
    this.load.image('platform', './assets/images/platform.png')
    this.load.image('ice-platform', './assets/images/ice-platform.png')
    this.load.image(DOG, './assets/images/dog.gif')
  }

  create () {
    this.state.start('Game')
  }
}
