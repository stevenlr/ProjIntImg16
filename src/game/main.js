game
.module('game.main')
.require('game.level')
.body(function() {

	game.createScene('Main', {
		level: null,

		init: function() {
			this.level = new game.Level();

			game.scene.addObject(this.level);
		}
	});

});
