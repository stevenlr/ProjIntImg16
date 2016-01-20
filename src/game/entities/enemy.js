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
		timerShoot: 0,
		timerShootMax: 2,
		life: 1,

		init: function(type) {
			this.type = type;

			switch (type) {
				case 0:
					this.sprite = new game.Sprite('graphics/Enemy02.png');
					this.life = 5;
					break;
				case 1:
					this.sprite = new game.Sprite('graphics/Enemy03.png');
					this.life = 1;
					break;
				case 2:
					this.sprite = new game.Sprite('graphics/Enemy01.png');
					this.life = 3;
					break;
			}

			this.sprite.anchor.set(0.5, 0.5);

			this.spawn.x = Math.random(this.sprite.width/2, game.system.width - (this.sprite.width/2));
			this.spawn.y = -this.sprite.height / 2;
			this.A = Math.random(5, 100);
			this.F = Math.random(10, 50);

			this.position.x = this.spawn.x;
			this.position.y = this.spawn.y;
			this.size.x = this.sprite.width;
			this.size.y = this.sprite.height;

			this.sprite.addTo(game.scene.stage);
		},

		update: function() {
			if(this.type == 1) // Sinus
			{
				this.position.y += 1;
				this.position.x = this.spawn.x + this.A*Math.sin(this.position.y/this.F);
			}
			else if (this.type == 2) // Straight line then focus center
			{
				if(this.timer > 3)
				{
					this.position.y += 5;
					this.position.x -= 5 *(this.position.x - game.system.width / 2) / (game.system.width - this.position.y);
				}
				else
				{
					this.position.y += 1;
					this.timer += game.system.delta;
				}
			}
			else // Straight line
			{
				this.position.y += 1;
			}

			this.sprite.position.set(this.position.x, this.position.y);
			this.body.position.x = this.position.x;
			this.body.position.y = this.position.y;

			if(this.position.y - this.size.y / 2 > game.system.height) {
				this.remove();
			}

			this.timerShoot += game.system.delta;
			if (this.timerShoot >= this.timerShootMax) {
				this.timerShoot = 0;
				this.shoot();
			}
				
		},

		collide: function(body) {
			if (body.collisionGroup == BODY_TYPE.BULLET_FRIEND)
			{
				body.entity.remove();
				this.life--;
			}

			if(this.life == 0)
			{
				this.explode();
				this.remove();
			}
		},

		remove: function() {
			this.sprite.remove();
			game.scene.level.removeEntity(this);
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

			if (Math.random() <= 0.1) {
				game.scene.level.addPickup(new game.Pickup(this.position.x, this.position.y, PICKUP_TYPE.BOMB));
			} else if (Math.random() < 0.15) {
				game.scene.level.addPickup(new game.Pickup(this.position.x, this.position.y, PICKUP_TYPE.UPGRADE));
			} else if (Math.random() < 0.22) {
				game.scene.level.addPickup(new game.Pickup(this.position.x, this.position.y, PICKUP_TYPE.LIFE));
			}
		},

		shoot: function() {		
			var x = this.position.x, y = this.position.y + this.size.y/2;

			switch (this.type) {
				case 1: // Straight line
					var bullet = new game.Bullet(x, y, Math.PI/2, 6, false);
					break;
				case 2: // Aim player
					var px = game.scene.level.player.position.x, py = game.scene.level.player.position.y;
					var angle = Math.atan2(py - this.position.y, px - this.position.x);

					var bullet = new game.Bullet(x, y, angle, 6, false);
					break;
			}
			
			if (bullet) {
				game.scene.level.addBullet(bullet);
			}
		}
	});
});