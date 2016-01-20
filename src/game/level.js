var BODY_TYPE = {
	PLAYER: 0,
	ENEMY: 1,
	BULLET_FRIEND: 2,
	BULLET_ENEMY: 3,
	PICKUP: 4
};

game
.module('game.level')
.body(function() {
	game.createClass('Level', {
		player: null,
		world: null,
		starsLayer1: null,
		starsLayer2: null,
		starsSpeed: 0.5,

		init: function() {
			this.world = new game.World(0, 0);
			this.starsLayer1 = new game.TilingSprite('graphics/Background01.png', game.system.width, game.system.height);
			this.starsLayer2 = new game.TilingSprite('graphics/Background02.png', game.system.width, game.system.height);

			game.scene.stage.addChild(this.starsLayer1);
			game.scene.stage.addChild(this.starsLayer2);
		},

		update: function() {
			this.world.update();
			this.starsLayer1.tilePosition.y += this.starsSpeed * 1;
			this.starsLayer2.tilePosition.y += this.starsSpeed * 2;
		},

		setPlayer: function(player) {
			this.player = player;
			this.addEntity(player, BODY_TYPE.PLAYER, [BODY_TYPE.BULLET_ENEMY, BODY_TYPE.PICKUP]);
		},

		addEnemy: function(enemy) {
			this.addEntity(enemy, BODY_TYPE.ENEMY, [BODY_TYPE.BULLET_FRIEND]);
		},

		addBullet: function(bullet) {
			this.addEntity(bullet,
				bullet.friendly ? BODY_TYPE.BULLET_FRIEND : BODY_TYPE.BULLET_ENEMY,
				bullet.friendly ? [BODY_TYPE.ENEMY] : [BODY_TYPE.PLAYER]
			);
		},

		addPickup: function(pickup) {
			this.addEntity(pickup, BODY_TYPE.PICKUP, [BODY_TYPE.PLAYER]);
		},

		addEntity: function(entity, type, against) {
			var body = new game.Body({
				position: {
					x: entity.position.x,
					y: entity.position.y
				},
				collideAgainst: against,
				collisionGroup: type
			});

			var shape = new game.Rectangle(entity.size.x, entity.size.y);

			body.entity = entity;
			body.addShape(shape);
			this.world.addBody(body);
			game.scene.addObject(entity);
			entity.body = body;

			if (entity.collide !== undefined) {
				body.collide = entity.collide.bind(entity);
			}
		},

		removeEntity: function(entity) {
			this.world.removeBody(entity.body);
			game.scene.removeObject(entity);
		},

		keydown: function(e) {
			this.player.keydown(e);
		},

		keyup: function(e) {   
			this.player.keyup(e);
		},

		doBombExplosion: function() {
			var emitter = new game.Emitter();
			emitter.textures.push('graphics/smoke.png');
			emitter.position.set(game.system.width / 2, game.system.height / 2);
			emitter.addTo(game.scene.stage);
			emitter.positionVar.set(game.system.width / 3, game.system.height / 3);
			emitter.count = 25;
			emitter.duration = 200;
			emitter.startAlpha = 1.0;
			emitter.endAlpha = 0;
			emitter.startScale = 1;
			emitter.endScale = 2.5;
			emitter.rotate = 0;
			emitter.rotateVar = 1;
			emitter.angle = 0;
			emitter.angleVar = 3;
			emitter.speed = 0;
			game.scene.addEmitter(emitter);

			for (var id in game.scene.objects) {
				var obj = game.scene.objects[id];

				if (obj.body && obj.body.collisionGroup == BODY_TYPE.ENEMY) {
					(obj.explode !== undefined) && obj.explode();
					(obj.remove !== undefined) && obj.remove();
				}
			}
		}
	});
});
