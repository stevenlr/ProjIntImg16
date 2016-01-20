game.module('game.entities.enemy')
.body(function() {

	game.createClass('Enemy', {
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

			this.sprite.addTo(game.scene.stage);
		},

		update: function() {
			this.position.y += 100 * game.system.delta;
			this.position.x = this.centerx + this.A*Math.sin(this.position.y/this.F);
			this.sprite.position.set(this.position.x, this.position.y);
			this.body.position.x = this.position.x;
			this.body.position.y = this.position.y;

			if(this.position.y - this.size.y / 2 > game.system.height) {
				this.remove();
			}
		},

		collide: function(body) {
			if (body.collisionGroup == BODY_TYPE.BULLET_FRIEND) {
				body.entity.remove();
				this.explode();
				this.remove();
			}
		},

		explode: function() {
			var emitter = new game.Emitter();
			emitter.textures.push('graphics/smoke.png');
			emitter.position.set(this.position.x, this.position.y);
			emitter.addTo(game.scene.stage);
			emitter.positionVar.set(20, 20);
			emitter.count = 5;
			emitter.duration = 200;
			emitter.startAlpha = 1.0;
			emitter.endAlpha = 0;
			emitter.startScale = 0.2;
			emitter.endScale = 1;
			emitter.rotate = 0;
			emitter.rotateVar = 1;
			emitter.angle = 0;
			emitter.angleVar = 3;
			emitter.speed = 0;
			game.scene.addEmitter(emitter);

			if (Math.random() <= 0.25) {
				game.scene.level.addPickup(new game.Pickup(this.position.x, this.position.y, PICKUP_TYPE.BOMB));
			}
		},

		remove: function() {
			this.sprite.remove();
			game.scene.level.removeEntity(this);
		}
	});
});