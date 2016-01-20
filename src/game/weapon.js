game
.module('game.weapon')
.body(function() {

	game.createClass('Weapon', {
		level: 1,

		init: function() {

		},

		update: function() {

		},

		shoot: function() {
			var bullet = new game.Bullet(100,500, -Math.PI/2);
			this.addObject(bullet);
			bullet = new game.Bullet(100,500, -Math.PI/3);
			this.addObject(bullet);
			bullet = new game.Bullet(100,500, -2*Math.PI/3);
			this.addObject(bullet);
		},

		levelup: function() {
			//attention au cas où level = max
		},

		leveldown: function() {
			//attention au cas où level = 1
		}
	});
});