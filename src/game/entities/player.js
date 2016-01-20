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
		isDead: false,
		life: 3,
		body: null,
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
			this.size.x = this.sprite.width;
			this.size.y = this.sprite.height;
			game.scene.stage.addChild(this.sprite);
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
				return;
			}

			this.position.x = this.position.x + this.speed.x;
			this.position.y = this.position.y + this.speed.y;

			var w = this.size.x * 0.5;
			var h = this.size.y * 0.5;

			if (this.position.x < w)
				this.position.x = w;
			if (this.position.x >= game.system.width - w)
				this.position.x = game.system.width - w - 1;
			if (this.position.y < h)
				this.position.y = h;
			if (this.position.y >= game.system.height - h)
				this.position.y = game.system.height - h - 1;

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
		},

		keydown: function(e) {
			this.keyboard.l = e == 'LEFT' || this.keyboard.l;
			this.keyboard.r = e == 'RIGHT' || this.keyboard.r;
			this.keyboard.u = e == 'UP' || this.keyboard.u;
			this.keyboard.d = e == 'DOWN' || this.keyboard.d;
		}
	});
});