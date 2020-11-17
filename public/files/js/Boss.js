class Boss extends Opponent{
    /**
     * @param game {Game} La instancia del juego al que pertenece el oponente
     */
    constructor (game,width, height, x, y, speed, myImage, myImageDead) {
        super(game, width, height, x, y, speed, myImage, myImageDead);
        this.height = BOSS_HEIGHT* game.width / 100;
        this.width = BOSS_WIDTH * game.width / 100;
        this.myImage = BOSS_PICTURE;
        this.myImageDead = BOSS_PICTURE_DEAD;
        this.speed = BOSS_SPEED;
        this.image.src = this.myImage;
        this.direction = "R"; // Dirección hacia la que se mueve el oponenteD
    setTimeout(() => this.shoot(), 200 + getRandomNumber(800));
    }


        /**
     * Crea un nuevo disparo
     */
    shoot () {
        if (!this.dead && !this.game.ended) {
            if (!this.game.paused) {
                this.game.shoot(this);
            }
            setTimeout(() => this.shoot(), 550 + getRandomNumber(900));
        }
    }
    /**
     * Mata al oponente
     */
    collide() {
        
        if (!this.dead) {

            setTimeout(() => {
                this.game.removeOpponent();
            }, 2000);
            this.game.score +=10;
            this.image.src = this.myImageDead;
            this.dead = true;
            this.game.endGame();
            document.getElementById("scoreli").innerHTML ="Score: "+this.game.score;
      }

    }
}