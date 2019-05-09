import { GameObjects, Physics, Scene } from 'phaser'

export class GameScene extends Phaser.Scene {

    constructor() {
        super({
            key: "GameScene"
        });
    }

    cursor: Phaser.Input.Keyboard.CursorKeys
    player: Phaser.GameObjects.Rectangle
    pauseButton: Phaser.Input.Keyboard.Key

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
                    //Maybe add something like a play again button and a main menu button?
                }
            }
        })
        this.cursor = this.input.keyboard.createCursorKeys();
        this.spawnPlayer();
        this.pauseButton = this.input.keyboard.addKey('p');
    }

    // Updates every game tick, contains dynamic 
    update (): void
    {
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

        if (Phaser.Input.Keyboard.JustDown(this.pauseButton)) {
            this.scene.launch('PauseScene');
            this.scene.pause('GameScene');
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
    }
}

//Scene for resuming a paused game.
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
        console.log('This is the other scene.')
        if (Phaser.Input.Keyboard.JustDown(this.pauseButton)) {
            this.scene.resume('GameScene');
            this.scene.stop();
        }
    }
}