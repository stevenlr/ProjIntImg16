var BODY_TYPE = {
	PLAYER: 0,
	ENNEMY: 1,
	BULLET_FRIEND: 2,
	BULLET_ENNEMY: 3,
	PICKUP: 4
};

game
.module('game.level')
.body(function() {
	game.createClass('Level', {
		player: null,
		world: null,

		init: function() {
			this.world = new game.World(0, 0);
		},

		update: function() {
			this.world.update();
		},

		setPlayer: function(player) {
			this.player = player;
			this.addEntity(player, BODY_TYPE.PLAYER, [BODY_TYPE.BULLET_ENNEMY, BODY_TYPE.PICKUP]);
		},

		addEnnemy: function(ennemy) {
			this.addEntity(enemy, BODY_TYPE.ENNEMY, [BODY_TYPE.BULLET_FRIEND]);
		},

		addBullet: function(bullet, friendly) {
			this.addEntity(enemy,
				friendly ? BODY_TYPE.BULLET_FRIEND : BODY_TYPE.BULLET_ENNEMY,
				friendly ? [BODY_TYPE.ENNEMY] : [BODY_TYPE.PLAYER]
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
