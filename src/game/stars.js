game
.module('game.stars')
.body(function() {
	game.addAsset('graphics/Background02.png');
	game.addAsset('graphics/Background01.png');
    
    game.createScene('Stars', {
        backgroundColor: 0x0000,
        starsLayer1: null,
        starsLayer2: null,
    
        init: function() {
            this.starsLayer1 = new game.TilingSprite('graphics/Background01.png', game.system.width, game.system.height);
           this.starsLayer2 = new game.TilingSprite('graphics/Background02.png', game.system.width, game.system.height);
						
           
            this.stage.addChild(this.starsLayer1);
            this.stage.addChild(this.starsLayer2);
					
            ;
						game.dataStore.store['stars.speed'] = 1;
           
        },
        
        update: function() {
            this._super();
            this.starsLayer1.tilePosition.y -= game.dataStore.store['stars.speed']*-2;
						this.starsLayer2.tilePosition.y -= game.dataStore.store['stars.speed'] * -4;
						
		
        },
        
    });
});
