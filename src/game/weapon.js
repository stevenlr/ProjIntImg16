game
.module('game.weapon')
.require('game.entities.bullet')
.body(function() {

	game.createClass('Weapon', {
		level: 1,
                levelmax: 3,
                levelmin: 1,
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

				
				if(this.level==1){

				var bullet = new game.Bullet(x, y, -Math.PI/2, 5, true);
				game.scene.level.addBullet(bullet, true);
				}


				if(this.level==2){

				bullet = new game.Bullet(x + 20, y + 30, -Math.PI/3, 5, true);
				game.scene.level.addBullet(bullet, true);
				bullet = new game.Bullet(x - 20, y + 30, -2*Math.PI/3, 5, true);
				game.scene.level.addBullet(bullet, true);
				}

				if(this.level==3){

				bullet = new game.Bullet(x, y, -Math.PI/2, 5, true);
				game.scene.level.addBullet(bullet, true);
				bullet = new game.Bullet(x + 20, y + 30, -Math.PI/3, 5, true);
				game.scene.level.addBullet(bullet, true);
				bullet = new game.Bullet(x - 20, y + 30, -2*Math.PI/3, 5, true);
				game.scene.level.addBullet(bullet, true);

				}




			}
		},

		levelUp: function() {
			//attention au cas où level = max
			

			if(level != levelmax){

				level=level+1;
				timerShootMax=timerShootMax-0.05;

			}
			

		},

		levelDown: function() {
			//attention au cas où level = 1
			if(level != levelmin){

				level=level-1;
				timerShootMax=timerShootMax+0.05;

			}


		}     
	});
});
