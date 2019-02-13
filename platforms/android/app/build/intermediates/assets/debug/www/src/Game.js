
// create Game function in Game5x
Game5x.Game = function (game) {
    this.bg;
    this.logo;
    this.gridArray = null;
    this.defaultX = null;
    this.defaultY = null;
    this.gap;
    
    this.mode;
    this.gameType;
    this.sound;
    
    this.currentTutAnim = 1;
    this.tutSprite;
    
    this.allSnapedNumbers = new Array();
    this.deleteGridSp = new Array();
    
    this.sl1=null;
    this.sl2=null;
    this.sl3=null;
    this.rn1=null;
    this.rn2=null;
    this.rn3=null;
    this.subMenuTrans = null;
    this.draggingRn = null;
    
    this.justSubtracted = false;
    this.shuffle = false; 
    
    this.bottomMiddleY = null;
    this.medalSprite = null;
    
    this.pauseBtn = null;
    
    this.pauseGroup = null;
    this.gameOverGroup = null;
    this.settingsGroup = null;
    this.helpGroup = null;

    this.newMode; this.newGameType;
    this.modeString; this.typeString;
    
    this.points = 0;
    
    this.digitArray = null;
    this.hiDigitArray = null;
    this.coinArray = null;
    this.gameOver = false;
    
    this.gameOverSound = null;
    this.pickNumberSound = null;
    this.minusNumbersSound = null;
    this.generateNumbersSound = null;
    this.addNumbersSound = null;
    this.buttonSound = null;
    this.plateSound = null;
    this.gameOverTxt = null;
    this.buttonSound = null;
    this.freeCoinMenu = null;
    
    this.shuffleBtn;
    this.coinBtn;
    this.theme;
    
    this.reportBGDetails;
};

var universalThis;

document.addEventListener('onAdPresent', function(e){
    if(e.adType == 'rewardvideo') {
        
        universalThis.resetSlices();
    }
});

