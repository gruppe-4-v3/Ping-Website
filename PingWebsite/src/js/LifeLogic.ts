var livesRemaining = 3;

//Bullshit about collision logic hitting the ground (Maybe special entity?) removing lives
this.physics.add.collider(ground,ball,missedBall,null,this);
function missedBall (ground,ball)
{
    if (livesRemaining != 0) {
        livesRemaining--;
    }
    else
    {
        this.physics.pause();
        //Maybe add something like a play again button and a main menu button?
    }
}