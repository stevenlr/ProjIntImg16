var PICKUP_TYPE = {
	BOMB: 0,
	LIFE: 1,
	UPGRADE: 2
};

game
.module('game.entities.pickup')
.body(function() {

	game.createClass('Pickup', {
		position: {x: 0, y: 0},
		size: {x: 0, y: 0},
		sprite: null,
		isDead: false,
		body: null,
		type: 0,

		init: function(x, y, type) {
			switch (type) {
				case PICKUP_TYPE.BOMB:
					this.sprite = new game.Sprite('graphics/Bullet03.png');
					break;
				case PICKUP_TYPE.LIFE:
					this.sprite = new game.Sprite('graphics/life.png');
					break;
				case PICKUP_TYPE.UPGRADE:
					this.sprite = new game.Sprite('graphics/upgrade.png');
					break;
			}

			this.type = type;
			this.size.x = this.sprite.width;
			this.size.y = this.sprite.height;
			this.position.x = x;
			this.position.y = y;
			this.sprite.anchor.set(0.5, 0.5);
			this.sprite.position.set(this.position.x, this.position.y);
			game.scene.stage.addChild(this.sprite);
		},

		update: function() {
			this.position.y += 100 * game.system.delta;
			this.sprite.position.set(this.position.x, this.position.y);
			this.body.position.x = this.position.x;
			this.body.position.y = this.position.y;

			if (this.position.y < -20 || this.position.x < -20 || this.position.x >= game.system.width + 20) {
				this.remove();
			}
		},

		remove: function() {
			game.scene.level.removeEntity(this);
			this.sprite.remove();
		}
	});
});