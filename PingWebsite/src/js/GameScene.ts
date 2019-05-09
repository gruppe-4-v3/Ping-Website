export class GameScene extends Phaser.Scene {

    constructor() {
        super({
            key: "GameScene"
        });
    }

<<<<<<< HEAD
=======
    cursor: Phaser.Input.Keyboard.CursorKeys
    player: Phaser.GameObjects.Rectangle


>>>>>>> 7b016e005324945f4865e54558d387ef2bb61f14
    // Loads all assets from files into memory
    preload (): void
    {
    }

    // Initializes all game objects and adds them to the game
    create (): void
    {
    }

    // Updates every game tick, cointains dynamic 
    update (): void
    {
<<<<<<< HEAD
=======

        let speed = 200;

        let object: GameObjects.GameObject = this.physics.add.existing(this.player)
        if(this.player.body instanceof Phaser.Physics.Arcade.Body){
            if(this.cursor.left.isDown)// move left if the left key is pressed
            {
            this.player.body.velocity.x = -speed;
            }
            else if(this.cursor.right.isDown)// move right if the right key is pressed
            {
                this.player.body.velocity.x = speed;
            }
            else//stop if no key is pressed.
            {
                this.player.body.velocity.x = 0;
            }
            this.player.body.collideWorldBounds = true;
        }
    }

    // Spawns a ball object in the gamescene
    private spawnBall(): void {
        let spawnPoint = { x: Phaser.Math.Between(25, 775), y: 50 }
        let size: number = 15
        let color: number = 0xff0000

        // add ball to the GameScene rendere
        let ball: Phaser.GameObjects.Arc = this.add.circle(spawnPoint.x, spawnPoint.y, size, color)

        // give ball an arcade physics body
        this.physics.add.existing(ball)

        let ballBody: Phaser.Physics.Arcade.Body = <Phaser.Physics.Arcade.Body>ball.body
        ballBody.velocity.x = 100
        ballBody.velocity.y = 100
        ballBody.bounce.x = 1
        ballBody.bounce.y = 1
        ballBody.collideWorldBounds = true

        // emmits worldborder event when ball touches the border 
        ballBody.onWorldBounds = true
    }

    private spawnPlayer(): void
    {
        this.player = this.add.rectangle(400, 580, 100, 10, 0xff000)


>>>>>>> 7b016e005324945f4865e54558d387ef2bb61f14
    }
}