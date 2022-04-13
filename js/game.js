class Game {

    constructor(){
        this.resetTitle = createElement("h2");
        this.resetButton = createButton("");
        this.instruction = createElement("h2");
        this.leadeboardTitle = createElement("h2");
        this.p1 = createElement("h2");
        this.p2 = createElement("h2");
        this.p3 = createElement("h2");
    }

    getState(){
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value",function(data){
         gameState = data.val();
        });
    }

    update(state){
        database.ref("/").update({
            gameState:state
        });
    }

    start(){
        player = new Player();
        playerCount = player.getCount();

        form = new Form();
        form.display();

        gon1 = createSprite(90,90);
        gon1.addAnimation('flap',dragon);
        gon1.changeAnimation('flap');
        gon1.scale = 0.7 ;
        //butterfly.frameDelay=10;
        //gon1.x = mouseX;
       // gon1.y=mouseY;
        
        gon2 = createSprite(620, 280);
        gon2.addAnimation('flaps', dragon2);
        gon2.changeAnimation('flaps');
        gon2.scale = 0.9 ;
        //gon2.x=mouseX;
        //gon2.y=mouseY;

        gon3 = createSprite(1100, height - 100);
        gon3.addAnimation('flaps', dragon3);
        gon3.changeAnimation('flaps');
       // gon3.scale = 0.9 ;
        //gon3.x=mouseX;
        //gon3.y=mouseY;

        dragons = [gon1,gon2,gon3];

    }

    handleElements(){
        form.hide();

        this.instruction.html("Press arrow keys to move the dragon")
        this.instruction.position(10,860);
        this.instruction.class("gameTitleAfterEffect");
        

        this.resetTitle.html("Reset Game");
        this.resetTitle.class("resetText");
        this.resetTitle.position(1750,10);

        this.resetButton.class("resetButton");
        this.resetButton.position(1720,20);

        this.leadeboardTitle.html("Scoreboard");
        this.leadeboardTitle.class("resetText");
        this.leadeboardTitle.position(70,680);

        this.p1.html("player1"+ "&emsp;" +ascore);
        this.p1.class("resetText");
        this.p1.position(75,720);

        this.p2.html("player2"+  "&emsp;" +ascore);
        this.p2.class("resetText");
        this.p2.position(75,760);

        this.p3.html("player3"+  "&emsp;" +ascore);
        this.p3.class("resetText");
        this.p3.position(75,800);
    }

    play(){
        this.handleElements();
        this.handleResetButton();
        //this.showScoreboard();
        var index = 0;
        for(var plr in allPlayers){
            index = index+1;

            var x = allPlayers[plr].positionX;
            var y = allPlayers[plr].positionY;
            
            flies[index-1].position.x = x;
            flies[index-1].position.y = y;
           
            if(index == player.index){
             stroke(500);
             fill("white")
             ellipse(x,y,60,60);
           }
        }
       this.handlePlayerControls();
       drawSprites();
    }

    showScoreboard() {
      var p1, p2;
      this.p1.html(player1);
      this.p2.html(player2);
      this.p3.html(player3);
    }

    handlePlayerControls(){
        if (keyIsDown(UP_ARROW)) {
            player.positionY += 10;
            player.update();
          }

          if (keyIsDown(DOWN_ARROW)) {
            player.positionY -= 10;
            player.update();
          }
      
          if (keyIsDown(LEFT_ARROW) ) {
            player.positionX -= 5;
            player.update();
          }
      
          if (keyIsDown(RIGHT_ARROW)){
            player.positionX += 5;
            player.update();
          }
    }

    handleResetButton() {
        this.resetButton.mousePressed(() => {
          database.ref("/").set({
            playerCount: 0,
            gameState: 0,
            players: {},
          });
          window.location.reload();
        });
    }
}