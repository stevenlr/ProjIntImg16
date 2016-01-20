game
.module('game.entities.player')
.require('game.weapon')
.body(function() {

	game.createClass('Player', {
		position: {x: 0, y: 0},
		speed: {x: 0, y: 0},
		acc: {x: 0, y: 0},
		size: {x: 0, y: 0},
		sprite: null,
		isDead: false,
		life: 3,
		maxLife: 5,
		bombs: 2,
		body: null,
		keyboard: {l: false, r: false, u: false, d: false},
		ACCELERATION: 20,
		DIAG_ACCELERATION: Math.sqrt(2)/2,
		MAX_SPEED: 10,
		SQUARED_MAX_SPEED: 50 * 50,
		FRICTION: 0.95,
		weapon: null,
		isShooting: false,

		init: function(x, y) {
			this.sprite = new game.Sprite('graphics/Spaceship.png');
			this.size.x = this.sprite.width;
			this.size.y = this.sprite.height;
			this.position.x = x - this.size.x / 2;
			this.position.y = y - this.size.y / 2;
			this.sprite.position.set(this.position.x, this.position.y);
			this.sprite.anchor.set(0.5, 0.5);
			this.weapon = new game.Weapon(this);

			game.scene.stage.addChild(this.sprite);
		},

		update: function() {
			//Pre-update
			this.weapon.update();
			if (this.isShooting) {
				this.weapon.shoot();
			}


			//Move
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
				return;
			}

			this.position.x = this.position.x + this.speed.x;
			this.position.y = this.position.y + this.speed.y;

			if (this.position.x < 0)
				this.position.x = 0;
			if (this.position.x + this.size.x >= game.system.width)
				this.position.x = game.system.width - this.size.x - 1;
			if (this.position.y < 0)
				this.position.y = 0;
			if (this.position.y + this.size.y >= game.system.height)
				this.position.y = game.system.height - this.size.y - 1;

			this.speed.x = this.speed.x * this.FRICTION;
			this.speed.y = this.speed.y * this.FRICTION;

			this.sprite.position.set(this.position.x, this.position.y);

			this.body.position.x = this.position.x;
			this.body.position.y = this.position.y;
		},

		keyup: function(e) {
			this.keyboard.l = !(e == 'LEFT') && this.keyboard.l;
			this.keyboard.r = !(e == 'RIGHT') && this.keyboard.r;
			this.keyboard.u = !(e == 'UP') && this.keyboard.u;
			this.keyboard.d = !(e == 'DOWN') && this.keyboard.d;
			this.isShooting = !(e == 'SPACE') && this.isShooting;
		},

		keydown: function(e) {
			this.keyboard.l = e == 'LEFT' || this.keyboard.l;
			this.keyboard.r = e == 'RIGHT' || this.keyboard.r;
			this.keyboard.u = e == 'UP' || this.keyboard.u;
			this.keyboard.d = e == 'DOWN' || this.keyboard.d;
			this.isShooting = e == 'SPACE' || this.isShooting;

			if (e == 'W') {
				if (this.bombs > 0) {
					this.bombs--;
					game.scene.level.doBombExplosion();
				}
			}
		},

		collide: function(body) {
			if (body.collisionGroup == BODY_TYPE.PICKUP) {
				if (body.entity.type == PICKUP_TYPE.BOMB) {
					this.bombs++;
					body.entity.remove();
				}
			}
		}
	});
});