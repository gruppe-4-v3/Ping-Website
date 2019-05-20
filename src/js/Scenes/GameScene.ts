import { GameObjects, Physics, Scene, Time, Game } from 'phaser'
import { RESTCalls } from "./../RESTCalls"
import { Login } from "./../Login"

export class GameScene extends Phaser.Scene {

    constructor(config: string | Phaser.Scenes.Settings.Config) {
        super(config);
    }

    cursor: Phaser.Input.Keyboard.CursorKeys
    player: Phaser.GameObjects.Rectangle
    pauseButton: Phaser.Input.Keyboard.Key
    time: Phaser.Time.Clock
    
    /** Counter for the amount of lives left */
    livesRemaining: number;
    lifeText: Phaser.GameObjects.Text

    /** Score for current game  */
    score: number = 0
    scoreText: Phaser.GameObjects.Text

    
    /** The speed of the player */
    playerSpeed: number = 600;
    /** The colors of the player */
    playerColor : number = 0x0038ff;

    //<<<<<<<<<< POWERUP PROPERTIES >>>>>>>>>>\\
    //Times
    powerUpSpawnTime: number = 105;
    lastPowerUpTime: number = this.powerUpSpawnTime
    //Powerups
    fastColor: number = 0xffce00;
    biggerColor: number = 0x00ff1e;
    straightColor: number = 0xf272c7;
    //Powerdowns
    slowColor: number = 0xff0000;
    smallColor: number = 0x6f00ff;

    //<<<<<<<<<< BALL PROPERTIES >>>>>>>>>>\\
    /** How often a new ball spawns in seconds */ 
    ballSpawnTime: number = 2
    /** Time since last ball spawned */ 
    lastBallTime: number = this.ballSpawnTime
    /** How big the balls spawning are */ 
    ballSize: number = 15;
    /** How fast the ball will move horizontally to the left */ 
    minBallVelocityX: number = -100;
    /** How fast the ball will move horizontally to the right*/ 
    maxBallVelocityX: number = 100;
    /** How fast the ball will fall */ 
    ballVelocityY: number = 100;

    onlyVertical: boolean = false;
    
    

    


    /** Loads all assets from files into memory */
    preload(): void {
    }

    /** Initializes all game objects and adds them to the game.
     * 
     * Contains all code that only needs to be run one time
     */
    create(): void {

        this.livesRemaining = 3;
        this.score = 0;

        //Adds a simple visual reference of lives remaining.
        this.lifeText = this.add.text(16, 16, '', { fontSize: '32px', fill: '#f2f2f2' });
        this.scoreText = this.add.text(300, 16, '', { fontSize: '32px', fill: '#f2f2f2' })

        // Calls function if anything touches the worldbounds
        this.physics.world.on('worldbounds', (body: Physics.Arcade.Body, up: boolean, down: boolean, left: boolean, right: boolean) => this.onWorldboundsCollision(body, up, down, left, right))

        this.cursor = this.input.keyboard.createCursorKeys();
        this.spawnPlayer();
        this.pauseButton = this.input.keyboard.addKey('p');
    }

