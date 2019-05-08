import { GameObjects } from 'phaser'

export class GameScene extends Phaser.Scene {

    constructor() {
        super({
            key: "GameScene"
        });
    }

    cursor: Phaser.Input.Keyboard.CursorKeys
    player: Phaser.GameObjects.Rectangle

    // Loads all assets from files into memory
    preload (): void
    {
    }

    // Initializes all game objects and adds them to the game
    create (): void
    {
        this.spawnBall()
        this.cursor = this.input.keyboard.createCursorKeys();
        this.spawnPlayer();


    }

    // Updates every game tick, cointains dynamic 
    update (): void
    {

        let object: GameObjects.GameObject = this.physics.add.existing(this.player)
        if(this.player.body instanceof Phaser.Physics.Arcade.Body){
        if(this.cursor.left.isDown)// move left if the left key is pressed
        {
            this.player.body.velocity.x = -100;
        }
        else if(this.cursor.right.isDown)// move right if the right key is pressed
        {
            this.player.body.velocity.x = 100;
        }
        else//stop if no key is pressed.
        {
            this.player.body.velocity.x = 0;
        }
        this.player.body.collideWorldBounds = true;
    }
    }

    private spawnBall(): void {
        let spawnPoint = { x: Phaser.Math.Between(25, 775), y: 50 }
        let size: number = 15
        let colour: number = 0xff0000
        let ball: Phaser.GameObjects.Arc = this.add.circle(spawnPoint.x, spawnPoint.y, size, colour)
        
        let object: GameObjects.GameObject = this.physics.add.existing(ball)
        if(ball.body instanceof Phaser.Physics.Arcade.Body){
            ball.body.velocity.x = 100
            ball.body.velocity.y = 100
            ball.body.bounce.x = 1
            ball.body.bounce.y = 1
            ball.body.collideWorldBounds = true
        }
    }

    private spawnPlayer(): void
    {
        this.player = this.add.rectangle(400, 580, 100, 10, 0xff000)


    }
}