game
.module('game.entities.bubble')
.body(function() {
	game.addAsset('graphics/Bullet02.png');

	game.createClass('Bubble', {
		position: {x: 0, y: 0},
		dir: {x: 0, y: 0},
		speed: 0,
		body: null,
		sprite: null,
		size: {x: 0, y: 0},
		keyboard: {l: false, r: false, u: false, d: false},
		ACCELERATION: 20,
		DIAG_ACCELERATION: Math.sqrt(2)/2,
		MAX_SPEED: 10,
		SQUARED_MAX_SPEED: 50 * 50,
			
		init: function(pos, dir, speed) {
			this.sprite = new game.Sprite('graphics/Bullet02.png');
			this.sprite.position.set(pos.x, pos.y);
			this.position = pos;
			this.speed = speed;
			this.dir = dir;
			this.size.x = this.sprite.width;
			this.size.y = this.sprite.height;
			this.sprite.anchor.set(0.5, 0.5);

			game.scene.stage.addChild(this.sprite);
		},

		update: function() {
			this.position.x = this.position.x + this.dir.x * this.speed * game.system.delta;
			this.position.y = this.position.y + this.dir.y * this.speed * game.system.delta;

			this.sprite.position.set(this.position.x, this.position.y);
			this.body.position.set(this.position.x, this.position.y);

			if (this.position.y > game.system.height) {
				this.sprite.remove();
				game.scene.level.removeEntity(this);
			}
		}
	});
});