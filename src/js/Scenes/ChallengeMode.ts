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
    
    protected onPlayerCollide(): void
    {
        this.score++;
    }
}