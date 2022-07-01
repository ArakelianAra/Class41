class Game{
    constructor(){
        this.resetTitle=createElement("h2")
        this.resetButton=createButton("")
        this.leaderboardTitle=createElement("h2")
        this.leader1=createElement("h2")
        this.leader2=createElement("h2")
        this.playerMoving=false
    }

    //Reading the gameState
    getState(){
        db.ref("gamestate").on("value", function(data){
            gs = data.val();
        })
    }

    //Updating the gameState
    //"/" - refers to the entire database
    update(state){
        db.ref("/").update({
            gamestate: state
        })
    }

    start(){
        form=new Form()
        form.display()
        player = new Player();
        player.getCount();
        car1=createSprite(width/2-50,height-100)
        car1.addImage(car1Img)
        car1.scale=0.07
    
        car2 = createSprite(width/2 + 100, height - 100)
        car2.addImage(car2Img)
        car2.scale = 0.07;

        cars=[car1,car2]  
              
        obstaclesGroup=new Group()
        fuelGroup=new Group()
        coinGroup=new Group()

        this.addSprites(4,fuelImg,0.02,fuelGroup)
        this.addSprites(20,coinImg,0.1,coinGroup)

        var obstaclePositions = [
            {x: width/2 + 250, y: height - 600, image: obstacle2Img},
            {x: width/2 - 150 , y: height - 900, image: obstacle1Img},
            {x: width/2 + 250, y: height - 1200, image: obstacle1Img},
            {x: width/2  -180, y: height - 1500, image: obstacle2Img},
            {x: width/2 , y: height - 1800, image: obstacle2Img},
            {x: width/2 -180, y: height - 2100, image: obstacle1Img},
            {x: width/2 + 180, y: height - 2400, image: obstacle2Img},
            {x: width/2 + 250, y: height - 2700, image: obstacle2Img},
            {x: width/2 - 150, y: height - 2850, image: obstacle1Img},
            {x: width/2 + 250, y: height - 3000, image: obstacle2Img},
            {x: width/2, y: height - 3300, image: obstacle1Img},
            {x: width/2 - 180, y: height - 3600, image: obstacle2Img},
        ]

        this.addSprites(12,obstacle1Img,0.04,obstaclesGroup,obstaclePositions)
    }

    handleElements(){
        form.hide();
        form.titleImg.position(40, 50);
        form.titleImg.class("gametitleafter")
        
        this.resetTitle.html("Reset Game")
        this.resetTitle.position(width/2+200,40)
        this.resetTitle.class("resetText")
        
        this.resetButton.position(width/2+230,100)
        this.resetButton.class("resetButton")
        
        this.leaderboardTitle.html("Leaderboard")
        
        this.leaderboardTitle.position(width/3-60,40)
        this.leader1.position(width/3-50,80)
        this.leader2.position(width/3-50,130)
        
        this.leader1.class("leaderText")
        this.leader2.class("leaderText")
        this.leaderboardTitle.class("resetText")
    }

    play(){
        this.handleElements()
        this.handleResetButton()
        Player.getPlayersInfo()
        player.getCarsAtEnd()
        
        if(allPlayers!==undefined){
            image(track,0, -height*5, width, height*6)
            
            this.showLeaderboard()
            this.showLife()
            this.showFuelBar()
            var carIndex = 0
            //for-in loop
            for(var plr in allPlayers){
                carIndex ++;

                var x = allPlayers[plr].positionX;
                var y = height -  allPlayers[plr].positionY;

                cars[carIndex-1].x = x;
                cars[carIndex-1].y=y;

                //Identifying the currently active player
                if(carIndex===player.index){
                    text(allPlayers[plr].name,x,y-50)

                    this.handleFuel(carIndex)
                    this.handleCoins(carIndex)
                    
                    //Game Camera
                    camera.position.x = cars[carIndex-1].x;
                    camera.position.y = cars[carIndex-1].y;
                }
            }
            this.handlePlayerControls()

            const finishLine=height*6-100
            //console.log(player.rank);
            if(player.positionY>finishLine){
                gs = 2
                player.rank=player.rank+1 //Not updating
                Player.updateCarsAtEnd(player.rank)
                player.update()
                this.showRank();
            }
            
            drawSprites()

        }


    }

    handlePlayerControls(){
        if( keyIsDown(UP_ARROW)){
            player.positionY+=10;
            this.playerMoving=true
            player.update()
        }

        if(keyIsDown(LEFT_ARROW) && player.positionX>width/3-50 ){
            player.positionX-=5
            player.update()
        }

        if(keyIsDown(RIGHT_ARROW) && player.positionX<width/2+280 ){
            player.positionX+=5
            player.update()
        }
    }
    
    handleResetButton(){
        this.resetButton.mousePressed(
            ()=>{
                db.ref("/").set({
                    gamestate:0,
                    playercount:0,
                    CarsatEnd:0,
                    players:{},
                })

                window.location.reload()
            }
        )

    }
    
    showLeaderboard(){
       var leader1,leader2
       var players=Object.values(allPlayers)
       
       if((players[0].rank===0 && players[1].rank===0) || players[0].rank===1){
        //&emsp; - empty space character
        leader1 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score;
        leader2=players[1].rank + "&emsp;" + players[1].name + "&emsp;" +players[1].score;
       }

       if(players[1].rank===1){
        leader2 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score;
        leader1=players[1].rank + "&emsp;" + players[1].name + "&emsp;" +players[1].score;
       }

       this.leader1.html(leader1)
       this.leader2.html(leader2)
    }

    addSprites(numberOfSprites, spriteImage, scale, spriteGroup, positions = []){
        for(var i=0;i<numberOfSprites;i++){

            var x,y;

            if(positions.length>0){
                x=positions[i].x
                y=positions[i].y
                spriteImage=positions[i].image
                //console.log("Positions working")
            }
            else{
                x=random(width/2+150,width/2-150)
                y=random(-height*4.5,height-400)
            }
            
            var sprite=createSprite(x,y)
            sprite.addImage(spriteImage)
            sprite.scale=scale
            spriteGroup.add(sprite)
        }
    }

    handleFuel(index){
        cars[index-1].overlap(fuelGroup,function(p,f){
            player.fuel=100
            f.destroy()
        })

        if(this.playerMoving && player.fuel>0){
            player.fuel=player.fuel-1
        }
        
        if(player.fuel<=0){
            gs=2
            this.gameover()
        }
    }

    handleCoins(index){
        cars[index-1].overlap(coinGroup,function(p,c){
            player.score=player.score+5
            player.update()
            c.destroy()
            
        })
    }

    showRank(){
        swal({
            title:"Awesome! Rank: "+ player.rank,
            text:"You Have Finished The Game",
            imageUrl:"https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
            imageSize:"100x100",
            confirmButtonText:"Ok"
        })
    }
    
    showLife(){
        push();
        fill("white")
        rect(width/2-100,height-player.position.y-400,100,20)
        fill("red")
        rect(width/2-100,height-player.position.y-400,player.life,20)
        image(heartImg,width/2-130,height-player.position.y-400,20,20)
        pop();
    }

    showFuelBar(){
        push();
        fill("white")
        rect(width/2-100,height-player.position.y-350,100,20)
        fill("#ffc400")
        rect(width/2-100,height-player.position.y-350,player.fuel,20)
        image(fuelImg,width/2-130,height-player.position.y-350,20,20)
        pop();
    }

    gameover(){
        swal({
            title:"Game over!",
            text:"You Have Ran Out Of Fuel",
            imageUrl:"https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
            imageSize:"100x100",
            confirmButtonText:"Ok"
        }) 
    }
}