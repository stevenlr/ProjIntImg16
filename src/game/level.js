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

		addBullet: function(bullet, friendly) {
			this.addEntity(bullet,
				friendly ? BODY_TYPE.BULLET_FRIEND : BODY_TYPE.BULLET_ENEMY,
				friendly ? [BODY_TYPE.ENEMY] : [BODY_TYPE.PLAYER]
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
			for (var id in game.scene.objects) {
				var obj = game.scene.objects[id];

				if (obj.body !== undefined && obj.body.collisionGroup == BODY_TYPE.ENEMY) {
					this.removeEntity(obj);
					(obj.sprite !== undefined) && obj.sprite.remove();
				}
			}
		}
	});
});
