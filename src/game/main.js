game
.module('game.main')
.require(
	'game.level',
	'game.entities.player',
	'game.entities.pickup',
	'game.entities.enemy',
	'game.assets',
	'game.entities.boss_steven'
)
.body(function() {
	game.addAudio('audio/fx/laser.wav', 'laser');
	game.addAudio('audio/music/Level01.wav', 'm1');
	game.addAudio('audio/music/Level02.wav', 'm2');
	game.addAudio('audio/fx/laser_enemy.wav', 'laserEnemy');

	game.createScene('Main', {
		level: null,

		hud: {
			bombIcon: null,
			bombText: null,
			lifeBg: null,
			lifeFg: null
		},

		hudBoss: {
			lifeBg2: null,
			lifeFg2: null
		},

		hasBoss: false,

		init: function() {
			game.audio.playMusic('m1');
			this.level = new game.Level();
			this.addObject(this.level);

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

			this.hudBoss.lifeBg2 = new game.Sprite('graphics/lifebar_bg.png');
			this.hudBoss.lifeBg2.center();
			this.hudBoss.lifeBg2.position.y = 40;

			this.hudBoss.lifeFg2 = new game.Sprite('graphics/lifebar_fg.png');
			this.hudBoss.lifeFg2.center();
			this.hudBoss.lifeFg2.position.y = 40;

			for (var e in this.hud) {
				if (this.hud[e] != null) {
					this.stage.addChild(this.hud[e]);
				}
			}
		},

		startBoss: function() {
			for (var e in this.hudBoss) {
				if (this.hudBoss[e] != null) {
					this.stage.addChild(this.hudBoss[e]);
				}
			}

			this.hasBoss = true;
		},

		update: function() {
			this._super();
			this.hud.bombText.setText(this.level.player.bombs);
			this.hud.lifeFg.crop(0, 0, this.hud.lifeBg.width * this.level.player.life / this.level.player.maxLife, this.hud.lifeFg.height);

			if (this.hasBoss === true) {
				this.hudBoss.lifeFg2.crop(0, 0, this.hudBoss.lifeBg2.width * this.level.boss.life / this.level.boss.maxLife, this.hudBoss.lifeFg2.height);
			}
		},

		keydown: function(e) {
			this.level.keydown(e);
		},

		keyup: function(e) {   
			this.level.keyup(e);
		}
	});
});