// set Game function prototype
Game5x.Game.prototype = {

    preload: function () {

        // Here we load the assets required for our preloader (in this case a 
        // background and a loading bar)
        //this.load.image('logo', 'asset/phaser.png');
        this.theme = Game5x.saveObject.theme == 2?1:Game5x.saveObject.theme;

        if(Game5x.saveObject.showAd && AdMob)
        {
            AdMob.createBanner( {
                adId: admobid_banner,
                position: AdMob.AD_POSITION.TOP_CENTER,
                isTesting: false, // TODO: remove this line when release
                overlap: true,
                offsetTopBar: false,
                bgColor: 'black'
            } );
            
            console.log("caching on preload");
            this.cacheInterstitial();
        }

        AdMob.prepareRewardVideoAd( {adId:admob_reward, autoShow:false} );
        
        document.addEventListener("backbutton", this.backButtonPressed, false);
    }, 
    
    init:function()
    {
        this.mode = Game5x.saveObject.currentMode;
        this.gameType = Game5x.saveObject.currentGameType;
        this.sound = Game5x.saveObject.sound;
        
        this.modeString = "Game"+Game5x.saveObject.currentMode+"x";
        this.typeString = Game5x.saveObject.currentGameType == 1?"typePM":"typePPPM";
        
        this.gridArray = null;
        
        this.allSnapedNumbers = new Array();
        this.deleteGridSp = new Array();

        this.sl1=null;
        this.sl2=null;
        this.sl3=null;
        this.rn1=null;
        this.rn2=null;
        this.rn3=null;

        this.justSubtracted = false;
        this.gameOver = false;
        
        this.bottomMiddleY = null;

        this.pauseBtn = null;
        this.pauseGroup = null;
        this.gameOverGroup = null;

        this.settingsGroup = null;
        this.helpGroup = null;
        
        this.points = 0;
    },

    create: function () 
    {
        this.createGame();
        tempInstance = this;
    },
    createGame:function()
    {
        
        this.gameOverSound = this.add.audio('gameOverSound');
        this.pickNumberSound = this.add.audio('pickNumberSound');
        this.purchasedSound = this.add.audio('purchasedSound');
        this.minusNumbersSound = this.add.audio('minusNumbersSound');
        this.generateNumbersSound = this.add.audio('generateNumbersSound');
        this.addNumbersSound = this.add.audio('addNumbersSound');
        this.buttonSound = this.add.audio('buttonSound');
        this.plateSound = this.add.audio('plateSound');

        globalScale = this.world.width/this.world.height<0.56?0.9:1; 
                
        if(!this.bg)
        {
            this.bg = this.add.sprite(this.world.centerX,this.world.centerY,'gameBG');
            this.bg.anchor.setTo(0.5,0.5);
        }
        //var addBG = this.add.graphics( 0, 0 );
        //addBG.beginFill(0x424242, 1);
        //addBG.drawRect(0, 0, this.game.world.width, this.game.world.height*0.08);
        
        //var adtxt = this.add.sprite(this.world.centerX,0,"adtxt");
        //adtxt.anchor.setTo(0.5,0.5);
        //adtxt.y = addBG.height/2;
        
        this.gridArray = [];
        this.gap = canvasWidth/(4.6);
        
        var gridBG;
        var gridObj;
        var gridBGWidth = 55 * screenMultiplier;
        var leftX = (this.world.centerX) - (2*this.gap) + ((this.gap-gridBGWidth)/2);
        var topY = this.world.centerY - 2*(this.gap) + ((this.gap-gridBGWidth)/2);
        var cakeHolder;
        for(var i = 0;i<16;i++)
            {
                gridBG = this.add.sprite(0,0,'gridBG');
                gridBG.scale.setTo(globalScale,globalScale);
                //gridBG.anchor.setTo(0.5,0.5);
                
                gridBG.x = leftX + (this.gap)*(i%4);
                gridBG.y = topY + (this.gap)*Math.floor(i/4);
                
                gridObj = new Object();
                gridObj.x = gridBG.x; gridObj.y = gridBG.y;
                gridObj.value = 0;
                gridObj.index = i;
                gridObj.sprite = gridBG;
                
                if(Game5x.saveObject[this.modeString][this.typeString].grid[i] !== 0)
                    {
                        gridObj.value = Game5x.saveObject[this.modeString][this.typeString].grid[i];
                        
                        cakeHolder = this.add.sprite(0,0,this.getCakeName(Game5x.saveObject[this.modeString][this.typeString].cake[i]));
                        cakeHolder.x = gridObj.sprite.x;
                        cakeHolder.y = gridObj.sprite.y;
                        cakeHolder.cakeNumber = Game5x.saveObject[this.modeString][this.typeString].cake[i];
                        //gridObj.sprite.loadTexture(String(this.mode)+'xstrip');
                        cakeHolder.frame = gridObj.value-1;
                        
                        cakeHolder.scale.setTo(globalScale,globalScale);
                        this.add.tween(cakeHolder).from( { x:this.world.width+cakeHolder.width}, 250, Phaser.Easing.Linear.None, true,100*i);
                        gridObj.cakeHolder = cakeHolder;
                    }
                
                this.gridArray.push(gridObj);
                
                if(i==15)
                {
                    this.bottomMiddleY = gridBG.y + gridBG.height + (this.world.height - (gridBG.y + gridBG.height))/2;
                    this.add.tween(gridBG).from( { x:this.world.width+gridBG.width}, 250, Phaser.Easing.Linear.None, true,100*i).onComplete.add(this.addRest,this);
                }
                else
                    this.add.tween(gridBG).from( { x:this.world.width+gridBG.width}, 250, Phaser.Easing.Linear.None, true,100*i).onComplete.add(function () {    this.plateSound.play();   }, this);
            }
    },
    
    tutAnimSwitcher:function()
    {
        if(this.currentTutAnim == 1)        this.tutAnim1();
        else if(this.currentTutAnim == 2)   this.tutAnim2();
        else if(this.currentTutAnim == 3)   this.tutAnim3();
        else if(this.currentTutAnim == 4)
            {
                this.tutSprite.destroy(true,false);
                this.tutSprite = null;
            }
    },
    
    tutAnimAlpha:function()
    {
        this.add.tween(this.tutSprite).to( { alpha:0}, 1000, Phaser.Easing.Linear.None, true).onComplete.add(this.tutAnimSwitcher,this);
    },
    
    tutAnim1:function()
    {
        this.tutSprite.x = this.sl1.x;
        this.tutSprite.y = this.sl1.y;
        this.tutSprite.alpha = 1;
        
        this.add.tween(this.tutSprite).to( { x:this.gridArray[10].sprite.x+this.gridArray[10].sprite.width/2,y:this.gridArray[10].sprite.y+this.gridArray[10].sprite.height/2}, 1000, Phaser.Easing.Linear.None, true).onComplete.add(this.tutAnimAlpha,this);
    },
    
    tutAnim2:function()
    {
        this.tutSprite.x = this.sl2.x;
        this.tutSprite.y = this.sl2.y;
        this.tutSprite.alpha = 1;
        
        this.add.tween(this.tutSprite).to( { x:this.gridArray[10].sprite.x+this.gridArray[10].sprite.width/2,y:this.gridArray[10].sprite.y+this.gridArray[10].sprite.height/2}, 1000, Phaser.Easing.Linear.None, true).onComplete.add(this.tutAnimAlpha,this);
    },
    
    tutAnim3:function()
    {
        this.tutSprite.x = this.sl3.x;
        this.tutSprite.y = this.sl3.y;
        this.tutSprite.alpha = 1;
        
        this.add.tween(this.tutSprite).to( { x:this.gridArray[1].sprite.x+this.gridArray[1].sprite.width/2,y:this.gridArray[1].sprite.y+this.gridArray[1].sprite.height/2}, 1000, Phaser.Easing.Linear.None, true).onComplete.add(this.tutAnimAlpha,this);
    },
    
    addRest:function()
    {
        this.plateSound.play(); 
        this.pauseBtn = this.add.button(0,0,'pauseBtn',this.pauseGame,this,0,0,1,0);
        this.pauseBtn.anchor.setTo(0.5,0.5);
        this.pauseBtn.x = this.gridArray[0].sprite.x + this.pauseBtn.width/2;
        this.pauseBtn.y = this.gridArray[0].sprite.y - this.pauseBtn.height*0.625;
        this.pauseBtn.setDownSound(this.buttonSound);

        this.shuffleBtn = this.add.button(0,0,'shuffleBtn',this.showShuffleDesc,this,0,0,1,0);
        this.shuffleBtn.anchor.setTo(0.5,0.5);
        this.shuffleBtn.x = this.gridArray[0].sprite.x + this.shuffleBtn.width/2;
        this.shuffleBtn.y = this.bottomMiddleY;
        this.shuffleBtn.setDownSound(this.buttonSound);
        
        if(this.digitArray == null)
            {
                this.digitArray = new Array(11);
                this.hiDigitArray = new Array(11);
                this.coinArray = new Array(11);
                
                for(var j = 0;j<11;j++)
                {
                    this.digitArray[j] = this.add.sprite(0,0,"digits");
                    this.digitArray[j].anchor.setTo(0.5,0.5);
                    this.digitArray[j].x = (this.gridArray[3].sprite.x + this.gridArray[3].sprite.width - this.digitArray[j].width/2) - (this.digitArray[j].width/1.75*j);
                    this.digitArray[j].y = this.pauseBtn.y + this.digitArray[j].height/4;
                    this.digitArray[j].visible = false;
                    
                    this.hiDigitArray[j] = this.add.sprite(0,0,"hidigits");
                    this.hiDigitArray[j].anchor.setTo(0.5,0.5);
                    this.hiDigitArray[j].x = (this.gridArray[3].sprite.x + this.gridArray[3].sprite.width - this.hiDigitArray[j].width/2) - (this.hiDigitArray[j].width/1.75*j);
                    this.hiDigitArray[j].y = this.digitArray[j].y - this.hiDigitArray[j].height;
                    this.hiDigitArray[j].visible = false;
                    
                    /*this.coinArray[j] = this.add.sprite(0,0,"digits");
                    this.coinArray[j].anchor.setTo(0.5,0.5);
                    this.coinArray[j].x = (this.world.width - this.coinArray[j].width) - (this.coinArray[j].width*j);
                    this.coinArray[j].y = shuffleValue.y;
                    this.coinArray[j].visible = false;*/
                    
                }
                this.medalSprite = this.add.sprite(0,0,"medal");
                this.medalSprite.anchor.setTo(0.5,0.5);
            }
        else
            {
                for(var j = 0;j<11;j++)
                {
                    this.digitArray[j].frame = 0;
                    this.hiDigitArray[j].frame = 0;
                    //this.coinArray[j].frame = 0;
                }
            }
        
        this.medalSprite.y = this.hiDigitArray[j-1].y;
        this.points = Game5x.saveObject[this.modeString][this.typeString].currentScore;
        this.updateDigits();
        
        if(Game5x.saveObject[this.modeString][this.typeString].gameOver)
        {
            this.gameOver = true;
            this.gameOverTxt = this.add.sprite(this.world.centerX,0,'gameOver');
            this.gameOverTxt.y = this.bottomMiddleY;
            this.gameOverTxt.anchor.setTo(0.5,0.5);

            
            this.shuffleBtn.visible = false;


            this.add.tween(this.gameOverTxt).from( { y:this.world.height+this.gameOverTxt.height*2 }, 500, Phaser.Easing.Back.Out, true,350);

        }
        else
        {
            this.generateNumbers();
        }
        
        if(Game5x.saveObject.firstRun)
            {
                //this.createHelp();
                this.tutSprite = this.add.sprite(0,0,"hand");
                this.currentTutAnim = 1;
                this.tutAnimSwitcher();
            }
    },
    
    onGameOver:function()
    {
        /*this.gameOver = true;
        this.gameOverGroup = this.add.group();
        
        this.pauseBtn.destroy(true,false);
        this.pauseBtn = null;
        
        this.shuffleBtn.destroy(true,false);
        this.shuffleBtn = null;
        this.coinBtn.destroy(true,false);
        this.coinBtn = null;
        
        this.gameOverSound.play();
        
        if(Game5x.saveObject.showAd)
            Appodeal.show(Appodeal.INTERSTITIAL);
        
        var goBG = this.add.graphics( 0, 0 );
        goBG.beginFill(Game5x.darkThemeColor[Game5x.saveObject.theme-1], 1);
        goBG.drawRect(0, 0, this.world.width, this.world.height);
        this.gameOverGroup.add(goBG);
        
        var gameOverTxt = this.add.sprite(this.world.centerX,0,'gameOverTxt');
        gameOverTxt.y = this.world.centerY/2 - gameOverTxt.height;
        gameOverTxt.anchor.setTo(0.5,0.5);
        this.gameOverGroup.add(gameOverTxt);
        
        
        var report = this.add.group();
        var reportBG = this.add.graphics( 0, 0 );
        reportBG.beginFill(Game5x.bgThemeColor[Game5x.saveObject.theme-1],1);
        reportBG.drawRect(0, 0, this.world.width, this.world.height*0.3);
        reportBG.y = Math.round(this.world.centerY - reportBG.height/2);
        report.add(reportBG);
        
        var gameName = this.add.sprite(0,0,"gameName");
        gameName.anchor.setTo(0.5,0.5);
        gameName.x = this.world.width/4;
        gameName.y = this.world.centerY;
        report.add(gameName);
        
        var modeSP = this.add.sprite(0,0,"modes");
        modeSP.frame = this.mode==4?2:this.mode-1;
        modeSP.anchor.setTo(0.5,0.5);
        modeSP.x = 7*this.world.width/8 - modeSP.width/2;
        modeSP.y = this.world.centerY+modeSP.height*1.5;
        report.add(modeSP);
        
        var gameTypeSP = this.add.sprite(0,0,"gameTypes");
        gameTypeSP.frame = this.gameType - 1;
        gameTypeSP.anchor.setTo(1,0.5);
        gameTypeSP.x = modeSP.x + modeSP.width/2;
        gameTypeSP.y = this.world.centerY+modeSP.height*3;
        report.add(gameTypeSP);
        
        var hiString = Game5x.saveObject[this.modeString][this.typeString].hiScore.toString();
        var numberString = this.points.toString();
        
        var hiScore;
        for(var j = 0; j < hiString.length; j++)
            {
                hiScore = this.add.sprite(0,this.world.centerY,"hidigits");
                hiScore.frame = parseInt(hiString.charAt(hiString.length-1-j));
                hiScore.x = 7*this.world.width/8 - (hiScore.width)*j;
                hiScore.y = this.world.centerY - hiScore.height*3;
                hiScore.anchor.setTo(0.5,0.5);
                report.add(hiScore);
             
            }
        var ms = this.add.sprite(0,hiScore.y,"medal");
        ms.x = hiScore.x - ms.width*1.5;
        ms.anchor.setTo(0.5,0.5);
        report.add(ms);
        
        var score;
        for(var i = 0; i < numberString.length; i++)
            {
                score = this.add.sprite(0,this.world.centerY,"digits");
                score.frame = parseInt(numberString.charAt(numberString.length-1-i));
                score.x = 7*this.world.width/8 - (score.width)*i;
                score.y = this.world.centerY - (score.height)*1.5;
                score.anchor.setTo(0.5,0.5);
                report.add(score);
            }
        
        reportBG.height = gameTypeSP.y + modeSP.height - (ms.y - ms.height);
        reportBG.height *= 1.25;
        reportBG.y = this.world.centerY - reportBG.height/2;
        
        this.reportBGDetails = new Object();
        this.reportBGDetails.height = reportBG.height;
        this.reportBGDetails.y = reportBG.y;
        
        this.gameOverGroup.add(report);
        
        var resetBtn = this.add.button(this.world.centerX+this.world.centerX/1.5,0,'resetBtn',this.resetGame,this,0,0,1,0);
        resetBtn.y = (this.world.height + reportBG.y + reportBG.height)/2;
        resetBtn.anchor.setTo(0.5,0.5);
        resetBtn.setDownSound(this.buttonSound);
        this.gameOverGroup.add(resetBtn);
        
        var shareBtn = this.add.button(this.world.centerX,0,'shareBtn',this.shareGame,this,0,0,1,0);
        shareBtn.y = resetBtn.y;
        shareBtn.anchor.setTo(0.5,0.5);
        shareBtn.setDownSound(this.buttonSound);
        this.gameOverGroup.add(shareBtn);
        
        var home = this.add.button(this.world.centerX-this.world.centerX/1.5,0,'home',this.gotoHome,this,0,0,1,0);
        home.y = resetBtn.y;
        home.anchor.setTo(0.5,0.5);
        home.setDownSound(this.buttonSound);
        this.gameOverGroup.add(home);*/
        
        if(Game5x.saveObject.showAd && AdMob)
        {
            console.log("showing ad on gameover");
            AdMob.showInterstitial();
            this.cacheInterstitial();
        }
        
        this.gameOver = true;
        
        this.gameOverSound.play();
        
        this.gameOverTxt = this.add.sprite(this.world.centerX,0,'gameOver');
        this.gameOverTxt.y = this.bottomMiddleY;
        this.gameOverTxt.anchor.setTo(0.5,0.5);

        this.shuffleBtn.visible = false;

        window.plugins.playGamesServices.isSignedIn(this.onAuthCheck);

        this.add.tween(this.gameOverTxt).from( { y:this.world.height+this.gameOverTxt.height}, 500, Phaser.Easing.Back.Out, true,350);

        if(this.sl1.visible) this.add.tween(this.sl1).to( { alpha: 1,y:this.world.height+this.sl1.height }, 250, Phaser.Easing.Linear.None, true);
        if(this.sl2.visible) this.add.tween(this.sl2).to( { alpha: 1,y:this.world.height+this.sl1.height }, 350, Phaser.Easing.Linear.None, true);
        if(this.sl3.visible) this.add.tween(this.sl3).to( { alpha: 1,y:this.world.height+this.sl1.height }, 450, Phaser.Easing.Linear.None, true);

        if(this.rn1.visible) this.add.tween(this.rn1).to( { alpha: 1,y:this.world.height+this.sl1.height }, 250, Phaser.Easing.Linear.None, true);
        if(this.rn2.visible) this.add.tween(this.rn2).to( { alpha: 1,y:this.world.height+this.sl1.height }, 350, Phaser.Easing.Linear.None, true);
        if(this.rn3.visible) this.add.tween(this.rn3).to( { alpha: 1,y:this.world.height+this.sl1.height }, 450, Phaser.Easing.Linear.None, true);
    },

    onAuthCheck:function(result)
    {
        if(result.isSignedIn)
        {
            var modes = ["Game1x","Game1x","Game2x","Game2x","Game4x","Game4x"];
            var gameTypes = ["typePM","typePPPM","typePM","typePPPM","typePM","typePPPM"];
            var data;
            var modeString = "Game"+Game5x.saveObject.currentMode+"x";
            var typeString = Game5x.saveObject.currentGameType == 1?"typePM":"typePPPM";
            var saveObj = Game5x.saveObject[modeString][typeString];
            for(var i=0;i<leaderBoadIds.length;i++)
                {
                    data = {
                        score: Game5x.saveObject[modes[i]][gameTypes[i]].hiScore,
                        leaderboardId: leaderBoadIds[i]
                    };

                    console.log(modes[i],modeString,gameTypes[i],typeString);
                    
                    if(modes[i] == modeString && gameTypes[i] == typeString){

                        if(saveObj.currentScore >= saveObj.hiScore)
                            window.plugins.playGamesServices.submitScore(data);
                    }
                }
        }
    },

    showShuffleDesc:function()
    {
        this.pauseGroup = this.add.group();
        
        var bg = this.add.graphics( 0, 0 );
        bg.beginFill(0x424242, 0.85);
        bg.drawRect(0, 0, this.world.width, this.world.height);
        this.pauseGroup.add(bg);
        
        var subMenuBG = this.add.sprite(this.world.centerX,this.world.centerY,'subMenu');
        subMenuBG.anchor.setTo(0.5,0.5);
        this.pauseGroup.add(subMenuBG);
        
        var cancelBtn = this.add.button(this.world.centerX,0,'cancelBtn',this.resumeGame,this,0,0,1,0);
        cancelBtn.anchor.setTo(0.5,0.5);
        //cancelBtn.x = this.world.width/2 - cancelBtn.width;
        cancelBtn.y = subMenuBG.y + subMenuBG.height/2 - cancelBtn.height/1.5;
        cancelBtn.setDownSound(this.buttonSound);
        cancelBtn.scale.setTo(0.75,0.75);
        this.pauseGroup.add(cancelBtn);
        
        var shuffleDesc = this.add.sprite(this.world.centerX,this.world.centerY,'shuffleDesc');
        shuffleDesc.anchor.setTo(0.5,0.5);
        this.pauseGroup.add(shuffleDesc);

        var videoBtn = this.add.button(this.world.centerX,0,'videoBtn',this.showRewardAd,this,0,0,1,0);
        videoBtn.anchor.setTo(0.5,0.5);
        videoBtn.x = this.world.width/2 - subMenuBG.width/2 + videoBtn.width*1.75;
        videoBtn.y = this.world.centerY - videoBtn.height/6;
        videoBtn.setDownSound(this.buttonSound);
        this.pauseGroup.add(videoBtn);

        var heartBtn = this.add.button(this.world.centerX,0,'heartBtn',this.sendBackNumbers,this,0,0,1,0);
        heartBtn.anchor.setTo(0.5,0.5);
        heartBtn.x = this.world.width/2 + subMenuBG.width/2 - heartBtn.width*1.75;
        heartBtn.y = this.world.centerY - heartBtn.height/6;
        heartBtn.setDownSound(this.buttonSound);
        this.pauseGroup.add(heartBtn);
        
        var heartIcon = this.add.sprite(subMenuBG.x - subMenuBG.width/5,shuffleDesc.y-shuffleDesc.height,'heartIcon');
        heartIcon.anchor.setTo(0.5,0.5);
        this.pauseGroup.add(heartIcon);

        var heartNumSprite;
        var coinString = Game5x.saveObject.coins.toString();
        for(var j = 0;j<coinString.length;j++)
                {
                    heartNumSprite = this.add.sprite(0,shuffleDesc.y-shuffleDesc.height,"digits");
                    heartNumSprite.anchor.setTo(0.5,0.5);
                    heartNumSprite.x = (subMenuBG.x + subMenuBG.width/4 - heartNumSprite.width/2) - ((heartNumSprite.width/1.75)*j);
                    heartNumSprite.frame = parseInt(coinString.charAt(coinString.length-1-j));
                    this.pauseGroup.add(heartNumSprite);
                    //heartNumSprite.visible = false;
                }
        
        this.add.tween(this.pauseGroup).from( { y:-this.pauseGroup.height}, 750, Phaser.Easing.Back.Out, true);
        
    },

    showRewardAd:function()
    {
        this.resumeGame();
        universalThis = this;
        AdMob.showRewardVideoAd();
        AdMob.prepareRewardVideoAd( {adId:admob_reward, autoShow:false} );
    },

    pauseGame:function()
    { 
        if(this.pauseBtn)
        {
            this.pauseBtn.destroy(true,false);
            this.pauseBtn = null;
        }
        
        if(this.sl1 != null)
        {
            this.sl1.inputEnabled = false;this.sl2.inputEnabled = false;this.sl3.inputEnabled = false;
        }
        
        this.subMenuTrans = this.add.graphics( 0, 0 );
        this.subMenuTrans.beginFill(0x424242, 0.85);
        this.subMenuTrans.drawRect(0, 0, this.world.width, this.world.height);
        
        this.pauseGroup = this.add.group();
        var subMenuBG = this.add.sprite(this.world.centerX,this.world.centerY,'subMenu');
        subMenuBG.anchor.setTo(0.5,0.5);
        this.pauseGroup.add(subMenuBG);
        
        var resetBtn = this.add.button(0,0,'restartBtn',this.tweenOutForReset,this,0,0,1,0);
        resetBtn.x = subMenuBG.x + subMenuBG.width/4;//this.world.width/2 + this.world.width/3.5;
        resetBtn.y = this.world.height/1.8-resetBtn.height/1.5;
        resetBtn.anchor.setTo(0.5,0.5);
        resetBtn.setDownSound(this.buttonSound);
        this.pauseGroup.add(resetBtn);
        
        if(!this.gameOver)
        {
            var bigPlayBtn = this.add.button(this.world.centerX,0,'bigPlayBtn',this.resumeGame,this,0,0,1,0);
            bigPlayBtn.x = this.world.width/2;
            bigPlayBtn.y = subMenuBG.y - subMenuBG.height/2 + bigPlayBtn.height/1.15;
            bigPlayBtn.anchor.setTo(0.5,0.5);
            bigPlayBtn.setDownSound(this.buttonSound);
            this.pauseGroup.add(bigPlayBtn);

            var bigSettingsBtn = this.add.button(0,0,'pauseSettingsBtn',this.inGameSettings,this,0,0,1,0);
            bigSettingsBtn.x = subMenuBG.x;//this.world.width/2;
            bigSettingsBtn.y = resetBtn.y;
            bigSettingsBtn.anchor.setTo(0.5,0.5);
            bigSettingsBtn.setDownSound(this.buttonSound);
            this.pauseGroup.add(bigSettingsBtn);

            var helpBtn = this.add.button(0,0,'questionBtn',this.tweenOutForHelp,this,0,0,1,0);
            helpBtn.x = this.world.width/2;
            helpBtn.y = subMenuBG.y + subMenuBG.height/2 - helpBtn.height;
            helpBtn.anchor.setTo(0.5,0.5);
            helpBtn.setDownSound(this.buttonSound);
            this.pauseGroup.add(helpBtn);

            /*var shuffleBtn = this.add.button(0,0,"shuffleBtn",this.sendBackNumbers,this,0,0,1,0);
            shuffleBtn.x = this.world.centerX;
            shuffleBtn.y = this.world.height/1.8+shuffleBtn.height/1.5;
            shuffleBtn.anchor.setTo(0.5,0.5);
            shuffleBtn.setDownSound(this.buttonSound);
            this.pauseGroup.add(shuffleBtn);*/

            var heartIcon = this.add.sprite(0,0,"heartIcon");
            heartIcon.anchor.setTo(0.5,0.5)
            heartIcon.x = subMenuBG.x - subMenuBG.width/4;
            heartIcon.y = subMenuBG.y - subMenuBG.height/1.85;
            this.pauseGroup.add(heartIcon);
            
            if(Game5x.saveObject.doubleCoin)
                heartIcon.frame++;
            
            var heartNumSprite;
            var coinString = Game5x.saveObject.coins.toString();
            for(var j = 0;j<coinString.length;j++)
                    {
                        heartNumSprite = this.add.sprite(0,heartIcon.y,"digits");
                        heartNumSprite.anchor.setTo(0.5,0.5);
                        heartNumSprite.x = (subMenuBG.x + subMenuBG.width/4 - heartNumSprite.width/2) - ((heartNumSprite.width/1.75)*j);
                        heartNumSprite.frame = parseInt(coinString.charAt(coinString.length-1-j));
                        this.pauseGroup.add(heartNumSprite);
                        //heartNumSprite.visible = false;
                    }
        }
        /*else
        {
            var shareBtn = this.add.button(0,0,'shareBtn',this.shareGame,this,0,0,1,0);
            shareBtn.x = subMenuBG.x;//this.world.width/2;
            shareBtn.y = resetBtn.y;
            shareBtn.anchor.setTo(0.5,0.5);
            shareBtn.setDownSound(this.buttonSound);
            this.pauseGroup.add(shareBtn);
        }*/
        
        var home = this.add.button(0,0,'homeBtn',this.gotoHome,this,0,0,1,0);
        home.x = subMenuBG.x - subMenuBG.width/4;//worldWidth/2 - worldWidth/3.5;
        home.y = resetBtn.y;
        home.anchor.setTo(0.5,0.5);
        home.setDownSound(this.buttonSound);
        this.pauseGroup.add(home);


        this.add.tween(this.pauseGroup).from( { y:-this.pauseGroup.height}, 750, Phaser.Easing.Back.Out, true);
    },
    
    gotoHome:function(home)
    {
        document.removeEventListener("backbutton", this.backButtonPressed, false);
        
        if(home)
            home.destroy(true,false);
        this.digitArray = null;
        this.bg.kill();
        this.bg = null;
        this.state.start('Menu');
    },
    
    tweenOutForReset:function(btn)
    {
        btn.onInputUp.remove(this.tweenOutForReset,this);
        this.add.tween(this.pauseGroup).to( { y:-this.pauseGroup.height}, 750, Phaser.Easing.Back.In, true).onComplete.add(this.resetGame,this);
    },

    tweenOutForHelp:function()
    {
        if(this.subMenuTrans)
            {
                this.subMenuTrans.kill();
            }
        this.add.tween(this.pauseGroup).to( { y:-this.pauseGroup.height}, 750, Phaser.Easing.Back.In, true).onComplete.add(this.createHelp,this);
    },

    shareGame:function(btn)
    {
        btn.onInputUp.remove(this.shareGame,this);
        if(this.subMenuTrans)
            {
                this.subMenuTrans.kill();
            }
        if(this.pauseGroup)
            {
                this.pauseGroup.destroy(true,false);
                var reAdd = this.time.create();
                reAdd.add(Phaser.Timer.SECOND * 1.5,this.saveImage,this);
                reAdd.start();
                //this.pauseGroup = null;
            }
        

        /*try{
        createReportCard(this.points,this.theme);
        }
        catch(e)
            {
                alert(e);
            }*/
                
                //this.resetGame();
    },
    
    saveImage:function()
    {
        //window.open(this.game.canvas.toDataURL('image/png'));
        window.plugins.socialsharing.share(null, "My Score", this.game.canvas.toDataURL('image/png'), null);
        
    },
    
    createHelp:function()
    {
        if(this.pauseGroup)
            this.pauseGroup.destroy(true,false);
        this.pauseGroup = null;
        
        this.subMenuTrans = this.add.graphics( 0, 0 );
        this.subMenuTrans.beginFill(0x424242, 0.5);
        this.subMenuTrans.drawRect(0, 0, this.world.width, this.world.height);
        
        this.helpGroup = this.add.group();
        
        var hSprite = this.helpGroup.create(this.world.centerX,this.world.centerY,"help");
        hSprite.anchor.setTo(0.5,0.5);
        
        var dSprite = this.helpGroup.create(this.world.centerX,this.world.centerY/2,"dots");
        dSprite.y = (hSprite.y - hSprite.height/2)/2;
        dSprite.anchor.setTo(0.5,0.5);

        var nextBtn = this.add.button(0,0,'nextBtn',this.changeHelpSprite,this,0,0,1,0);
        nextBtn.anchor.setTo(0.5,0.5);
        nextBtn.x = this.world.centerX;
        nextBtn.y = this.bottomMiddleY;
        nextBtn.setDownSound(this.buttonSound); 
        this.helpGroup.add(nextBtn);
        
        this.subMenuTrans.inputEnabled = true;
        this.subMenuTrans.events.onInputUp.add(this.changeHelpSprite,this);
        
        /*var applyBtn = this.add.button(this.world.centerX,7*this.world.height/8,'applyBtn',this.resumeGame,this,0,0,1,0);
        applyBtn.y = 7*this.world.height/8 + applyBtn.height/2;
        applyBtn.anchor.setTo(0.5,0.5);
        applyBtn.setDownSound(this.buttonSound);
        this.helpGroup.add(applyBtn);*/
    },
    
    changeHelpSprite:function()
    {
      
        if(this.helpGroup.children[1].frame == 4)
            {
                this.resumeGame();
            }
        else
            {
                this.helpGroup.children[0].frame += 1;
                this.helpGroup.children[1].frame += 1;

                this.subMenuTrans.events.onInputUp.remove(this.changeHelpSprite,this);

                var reAdd = this.time.create();
                reAdd.add(Phaser.Timer.SECOND * 0.3,this.reAddEvents,this);
                reAdd.start();
            }
    },
    
    reAddEvents:function()
    {
        if(this.helpGroup)
            this.subMenuTrans.events.onInputUp.add(this.changeHelpSprite,this);
    },
    
    resetGame:function()
    {
        if(this.gameOverTxt)
            {
                this.gameOverTxt.kill();
                this.gameOverTxt = null;
            }
        if(this.subMenuTrans)
        {
            this.subMenuTrans.kill();
        }
        if(this.pauseGroup)
            {
                this.pauseGroup.destroy(true,false);
                this.pauseGroup = null;
            }
        else if(this.gameOverGroup)
            {
                this.gameOverGroup.destroy(true,false);
                this.gameOverGroup = null;
            }
        
        for(var i = 0;i<16;i++)
            {
                Game5x.saveObject[this.modeString][this.typeString].grid[i] = 0;
                Game5x.saveObject[this.modeString][this.typeString].cake[i] = 0;
            }
        
        Game5x.saveObject[this.modeString][this.typeString].rn1 = 0;
        Game5x.saveObject[this.modeString][this.typeString].rn2 = 0;
        Game5x.saveObject[this.modeString][this.typeString].rn3 = 0;
        Game5x.saveObject[this.modeString][this.typeString].sl1 = 0;
        Game5x.saveObject[this.modeString][this.typeString].sl2 = 0;
        Game5x.saveObject[this.modeString][this.typeString].sl3 = 0;
        
        Game5x.saveObject[this.modeString][this.typeString].currentScore = 0;
        Game5x.saveObject[this.modeString][this.typeString].gameOver = false;
        
        Game5x.saveObject[this.modeString][this.typeString].reset = true;
        
        NativeStorage.setItem('TTPsaves', JSON.stringify(Game5x.saveObject));
        
        this.dumpAll();
        this.init();
        this.createGame();
    },
    
    inGameSettings:function()
    {
        this.pauseGroup.destroy(true,false);
        this.pauseGroup = null;
        
        this.newMode = Game5x.saveObject.currentMode;
        this.newGameType = Game5x.saveObject.currentGameType;
        
        this.settingsGroup = this.add.group();
        var subMenuBG = this.add.sprite(this.world.centerX,this.world.centerY,'subMenu');
        subMenuBG.anchor.setTo(0.5,0.5);
        this.settingsGroup.add(subMenuBG);
        
        var _1xBtn = this.add.button(subMenuBG.x - subMenuBG.width/4,subMenuBG.y-subMenuBG.height/9,'6xBtn',this.changeMode,this);
        _1xBtn.anchor.setTo(0.5,0.5);
        _1xBtn.frame = Game5x.saveObject.currentMode == 1?1:2;
        _1xBtn.setDownSound(this.buttonSound);
        this.settingsGroup.add(_1xBtn);
        var _2xBtn = this.add.button(subMenuBG.x,subMenuBG.y-subMenuBG.height/9,'8xBtn',this.changeMode,this);
        _2xBtn.anchor.setTo(0.5,0.5);
        _2xBtn.frame = Game5x.saveObject.currentMode == 2?1:2;
        _2xBtn.setDownSound(this.buttonSound);
        this.settingsGroup.add(_2xBtn);
        var _4xBtn = this.add.button(subMenuBG.x + subMenuBG.width/4,subMenuBG.y-subMenuBG.height/9,'10xBtn',this.changeMode,this);
        _4xBtn.anchor.setTo(0.5,0.5);
        _4xBtn.frame = Game5x.saveObject.currentMode == 4?1:2;
        _4xBtn.setDownSound(this.buttonSound);
        this.settingsGroup.add(_4xBtn);
        
        var pppmBtn = this.add.button(0,subMenuBG.y+subMenuBG.height/9,'pppmBtn',this.changeGameType,this);
        pppmBtn.frame = Game5x.saveObject.currentGameType == 2?1:2;
        pppmBtn.x = subMenuBG.x + subMenuBG.width/5;
        pppmBtn.anchor.setTo(0.5,0.5);
        pppmBtn.setDownSound(this.buttonSound);
        this.settingsGroup.add(pppmBtn);
        var pmBtn = this.add.button(0,subMenuBG.y+subMenuBG.height/9,'pmBtn',this.changeGameType,this);
        pmBtn.frame = Game5x.saveObject.currentGameType == 1?1:2;
        pmBtn.x = subMenuBG.x - subMenuBG.width/5;
        pmBtn.anchor.setTo(0.5,0.5);
        pmBtn.setDownSound(this.buttonSound);
        this.settingsGroup.add(pmBtn);
        
        var audioBtn = this.add.button(0,0,'audioBtn',this.changeAudio,this);
        audioBtn.frame = !this.game.sound.mute?1:0;
        audioBtn.x = this.world.centerX;
        audioBtn.y = subMenuBG.y+subMenuBG.height/2 - audioBtn.height;
        audioBtn.anchor.setTo(0.5,0.5);
        this.settingsGroup.add(audioBtn);
        
        var applyBtn = this.add.button(this.world.centerX,7*this.world.height/8,'applyBtn',this.resumeGame,this,0,0,1,0);
        applyBtn.x = this.world.width/2;
        applyBtn.y = subMenuBG.y - subMenuBG.height/2 + applyBtn.height/1.15;
        applyBtn.anchor.setTo(0.5,0.5);
        this.settingsGroup.add(applyBtn);
        applyBtn.setDownSound(this.buttonSound);
    },

    changeAudio:function(btn)
    {
        this.game.sound.mute = !this.game.sound.mute;
        btn.frame = this.game.sound.mute?0:1;
    },

    changeMode:function(btn)
    {
        if(btn.frame == 1) return;
        
        this.settingsGroup.children[1].frame = 0;
        this.settingsGroup.children[2].frame = 0;
        this.settingsGroup.children[3].frame = 0;
        
        if(btn.key == "6xBtn")
            {
                this.newMode = 1;
            }
        else if(btn.key == "8xBtn")
            {
                this.newMode = 2;
            }
        else
            {
                this.newMode = 4;
            }
        
        btn.frame = 1;
    },
    
    changeGameType:function(btn)
    {
        if(btn.frame == 1) return;
        
        this.settingsGroup.children[4].frame = 0;
        this.settingsGroup.children[5].frame = 0;
        
        if(btn.key == "pmBtn")
            {
                this.newGameType = 1;
            }
        else
            {
                this.newGameType = 2;
            }
        
        btn.frame = 1;
    },
    
    resumeGame:function(btn)
    {
        if(btn)
            btn.onInputUp.remove(this.resumeGame,this);
        if(this.settingsGroup)
            {
                this.add.tween(this.settingsGroup).to( { y:-this.settingsGroup.height}, 750, Phaser.Easing.Back.In, true).onComplete.add(this.afterTweenResume,this);
            }
        else if(this.pauseGroup)
            {
                this.add.tween(this.pauseGroup).to( { y:-this.pauseGroup.height}, 750, Phaser.Easing.Back.In, true).onComplete.add(this.afterTweenResume,this);
            }
        else if(this.helpGroup)
            {
                this.add.tween(this.helpGroup).to( { y:-this.helpGroup.height}, 750, Phaser.Easing.Back.In, true).onComplete.add(this.afterTweenResume,this);
            }
        else if(this.subMenu)
        {
            this.add.tween(this.subMenu).to( { y:-this.subMenu.height}, 750, Phaser.Easing.Back.In, true).onComplete.add(this.afterTweenResume,this);
        }
    },
    
    afterTweenResume:function()
    {
        if(this.subMenuTrans)
            this.subMenuTrans.kill();
        
        if(this.transBG)
            this.transBG.kill();
        
        if(this.settingsGroup)
            {
                this.settingsGroup.destroy(true,false);
                this.settingsGroup = null;
                
                if(this.newGameType != Game5x.saveObject.currentGameType || this.newMode != Game5x.saveObject.currentMode)
                    {
                        Game5x.saveObject.currentMode = this.newMode; Game5x.saveObject.currentGameType = this.newGameType;
                        
                        if(Game5x.saveObject.showAd && AdMob)
                        {
                            console.log("showing ad in settings apply");
                            AdMob.showInterstitial();
                            this.cacheInterstitial();
                        }
                        
                        this.dumpAll();
                        this.init();
                        this.createGame();
                    }
            }
        else if(this.pauseGroup)
            {
                this.pauseGroup.destroy(true,false);
                this.pauseGroup = null;
            }
        else if(this.helpGroup)
            {
                this.helpGroup.destroy(true,false);
                this.helpGroup = null;
            }
        else if(this.buyGroup)
            {
                this.buyGroup.destroy(true,false);
                this.buyGroup = null;
            }
        
        else if(this.subMenu)
        {
            this.subMenu.destroy(true,false);
            this.subMenu = null;
        }
        else if(this.freeCoinMenu)
            {
                this.freeCoinMenu.destroy(true,false);
                this.freeCoinMenu = null;
            }
        
        if(this.sl1 != null)
            {
                this.sl1.inputEnabled = true;this.sl2.inputEnabled = true;this.sl3.inputEnabled = true;
            }
        
        this.pauseBtn = this.add.button(0,0,'pauseBtn',this.pauseGame,this,0,0,1,0);
        this.pauseBtn.anchor.setTo(0.5,0.5);
        this.pauseBtn.x = this.gridArray[0].sprite.x + this.pauseBtn.width/2;
        this.pauseBtn.y = this.gridArray[0].sprite.y - this.pauseBtn.height*0.625;
        this.pauseBtn.setDownSound(this.buttonSound);
        
        /*this.shuffleBtn = this.add.button(0,0,"shuffleBtn",this.sendBackNumbers,this,0,0,1,0);
        this.shuffleBtn.x = this.shuffleBtn.width/2;
        this.shuffleBtn.y = this.bottomMiddleY;
        this.shuffleBtn.anchor.setTo(0.5,0.5);*/
        
        /*if(Game5x.saveObject.doubleCoin)
            this.coinBtn = this.add.button(0,0,"coin2xBtn",this.buyMenu,this,0,0,1,0);
        else
            this.coinBtn = this.add.button(0,0,"coinBtn",this.buyMenu,this,0,0,1,0);
        this.coinBtn.x = this.world.width - this.coinBtn.width/2;
        this.coinBtn.y = this.bottomMiddleY;
        this.coinBtn.anchor.setTo(0.5,0.5);*/
    },
    
    sendBackNumbers:function(btn)
    {
        if(Game5x.saveObject.coins < 20)
            {
                
                this.pauseGroup.destroy(true,false);
                this.pauseGroup = null;
                this.buyMenu();
            }
        else
            {
                btn.onInputUp.remove(this.sendBackNumbers,this);

                this.resumeGame();
                this.resetSlices();
                Game5x.saveObject.coins -= 20;
                //this.updateDigits();
            }
    },

    resetSlices:function()
    {

        this.rn1.dontShuffle = !this.rn1.visible;
        this.rn2.dontShuffle = !this.rn2.visible;
        this.rn3.dontShuffle = !this.rn3.visible;

        this.add.tween(this.sl1).to( { alpha: 0,y: this.world.height }, 200, Phaser.Easing.Linear.None, true);
        this.add.tween(this.sl2).to( { alpha: 0,y: this.world.height }, 300, Phaser.Easing.Linear.None, true);
        this.add.tween(this.sl3).to( { alpha: 0,y: this.world.height }, 400, Phaser.Easing.Linear.None, true);
        
        this.add.tween(this.rn1).to( { alpha: 0,y: this.world.height }, 200, Phaser.Easing.Linear.None, true);
        this.add.tween(this.rn2).to( { alpha: 0,y: this.world.height }, 300, Phaser.Easing.Linear.None, true);
        this.add.tween(this.rn3).to( { alpha: 0,y: this.world.height }, 400, Phaser.Easing.Linear.None, true).onComplete.add(function () {    this.generateNumbers();this.performSave(); }, this);
        
    },
    
    
    generateNumbers:function()
    {
        if(Game5x.saveObject.showAd && AdMob)
            {
                var addRno = Math.random();
                if(addRno < 0.05)
                    {
                        console.log("showing ad in generate number");
                        AdMob.showInterstitial();
                        this.cacheInterstitial();
                    }
            }
        
        
        var frameNum = this.mode==1?6:this.mode==2?8:10;
        var savedNumber;
        var setDiff = false;
        var rNo = Math.random();
        for(var i = 1;i<=3;i++)
        {
            if(!this["rn"+i])
                {
                    this["sl"+i] = this.add.sprite(0, 0,"allSlices");
                    this["sl"+i].num = i;
                    this["sl"+i].frame = Math.floor(Math.random()*frameNum);
                    this["sl"+i].x = this.world.centerX + this.pauseBtn.width/2 + this.gap*(i-2); this.sl1.y = this.bottomMiddleY;
                    
                    this["rn"+i] = this.add.sprite(0,0,"digits");
                    this["rn"+i].anchor.setTo(0.5,0.5);
                    this["rn"+i].frame = Math.ceil(Math.random()*6);
                    this["rn"+i].x = this["sl"+i].x - this["rn"+i].width/2;
                    
                    this["sl"+i].defaultX = this["sl"+i].x;
                    this["sl"+i].defaultY = this.bottomMiddleY;
                    this["rn"+i].defaultX = this["rn"+i].x;
                    this["rn"+i].defaultY = this.bottomMiddleY-this["rn"+i].height/2;
                    
                    this["sl"+i].anchor.setTo(0.5,0.5);
                    this["rn"+i].anchor.setTo(0.5,0.5);
                    
                    savedNumber = Game5x.saveObject[this.modeString][this.typeString]["rn"+i];
                    
                    if(savedNumber!=0)
                        {
                            this["rn"+i].frame = savedNumber;
                            this["sl"+i].frame = Game5x.saveObject[this.modeString][this.typeString]["sl"+i];
                        }
                    else if(Game5x.saveObject[this.modeString][this.typeString].reset)
                        {
                            this["sl"+i].frame = Math.floor(Math.random()*frameNum);
                            this["rn"+i].frame = Math.ceil(Math.random()*6);
                            Game5x.saveObject[this.modeString][this.typeString]["rn"+i] = (this["rn"+i].frame);
                            Game5x.saveObject[this.modeString][this.typeString]["sl"+i] = (this["sl"+i].frame);
                        }
                    else
                        {
                            this["rn"+i].visible = false;
                            this["sl"+i].visible = false;
                        }
                    
                    this["rn"+i].dontShuffle = false;
                    this["sl"+i].inputEnabled = true;
                    this["sl"+i].input.enableDrag();
                    this["sl"+i].events.onDragStart.add(this.startDrag,this);
                    this["sl"+i].events.onDragStop.add(this.stopDrag,this);
                    this["sl"+i].events.onDragUpdate.add(this.dragUpdate,this);
                    
                }
            else
                {
                    if(!this["sl"+i].dontShuffle)
                        {
                            this["sl"+i].frame = Math.floor(Math.random()*frameNum);
                            this["rn"+i].frame = Math.ceil(Math.random()*6);
                            Game5x.saveObject[this.modeString][this.typeString]["rn"+i] = (this["rn"+i].frame);
                            Game5x.saveObject[this.modeString][this.typeString]["sl"+i] = (this["sl"+i].frame);
                            
                            this["rn"+i].visible = true;
                            this["sl"+i].visible = true;
                        }
                }
            
            this["sl"+i].y = this.bottomMiddleY;
            this["rn"+i].y = this["sl"+i].y-this["rn"+i].height/2;
            this["sl"+i].inputEnabled = this["sl"+i].visible;
            this["sl"+i].alpha = 1;
            this["rn"+i].alpha = 1;
            
            if(this["sl"+i].visible && !Game5x.saveObject.firstRun)
            {
                this.add.tween(this["sl"+i]).from( { alpha: 1, y: this.world.height+this.sl1.height/2 }, 500, Phaser.Easing.Linear.None, true,((i-1)*200)).onStart.add(function () {    this.generateNumbersSound.play();   }, this);
                this.add.tween(this["rn"+i]).from( { alpha: 1, y: this.world.height+this.sl1.height/2 }, 500, Phaser.Easing.Linear.None, true,((i-1)*200));
            }
            
        }
        
        Game5x.saveObject[this.modeString][this.typeString].reset = false;
    },
    
    getCakeName:function(sliceFrame)
    {
        if(sliceFrame==0) return "jellyCake";
        else if(sliceFrame==1) return "limeCake";    
        else if(sliceFrame==2) return "lemonPie";    
        else if(sliceFrame==3) return "creamCake";   
        else if(sliceFrame==4) return "rassCake";    
        else if(sliceFrame==5) return "blueberryCake";
        else if(sliceFrame==6) return "orangeCake";  
        else if(sliceFrame==7) return "straberryPie";
        else if(sliceFrame==8) return "pineappleCake";
        else if(sliceFrame==9) return "strawberryCake";
    },

    startDrag:function(slSprite)
    {
        this.pickNumberSound.play();
        
        slSprite.bringToTop(); 
        slSprite.scale.x = slSprite.scale.y = 1.1;
        
        this.draggingRn = this["rn"+slSprite.num];

        this.draggingRn.bringToTop();
        this.draggingRn.scale.x = this.draggingRn.scale.y = 1.1;
        this.draggingRn.x = slSprite.x - this.draggingRn.width/2; 
        this.draggingRn.y = slSprite.y - this.draggingRn.height/2;
        
        //slSprite.anchor.setTo(0.5,1.5);
    },
    
    dragUpdate:function(slSprite, pointer, dragX, dragY, snapPoint) 
    {
        slSprite.y = dragY - (slSprite.height >> 1);
        
        if(this.draggingRn)
        {
            this.draggingRn.x = slSprite.x - (this.draggingRn.width >> 1); 
            this.draggingRn.y = slSprite.y - (this.draggingRn.height >> 1);
        }
    },
    
    stopDrag:function(slSprite)
    {
        var rnX = slSprite.x;
        var rnY = slSprite.y;
        
        var gridObj;
        var gapDiffBy2 = ((this.gap-slSprite.width)/2);
        var snapped = false;
        for(var i = 0;i<16;i++)
            {
                gridObj = this.gridArray[i];
                
                if(rnX >= (gridObj.x - gapDiffBy2) && rnX < (gridObj.x + gapDiffBy2 + slSprite.width))
                    {
                        if(rnY >= (gridObj.y - gapDiffBy2) && rnY < (gridObj.y + gapDiffBy2 + slSprite.height))
                            {
                                slSprite.scale.x = slSprite.scale.y = 1;
                                slSprite.x = gridObj.x + slSprite.width/2; slSprite.y = gridObj.y + slSprite.height/2;
                                
                                slSprite.snappedIndex = gridObj.index;
                                
                                this.tweenToAdd(gridObj,slSprite);
                                snapped = true;
                            }
                    }
            }
        
        if(!snapped)
            {
                slSprite.scale.x = slSprite.scale.y = 1;
                slSprite.x = slSprite.defaultX; slSprite.y = slSprite.defaultY;
                
                this.draggingRn.scale.x = this.draggingRn.scale.y = 1;
                this.draggingRn.x = this.draggingRn.defaultX; this.draggingRn.y = this.draggingRn.defaultY;
            
            }
        
        this.draggingRn = null;
        this.addNumbersSound.play();
    },
    
    tweenToAdd:function(gridObj,slSprite)
    {
        if(this.tutSprite != null) this.currentTutAnim++;
        
        var randomNumber = this["rn"+slSprite.num].frame;
        
        var shouldAdd = gridObj.value + randomNumber <= 6?(gridObj.cakeHolder?(gridObj.cakeHolder.cakeNumber == slSprite.frame?true:false):true) : false;
        
        if(shouldAdd)
            {
                slSprite.inputEnabled = false;
                
                if(gridObj.value === 0)
                    {
                        gridObj.value += randomNumber;
                        if(gridObj.cakeHolder==null)
                        {
                            gridObj.cakeHolder = this.add.sprite(0,0,this.getCakeName(slSprite.frame));
                            gridObj.cakeHolder.x = gridObj.sprite.x;
                            gridObj.cakeHolder.y = gridObj.sprite.y;
                            gridObj.cakeHolder.cakeNumber = slSprite.frame;
                            
                            gridObj.cakeHolder.scale.setTo(globalScale,globalScale);
                        }
                        gridObj.cakeHolder.frame = gridObj.value-1;
                
                        this.onAddTweenComplete(slSprite);
                    }
                else
                    {
                        gridObj.value += randomNumber;
                        gridObj.cakeHolder.frame = gridObj.value-1;
                        
                        this.onAddTweenComplete(slSprite);
                    }
                
            }
        else
            {
                slSprite.scale.x = slSprite.scale.y = 1;
                slSprite.x = slSprite.defaultX; slSprite.y = slSprite.defaultY;
                
                this["rn"+slSprite.num].scale.x = this["rn"+slSprite.num].scale.y = 1;
                this["rn"+slSprite.num].x = this["rn"+slSprite.num].defaultX; this["rn"+slSprite.num].y = this["rn"+slSprite.num].defaultY;
            }
    },
    
    onAddTweenComplete:function(slSprite)
    {
        this.justSubtracted = false;
        
        var index = slSprite.snappedIndex;
        
        if(this.gameType == 1)
            {
                this.minusCheck(index,this.gridArray[index].value);
                this.performMinus();
                this.deleteGridSp = [];
            }
        else
            {
                if(this.allSnapedNumbers.indexOf(index)==-1)
                    this.allSnapedNumbers.push(index);
            }
        
        slSprite.x = slSprite.defaultX; slSprite.y = slSprite.defaultY;
        slSprite.visible = false;
        
        this["rn"+slSprite.num].x = this["rn"+slSprite.num].defaultX; this["rn"+slSprite.num].y = this["rn"+slSprite.num].defaultY;
        this["rn"+slSprite.num].visible = false;
        
        if(!this.rn1.visible && !this.rn2.visible && !this.rn3.visible)
        {
            this.onTurnEnd();
        }
        else
        {
            this.checkForGameOver();
        }
        
        this.performSave();
        
    },
    
    onTurnEnd:function()
    {
        if(this.gameType == 2)
            {
                while(this.allSnapedNumbers.length > 0)
                    {
                        index = this.allSnapedNumbers.pop();
                        this.minusCheck(index,this.gridArray[index].value);
                    }

                this.performMinus();
                this.deleteGridSp = [];
            }
        
        this.rn1.dontShuffle = false;this.rn2.dontShuffle = false;this.rn3.dontShuffle = false;
        
        this.checkForGameOver();

        if(!this.gameOver)
            this.generateNumbers();
    },
    
    minusCheck:function(index,value)
    {
        var delCurrent = false;
        var cakeNumber = this.gridArray[index].cakeHolder.cakeNumber;
        
        if(index !==0 && this.gridArray[index-1].cakeHolder && cakeNumber == this.gridArray[index-1].cakeHolder.cakeNumber && this.gridArray[index-1].value === value && index%4 != 0)
		{
			delCurrent = true;
            
            if(this.deleteGridSp.indexOf(index-1)==-1)
			     this.deleteGridSp.push(index-1);	
		}
		if(index!=15 && this.gridArray[index+1].cakeHolder && cakeNumber == this.gridArray[index+1].cakeHolder.cakeNumber && this.gridArray[index+1].value == value && (index+1)%4 != 0)
		{
			delCurrent = true;
            
            if(this.deleteGridSp.indexOf(index+1)==-1)
			     this.deleteGridSp.push(index+1);	
		}
        if(index-4>=0 && this.gridArray[index-4].cakeHolder && cakeNumber == this.gridArray[index-4].cakeHolder.cakeNumber && this.gridArray[index-4].value == value)
		{
			delCurrent = true;
            
            if(this.deleteGridSp.indexOf(index-4)==-1)
			     this.deleteGridSp.push(index-4);	
		}
		if(index+4 < 16 && this.gridArray[index+4].cakeHolder && cakeNumber == this.gridArray[index+4].cakeHolder.cakeNumber && this.gridArray[index+4].value == value)
		{
			delCurrent = true;
            
            if(this.deleteGridSp.indexOf(index+4)==-1)
			     this.deleteGridSp.push(index+4);	
        }
        
        if(delCurrent)
        {
            if(this.deleteGridSp.indexOf(index)==-1)
                this.deleteGridSp.push(index);
        }
    },
    
    performMinus:function()
    {
        if(this.deleteGridSp.length === 0) return;
        
        var index;
        var tempSp;
        
        var earnedCoin = false;
        for(var j = 0;j<this.deleteGridSp.length;j++)
            {
                index = this.deleteGridSp[j];
                var count = this.countMatches(index,this.gridArray[index].value);
                if(count >= 3)
                {
                    if(Game5x.saveObject.doubleCoin)
                        Game5x.saveObject.coins+=2;
                    else
                        Game5x.saveObject.coins++;
                    
                    //if(count == 4)  window.game.unlockAchievement(_match4AchivemenID);
                    //else if(count == 5)  window.game.unlockAchievement(_match5AchivemenID);
                    
                }
                earnedCoin = count >= 3;
            }
        for(var i = 0;i<this.deleteGridSp.length;i++)
            {
                index = this.deleteGridSp[i];
                
                this.add.tween(this.gridArray[index].cakeHolder).to( { alpha: 0 }, 300, Phaser.Easing.Linear.None, true).onComplete.add( function(tSprite) { tSprite.kill();});
                
                this.add.tween(this.gridArray[index].cakeHolder).to( { x:this.world.height+this.gridArray[index].cakeHolder.width}, 250, Phaser.Easing.Linear.None, true);
                this.add.tween(this.gridArray[index].sprite).to( { x:this.world.height+this.gridArray[index].sprite.width}, 250, Phaser.Easing.Linear.None, true).onComplete.add(this.tweenNewPlates,this);

                this.points += this.gridArray[index].value;
                this.updateDigits();
                this.gridArray[index].value = 0;
            }
        
        this.justSubtracted = true;
        
        if(!earnedCoin)
            this.minusNumbersSound.play();
        else
        {
            this.purchasedSound.play();
            
            var heartIcon = this.add.sprite(0,0,"heartIcon");
            heartIcon.anchor.setTo(0.5,0.5);
            heartIcon.scale.setTo(5,5);
            heartIcon.x = this.world.centerX;
            heartIcon.y = this.world.centerY;

            if(Game5x.saveObject.doubleCoin)
                heartIcon.frame++;
            
            this.add.tween(heartIcon).to( { alpha: 1,x:this.shuffleBtn.x,y:this.shuffleBtn.y }, 1000, Phaser.Easing.Linear.EaseOut, true).onComplete.add( function(tSprite) { tSprite.destroy();});  ;
            this.add.tween(heartIcon.scale).to( { x:1,y:1 }, 1000, Phaser.Easing.Linear.EaseOut, true);     
            
        }
        if(Game5x.saveObject.showAd && AdMob)
        {
            var addRno = Math.random();
            if(addRno < 0.1)
                {
                    console.log("showing ad in number minus");
                    AdMob.showInterstitial();
                    this.cacheInterstitial();
                }
        }
        
    },
    
    tweenNewPlates:function(plateSprite)
    {
        for (var i = 0; i < this.gridArray.length; i++) 
        {
            if(this.gridArray[i].sprite == plateSprite)
            {
                this.add.tween(plateSprite).to( { x:this.gridArray[i].x}, 250, Phaser.Easing.Linear.None, true).onComplete.add(function () {    this.plateSound.play();   }, this);

                this.gridArray[i].cakeHolder.x = this.gridArray[i].x;this.gridArray[i].cakeHolder.y=this.gridArray[i].y;
                this.gridArray[i].cakeHolder.kill();
                this.gridArray[i].cakeHolder = null;
                this.gridArray[i].value = 0;
            }
        }

        this.performSave();
    },
    
    countMatches:function(index,value)
    {
        var matchCount = 0;
        var cakeNumber = this.gridArray[index].cakeHolder.cakeNumber;
        
        if(index !==0 && this.gridArray[index-1].cakeHolder && cakeNumber == this.gridArray[index-1].cakeHolder.cakeNumber && this.gridArray[index-1].value === value && index%4 != 0)
		{
            matchCount++;
		}
		if(index!=15 && this.gridArray[index+1].cakeHolder && cakeNumber == this.gridArray[index+1].cakeHolder.cakeNumber && this.gridArray[index+1].value == value && (index+1)%4 != 0)
		{
            matchCount++;
		}
        if(index-4>=0 && this.gridArray[index-4].cakeHolder && cakeNumber == this.gridArray[index-4].cakeHolder.cakeNumber && this.gridArray[index-4].value == value)
		{
            matchCount++;
		}
		if(index+4 < 16 && this.gridArray[index+4].cakeHolder && cakeNumber == this.gridArray[index+4].cakeHolder.cakeNumber && this.gridArray[index+4].value == value)
		{
            matchCount++;
        }
        
        if(matchCount>0) matchCount++;
        
        return matchCount;
    },
    
    buyMenu:function()
    {
        this.transBG = this.add.graphics( 0, 0 );
        this.transBG.beginFill(0x424242, 0.5);
        this.transBG.drawRect(0, 0, this.world.width, this.world.height);
        
        this.subMenu = this.add.group();
        var subMenuBG = this.add.sprite(this.world.centerX,this.world.centerY,'subMenu');
        subMenuBG.anchor.setTo(0.5,0.5);
        this.subMenu.add(subMenuBG);
        
        var applyBtn = this.add.button(this.world.centerX,0,'applyBtn',this.resumeGame,this,0,0,1,0);
        applyBtn.y = subMenuBG.y - subMenuBG.height/2 + applyBtn.height/1.15;
        applyBtn.anchor.setTo(0.5,0.5);
        this.subMenu.add(applyBtn);
        applyBtn.setDownSound(this.buttonSound);
        
        var div;
        var btnBG;
        var purchaseDetail;
        var purchasePrice;
        for(var i=0;i<6;i++)
            {
                /*div = this.add.graphics( 0, 0 );
                div.beginFill(0x3299BB,1);
                div.drawRect(0 , 0, this.world.width, Math.floor(this.world.height/200));
                div.y = (this.world.height/7)*(i+1);
                this.subMenu.add(div);
                
                btnBG = this.add.graphics( 0, 0 );
                btnBG.index = i;
                btnBG.beginFill(Game5x.bgThemeColor[Game5x.saveObject.theme-1],1);
                btnBG.drawRect(0 , 0, this.world.width, this.world.height/7.5);
                btnBG.y = div.y-btnBG.height;
                this.subMenu.add(btnBG);*/
                
                if(i==0 && !Game5x.saveObject.showAd)       continue;
                else if(i==1 && Game5x.saveObject.doubleCoin)   continue;
                
                purchaseDetail = this.add.button( 0, 0,"purchaseDetails",this.startPurchase,this);
                purchaseDetail.index = i;
                purchaseDetail.anchor.setTo(0.5,0.5);
                purchaseDetail.frame = i;
                purchaseDetail.x = this.world.centerX;
                purchaseDetail.y = applyBtn.y + applyBtn.height*1.5 + (purchaseDetail.height*1.25*(i));//(div.y+((div.y-this.world.height/7)))/2;
                this.subMenu.add(purchaseDetail);
                
            }
        
        var heartIcon = this.add.sprite(0,0,"heartIcon");
        heartIcon.anchor.setTo(0.5,0.5)
        heartIcon.x = subMenuBG.x - subMenuBG.width/4;
        heartIcon.y = subMenuBG.y - subMenuBG.height/1.85;
        this.subMenu.add(heartIcon);
        
        if(Game5x.saveObject.doubleCoin)
            heartIcon.frame++;
        
        var heartNumSprite;
        var coinString = Game5x.saveObject.coins.toString();
        for(var j = 0;j<coinString.length;j++)
                {
                    heartNumSprite = this.add.sprite(0,heartIcon.y,"digits");
                    heartNumSprite.anchor.setTo(0.5,0.5);
                    heartNumSprite.x = (subMenuBG.x + subMenuBG.width/4 - heartNumSprite.width/2) - ((heartNumSprite.width/1.75)*j);
                    heartNumSprite.frame = parseInt(coinString.charAt(coinString.length-1-j));
                    this.subMenu.add(heartNumSprite);
                    //heartNumSprite.visible = false;
                }
        this.add.tween(this.subMenu).from( { y:-this.subMenu.height}, 750, Phaser.Easing.Back.Out, true);
    },
    
    startPurchase:function(btn)
    {
        if(this.transBG)
            this.transBG.kill();
        
        if(this.subMenu)
            {
                this.subMenu.destroy(true,false);
                this.subMenu = null;
            }
            
        purchaseIndex = btn.index;
        
        
        switch(btn.index)
            {
                case 0: productAlias = "Remove ads";    break;
                case 1: productAlias = "2x hearts";      break;
                case 2: productAlias = "150 hearts";     break;
                case 3: productAlias = "350 hearts";     break;
                case 4: productAlias = "700 hearts";     break;
                case 5: productAlias = "1000 hearts";    break;
            }
        store.ready(function() {orderProduct(productAlias)});
    },
    
    performSave:function()
    {
        for(var i = 0;i<16;i++)
            {
                Game5x.saveObject[this.modeString][this.typeString].grid[i] = this.gridArray[i].value;
                Game5x.saveObject[this.modeString][this.typeString].cake[i] = this.gridArray[i].cakeHolder?this.gridArray[i].cakeHolder.cakeNumber:-1;
            }
        
        var n1 = this.rn1.visible?(this.rn1.frame):0;
        var n2 = this.rn2.visible?(this.rn2.frame):0;
        var n3 = this.rn3.visible?(this.rn3.frame):0;
        var s1 = this.sl1.visible?(this.sl1.frame):0;
        var s2 = this.sl2.visible?(this.sl2.frame):0;
        var s3 = this.sl3.visible?(this.sl3.frame):0;
        
        Game5x.saveObject[this.modeString][this.typeString].rn1 = n1;
        Game5x.saveObject[this.modeString][this.typeString].rn2 = n2;
        Game5x.saveObject[this.modeString][this.typeString].rn3 = n3;
        Game5x.saveObject[this.modeString][this.typeString].sl1 = s1;
        Game5x.saveObject[this.modeString][this.typeString].sl2 = s2;
        Game5x.saveObject[this.modeString][this.typeString].sl3 = s3;
        
        Game5x.saveObject.firstRun = false;
        Game5x.saveObject[this.modeString][this.typeString].currentScore = this.points;
        Game5x.saveObject.sound = !this.game.sound.mute;
        Game5x.saveObject[this.modeString][this.typeString].gameOver = this.gameOver;
        
        NativeStorage.setItem('TTPsaves', JSON.stringify(Game5x.saveObject));
    },
    
    dumpAll:function()
    {
        for(var i = 0;i<16;i++)
            {
                this.gridArray[i].sprite.kill();

                if(this.gridArray[i].cakeHolder)
                this.gridArray[i].cakeHolder.kill();
            }
        for(var j = 0;j<11;j++)
            {
                this.digitArray[j].kill()
                this.hiDigitArray[j].kill();
            }
        this.digitArray = null; this.hiDigitArray = null;
        this.medalSprite.kill();
        this.shuffleBtn.kill();
        
        if(this.sl1 != null)
        {
            this.sl1.kill();
            this.sl2.kill();
            this.sl3.kill();
        }
        if(this.rn1!=null)
            {
                this.rn1.kill();
                this.rn2.kill();
                this.rn3.kill();
            }
    },
    
    updateDigits:function()
    {
        if(this.points >= Game5x.saveObject[this.modeString][this.typeString].hiScore)
            {
                Game5x.saveObject[this.modeString][this.typeString].hiScore = this.points;
            }
        
        //if(Game5x.saveObject[this.modeString][this.typeString].hiScore >= 100000)       window.game.unlockAchievement(_100kAchivemenID);
        //else if(Game5x.saveObject[this.modeString][this.typeString].hiScore >= 10000)   window.game.unlockAchievement(_10kAchivemenID);
        //else if(Game5x.saveObject[this.modeString][this.typeString].hiScore >= 1000)    window.game.unlockAchievement(_1kAchivemenID);
        
        var hiString = Game5x.saveObject[this.modeString][this.typeString].hiScore.toString();
        var numberString = this.points.toString();
        var coinString = Game5x.saveObject.coins.toString();
        
        for(var i = 0; i < numberString.length; i++)
            {
                this.digitArray[i].visible = true;
                this.digitArray[i].frame = parseInt(numberString.charAt(numberString.length-1-i));
            }
        while(i<10)
            {
                this.digitArray[i].visible = false;
                i++;
            }
        
        for(var j = 0; j < hiString.length; j++)
            {
                this.hiDigitArray[j].visible = true;
                this.hiDigitArray[j].frame = parseInt(hiString.charAt(hiString.length-1-j));
            }
        this.medalSprite.x = this.hiDigitArray[j-1].x - this.medalSprite.width*1.5;
        while(j<10)
            {
                this.hiDigitArray[j].visible = false;
                j++;
            }
        
        /*for(var k = 0; k < coinString.length; k++)
            {
                this.coinArray[k].visible = true;
                this.coinArray[k].frame = parseInt(coinString.charAt(coinString.length-1-k));
            }
        while(k<10)
            {
                this.coinArray[k].visible = false;
                k++;
            }*/
    },
    
    checkForGameOver:function()
    {
        if(this.gameType == 1 && this.justSubtracted)
            {
                return;
            }
        else if(this.isGridVacant())
            {
                return;
            }
        else if(this.canAdd())
            {
                return;
            }
        
        this.onGameOver();
        
    },
    
    isGridVacant:function()
    {
        var result = false;
        for(var i = 0;i<16;i++)
            {
                if(this.gridArray[i].value == 0)
                    result = true;
            }
        return result;
    },
    
    canAdd:function()
    {
        var result = false;
        var rn,gridObj,sl,addable;
        
        for(var j = 1;j<=3;j++)
            {
                rn = this["rn"+j];
                if(!rn.visible) continue;
                
                sl = this["sl"+j];
                for(var i = 0;i<16;i++)
                    {
                        gridObj = this.gridArray[i];
                        addable = gridObj.value + ((rn.frame)) <= 6?(gridObj.cakeHolder?(gridObj.cakeHolder.cakeNumber == sl.frame?true:false):true) : false;
                        if(addable)
                            {
                                result = true;
                                break;
                            }
                    }
            }
        
        
        return result;
    },
    
    backButtonPressed:function()
    {
        if(tempInstance.pauseGroup || tempInstance.settingsGroup || tempInstance.helpGroup || this.buyGroup)
            {
                tempInstance.resumeGame();
            }
        else if(tempInstance.gameOver)
            {
                tempInstance.gotoHome();
            }
        else if(tempInstance.pauseBtn)
            {
                tempInstance.pauseGame();
            }
        
    },
    
    cacheInterstitial:function()
    {
        if(AdMob)
        {
            //console.log('preparing Interstitial');
            AdMob.prepareInterstitial( {adId:admobid_interstitial,isTesting:false, autoShow:false} );
        }
        /*var reAdd = this.time.create();
        reAdd.add(Phaser.Timer.SECOND * 2,this.reAddEvents,this);
        reAdd.start();*/
    },

    addingInterstitial:function()
    {
        if(AdMob) AdMob.prepareInterstitial( {adId:admobid_interstitial, autoShow:false} );
    },

    gameResized: function (width, height) {

        // This could be handy if you need to do any extra processing if the 
        // game resizes. A resize could happen if for example swapping 
        // orientation on a device or resizing the browser window. Note that 
        // this callback is only really useful if you use a ScaleMode of RESIZE 
        // and place it inside your main game state.

    }

};