    /** Method that runs every game tick. Contains all code that can change dynamically
    @param time Time since scene got loaded in ms
    @param delta Time since last game tick
    */
    update(time: number, delta: number): void {
        // Converts delta to seconds
        let deltaInSec: number = delta / 1000

        if(this.player.body instanceof Phaser.Physics.Arcade.Body){
            if(this.cursor.left.isDown)// move left if the left key is pressed
            {
                this.player.body.velocity.x = -this.playerSpeed;
            }
            else if (this.cursor.right.isDown)// move right if the right key is pressed
            {
                this.player.body.velocity.x = this.playerSpeed;
            }
            else//stop if no key is pressed.
            {
                this.player.body.velocity.x = 0;
            }
            this.player.body.collideWorldBounds = true;
        }

        // Pause the GameScene if the pausebutton key is pressed and switch to PauseScene. 
        if (Phaser.Input.Keyboard.JustDown(this.pauseButton)) {
            this.scene.launch('PauseScene', {'oldSceneKey':this.sys.settings.key});
            this.scene.pause();
        }

        this.lastBallTime = this.lastBallTime + deltaInSec
        // Spawn new ball if time since last ball spawn is greater time allowd
        if (this.lastBallTime > this.ballSpawnTime) {
            this.spawnBall()
            this.lastBallTime = 0
        }

        this.lastPowerUpTime = this.lastPowerUpTime + deltaInSec
        // Spawn new ball if time since last ball spawn is greater time allowd
        if(this.lastPowerUpTime > this.powerUpSpawnTime) {
            this.PowerUpAndDown(this.fastColor)
            this.lastPowerUpTime = 0
        }
        this.lastPowerUpTime = this.lastPowerUpTime + deltaInSec
        // Spawn new ball if time since last ball spawn is greater time allowd
        if(this.lastPowerUpTime > this.powerUpSpawnTime) {
            this.PowerUpAndDown(this.biggerColor)
            this.lastPowerUpTime = 0
        }
        this.lastPowerUpTime = this.lastPowerUpTime + deltaInSec
        // Spawn new ball if time since last ball spawn is greater time allowd
        if(this.lastPowerUpTime > this.powerUpSpawnTime) {
            this.PowerUpAndDown(this.straightColor)
            this.lastPowerUpTime = 0
        }
        this.lastPowerUpTime = this.lastPowerUpTime + deltaInSec
        // Spawn new ball if time since last ball spawn is greater time allowd
        if(this.lastPowerUpTime > this.powerUpSpawnTime) {
            this.PowerUpAndDown(this.slowColor)
            this.lastPowerUpTime = 0
        }
        this.lastPowerUpTime = this.lastPowerUpTime + deltaInSec
        // Spawn new ball if time since last ball spawn is greater time allowd
        if(this.lastPowerUpTime > this.powerUpSpawnTime) {
            this.PowerUpAndDown(this.smallColor)
            this.lastPowerUpTime = 0
        }



        this.scoreText.text = 'Score: ' + this.score.toString()
        this.lifeText.text = 'Lives: ' + this.livesRemaining.toString();
    }

    /** 
     * Create and adds a ball GameObject to the GameScene.
     * @returns The new ball
    */
    private spawnBall(): GameObjects.Arc {
        let spawnPoint = { x: Phaser.Math.Between(25, 775), y: 50 }
        let color: number = 0x0038ff;

        // add ball to the GameScene rendere
        let ball: Phaser.GameObjects.Arc = this.add.circle(spawnPoint.x, spawnPoint.y, this.ballSize, color);

        // give ball an arcade physics body
        this.physics.add.existing(ball);

        let ballBody: Phaser.Physics.Arcade.Body = <Phaser.Physics.Arcade.Body>ball.body

        // Gives ball a 1 in 10 chance to fall vertical down
        if (Phaser.Math.Between(1, 10) == 5) {
            ballBody.velocity.x = 0;
        }
        else {
            ballBody.velocity.x = Phaser.Math.Between(this.minBallVelocityX, this.maxBallVelocityX);
        }

        // Sets the vertical speed of the ball (How fast the ball falls down)
        ballBody.velocity.y = this.ballVelocityY;

        // Sets the balls walls and floor bounce to not lose momentum when bouncing
        ballBody.bounce.x = 1
        ballBody.bounce.y = 1

        // Enable the ball to colide with the bounds of the map
        ballBody.collideWorldBounds = true

        // emits worldborder event when ball touches the border 
        ballBody.onWorldBounds = true

        // Add collision detection between ball and player
        this.physics.add.collider(ball, this.player, this.onPlayerCollide, null, this)

        return ball;
    }

    protected onPlayerCollide(ball: GameObjects.GameObject, player: GameObjects.GameObject) {
        ball.destroy()
        this.score++;
        
    }


    private PowerUpAndDown(color: number): GameObjects.Rectangle
    {
        let spawnPoint = { x: Phaser.Math.Between(25, 775), y: 50 }
        let size: number = 15;
        //farven 0xffce00;

        let ball: Phaser.GameObjects.Rectangle = this.add.rectangle(spawnPoint.x, spawnPoint.y, 20, 20, color);
        this.physics.add.existing(ball);

        let ballBody: Phaser.Physics.Arcade.Body = <Phaser.Physics.Arcade.Body>ball.body
        ballBody.velocity.x = Phaser.Math.Between(this.minBallVelocityX, this.maxBallVelocityX);
        ballBody.velocity.y = this.ballVelocityY;
        ballBody.bounce.x = 1
        ballBody.bounce.y = 1
        ballBody.collideWorldBounds = true

                // emits worldborder event when ball touches the border 
                ballBody.onWorldBounds = true

                this.physics.add.collider(ball, this.player, this.onPlayerCollidePowerUp, null, this)


                return ball;

    }

