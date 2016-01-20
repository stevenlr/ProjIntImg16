game
.module('game.main')
.require(
	'game.level',
	'game.entities.player',
	'game.entities.pickup',
	'game.entities.enemy',
	'game.assets'
)
.body(function() {

	game.createScene('Main', {
		level: null,

		hud: {
			bombIcon: null,
			bombText: null,
			lifeBg: null,
			lifeFg: null
		},

		init: function() {
			this.level = new game.Level();
			var player = new game.Player(100, 100);

			this.addObject(this.level);
			this.level.setPlayer(player);

			this.hud.bombIcon = new game.Sprite('graphics/Bullet03.png');
			this.hud.bombIcon.position.x = 40;
			this.hud.bombIcon.position.y = game.system.height - 40;

			this.hud.bombText = new game.Text('0', {'fill': 'white', 'font': '27px Arial'});
			this.hud.bombText.position.x = 80;
			this.hud.bombText.position.y = game.system.height - 40;

			this.hud.lifeBg = new game.Sprite('graphics/lifebar_bg.png');
			this.hud.lifeBg.center();
			this.hud.lifeBg.position.y = game.system.height - 40;

			this.hud.lifeFg = new game.Sprite('graphics/lifebar_fg.png');
			this.hud.lifeFg.center();
			this.hud.lifeFg.position.y = game.system.height - 40;

			for (var e in this.hud) {
				if (this.hud[e] != null) {
					this.stage.addChild(this.hud[e]);
				}
			}

			this.addTimer(1000, this.spawnEnemy.bind(this), true);
			this.spawnEnemy();
		},

		spawnEnemy: function() {
			this.level.addEnemy(new game.Enemy(2));
		},

		update: function() {
			this._super();
			this.hud.bombText.setText(this.level.player.bombs);
			this.hud.lifeFg.crop(0, 0, this.hud.lifeBg.width * this.level.player.life / this.level.player.maxLife, this.hud.lifeFg.height);
		},

		keydown: function(e) {
			this.level.keydown(e);
		},

		keyup: function(e) {   
			this.level.keyup(e);
		}
	});
});
