game
.module('game.entities.player')
.body(function() {
    game.addAsset('graphics/Spaceship.png');

	game.createClass('Player', {
	        position: {x: 0, y: 0},
	        speed: {x: 0, y: 0},
	        acc: {x: 0, y: 0},
	        size: {x: 0, y: 0},
	        sprite: null,
	        keyboard: {l: false, r: false, u: false, d: false},
	        ACCELERATION: 20,
	        DIAG_ACCELERATION: Math.sqrt(2)/2,
	        MAX_SPEED: 10,
	        SQUARED_MAX_SPEED: 50 * 50,
	        FRICTION: 0.95,

	init: function(x, y) {
            this.sprite = new game.Sprite('graphics/Spaceship.png');
            this.sprite.anchor.set(0.5, 0.5);
            this.sprite.position.set(x, y);
            this.position.x = x;
            this.position.y = y;
        },

    update: function() {
            this.acc = {x: 0, y: 0};

            if (this.keyboard.l)
                this.acc.x = this.acc.x - this.ACCELERATION;
            if (this.keyboard.r)
                this.acc.x = this.acc.x + this.ACCELERATION;
            if (this.keyboard.u)
                this.acc.y = this.acc.y - this.ACCELERATION;
            if (this.keyboard.d)
                this.acc.y = this.acc.y + this.ACCELERATION;

            if (this.acc.y != 0 && this.acc.x != 0) {
            	this.acc.y *= this.DIAG_ACCELERATION;
            	this.acc.x *= this.DIAG_ACCELERATION;
            }

            this.speed.x = this.speed.x + (this.acc.x * game.system.delta);
            this.speed.y = this.speed.y + (this.acc.y * game.system.delta);

            if (this.speed.x != 0 || this.speed.y != 0) {
                var squaredSpeed = this.speed.x * this.speed.x + this.speed.y * this.speed.y;

                if (squaredSpeed > this.SQUARED_MAX_SPEED) {
                    var root = Math.sqrt(this.SQUARED_MAX_SPEED / squaredSpeed);

                    this.speed.x = this.speed.x * root;
                    this.speed.y = this.speed.y * root;
                }
            } else {
                return
            }

            this.position.x = this.position.x + this.speed.x;
            this.position.y = this.position.y + this.speed.y;

            this.speed.x = this.speed.x * this.FRICTION;
            this.speed.y = this.speed.y * this.FRICTION;

            this.sprite.position.set(this.position.x, this.position.y);
        },

        keyup: function(e) {
            this.keyboard.l = !(e == 'LEFT') && this.keyboard.l;
            this.keyboard.r = !(e == 'RIGHT') && this.keyboard.r;
            this.keyboard.u = !(e == 'UP') && this.keyboard.u;
            this.keyboard.d = !(e == 'DOWN') && this.keyboard.d;

            //console.log(this.keyboard.l, 'UP');
        },

        keydown: function(e) {
            this.keyboard.l = e == 'LEFT' || this.keyboard.l;
            this.keyboard.r = e == 'RIGHT' || this.keyboard.r;
            this.keyboard.u = e == 'UP' || this.keyboard.u;
            this.keyboard.d = e == 'DOWN' || this.keyboard.d;

            //console.log(this.keyboard.l, 'DOWN');
        }
    });
});