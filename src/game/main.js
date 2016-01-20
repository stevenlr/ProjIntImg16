game
.module('game.main')
.require(
	'game.level',
	'game.entities.player',
	'game.entities.pickup'
)
.body(function() {

	game.addAsset('graphics/Bullet03.png');
	game.addAsset('graphics/Spaceship.png');
	game.addAsset('graphics/lifebar_fg.png');
	game.addAsset('graphics/lifebar_bg.png');

	game.createScene('Main', {
		level: null,

		hud: {
			bombIcon: null,
			bombText: null,
			lifeBg: null,
			lifeFg: null
		},

		init: function() {
			var player = new game.Player(100, 100);
			this.level = new game.Level();

			this.addObject(this.level);
			this.level.setPlayer(player);

			this.level.addPickup(new game.Pickup(300, 300, PICKUP_TYPE.BOMB));
			this.level.addPickup(new game.Pickup(400, 300, PICKUP_TYPE.BOMB));
			this.level.addPickup(new game.Pickup(450, 350, PICKUP_TYPE.BOMB));

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
