//Before preload
pauseButton: Phaser.Input.Keyboard.Key

//Inside create
this.pauseButton = this.input.keyboard.addKey('p');

//Inside update (GameScene)
if (Phaser.Input.Keyboard.JustDown(this.pauseButton)) {
    this.scene.launch('PauseScene');
    this.scene.pause();
}

//After GameScene
export class PauseScene extends Phaser.Scene {
    
    constructor() {
        super({
            key: "PauseScene"
        });
    }

    pauseButton: Phaser.Input.Keyboard.Key

    preload(): void
    {

    }

    create(): void
    {
        this.pauseButton = this.input.keyboard.addKey('p');
    }

    update(): void
    {
        if (Phaser.Input.Keyboard.JustDown(this.pauseButton)) {
            this.scene.resume('GameScene');
            this.scene.stop();
        }
    }
}