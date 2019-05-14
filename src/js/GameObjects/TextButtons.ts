export class TextButtons extends Phaser.GameObjects.Text {
    constructor(scene:Phaser.Scene,x:number,y:number,text:string|string[],style:object){
        super(scene,x,y,text,style);

        this.setInteractive({useCursorHand: true})
        .on('pointerover', () => this.enterButtonHoverState())
        .on('pointerout', () => this.enterButtonRestState())
        .on('pointerdown', () => this.enterButtonActiveState())
        .on('pointerup', () => this.enterButtonHoverState());

    }

    enterButtonActiveState(){
        this.setStyle({ fill: '#e60000'});
    }

    enterButtonRestState() {
        this.setStyle({fill:'#f2f2f2'});
    }

    enterButtonHoverState() {
        this.setStyle({fill:'#ff0'});
    }
}