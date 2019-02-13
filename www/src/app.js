var canvasWidth;
var canvasHeight;
var screenMultiplier;
var ratio,w,h;
var tempInstance;
var playerID = null;
var outsideInstruction = null;
var processFailGroup;
var purchaseIndex;
var imagesCreated = 0;
var globalScale;

var globalSaveObject;

var internet;

var admobid_interstitial = "ca-app-pub-7319949001215378/9726558244";
var admobid_banner = "ca-app-pub-7319949001215378/2185346262";
var admob_reward = 'ca-app-pub-7319949001215378/4246341317';

var leaderBoadIds = ["CgkIydv0-pYZEAIQAA","CgkIydv0-pYZEAIQAQ","CgkIydv0-pYZEAIQAg","CgkIydv0-pYZEAIQAw","CgkIydv0-pYZEAIQBA","CgkIydv0-pYZEAIQBQ"];

var _1kAchivemenID = "CgkI_vOTtLAKEAIQBw";
var _10kAchivemenID = "CgkI_vOTtLAKEAIQCA";
var _100kAchivemenID = "CgkI_vOTtLAKEAIQCQ";

var _match4AchivemenID = "CgkI_vOTtLAKEAIQCg";
var _match5AchivemenID = "CgkI_vOTtLAKEAIQCw";

//var appoDealKey = "5ecb6112daba524586fcc79c8bcf1302ffe294da16950e93";

(function () {
    /* globals Phaser:false, BasicGame: false */
    //  Create your Phaser game and inject it into the game div.
    //  We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
    //  We're using a game size of 480 x 640 here, but you can use whatever you feel makes sense for your game of course
    
    //FGLConnector.showInterstitialAd();
    
    document.addEventListener("deviceready", onDeviceReady, false);
})();

function onDeviceReady() 
{   
    //var network = navigator.connection.type;
    //console.log(network);
    initResize();
    NativeStorage.getItem('TTPsaves',
    function(obj)
    {
        if(!obj)
        {
            createLocalSave();
        }
        else
        {
            globalSaveObject = JSON.parse(obj);
        }
    },
    function(error)
    {
        console.log("error: "+error);
        createLocalSave();
    });
    
    //document.addEventListener("resume", onResume, false);
    //document.addEventListener("pause", onPause, false)
    
    window.plugins.playGamesServices.auth();

    store.register({
      id: "150_coins",
      alias: "150 hearts",
      type: store.CONSUMABLE
    });
    store.register({
      id: "350_coins",
      alias: "350 hearts",
      type: store.CONSUMABLE
    });
    store.register({
      id: "700_coins",
      alias: "700 hearts",
      type: store.CONSUMABLE
    });
    store.register({
      id: "1000_coins",
      alias: "1000 hearts",
      type: store.CONSUMABLE
    });
    store.register({
      id: "2x_coins",
      alias: "2x hearts",
      type: store.NON_CONSUMABLE
    });
    store.register({
      id: "remove_ads",
      alias: "Remove ads",
      type: store.NON_CONSUMABLE
    });
    /*store.register({
      id: "special_theme",
      alias: "special theme",
      type: store.CONSUMABLE
    });*/
    
    store.when("Remove ads").approved(function(p){
        globalSaveObject.showAd = false;
        onSuccessPurchase();
        p.finish();
    });
    store.when("Remove ads").cancelled(onFailedPurchase);
    store.when("Remove ads").error(onFailedPurchase);
    
    store.when("2x hearts").approved(function(p){
        globalSaveObject.doubleCoin = true;
        onSuccessPurchase();
        p.finish();
    });
    store.when("2x hearts").cancelled(onFailedPurchase);
    store.when("2x hearts").error(onFailedPurchase);
    
    store.when("150 hearts").approved(function(p){
        if(!globalSaveObject.coinsBought._150)
            {
                globalSaveObject.coinsBought._150 = false;
                globalSaveObject.coins += 150;
                onSuccessPurchase();
            }
        p.finish();
    });
    store.when("150 hearts").cancelled(onFailedPurchase);
    store.when("150 hearts").error(onFailedPurchase);
    
    store.when("350 hearts").approved(function(p){
        if(!globalSaveObject.coinsBought._350)
            {
                globalSaveObject.coinsBought._350 = false;
                globalSaveObject.coins += 350;
                onSuccessPurchase();
            }
        p.finish();
    });
    store.when("350 hearts").cancelled(onFailedPurchase);
    store.when("350 hearts").error(onFailedPurchase);
    
    store.when("700 hearts").approved(function(p){
        if(!globalSaveObject.coinsBought._700)
            {
                globalSaveObject.coinsBought._700 = false;
                globalSaveObject.coins += 700;
                onSuccessPurchase();
            }
        p.finish();
    });
    store.when("700 hearts").cancelled(onFailedPurchase);
    store.when("700 hearts").error(onFailedPurchase);
    
    store.when("1000 hearts").approved(function(p){
        
        if(!globalSaveObject.coinsBought._1000)
            {
                globalSaveObject.coinsBought._1000 = false;
                globalSaveObject.coins += 1000;
                onSuccessPurchase();
            }
        p.finish();
    });
    store.when("1000 hearts").cancelled(onFailedPurchase);
    store.when("1000 hearts").error(onFailedPurchase);
    
    store.refresh();
    
    startPhaser();
}

