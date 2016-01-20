game
.module('game.main')
.require(
	'game.level',
	'game.entities.player'
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
		},

		keydown: function(e) {
			this.level.keydown(e);
		},

		keyup: function(e) {   
			this.level.keyup(e);
		}
	});
});
