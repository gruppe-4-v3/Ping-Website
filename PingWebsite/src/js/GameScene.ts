import { GameObjects, Physics } from 'phaser'

export class GameScene extends Phaser.Scene {

    constructor() {
        super({
            key: "GameScene"
        });
    }

    cursor: Phaser.Input.Keyboard.CursorKeys
    player: Phaser.GameObjects.Rectangle
    timeText: Phaser.GameObjects.Text

    // How often a new ball spawns in seconds
    ballSpawnTime: number = 1.5
    // Time since last ball spawned
    lastBallTime: number = 0

    // How fast the ball will move horizontally
    minBallVelocityX : number = 0;
    maxBallVelocityX : number = 200;

    // How fast the ball will fall
    ballVelocityY : number = 100;

    speedOfPlayer : number = 300;
    
    // Loads all assets from files into memory
    preload (): void
    {
    }

    // Initializes all game objects and adds them to the game
    create (): void
    {
        let livesRemaining = 3;
        let lifeText: GameObjects.Text;
        this.spawnBall()

        //Adds a simple visual reference of lives remaining.
        lifeText = this.add.text(16, 16, 'Lives: '+livesRemaining, { fontSize: '32px', fill: '#f2f2f2' });
        this.timeText = this.add.text(300, 16, '', { fontSize: '32px', fill: '#f2f2f2' })

        // Calls function if anything touches the worldbounds
        this.physics.world.on('worldbounds', function(body: Physics.Arcade.Body, up: boolean, down: boolean, left: boolean, right: boolean) {
            // remove gameobject if it collides with the bottom of the world and reduces amount of lives remaining
            if(down){
                body.gameObject.destroy()
                //Checks amounts of lives left
                if (livesRemaining != 1) {
                    livesRemaining--;
                    lifeText.setText('Lives: '+ livesRemaining);
                }
                //Stops the physics if there's no lives left
                else
                {
                    this.physics.pause();
                    //TODO: Maybe add something like a play again button and a main menu button?
                }
            }
        })
        
        this.cursor = this.input.keyboard.createCursorKeys();
        this.spawnPlayer();
    }

    // Updates every game tick

    // time = The current time in ms
    // delta = Time since last game tick
    update (time: number, delta: number): void
    {
        // Time since start of game in seconds
        let timeInSec = Math.floor(time) / 1000
        // Converts delta to seconds
        let deltaInSec = delta / 1000
        let speed = this.speedOfPlayer;
 
        this.lastBallTime = this.lastBallTime + deltaInSec
        // Spawn new ball if time since last ball spawn is greater time allowed
        if(this.lastBallTime > this.ballSpawnTime) {
            this.spawnBall()
            this.lastBallTime = 0
        }

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

        this.timeText.text = 'Time: ' + timeInSec.toString()
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
        ballBody.velocity.x = Phaser.Math.Between(this.minBallVelocityX, this.maxBallVelocityX);
        ballBody.velocity.y = this.ballVelocityY;
        ballBody.bounce.x = 1
        ballBody.bounce.y = 1
        ballBody.collideWorldBounds = true

        // emits worldborder event when ball touches the border 
        ballBody.onWorldBounds = true
    }

    private spawnPlayer(): void
    {
        this.player = this.add.rectangle(400, 580, 100, 10, 0xff000)
    }
}