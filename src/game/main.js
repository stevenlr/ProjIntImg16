game.module(
    'game.main'
)
.body(function() {

game.addAsset('logo.png');
game.addAsset('Bullet01.png');

game.createClass('Bullet',{

	position: {x: 0, y: 0},
	direction: {x: 0, y: 0},
	size: {x: 0, y: 0},
        speed: 90,
	sprite: null,
	body: null,
        
	init: function(x,y, angle){

            this.sprite = new game.Sprite('Bullet01.png');
            this.size.x = this.sprite.width;
            this.size.y = this.sprite.height;

	    this.direction.x = Math.cos(angle);
	    this.direction.y = Math.sin(angle);

            this.position.x = x - this.size.x / 2;
            this.position.y = y - this.size.y / 2;
            this.sprite.rotation=Math.PI/2;

            this.sprite.position.set(this.position.x, this.position.y);
            game.scene.stage.addChild(this.sprite);

	},

       
	
        update: function(x,y) {

		
	   this.sprite.position.set(this.position.x, this.position.y);
	   this.position.x += this.direction.x * this.speed * game.system.delta;
           this.position.y += this.direction.y * this.speed * game.system.delta;
	  // this.body.position.x = this.position.x;
	   //this.body.position.y=this.position.y;
           
        }



       /* keyup: function(e){
       //console.log(e);// aller voir ce qu'il se passe dans la console 
            if( e == 'P'){
		

	           this.position.y += 10;	
		
	    }
        }*/

});


game.createScene('Main', {
     
    backgroundColor: 0xb9bec7,
    e: null,
    Bulet : null,

	//Mettre une ',' entre chaque fonction

    init: function() {
        var logo = new game.Sprite('logo.png').center().addTo(this.stage); 
    },
    keyup: function(e){
	    this.Bulet = new game.Bullet(100,500, -Math.PI/2);
        this.addObject(this.Bulet);
        this.Bulet = new game.Bullet(100,500, -Math.PI/3);
        this.addObject(this.Bulet);
        this.Bulet = new game.Bullet(100,500, -2*Math.PI/3);
        this.addObject(this.Bulet);
    }
 
});
});


