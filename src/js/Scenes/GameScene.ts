import { GameObjects, Physics, Scene, Time, Game } from 'phaser'
import { RESTCalls } from "./../RESTCalls"
import { Login } from "./../Login"
import { PingGame } from '../PingGame';

export class GameScene extends Phaser.Scene {
    constructor(config: string | Phaser.Scenes.Settings.Config) {
        super(config);
    }

    cursor: Phaser.Input.Keyboard.CursorKeys
    player: Phaser.GameObjects.Rectangle
    pauseButton: Phaser.Input.Keyboard.Key
    time: Phaser.Time.Clock

    /** Properties for sounds */
    theme: Phaser.Sound.BaseSound;
    growSound: Phaser.Sound.BaseSound;
    shrinkSound: Phaser.Sound.BaseSound;
    speedSound: Phaser.Sound.BaseSound;
    slowSound: Phaser.Sound.BaseSound;
    straightSound: Phaser.Sound.BaseSound;
    hpLostSound: Phaser.Sound.BaseSound;

    /** Gamemode */
    gameMode: string = "Standard";

    /** Counter for the amount of lives left */
    livesRemaining: number;
    lifeText: Phaser.GameObjects.Text

    /** Score for current game  */
    score: number = 0
    scoreText: Phaser.GameObjects.Text

    /** Text for showing how to pause */
    infoPauseText: Phaser.GameObjects.Text;

    /** The speed of the player */
    playerSpeed: number = 500;
    /** The colors of the player */
    playerColor: number = 0xff8300;

    //<<<<<<<<<< BOMB PROPERTIES >>>>>>>>>>\\
    //Times
    BombSpawnTime: number = 31
    lastBombTime: number = this.BombSpawnTime
    //Color
    bombColor: number = 0x000000;

    bombSound: Phaser.Sound.BaseSound;

    //<<<<<<<<<< POWERUP PROPERTIES >>>>>>>>>>\\
    //Times
    powerUpSpawnTime: number = 19;
    lastPowerUpTime: number = this.powerUpSpawnTime
    //Powerups
    fastColor: number = 0xd6cf00;
    biggerColor: number = 0x00b500;
    straightColor: number = 0x5b5b5b;
    //Powerdowns
    slowColor: number = 0xa50000;
    smallColor: number = 0xff008c;

    //<<<<<<<<<< BALL PROPERTIES >>>>>>>>>>\\
    /**Ball color */
    ballColor: number = 0xffffff;
    /** How often a new ball spawns in seconds */
    ballSpawnTime: number = 2
    /** Time since last ball spawned */
    lastBallTime: number = this.ballSpawnTime
    /** How big the balls spawning are */
    ballSizeMin: number = 5;
    ballSizeMax: number = 35;
    /** How fast the ball will move horizontally to the left */
    minBallVelocityX: number = -100;
    /** How fast the ball will move horizontally to the right*/
    maxBallVelocityX: number = 100;
    /** How fast the ball will fall */
    ballVelocityY: number = 100;

    onlyVertical: boolean = false;

    /** Loads all assets from files into memory */
    preload(): void {
        this.load.audio('Coin', '../../assets/audio/coin.wav');
        this.load.audio('Bomb', '../../assets/audio/bomb.wav');
        this.load.audio('Grow', '../../assets/audio/grow.wav');
        this.load.audio('Shrink', '../../assets/audio/shrink.wav');
        this.load.audio('Speed', '../../assets/audio/speed.wav');
        this.load.audio('Slow', '../../assets/audio/slow.wav');
        this.load.audio('Straight', '../../assets/audio/Straight.wav');
        this.load.audio('HpLost', '../../assets/audio/hplost.wav');
    }

