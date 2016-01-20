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

		init: function(x,y, angle, speed){

			this.sprite = new game.Sprite('graphics/Bullet01.png');
			this.size.x = this.sprite.width;
			this.size.y = this.sprite.height;

			this.direction.x = Math.cos(angle);
			this.direction.y = Math.sin(angle);
			this.speed = speed;

			this.position.x = x - this.size.x / 2;
			this.position.y = y - this.size.y / 2;
			this.sprite.rotation = Math.PI/2;

			this.sprite.position.set(this.position.x, this.position.y);
			game.scene.stage.addChild(this.sprite);
		},


		
		update: function(x,y) {
			this.sprite.position.set(this.position.x, this.position.y);
			this.position.x += this.direction.x * this.speed * game.system.delta;
			this.position.y += this.direction.y * this.speed * game.system.delta;
		  	this.body.position.set(this.position.x, this.position.y);
		}
	});
});