game.module('game.entities.enemy')
.body(function() {

	game.createClass('Enemy', {
		speed: 400,
		body: null,
		position: {x: 0, y: 0},
		spawn: {x:0, y:0},
		size: {x: 0, y: 0},
		sprite: null,
		type: 0,
		timer: 0,
		life: 1,

		init: function(sprite, type, life) {
			this.type = type;

			this.sprite = new game.Sprite(sprite);
			this.sprite.anchor.set(0.5, 0.5);

			this.spawn.x = Math.random(this.sprite.width/2, game.system.width - (this.sprite.width/2));
			this.spawn.y = -this.sprite.height / 2;
			this.A = Math.random(5, 100);
			this.F = Math.random(10, 50);

			this.position.x = this.spawn.x;
			this.position.y = this.spawn.y;
			this.size.x = this.sprite.width;
			this.size.y = this.sprite.height;

			game.scene.addObject(this);
		},

		update: function() {
			if(this.type == 1)
			{
				this.position.y += 1;
				this.position.x = this.spawn.x + this.A*Math.sin(this.position.y/this.F);
			}
			else if (this.type == 2)
			{
				if(this.timer > 300)
				{
					this.position.y += 5;
					this.position.x -= 5 *(this.position.x - game.system.width / 2) / (game.system.width - this.position.y);
				}
				else
				{
					this.position.y += 1;
					this.timer++;
				}
			}
			else
			{
				this.position.y += 1;
			}
			this.sprite.position.set(this.position.x, this.position.y);

			if(this.position.y - this.size.y / 2 > game.system.height) 
				this.remove();
		},

		remove: function() {
			this.sprite.remove();
		},

		collide: function(e) {
			this.sprite.remove();
		}
	});
});