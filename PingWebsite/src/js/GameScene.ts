import { GameObjects, Physics, Scene } from 'phaser'
import { PauseScene } from "../js/PauseScene"

export class GameScene extends Phaser.Scene {

    constructor() {
        super({
            key: "GameScene"
        });
    }

    cursor: Phaser.Input.Keyboard.CursorKeys
    player: Phaser.GameObjects.Rectangle
    timeText: Phaser.GameObjects.Text
    pauseButton: Phaser.Input.Keyboard.Key
    
    // Score for current game
    score: number = 0
    scoreText: Phaser.GameObjects.Text

    // How often a new ball spawns in seconds
    ballSpawnTime: number = 1.5
    // Time since last ball spawned
    lastBallTime: number = this.ballSpawnTime

    // How fast the ball will move horizontally
    minBallVelocityX : number = -200;
    maxBallVelocityX : number = 200;

    // How fast the ball will fall
    ballVelocityY : number = 100;

    // The players speed
    playerSpeed : number = 300;
    
    // Loads all assets from files into memory
    preload (): void
    {
    }

    // Initializes all game objects and adds them to the game
    create (): void
    {
        let livesRemaining = 3;
        let lifeText: GameObjects.Text;

        //Adds a simple visual reference of lives remaining.
        lifeText = this.add.text(16, 16, 'Lives: '+livesRemaining, { fontSize: '32px', fill: '#f2f2f2' });
        this.scoreText = this.add.text(300, 16, '', { fontSize: '32px', fill: '#f2f2f2' })

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
        this.pauseButton = this.input.keyboard.addKey('p');
    }

    // Updates every game tick

    // time = The current time in ms
    // delta = Time since last game tick
    update (time: number, delta: number): void
    {
        // Converts delta to seconds
        let deltaInSec = delta / 1000
 
        this.lastBallTime = this.lastBallTime + deltaInSec
        // Spawn new ball if time since last ball spawn is greater time allowed
        if(this.lastBallTime > this.ballSpawnTime) {
            this.spawnBall()
            this.lastBallTime = 0
        }

        if(this.player.body instanceof Phaser.Physics.Arcade.Body){
            if(this.cursor.left.isDown)// move left if the left key is pressed
            {
            this.player.body.velocity.x = -this.playerSpeed;
            }
            else if(this.cursor.right.isDown)// move right if the right key is pressed
            {
                this.player.body.velocity.x = this.playerSpeed;
            }
            else//stop if no key is pressed.
            {
                this.player.body.velocity.x = 0;
            }
            this.player.body.collideWorldBounds = true;
        }

        if(Phaser.Input.Keyboard.JustDown(this.pauseButton)){
            this.scene.launch('PauseScene');
            this.scene.pause('GameScene');
        }

        this.lastBallTime = this.lastBallTime + deltaInSec
        // Spawn new ball if time since last ball spawn is greater time allowd
        if(this.lastBallTime > this.ballSpawnTime) {
            this.spawnBall()
            this.lastBallTime = 0
        }

        this.scoreText.text = 'Score: ' + this.score.toString()
    }

    // Spawns a ball object in the gamescene
    private spawnBall(): void {
        let spawnPoint = { x: Phaser.Math.Between(25, 775), y: 50 }
        let size: number = 15;
        let color: number = 0xff0000;

        // add ball to the GameScene rendere
        let ball: Phaser.GameObjects.Arc = this.add.circle(spawnPoint.x, spawnPoint.y, size, color);

        // give ball an arcade physics body
        this.physics.add.existing(ball);

        let ballBody: Phaser.Physics.Arcade.Body = <Phaser.Physics.Arcade.Body>ball.body
        ballBody.velocity.x = Phaser.Math.Between(this.minBallVelocityX, this.maxBallVelocityX);
        ballBody.velocity.y = this.ballVelocityY;
        ballBody.bounce.x = 1
        ballBody.bounce.y = 1
        ballBody.collideWorldBounds = true

        // emits worldborder event when ball touches the border 
        ballBody.onWorldBounds = true

        // Add collision detection between ball and player
        this.physics.add.collider(ball, this.player, this.onPlayerCollide, null, this)
    }

    private onPlayerCollide(ball: GameObjects.GameObject, player: GameObjects.GameObject){
        ball.destroy()
        this.score++;
    }

    private spawnPlayer(): void
    {
        this.player = this.add.rectangle(400, 580, 100, 10, 0xff000)
        let playerBody: Physics.Arcade.Body = <Phaser.Physics.Arcade.Body>this.physics.add.existing(this.player).body;
        playerBody.onCollide = true
        playerBody.immovable = true
    }
}