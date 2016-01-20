game
.module('game.entities.bullet')
.body(function() {
	game.addAsset('graphics/Bullet01.png');

	game.createClass('Bullet',{
		position: {x: 0, y: 0},
		direction: {x: 0, y: 0},
		size: {x: 0, y: 0},
		speed: 0,
		sprite: null,
		body: null,
		friendly: false,

		init: function(x,y, angle, speed, friendly){
			this.friendly = friendly;
			this.sprite = new game.Sprite('graphics/Bullet01.png');
			this.size.x = Math.max(this.sprite.width, this.sprite.height);
			this.size.y = Math.max(this.sprite.width, this.sprite.height);

			this.direction.x = Math.cos(angle);
			this.direction.y = Math.sin(angle);
			this.speed = speed;

			this.position.x = x;
			this.position.y = y;
			this.sprite.anchor.set(0.5, 0.5);
			this.sprite.rotation = Math.PI/2;

			this.sprite.position.set(this.position.x, this.position.y);
			game.scene.stage.addChild(this.sprite);
		},


		
		update: function(x,y) {
			this.sprite.position.set(this.position.x, this.position.y);
			this.position.x += this.direction.x * this.speed;
			this.position.y += this.direction.y * this.speed;
		  	this.body.position.set(this.position.x, this.position.y);

		  	if (this.position.y < -20 || this.position.x < -20 || this.position.x >= game.system.width + 20) {
				this.remove();
			}
		},

		remove: function() {
			this.sprite.remove();
			game.scene.level.removeEntity(this);
		}
	});
});