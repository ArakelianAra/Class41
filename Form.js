class Form{
    constructor(){
        this.input = createInput("").attribute("placeholder", "Enter your name")
        this.playbutton=createButton("Ready")
        this.titleImg=createImg("Images/title.png", "game title")
        this.greeting=createElement("h2")
    }

    setElementsPosition(){
        this.titleImg.position(120, 100)
        this.input.position(width/2-100,height/2-50)
        this.playbutton.position(width/2-80,height/2)
        this.greeting.position(width/2 - 300, height/2 - 100)
    }

    setElementsStyle(){
        this.titleImg.class("gameTitle");
        this.input.class("customInput")
        this.playbutton.class("customButton")
        this.greeting.class("greeting")
    }

    handleMousePressed(){
        this.playbutton.mousePressed(
            ()=>{
                this.input.hide();
                this.playbutton.hide();
                var message="Hello "+this.input.value()+"! Waiting for the other player to join..."
                this.greeting.html(message)
                
                pc=pc+1
                player.index=pc
                player.updateCount(pc)
                player.name=this.input.value()
                player.addPlayer()
                player.getDistance()
            }

        )
    }


    hide(){
      this.input.hide()
      this.playbutton.hide()
      this.greeting.hide()  
    }
    
    display(){
        this.setElementsPosition()
        this.setElementsStyle()
        this.handleMousePressed()
    }
}

/*
p5.dom - HTML
DOM - Document Object Model

HTML file:
    1. Head - info about the page
    2. Body - visible content

Elements of Body:
    1. Input box - player's name
    2. ready/start button
    3. Headings - h1, h2, ... h6
*/