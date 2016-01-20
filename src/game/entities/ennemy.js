game.module('game.entities.ennemy')
.body(function() {

	game.createClass('Ennemy', {
		speed: 400,
		body: null,
		position: {x: 0, y: 0},
		size: {x: 0, y: 0},
		sprite: null,

		init: function() {
			this.sprite = new game.Sprite('graphics/Spaceship01.png');
			this.sprite.anchor.set(0.5, 0.5);

			this.centerx = Math.random(this.sprite.width/2, game.system.width - (this.sprite.width/2));
			this.A = Math.random(5, 100);
			this.F = Math.random(10, 50);

			this.position.x = this.centerx;
			this.position.y = -this.sprite.height / 2;
			this.size.x = this.sprite.width;
			this.size.y = this.sprite.height;

			game.scene.addObject(this);
		},

		update: function() {
			this.position.y += 1;
			this.position.x = this.centerx + this.A*Math.sin(this.position.y/this.F);
			this.sprite.position.set(this.position.x, this.position.y);

			if(this.position.y - this.size.y / 2 > game.system.height) 
				this.remove();
		},

		remove: function() {
			this.sprite.remove();
		}
	});
});