game
.module('game.main')
.require(
	'game.level',
	'game.entities.player',
	'game.entities.pickup'
)
.body(function() {

	game.createScene('Main', {
		level: null,

		init: function() {
			var player = new game.Player(100, 100);
			this.level = new game.Level();

			this.level.setPlayer(player);

			this.addObject(this.level);
			this.addObject(player);

			var pickup = new game.Pickup(300, 300, PICKUP_TYPE.DUMMY);
			this.level.addPickup(pickup);
		},

		keydown: function(e) {
			this.level.keydown(e);
		},

		keyup: function(e) {   
			this.level.keyup(e);
		}
	});
});