function createReportCard(score,theme) 
{
    var reportCanvas = document.createElement("canvas");

    var mode = globalSaveObject.currentMode;
    var gameType = globalSaveObject.currentGameType;

    var modeString = "Game"+globalSaveObject.currentMode+"x";
    var typeString = globalSaveObject.currentGameType == 1?"typePM":"typePPPM";
    
    var hiScore = globalSaveObject[modeString][typeString].hiScore; 

    iW = 640;
    iH = 320;

    reportCanvas.width = iW;
    reportCanvas.height = iH;

    var ctx = reportCanvas.getContext("2d");
    ctx.fillStyle = "#"+Game5x.bgThemeColor[globalSaveObject.theme-1].toString(16);
    ctx.fillRect(0,0,reportCanvas.width,reportCanvas.height);

    gameName = new Image();
    gameName.onload = function()
    {
        ctx.drawImage(gameName,(iW/4)-gameName.width/2,(iH/2)-gameName.height/2);

        imagesCreated++;
        if(imagesCreated == 6) shareImage(reportCanvas);
    }
    gameName.src = "asset/Theme"+theme+"/960/gameName.png";

    loadJson("modes",theme,function(file)
    {
        var jsonData = JSON.parse(file);
        var frameNumber = mode==4?2:mode-1;
        var frame = jsonData.frames["modes"+"000"+frameNumber].frame;

        var x = 7*iW/8 - frame.w/2;
        var y = iH/2 + frame.h*1.5;

        x-=frame.w/2;
        y-=frame.h/2;
        
        drawSprite(ctx,theme,"modes",frame.x,frame.y,frame.w,frame.h,x,y,frame.w,frame.h);

        imagesCreated++;
        if(imagesCreated == 6) shareImage(reportCanvas);
    }); 

    loadJson("gameTypes",theme,function(file)
    {
        var jsonData = JSON.parse(file);
        var frameNumber = gameType - 1;
        var frame = jsonData.frames["gameTypes"+"000"+frameNumber].frame;

        var x = 7*iW/8 - frame.w/2;
        var y = iH/2 + frame.h*3.5;

        x-=frame.w/2;
        y-=frame.h/2;
        drawSprite(ctx,theme,"gameTypes",frame.x,frame.y,frame.w,frame.h,x,y,frame.w,frame.h);

        imagesCreated++;
        if(imagesCreated == 6) shareImage(reportCanvas);
    }); 


    loadJson("digits",theme,function(file)
    {
        var jsonData = JSON.parse(file);

        var hiString = score.toString();
        var frameIndex,frame,x,y;
        for(var j = 0; j < hiString.length; j++)
        {
            frameIndex = parseInt(hiString.charAt(hiString.length-1-j));
            frame = jsonData.frames["digits"+"000"+frameIndex].frame;

            x = 7*iW/8 - (frame.w*j) ;
            y = iH/2 - frame.h*1.5;

            x-=frame.w/2;
            y-=frame.h/2;
            
            drawSprite(ctx,theme,"digits",frame.x,frame.y,frame.w,frame.h,x,y,frame.w,frame.h);
        }

        imagesCreated++;
        if(imagesCreated == 6) shareImage(reportCanvas);
    }); 
    
    loadJson("hidigits",theme,function(file)
    {
        var jsonData = JSON.parse(file);

        var hiString = hiScore.toString();
        var frameIndex,frame,x,y;
        for(var j = 0; j < hiString.length; j++)
        {
            frameIndex = parseInt(hiString.charAt(hiString.length-1-j));
            frame = jsonData.frames["hidigits"+"000"+frameIndex].frame;

            x = 7*iW/8 - (frame.w*j) ;
            y = iH/2 - frame.h*3;

            x-=frame.w/2;
            y-=frame.h/2;
            drawSprite(ctx,theme,"hidigits",frame.x,frame.y,frame.w,frame.h,x,y,frame.w,frame.h);
        }

        imagesCreated++;
        if(imagesCreated == 6) shareImage(reportCanvas);

        var newX = x - frame.w*2;
        y = y - frame.w/2;

        medal = new Image();
        medal.onload = function()
        {
            ctx.drawImage(medal,newX,y);

            imagesCreated++;
            if(imagesCreated == 6) shareImage(reportCanvas);
        }
        medal.src = "asset/Theme"+theme+"/960/medal.png";
    }); 
}

function loadJson(fileName,theme,callback)
{
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET',"asset/Theme"+theme+"/960/buttons/"+fileName+".json",true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        callback(xobj.responseText);
      }
    };
    xobj.send(null); 
}

function drawSprite(context2d,theme,fileName,sX,sY,sW,sH,dX,dY,dW,dH)
{
    var spriteImg = new Image();
    spriteImg.onload = function()
    {
        context2d.drawImage(spriteImg,sX,sY,sW,sH,dX,dY,dW,dH);
    }
    spriteImg.src = "asset/Theme"+theme+"/960/buttons/"+fileName+".png";

}