    private onPlayerCollidePowerUp(ball: GameObjects.Rectangle, player: GameObjects.GameObject){
        // Removes powerup from game
        ball.destroy()
        
        // Set player speed to double, if ball color is equal to fast powerup
        if(ball.fillColor == this.fastColor)
        {
            this.playerSpeed = this.playerSpeed * 2

            this.time.addEvent({delay: 10000, callback: function(){this.playerSpeed = this.playerSpeed/2},
            callbackScope: this})
        }
        // Make player bigger, if ball color is equal to enlarge powerup
        else if(ball.fillColor == this.biggerColor)
        {
            this.player.setScale(2,2)

            let scale: number;
            scale = 2;
            this.time.addEvent({delay: 5000, callback: function(){   
              
                this.time.addEvent({delay: 100, callback: function(){
                    scale -= 0.01
                    this.player.setScale(scale, scale)
                }, callbackScope: this, repeat: 100})                       
            },
            callbackScope: this})
        }
        // Only spawn balls that fall straight down, if ball color is equal to straight down powerup
        else if(ball.fillColor == this.straightColor)
        {
        
        this.maxBallVelocityX = 0;
        this.minBallVelocityX = 0;

          this.time.addEvent({delay: 10000, callback: function(){this.maxBallVelocityX = 100, this.minBallVelocityX = -100},
          callbackScope: this})
          
        }
        // Slow player to half speed if ball color is equal to slow player powerup
        else if(ball.fillColor == this.slowColor)
        {
            this.playerSpeed = this.playerSpeed / 2

            this.time.addEvent({delay: 10000, callback: function(){this.playerSpeed = this.playerSpeed * 2},
            callbackScope: this})
        }
        // Make player little if ball color is equal to shrink player powerup
        else if(ball.fillColor == this.smallColor)
        {
            this.player.setScale(0.5,0.5)

            let scale: number;
            scale = 0.5;
            this.time.addEvent({delay: 5000, callback: function(){   
              
                this.time.addEvent({delay: 100, callback: function(){
                    scale += 0.005
                    this.player.setScale(scale, scale)
                }, callbackScope: this, repeat: 100})                       
            },
            callbackScope: this})
        }

    }

    /** Create and adds a player GameObject to the GameScene*/
    private spawnPlayer(): GameObjects.Rectangle
    {
        this.player = this.add.rectangle(400, 580, 100, 10, this.playerColor)
        let playerBody: Physics.Arcade.Body = <Phaser.Physics.Arcade.Body>this.physics.add.existing(this.player).body;
        playerBody.onCollide = true
        playerBody.immovable = true

        return this.player
    }

    /** Is called when something collides with the world bounds 
     * @param body The body of the colliding GameObject
     * @param up True if GameObject collide with the top
     * @param down True if GameObject collide with the bottom
     * @param left True if GameObject collide with the left side
     * @param right True if GameObject collide with the right side
    */
    private onWorldboundsCollision(body: Physics.Arcade.Body, up: boolean, down: boolean, left: boolean, right: boolean) {
        // remove gameobject if it collides with the bottom of the world and reduces amount of lives remaining
        if(down){
            body.gameObject.destroy()

            if(body.gameObject instanceof Phaser.GameObjects.Arc) {
                this.livesRemaining--;
            }
            
            //Call endGame method if player has 0 lives
            if (this.livesRemaining < 1) {
                this.endGame()
            }
        }
    }

    /** May contain spoilers */
    private endGame() {
        this.scene.pause();
        Login.signinfunc;
        console.log(Login.userID);
        if (Login.userID.length > 0){
            RESTCalls.getUser(Login.userID, Login.userName);
        }
        Login.userID.length > 0 ? RESTCalls.postHighscore(Login.userID, this.score) : console.log("Bruger ikke logget ind, gemmer ikke score.")
        this.scene.start("GameOverScene", {'oldSceneKey':this.sys.settings.key, 'finalScore': this.score});
    }
}