    /** Initializes all game objects and adds them to the game.
     * 
     * Contains all code that only needs to be run one time
     */
    create(): void {
        this.bombSound = this.sound.add('Bomb');
        this.growSound = this.sound.add('Grow');
        this.shrinkSound = this.sound.add('Shrink');
        this.speedSound = this.sound.add('Speed');
        this.slowSound = this.sound.add('Slow');
        this.straightSound = this.sound.add('Straight');
        this.hpLostSound = this.sound.add('HpLost');

        this.livesRemaining = 3;
        this.score = 0;

        //Adds a simple visual reference of lives remaining.
        this.lifeText = this.add.text(16, 16, '', { fontSize: '32px', fill: '#f2f2f2' });
        this.scoreText = this.add.text(300, 16, '', { fontSize: '32px', fill: '#f2f2f2' })

        //Adds a text explaining how to pause.	
        this.infoPauseText = this.add.text(16, 41,'PRESS P TO PAUSE', {fill:'#f2f2f2'})

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

        if (this.player.body instanceof Phaser.Physics.Arcade.Body) {
            if (this.cursor.left.isDown)// move left if the left key is pressed
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

        this.movePlayer()

        // Pause the GameScene if the pausebutton key is pressed and switch to PauseScene. 
        if (Phaser.Input.Keyboard.JustDown(this.pauseButton)) {
            this.scene.launch('PauseScene', { 'oldSceneKey': this.sys.settings.key, theme: this.theme });
            this.scene.pause();
        }

        this.lastBallTime = this.lastBallTime + deltaInSec
        // Spawn new ball if time since last ball spawn is greater time allowd
        if (this.lastBallTime > this.ballSpawnTime) {
            this.spawnBall()
            this.lastBallTime = 0
        }

        this.lastPowerUpTime = this.lastPowerUpTime + deltaInSec
        // Spawn new power if time since last power spawn is greater time allowd
        if (this.lastPowerUpTime > this.powerUpSpawnTime) {
            this.PowerUpAndDown(this.getRandomPower())
            this.lastPowerUpTime = 0
        }

        this.lastBombTime = this.lastBombTime + deltaInSec
        // Spawn new bomb if time since last bomb spawn is greater time allowd
        if (this.lastBombTime > this.BombSpawnTime) {
            this.spawnBomb()
            this.lastBombTime = 0
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

        // add ball to the GameScene rendere
        let ball: Phaser.GameObjects.Arc = this.add.circle(spawnPoint.x, spawnPoint.y, Phaser.Math.Between(this.ballSizeMin, this.ballSizeMax), this.ballColor);

        // Name is used in onWorldboundsCollision
        ball.name = 'Ball'

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

    private getRandomPower(): number {
        enum Color {
            fastColor, biggerColor, straightColor, slowColor, smallColor
        }
        let amount = Math.floor(Math.random() * Object.keys(Color).length / 2)
        console.log(amount)
        if (amount == 0) {
            return this.fastColor
        }
        else if (amount == 1) {
            return this.biggerColor
        }
        else if (amount == 2) {
            return this.straightColor
        }
        else if (amount == 3) {
            return this.slowColor
        }
        else if (amount == 4) {
            return this.smallColor
        }

    }

    protected onPlayerCollide(ball: Phaser.GameObjects.Arc, player: GameObjects.GameObject) {
        let ballSize = ball.width;
        let coinSound = this.sound.add('Coin');
        coinSound.play();
        ball.destroy();
        /** Feel free to change this algorithm. Currently gives around 3 points for the smallest ball */
        this.score = this.score + Math.floor(((this.ballSizeMax / ballSize) / 2) + 1);
    }

    /**
     * Method that create powerups and downs to the GameScene
     * @param color The color decide what the powerup/down do
     * see properties for what the colors do and if you want to change it
     */
    private spawnBomb(): GameObjects.Arc {
        let spawnPoint = { x: Phaser.Math.Between(25, 775), y: 50 }

        let bomb: Phaser.GameObjects.Arc = this.add.circle(spawnPoint.x, spawnPoint.y, 15, this.bombColor)

        this.physics.add.existing(bomb);
        let bombBody: Phaser.Physics.Arcade.Body = <Phaser.Physics.Arcade.Body>bomb.body
        bombBody.velocity.x = Phaser.Math.Between(this.minBallVelocityX, this.maxBallVelocityX);
        bombBody.velocity.y = this.ballVelocityY;
        bombBody.bounce.x = 1
        bombBody.bounce.y = 1
        bombBody.collideWorldBounds = true
        bombBody.onWorldBounds = true

        this.physics.add.collider(bomb, this.player, this.onPlayerCollideBomb, null, this)

        return bomb;
    }

    private onPlayerCollideBomb(bomb: Phaser.GameObjects.Arc) {
        this.bombSound.play();

        if (this.livesRemaining == 1) {
            this.endGame();
        }
        this.livesRemaining--;
        bomb.destroy();
    }
    private PowerUpAndDown(color: number): GameObjects.Rectangle {
        let spawnPoint = { x: Phaser.Math.Between(25, 775), y: 50 }
        let size: number = 15;

        let square: Phaser.GameObjects.Rectangle = this.add.rectangle(spawnPoint.x, spawnPoint.y, 20, 20, color);
        this.physics.add.existing(square);

        let squareBody: Phaser.Physics.Arcade.Body = <Phaser.Physics.Arcade.Body>square.body
        squareBody.velocity.x = Phaser.Math.Between(this.minBallVelocityX, this.maxBallVelocityX);
        squareBody.velocity.y = this.ballVelocityY;
        squareBody.bounce.x = 1
        squareBody.bounce.y = 1
        squareBody.collideWorldBounds = true

        // emits worldborder event when square touches the border 
        squareBody.onWorldBounds = true

        this.physics.add.collider(square, this.player, this.onPlayerCollidePowerUp, null, this)

        return square;
    }

    private onPlayerCollidePowerUp(square: GameObjects.Rectangle, player: GameObjects.GameObject) {
        // Removes powerup from game
        square.destroy()

        // Set player speed to double, if ball color is equal to fast powerup
        if (square.fillColor == this.fastColor) {
            this.speedSound.play();
            this.playerSpeed = this.playerSpeed * 1.3

            this.time.addEvent({
                delay: 10000, callback: function () { this.playerSpeed = this.playerSpeed / 1.3 },
                callbackScope: this
            })
        }
        // Make player bigger, if ball color is equal to enlarge powerup
        else if (square.fillColor == this.biggerColor) {
            this.growSound.play();
            this.player.setScale(2, 2)

            let scale: number;
            scale = 2;
            this.time.addEvent({
                delay: 5000, callback: function () {

                    this.time.addEvent({
                        delay: 100, callback: function () {
                            scale -= 0.01
                            this.player.setScale(scale, scale)
                        }, callbackScope: this, repeat: 100
                    })
                },
                callbackScope: this
            })
        }
        // Only spawn balls that fall straight down, if ball color is equal to straight down powerup
        else if (square.fillColor == this.straightColor) {
            this.straightSound.play();
            this.maxBallVelocityX = 0;
            this.minBallVelocityX = 0;

            this.time.addEvent({
                delay: 10000, callback: function () { this.maxBallVelocityX = 100, this.minBallVelocityX = -100 },
                callbackScope: this
            })

        }
        // Slow player to half speed if ball color is equal to slow player powerup
        else if (square.fillColor == this.slowColor) {
            this.slowSound.play();
            this.playerSpeed = this.playerSpeed / 3

            this.time.addEvent({
                delay: 10000, callback: function () { this.playerSpeed = this.playerSpeed * 3 },
                callbackScope: this
            })
        }
        // Make player little if ball color is equal to shrink player powerup
        else if (square.fillColor == this.smallColor) {
            this.shrinkSound.play();
            this.player.setScale(0.5, 0.5)

            let scale: number;
            scale = 0.5;
            this.time.addEvent({
                delay: 5000, callback: function () {

                    this.time.addEvent({
                        delay: 100, callback: function () {
                            scale += 0.005
                            this.player.setScale(scale, scale)
                        }, callbackScope: this, repeat: 100
                    })
                },
                callbackScope: this
            })
        }
    }

    /** Create and adds a player GameObject to the GameScene*/
    private spawnPlayer(): GameObjects.Rectangle {
        this.player = this.add.rectangle(400, 580, 100, 10, this.playerColor)
        let playerBody: Physics.Arcade.Body = <Phaser.Physics.Arcade.Body>this.physics.add.existing(this.player).body;
        playerBody.onCollide = true
        playerBody.immovable = true
        playerBody.collideWorldBounds = true;

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
        if (down) {
            body.gameObject.destroy()

            if (body.gameObject.name == 'Ball') {
                this.livesRemaining--;
                this.hpLostSound.play();
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
        this.theme = (<any>this.sys.settings.data).theme;
        this.theme.stop();

        if (Login.userID.length > 0) {
            RESTCalls.getUser(Login.userID, Login.userName);
        }

        /** If User is logged on calls postHighscore, if not do nothing. */
        Login.userID.length > 0 ? RESTCalls.postHighscore(Login.userID, this.score, this.gameMode) : console.log("Bruger ikke logget ind, gemmer ikke score.")

        /** Switches scene to Game Over */
        this.scene.start("GameOverScene", { 'oldSceneKey': this.sys.settings.key, 'finalScore': this.score });
    }

    private movePlayer() {
        let data: number = undefined
        if ((<PingGame>this.game).externalController.isConnected) {
            data = (<PingGame>this.game).externalController.speed
        }

        if (this.player.body instanceof Phaser.Physics.Arcade.Body) {

            if (data !== undefined && data !== 0) {
                this.player.body.velocity.x = data * 100;
            }
            else if (this.cursor.left.isDown)// move left if the left key is pressed
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
        }
    }
}