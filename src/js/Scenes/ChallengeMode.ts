import { GameScene } from "./GameScene";

export class ChallengeMode extends GameScene {

    constructor() {
        super({
            key: "ChallengeMode"
        })
    }

    playerSpeed: number = 1000;

    ballSpawnTime = 10;
    protected onPlayerCollide(): void
    {
        this.score++;
    }
}