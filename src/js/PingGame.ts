import { Controller } from './Controller'

/**  */
export class PingGame extends Phaser.Game {
    constructor(GameConfig?: GameConfig, Controller?: Controller) {
        super(GameConfig)

        if (Controller !== undefined) {
            this.hasExternalController = true
            this.externalController = Controller
        }
        else
            this.hasExternalController = false
    }

    hasExternalController: boolean;
    externalController: Controller;
}