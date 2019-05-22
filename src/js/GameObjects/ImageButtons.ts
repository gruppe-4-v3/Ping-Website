export class ImageButtons extends Phaser.GameObjects.Image {
    upFrame: any;
    downFrame: any;
    overFrame: any;
    myCallback: any;
    myScope: any;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, _upFrame: any, _downFrame: any, _overFrame: any, _callback: any) {
        super(scene, x, y, texture, _upFrame);

        this.upFrame = _upFrame;

        this.setInteractive({ useCursorHand: true })
            .on('pointerover', () => this.enterButtonHoverState())
            .on('pointerout', () => this.enterButtonRestState())
            .on('pointerdown', () => this.enterButtonActiveState())
            .on('pointerup', () => this.enterButtonHoverState());

        scene.add.existing(this);
    }

    enterButtonActiveState() {
        this.setFrame(this.downFrame);
        this.myCallback.call(this.myScope, 'down');
    }

    enterButtonRestState() {
        this.setFrame(this.overFrame);
    }

    enterButtonHoverState() {
        this.setFrame(this.overFrame);
    }
}