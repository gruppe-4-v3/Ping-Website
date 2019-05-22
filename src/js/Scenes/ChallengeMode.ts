import { GameScene } from "./GameScene";

export class ChallengeMode extends GameScene {

    constructor() {
        super({
            key: "ChallengeMode"
        })
    }

    /** Gamemode */
    gameMode : string = "Challenge";

    /** The speed of the player */
    playerSpeed: number = 800;

    /** How often a new ball spawns in seconds */ 
    ballSpawnTime = 10;
    /** Time since last ball spawned */ 
    lastBallTime = this.ballSpawnTime;
    
    protected onPlayerCollide(ball: Phaser.GameObjects.Arc): void
    {
        let ballSize = ball.width;
        ball.destroy();
        /** Feel free to change this algorithm. Currently gives around 3 points for the smallest ball */
        this.score = this.score + Math.floor(((this.ballSizeMax / ballSize) / 2) + 1);
    }
}