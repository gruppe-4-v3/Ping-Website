import { GameScene } from "./GameScene";

export class ChallengeMode extends GameScene {

    constructor() {
        super({
            key: "ChallengeMode"
        })
    }

    
    /** The speed of the player */
    playerSpeed: number = 1000;

    /** How often a new ball spawns in seconds */ 
    ballSpawnTime = 10;
    /** Time since last ball spawned */ 
    lastBallTime = this.ballSpawnTime;
    
    protected onPlayerCollide(): void
    {
        this.score++;
    }
}