function shareImage(reportCanvas)
{
    //window.open(reportCanvas.toDataURL('image/png'));
   window.plugins.socialsharing.share(null, "My Score", reportCanvas.toDataURL('image/png'), null);
}  

function preloadSaves()
{
   
}

function gotSaveFiles(obj)
{
    if(!obj)
    {
        createLocalSave()
    }
    else
    {
        globalSaveObject = obj;
    }
}

function createLocalSave()
{
    globalSaveObject = new Object();

    globalSaveObject = {
                    currentMode:1,currentGameType:1,sound:true,firstRun:true,coins:0,theme:1,showAd:true,doubleCoin:false,ratedGame:false,
                    coinsBought:{_150:false,_350:false,_700:false,_1000:false},
                    themeBought:{theme1:true,theme2:false,theme3:false,theme4:false,theme5:false,theme6:false},
                    Game4x:{
                                typePM:{
                                            reset:true,hiScore:0,currentScore:0,rn1:0,rn2:0,rn3:0,sl1:0,sl2:0,sl3:0,gameOver:false,
                                            grid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                            cake:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                },
                                typePPPM:{
                                            reset:true,hiScore:0,currentScore:0,rn1:0,rn2:0,rn3:0,sl1:0,sl2:0,sl3:0,gameOver:false,
                                            grid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                            cake:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                }
                    },
                    Game2x:{
                                typePM:{
                                            reset:true,hiScore:0,currentScore:0,rn1:0,rn2:0,rn3:0,sl1:0,sl2:0,sl3:0,gameOver:false,
                                            grid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                            cake:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                },
                                typePPPM:{
                                            reset:true,hiScore:0,currentScore:0,rn1:0,rn2:0,rn3:0,sl1:0,sl2:0,sl3:0,gameOver:false,
                                            grid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                            cake:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                }
                    },
                    Game1x:{
                                typePM:{
                                            reset:true,hiScore:0,currentScore:0,rn1:2,rn2:2,rn3:3,sl1:1,sl2:1,sl3:3,gameOver:false,
                                            grid:[3,0,3,0,0,0,0,0,0,4,0,0,0,0,0,0],
                                            cake:[3,0,3,0,0,0,0,0,0,1,0,0,0,0,0,0],
                                },
                                typePPPM:{
                                            reset:true,hiScore:0,currentScore:0,rn1:0,rn2:0,rn3:0,sl1:0,sl2:0,sl3:0,gameOver:false,
                                            grid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                            cake:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                }
                    }
    };
    NativeStorage.setItem('TTPsaves', JSON.stringify(globalSaveObject));
}

function startPhaser()
{
    //window.game.login();
    
    var config = {
    "width": canvasWidth,
    "height": canvasHeight,
    "renderer": Phaser.AUTO,
    "parent": 'game',
    //"resolution": ratio
	};
    
    
	var gameInstance = new Phaser.Game(config);
    
    //game = new Phaser.Game(480, 640, Phaser.AUTO, 'game');

    //  Add the States your game has.
    //  You don't have to do this in the html, it could be done in your Game state too, but for simplicity I'll keep it here.
    gameInstance.state.add("Game", Game5x.Game);
    gameInstance.state.add('Menu', Game5x.Menu);
    gameInstance.state.add('Boot', Game5x.Boot);
    
    //  Now start the Game state.
    gameInstance.state.start('Boot');
}

function initResize()
{

	ratio = window.devicePixelRatio || 1;
    w = window.innerWidth * ratio;
    h = window.innerHeight * ratio;
    
    canvasHeight = 480;
    screenMultiplier = 1;
    
    if(h >= 480)
    {
        canvasHeight = 480;
        screenMultiplier = 1;
    }  
    if(h >= 720)
	{
        canvasHeight = 720;
        screenMultiplier = 1.5;
	}
    if(h >= 1200)
	{
	  canvasHeight = 1200;
	  screenMultiplier = 2.5;
	}
    if(h >= 1680)
	{
	  canvasHeight = 1680;
	  screenMultiplier = 3.5;
	}

    canvasWidth = Math.round((canvasHeight * w)/h);
}

function orderProduct(productAlias)
{
    console.log('ordering');
    store.order(productAlias);
}

function onSuccessPurchase()
{
    NativeStorage.setItem('TTPsaves', JSON.stringify(globalSaveObject));
}

function onFailedPurchase()
{

}

function updateLeaderBoard()
{
    /*var modes = ["Game1x","Game1x","Game2x","Game2x","Game4x","Game4x"];
    var gameTypes = ["typePM","typePPPM","typePM","typePPPM","typePM","typePPPM"]
    for(var i=0;i<leaderBoadIds.length;i++)
        {
            window.game.submitScore(leaderBoadIds[i], globalSaveObject[modes[i]][gameTypes[i]].hiScore);
        }
    
    window.game.showLeaderboards();*/
}

function closeFailGroup()
{
    processFailGroup.destroy(true,false);
    processFailGroup = null;
}

function onPause()
{
    if(tempInstance && tempInstance.pauseGame)
        {
            tempInstance.pauseGame();
        }
}

function onResume()
{
    
}