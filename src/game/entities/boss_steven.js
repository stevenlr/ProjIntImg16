game
.module('game.entities.boss_steven')
.require('game.entities.bubble')
.body(function() {
	game.addAsset('graphics/boss_steven.png');
	game.addAsset('graphics/blep.png');

	game.createClass('BossSteven', {
		position: {x: 0, y: 0},
		speed: {x: 0, y: 0},
		acc: {x: 0, y: 0},
		size: {x: 0, y: 0},
		sprite: null,
		isDead: false,
		life: 300,
		maxLife: 300,
		keyboard: {l: false, r: false, u: false, d: false},
		ACCELERATION: 20,
		DIAG_ACCELERATION: Math.sqrt(2)/2,
		MAX_SPEED: 10,
		SQUARED_MAX_SPEED: 50 * 50,
		FRICTION: 0.95,
		tween: null,
		tweenRotate: null,
		timer: null,
		idPhase: 0,
		
		fireRate: 0.05,
		timeFireRate: 0.5,
		fireRateLong: 0.2,

		timerBlinking: 0,
		timerBlinkingMax: 0.5,
		touched: false,

		timePauseShoot: 1000,
		timeFireRateLong: 3000,
		timeShootingPhase: 500,
		phase: null,
		isBoss: true,
			
		init: function(x, y) {
			this.spriteBoss = new game.Sprite('graphics/boss_steven.png');
			this.spriteBlep = new game.Sprite('graphics/blep.png');
			this.sprite = new game.Sprite('graphics/boss_steven.png')
 			this.sprite.position.set(x, y);
			this.sprite.rotation = -0.2;
			this.sprite.anchor.set(0.5, 0.5);
			this.startY = y;
			this.position.x = x;
			this.position.y = y;
			this.size.x = this.sprite.width * 0.9;
			this.size.y = this.sprite.height * 0.8;
			this.tween = new game.Tween(this.position);
			this.tween.to({x:game.system.width - this.size.x / 2}, 3000);
			this.tween.easing('Quadratic.InOut');
			this.tween.repeat();
			this.tween.yoyo();
			this.tween.start();

			this.tweenRotate = new game.Tween(this.sprite);
			this.tweenRotate.to({rotation: 0.2}, 3000);
			this.tweenRotate.easing('Quadratic.InOut');
			this.tweenRotate.repeat();
			this.tweenRotate.yoyo();
			this.tweenRotate.start();

			this.tweenUp4 = new game.Tween(this.position);
			this.tweenUp4.to({y: this.startY}, 1500);
			this.tweenUp4.easing('Quadratic.In');

			this.tweenUp3 = new game.Tween(this.position);
			this.tweenUp3.easing('Quadratic.Out');
			this.tweenUp3.to({y: this.startY - 50}, 1500);
			this.tweenUp3.chain(this.tweenUp4);

			this.tweenUp2 = new game.Tween(this.position);
			this.tweenUp2.to({y: this.startY}, 1500);
			this.tweenUp2.easing('Quadratic.In');
			this.tweenUp2.chain(this.tweenUp3);

			this.tweenUp = new game.Tween(this.position);
			this.tweenUp.to({y: this.startY + 50}, 1500);
			this.tweenUp.easing('Quadratic.Out');
			this.tweenUp.chain(this.tweenUp2);
			this.tweenUp.start();

			this.tweenUp4.chain(this.tweenUp);

			game.scene.stage.addChild(this.sprite);
			this.timer = new game.Timer(0);

			this.phase = [this.timePauseShoot, this.timeShootingPhase, this.timePauseShoot, this.timeShootingPhase
						, this.timePauseShoot, this.timeShootingPhase, this.timePauseShoot, this.timeShootingPhase
						, this.timePauseShoot, this.timeFireRateLong];
		},

		update: function() {
			if (this.timer.time() >= this.phase[this.idPhase]) {
				this.idPhase = (this.idPhase + 1) % this.phase.length;
				this.timer.reset();
				
				if (this.idPhase == 0) {
					this.generateRandomPhases();
				}
			}

			var doge = false;

			if(this.touched)
			{
				this.timerBlinking += game.system.delta;
				if(this.timerBlinking < this.timerBlinkingMax)
				{
					if(this.timerBlinking%0.1 < 0.05) {
						this.sprite.tint = 0xFF0000;
					} else {
						this.sprite.tint = 0xFFFFFF;
					}
				}
				else
				{
					this.touched = false;
					this.sprite.tint = 0xFFFFFF;
				}
			}

			this.sprite.position.set(this.position.x, this.position.y);
			this.body.position.set(this.position.x, this.position.y);
			switch (this.idPhase) {
				case 1: case 3: case 5: case 7:
					this.sprite.texture = this.spriteBlep.texture;
					doge = true;
					this.timeFireRate += game.system.delta;
					if (this.timeFireRate >= this.fireRate) {
						this.timeFireRate -= this.fireRate;

						this.shootBubble();
					}
					break;
				case 0: case 2: case 4: case 6: case 8:
					this.sprite.texture = this.spriteBoss.texture;
					this.timeFireRate = 0;
					break;
				case 9:
					this.sprite.texture = this.spriteBlep.texture;
					doge = true;
					this.timeFireRate += game.system.delta;
					if (this.timeFireRate >= this.fireRateLong) {
						this.timeFireRate -= this.fireRateLong;

						this.shootBubble();
					}
					break;
				default:
			}
		},

		shootBubble: function() {
			game.audio.playSound('laserEnemy');
			var pos = {x: this.position.x + 20, y: this.position.y + 75};
			var dir = {x: 0, y: 1};
			var bubble = new game.Bubble(pos, dir, 250);
			game.scene.level.addBullet(bubble, false);
		},

		generateRandomPhases: function() {
			this.phase = [];

			for (var i = 0; i < 4; ++i) {
				this.phase.push(this.timePauseShoot);
				this.phase.push(this.timeShootingPhase);
			}

			this.phase.push(this.timePauseShoot);
			this.phase.push(this.timeFireRateLong);
		},

		hurt: function() {
			this.life--;
			this.touched = true;
			this.timerBlinking = 0;

			if (this.life == 0) {
				this.remove();
				game.scene.level.doBombExplosion();
			}
		},

		collide: function(body) {
			if (body.collisionGroup == BODY_TYPE.BULLET_FRIEND) {
				body.entity.remove();
				this.hurt();
			}
		},

		remove: function() {
			this.sprite.remove();
			game.scene.level.removeEntity(this);
		},
	});
});