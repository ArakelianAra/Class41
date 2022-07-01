class Player{
    constructor(){
        this.name = null;
        this.index = null;
        this.positionX=0
        this.positionY=0
        this.rank=0
        this.score=0
        this.fuel=100
        this.life=100
    }
    getCount(){
        db.ref("playercount").on("value",function(data){
            pc=data.val()
        })
    }


    updateCount(count){
        db.ref("/").update({
            playercount:count
        })
    }

    addPlayer(){

        if(this.index===1){
            this.positionX = width/2 - 100 
        }
        else{
            this.positionX=width/2+100
        }

        db.ref("players/player" + this.index).set({
            name:this.name,
            positionX:this.positionX,
            positionY:this.positionY,
            rank:this.rank,
            score:this.score,

        })

    }

    //Static - common functions, used by all the objects as a group - called by the class (not by individual objects)
    static getPlayersInfo(){
        db.ref("players").on("value",function(data){
            allPlayers=data.val()
        })

    }

    update(){
        db.ref("players/player"+ this.index).update({
            positionX:this.positionX,
            positionY:this.positionY,
            rank:this.rank,
            score:this.score,
        })
    }
    getDistance(){
        db.ref("players/player"+this.index).on("value",function(data){
            var position=data.val()
            this.positionX=position.positionX
            this.positionY=position.positionY
        })
    }

    getCarsAtEnd(){
        db.ref("CarsatEnd").on("value",function(data){
            this.rank=data.val()
        })
    }

   static updateCarsAtEnd(rank){
        db.ref("/").update({
            CarsatEnd:rank
        })
    }
}