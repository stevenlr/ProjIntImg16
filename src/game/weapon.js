game
.module('game.weapon')
.require('game.entities.bullet')
.body(function() {

	game.createClass('Weapon', {
		level: 1,
		player: null,
		timerShoot: 0,
		timerShootMax: 0.2,

		init: function(player) {
			this.player = player;

		},

		update: function() {
			this.timerShoot += game.system.delta;
		},

		shoot: function() {
			if (this.timerShoot >= this.timerShootMax) {
				this.timerShoot = 0;
			
				var x = this.player.position.x, y = this.player.position.y - 40;

				var bullet = new game.Bullet(x, y, -Math.PI/2, 5, true);
				game.scene.level.addBullet(bullet);
				bullet = new game.Bullet(x + 20, y + 30, -Math.PI/3, 5, true);
				game.scene.level.addBullet(bullet);
				bullet = new game.Bullet(x - 20, y + 30, -2*Math.PI/3, 5, true);
				game.scene.level.addBullet(bullet);
			}
		},

		levelUp: function() {
			//attention au cas où level = max
		},

		levelDown: function() {
			//attention au cas où level = 1
		}
	});
});