var PICKUP_TYPE = {
	BOMB: 0
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

		collide: function(e) {
			game.scene.level.removeEntity(this);
			this.sprite.remove();
		}
	});
});