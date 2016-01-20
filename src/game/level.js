game
.module('game.level')
.body(function() {
	game.createClass('Level', {
		player: null,
		world: null,

		ENTITY_PLAYER: 0,
		ENTITY_ENNEMY: 1,
		ENTITY_BULLET_FRIEND: 2,
		ENTITY_BULLET_ENNEMY: 3,

		init: function() {
			this.world = new game.World(0, 0);
		},

		setPlayer: function(player) {
			this.player = player;
			this.addEntity(player, this.ENTITY_PLAYER, [this.ENTITY_BULLET_ENNEMY]);
		},

		addEnnemy: function(ennemy) {
			this.addEntity(enemy, this.ENTITY_ENNEMY, [this.ENTITY_BULLET_FRIEND]);
		},

		addBullet: function(bullet, friendly) {
			this.addEntity(enemy,
				friendly ? this.ENTITY_BULLET_FRIEND : this.ENTITY_BULLET_ENNEMY,
				friendly ? [this.ENTITY_ENNEMY] : [this.ENTITY_PLAYER]
			);
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

			body.addShape(shape);
			this.world.addBody(body);
			entity.body = body;

			if (entity.collide !== undefined) {
				body.collide = entity.collide.bind(entity);
			}
		},

		removeEntity: function(entity) {
			this.world.removeBody(entity.body);
		},

		keydown: function(e) {
			this.player.keydown(e);
		},

		keyup: function(e) {   
			this.player.keyup(e);
		}
	});
});
