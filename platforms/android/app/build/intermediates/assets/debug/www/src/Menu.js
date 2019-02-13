var productAlias;
// create Game function in Game5x
Game5x.Menu = function (game) {
    this.subMenu = null;
    this.freeCoinMenu = null;
    this.buttonSound = null;
    this.theme = 0;
    this.themeChanged = false;
    this.currentSetBtn = null;
    this.gameName =null;
    this.newLoad = true;
    this.changeStarted = false;
    this.bgSound = null;
    this.paperSound = null;
    this.gameBG = null;
    this.slice = null;this.menuCake = null;
    this.transBG = null;
    this.savedThemeBtn = -1;
};

// set Game function prototype
Game5x.Menu.prototype = {
    
    init:function()
    {
        this.theme = Game5x.saveObject.theme == 2?1:Game5x.saveObject.theme;
    },
    
    preload: function () 
    {
        this.newLoad = true;
        this.changeStarted = false;
        
        this.load.image('gameName', 'asset/Theme'+this.theme+'/'+canvasHeight+'/gameName.png');
        this.load.image('lbAPI', 'asset/Theme'+this.theme+'/'+canvasHeight+'/lbAPI.png');
        this.load.image('logo', 'asset/Theme'+this.theme+'/'+canvasHeight+'/logo.png');
        this.load.image('fbBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/fbBtn.png');
        this.load.image('twitterBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/twitterBtn.png');
        this.load.image('menuCakeSlice', 'asset/Theme'+this.theme+'/'+canvasHeight+'/menuCakeSlice.png');
        this.load.image('menuCake', 'asset/Theme'+this.theme+'/'+canvasHeight+'/menuCake.png');
        this.load.image('subMenu', 'asset/Theme'+this.theme+'/'+canvasHeight+'/subMenu.png');
        this.load.image('hand', 'asset/Theme'+this.theme+'/'+canvasHeight+'/hand.png');
        
        if(this.themeChanged)
        {
            if(Game5x.saveObject.theme != 2)
                this.load.image('gameBG', 'asset/Theme'+this.theme+'/'+canvasHeight+'/gameBG.png');
            else
                this.load.image('gameBG', 'asset/Theme1/'+canvasHeight+'/darkGameBG.png');
        }
        //this.load.image('freeCoins', 'asset/Theme'+this.theme+'/'+canvasHeight+'/freeCoins.png');
        //this.load.image('watchVideo', 'asset/Theme'+this.theme+'/'+canvasHeight+'/watchVideo.png');
        //this.load.image('successSymbol', 'asset/Theme'+this.theme+'/'+canvasHeight+'/successSymbol.png');
        //this.load.image('successSymbol', 'asset/Theme'+this.theme+'/'+canvasHeight+'/successSymbol.png');
        //this.load.image('failedSymbol', 'asset/Theme'+this.theme+'/'+canvasHeight+'/failedSymbol.png');
        //this.load.image('rateGame', 'asset/Theme'+this.theme+'/'+canvasHeight+'/rateGame.png');
        
        //this.load.audio('buttonSound', ['asset/sounds/button.ogg','asset/sounds/button.mp3']);
        
        this.load.audio('purchasedSound', ['asset/sounds/purchased.ogg','asset/sounds/purchased.mp3']);
        this.load.audio('gameOverSound', ['asset/sounds/gameOver.ogg','asset/sounds/gameOver.mp3']);
        this.load.audio('pickNumberSound', ['asset/sounds/pickNumber.ogg','asset/sounds/pickNumber.mp3']);
        this.load.audio('minusNumbersSound', ['asset/sounds/minusNumbers.ogg','asset/sounds/minusNumbers.mp3']);
        this.load.audio('generateNumbersSound', ['asset/sounds/popPastry.ogg','asset/sounds/popPastry.mp3']);
        this.load.audio('addNumbersSound', ['asset/sounds/addNumbers.ogg','asset/sounds/addNumbers.mp3']);
        this.load.audio('buttonSound', ['asset/sounds/button.ogg','asset/sounds/button.mp3']);
        //this.load.audio('bgMusic', ['asset/sounds/bgMusic.ogg','asset/sounds/bgMusic.mp3']);
        this.load.audio('plateSound', ['asset/sounds/plate.ogg','asset/sounds/plate.mp3']);
        this.load.audio('paperSound', ['asset/sounds/paper.ogg','asset/sounds/paper.mp3']);
        
        this.load.atlasJSONHash('heartIcon', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/heartIcon.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/heartIcon.json');
        this.load.atlasJSONHash('applyTheme', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/applyTheme.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/applyTheme.json');
        this.load.atlasJSONHash('ThemeStrip', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/ThemeStrip.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/ThemeStrip.json');
        this.load.atlasJSONHash('ThemePrice', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/ThemePrice.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/ThemePrice.json');
        
        this.load.atlasJSONHash('dots', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/dots.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/dots.json');
        this.load.atlasJSONHash('playBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/menuPlayBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/menuPlayBtn.json');
        this.load.atlasJSONHash('leaderBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/leaderBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/leaderBtn.json');
        this.load.atlasJSONHash('settings', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/settingsBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/settingsBtn.json');
        this.load.atlasJSONHash('credits', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/creditsSymbol.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/creditsSymbol.json');
        this.load.atlasJSONHash('10xBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/10xBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/10xBtn.json');
        this.load.atlasJSONHash('8xBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/8xBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/8xBtn.json');
        this.load.atlasJSONHash('6xBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/6xBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/6xBtn.json');
        this.load.atlasJSONHash('pmBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/pmBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/pmBtn.json');
        this.load.atlasJSONHash('pppmBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/pppmBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/pppmBtn.json');
        this.load.atlasJSONHash('applyBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/applyBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/applyBtn.json');
        //this.load.atlasJSONHash('audioOnBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/audioOnBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/audioOnBtn.json');
        this.load.atlasJSONHash('audioBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/audioOffBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/audioOffBtn.json');
        this.load.atlasJSONHash('buyBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/buyBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/buyBtn.json');
        this.load.atlasJSONHash('themeBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/themeBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/themeBtn.json');
        //this.load.atlasJSONHash('setBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/setBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/setBtn.json');
        this.load.atlasJSONHash('purchaseDetails', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/purchaseDetails.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/purchaseDetails.json');
        this.load.atlasJSONHash('nextBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/nextBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/nextBtn.json');
        this.load.atlasJSONHash('cancelBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/cancelBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/cancelBtn.json');
        //this.load.atlasJSONHash('purchasePrice', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/purchasePrice.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/purchasePrice.json');
        //this.load.atlasJSONHash('closeBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/closeBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/closeBtn.json');
        //this.load.atlasJSONHash('themePrice', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/themePrice.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/themePrice.json');
        //this.load.atlasJSONHash('themeSheets', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/themeSheets.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/themeSheets.json');
        
        this.load.image('gridBG', 'asset/Theme'+this.theme+'/'+canvasHeight+'/gridBG.png');
        this.load.image('shuffleDesc', 'asset/Theme'+this.theme+'/'+canvasHeight+'/shuffleDesc.png');
        this.load.image('medal', 'asset/Theme'+this.theme+'/'+canvasHeight+'/medal.png');
        this.load.image('adtxt', 'asset/Theme'+this.theme+'/'+canvasHeight+'/adtxt.png');
        this.load.image('gameOver', 'asset/Theme'+this.theme+'/'+canvasHeight+'/gameOver.png');
        this.load.image('ssAPI', 'asset/Theme'+this.theme+'/'+canvasHeight+'/ssAPI.png');
        //this.load.image('shuffleValue', 'asset/Theme'+this.theme+'/'+canvasHeight+'/shuffleValue.png');
        
        this.load.atlasJSONHash('modes', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/modes.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/modes.json');
        this.load.atlasJSONHash('gameTypes', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/gameTypes.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/gameTypes.json');
        this.load.atlasJSONHash('shareBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/shareBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/shareBtn.json');
        
        this.load.atlasJSONHash('help', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/helpSprite.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/helpSprite.json');
        this.load.atlasJSONHash('pauseBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/pauseBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/pauseBtn.json');
        this.load.atlasJSONHash('restartBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/restartBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/restartBtn.json');
        this.load.atlasJSONHash('bigPlayBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/playBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/playBtn.json');
        this.load.atlasJSONHash('pauseSettingsBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/pauseSettingsBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/pauseSettingsBtn.json');
        this.load.atlasJSONHash('questionBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/questionBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/questionBtn.json');
        this.load.atlasJSONHash('homeBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/homeBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/homeBtn.json');
        this.load.atlasJSONHash('videoBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/videoBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/videoBtn.json');
        this.load.atlasJSONHash('heartBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/heartBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/heartBtn.json');
        
        this.load.atlasJSONHash('orangeCake', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/orangeCake.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/orangeCake.json');
        this.load.atlasJSONHash('rassCake', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/rassCake.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/rassCake.json');
        this.load.atlasJSONHash('blueberryCake', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/blueberryCake.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/blueberryCake.json');
        this.load.atlasJSONHash('limeCake', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/limeCake.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/limeCake.json');
        this.load.atlasJSONHash('strawberryCake', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/strawberryCake.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/strawberryCake.json');
        this.load.atlasJSONHash('jellyCake', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/jellyCake.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/jellyCake.json');
        this.load.atlasJSONHash('creamCake', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/creamCake.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/creamCake.json');
        this.load.atlasJSONHash('pineappleCake', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/pineappleCake.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/pineappleCake.json');
        this.load.atlasJSONHash('lemonPie', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/lemonPie.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/lemonPie.json');
        this.load.atlasJSONHash('straberryPie', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/straberrypie.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/straberrypie.json');

        this.load.atlasJSONHash('allSlices', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/allSlices.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/allSlices.json');

        this.load.atlasJSONHash('shuffleBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/shuffleBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/shuffleBtn.json');
        this.load.atlasJSONHash('heartIcon', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/heartIcon.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/heartIcon.json');
        
        this.load.atlasJSONHash('digits', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/score.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/score.json');
        this.load.atlasJSONHash('hidigits', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/hiscore.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/hiscore.json');
        
        if(!this.themeChanged)
            {
                
                var menuWood = this.add.sprite(this.world.centerX,this.world.centerY,'menuWood');
                menuWood.anchor.setTo(0.5,0.5);

                this.gameBG = this.add.sprite(0,0,'gameBG');
                this.gameBG.anchor.setTo(0.5,0.5);
                this.gameBG.x = this.world.centerX;
                this.gameBG.y = this.world.centerY;
            }
        
    },
    
    prefileComplete:function(progress, cacheKey, success, totalLoaded, totalFiles) 
    {
        var percent = (totalLoaded/totalFiles);
    },
    
    preloadComplete:function()
    {
        this.game.stage.backgroundColor = Game5x.bgThemeColor[Game5x.saveObject.theme-1];
        this.game.load.onLoadComplete.remove(this.preloadComplete, this);
        this.game.lockRender = false;

        this.addMenu();
    },
    
    create: function () 
    {
        tempInstance = this;
        this.game.sound.mute = !Game5x.saveObject.sound;

        /*if(this.bgSound == null)
        {
            this.bgSound = this.add.audio('bgMusic');
            this.bgSound.play("",0,1,true);
        }*/

        this.paperSound = this.add.audio('paperSound');

        var bgTween = this.add.tween(this.gameBG).to( { x:this.world.width*1.3, y:this.world.height/3, angle:45 }, 500, Phaser.Easing.Linear.None, true);
        bgTween.onStart.add(function () {    this.paperSound.play();   }, this);
        bgTween.onComplete.add(this.addMenu,this);
        
                
        /*if(Math.random > 0.5 && !Game5x.saveObject.firstRun &&!Game5x.saveObject.ratedGame)
            {
                this.createRateSprite();
            }*/
        
    },
    
    addMenu:function()
    {
        if(this.themeChanged)
            {
                var menuWood = this.add.sprite(this.world.centerX,this.world.centerY,'menuWood');
                menuWood.anchor.setTo(0.5,0.5);
                
                this.gameBG = this.add.sprite(0,0,'gameBG');
                this.gameBG.anchor.setTo(0.5,0.5);
                this.gameBG.x = this.world.width*1.3;
                this.gameBG.y = this.world.height/3;
                this.gameBG.angle += 45;
            }

        this.slice = this.add.sprite(0,0,'menuCakeSlice');
        this.slice.anchor.setTo(0.5,0.5);
        this.slice.x = this.world.width*0.97;
        this.slice.y = this.world.height/1.70;
        
        this.add.tween(this.slice).from( { x:this.world.width*1.25,y:this.world.height/2.125}, 250, Phaser.Easing.Linear.None, true);
        
        this.gameName = this.add.sprite(0,0,'gameName');
        this.gameName.anchor.setTo(0.5,0.5);
        this.gameName.x = this.world.width/2;
        this.gameName.y = this.world.height/5;
        
        this.add.tween(this.gameName).from( { x:this.gameName.x,y:-this.gameName.height/4}, 750, Phaser.Easing.Back.Out, true);
        
        this.menuCake = this.add.sprite(0,0,'menuCake');
        this.menuCake.anchor.setTo(0.5,0.5);
        this.menuCake.x = 0;
        this.menuCake.y = this.world.height/1.5;
        
        this.add.tween(this.menuCake).from( { x:-this.menuCake.width,y:this.menuCake.y}, 350, Phaser.Easing.Linear.None, true);

        this.buttonSound = this.add.audio('buttonSound');
        this.addBtns();
        this.newLoad = false;
        this.themeChanged = false;
    },
    
    /*createRateSprite:function()
    {
        this.disableAllBtns();
        this.subMenu = this.add.group();
        var buyBG = this.add.graphics( 0, 0 );
        buyBG.beginFill(Game5x.bgThemeColor[Game5x.saveObject.theme-1], 1);
        buyBG.drawRect(0, 0, this.world.width, this.world.height);
        this.subMenu.add(buyBG);

        var freeCoins = this.add.sprite( 0, 0,"rateGame" );
        freeCoins.anchor.setTo(0.5,0.5);
        freeCoins.x = this.world.centerX;
        freeCoins.y = this.world.centerY;
        this.subMenu.add(freeCoins);

        var applyBtn = this.add.button( 0, 0,"applyBtn",this.gotoGame,this );
        applyBtn.anchor.setTo(0.5,0.5);
        applyBtn.x = this.world.centerX;
        applyBtn.y = this.world.centerY + failedSymbol.height/2 - applyBtn.height/1.5;
        this.subMenu.add(applyBtn);

        var closeBtn = this.add.button( 0, 0,"closeBtn",this.resumeGame,this,0,0,1,0);
        closeBtn.anchor.setTo(0.5,0.5);
        closeBtn.x = freeCoins.x + freeCoins.width/2 - closeBtn.width/1.5;
        closeBtn.y = this.world.centerY - freeCoins.height/2 + closeBtn.height/1.5;
        this.subMenu.add(closeBtn);  
    },*/
    
    gotoGame:function()
    {
        Game5x.saveObject.ratedGame = true;
        window.open("https://play.google.com/store/apps/details?id=com.nulligma.Game4x","_blank");
    },
    
    startGame:function(playBtn)
    {
        tempInstance = null;
        
        this.disableAllBtns();
        this.state.start('Game');
    },
    
    showLeaderBoard:function()
    {
        window.plugins.playGamesServices.showAllLeaderboards();
    },
    
    showCredits:function()
    {
        this.disableAllBtns();
        this.subMenu = this.add.group();
        var creditsBG = this.add.graphics( 0, 0 );
        creditsBG.beginFill(Game5x.bgThemeColor[Game5x.saveObject.theme-1], 1);
        creditsBG.drawRect(0, 0, this.world.width, this.world.height);
        this.subMenu.add(creditsBG);
        
        var logo = this.add.button(this.world.width/2,this.world.centerY,'logo',this.openCredits,this);
        logo.index = 0;
        logo.y = this.world.centerY - logo.height/4;
        logo.anchor.setTo(0.5,0.5);
        this.subMenu.add(logo);
        
        var fbBtn = this.add.button(this.world.width/4,this.world.centerY,'fbBtn',this.openCredits,this);
        fbBtn.index = 1;
        fbBtn.y = logo.y+logo.height/2 + fbBtn.height;
        fbBtn.anchor.setTo(0.5,0.5);
        this.subMenu.add(fbBtn);
        
        var twitterBtn = this.add.button(3*this.world.width/4,this.world.centerY,'twitterBtn',this.openCredits,this);
        twitterBtn.index = 2;
        twitterBtn.y = fbBtn.y;
        twitterBtn.anchor.setTo(0.5,0.5);
        this.subMenu.add(twitterBtn);
        
        /*var dots = this.add.sprite(this.world.width/2,0,'dots');
        dots.y = (logo.y - logo.height/2)/2;
        dots.anchor.setTo(0.5,0.5);
        this.subMenu.add(dots);*/
        
        var applyBtn = this.add.button(this.world.centerX,7*this.world.height/8,'applyBtn',this.resumeGame,this,0,0,1,0);
        applyBtn.y = 7*this.world.height/8 + applyBtn.height/2;
        applyBtn.anchor.setTo(0.5,0.5);
        this.subMenu.add(applyBtn);
        applyBtn.setDownSound(this.buttonSound);
        
        this.add.tween(this.subMenu).from( { y:-this.subMenu.height}, 750, Phaser.Easing.Back.Out, true);
    },
    
    openCredits:function(btn)
    {
        var url;
        switch(btn.index)
        {
            case 0: url = "http://www.nulligma.com"; break;
            case 1: url = "https://www.facebook.com/Nulligma"; break;
            case 2: url = "https://twitter.com/Nulligma"; break;
        }

        setTimeout(
                  function(){ 
                    window.open(url,"_blank");
                  }, 
                1);
    },
    
    settingsMenu:function(settingsBtn)
    {
        this.disableAllBtns();
        
        this.transBG = this.add.graphics( 0, 0 );
        this.transBG.beginFill(0x424242, 0.5);
        this.transBG.drawRect(0, 0, this.world.width, this.world.height);
        
        this.subMenu = this.add.group();
        var subMenuBG = this.add.sprite(this.world.centerX,this.world.centerY,'subMenu');
        subMenuBG.anchor.setTo(0.5,0.5);
        this.subMenu.add(subMenuBG);
        
        var _1xBtn = this.add.button(subMenuBG.x - subMenuBG.width/4,subMenuBG.y-subMenuBG.height/9,'6xBtn',this.changeMode,this);
        _1xBtn.anchor.setTo(0.5,0.5);
        _1xBtn.frame = Game5x.saveObject.currentMode == 1?1:2;
        _1xBtn.setDownSound(this.buttonSound);
        this.subMenu.add(_1xBtn);
        var _2xBtn = this.add.button(subMenuBG.x,subMenuBG.y-subMenuBG.height/9,'8xBtn',this.changeMode,this);
        _2xBtn.anchor.setTo(0.5,0.5);
        _2xBtn.frame = Game5x.saveObject.currentMode == 2?1:2;
        _2xBtn.setDownSound(this.buttonSound);
        this.subMenu.add(_2xBtn);
        var _4xBtn = this.add.button(subMenuBG.x + subMenuBG.width/4,subMenuBG.y-subMenuBG.height/9,'10xBtn',this.changeMode,this);
        _4xBtn.anchor.setTo(0.5,0.5);
        _4xBtn.frame = Game5x.saveObject.currentMode == 4?1:2;
        _4xBtn.setDownSound(this.buttonSound);
        this.subMenu.add(_4xBtn);
        
        var pppmBtn = this.add.button(0,subMenuBG.y+subMenuBG.height/9,'pppmBtn',this.changeGameType,this);
        pppmBtn.frame = Game5x.saveObject.currentGameType == 2?1:2;
        pppmBtn.x = subMenuBG.x + subMenuBG.width/5;
        pppmBtn.anchor.setTo(0.5,0.5);
        pppmBtn.setDownSound(this.buttonSound);
        this.subMenu.add(pppmBtn);
        var pmBtn = this.add.button(0,subMenuBG.y+subMenuBG.height/9,'pmBtn',this.changeGameType,this);
        pmBtn.frame = Game5x.saveObject.currentGameType == 1?1:2;
        pmBtn.x = subMenuBG.x - subMenuBG.width/5;
        pmBtn.anchor.setTo(0.5,0.5);
        pmBtn.setDownSound(this.buttonSound);
        this.subMenu.add(pmBtn);
        
        var audioBtn = this.add.button(0,0,'audioBtn',this.changeAudio,this);
        audioBtn.frame = !this.game.sound.mute?1:0;
        audioBtn.x = this.world.centerX;
        audioBtn.y = subMenuBG.y+subMenuBG.height/2 - audioBtn.height;
        audioBtn.anchor.setTo(0.5,0.5);
        this.subMenu.add(audioBtn);
        
        var applyBtn = this.add.button(this.world.centerX,7*this.world.height/8,'applyBtn',this.resumeGame,this,0,0,1,0);
        applyBtn.y = subMenuBG.y - subMenuBG.height/2 + applyBtn.height/1.15;
        applyBtn.anchor.setTo(0.5,0.5);
        this.subMenu.add(applyBtn);
        applyBtn.setDownSound(this.buttonSound);
        
        this.add.tween(this.subMenu).from( { y:-this.subMenu.height}, 750, Phaser.Easing.Back.Out, true);
    },
    
    changeAudio:function(btn)
    {
        this.game.sound.mute = !this.game.sound.mute;
        btn.frame = this.game.sound.mute?0:1;
    },

    checkForReward:function()
    {
        this.disableAllBtns();
        
        if(Math.random() > 0.3)
            this.showFreeCoins(true);
        else
            this.showFreeCoins(false);
    },
    
    buyMenu:function()
    {
        //TODO: theme changes y of buying list
        if(this.freeCoinMenu)
            {
                this.freeCoinMenu.destroy(true,false);
                this.freeCoinMenu = null;
            }
        
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
                
                this.addBtns();
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
    
    showFreeCoins:function(rewardReady)
    {
        /*if(rewardReady)
            {
                this.freeCoinMenu = this.add.group();
                var buyBG = this.add.graphics( 0, 0 );
                buyBG.beginFill(Game5x.bgThemeColor[Game5x.saveObject.theme-1], 1);
                buyBG.drawRect(0, 0, this.world.width, this.world.height);
                this.freeCoinMenu.add(buyBG);
                
                var freeCoins = this.add.sprite( 0, 0,"freeCoins" );
                freeCoins.anchor.setTo(0.5,0.5);
                freeCoins.x = this.world.centerX;
                freeCoins.y = this.world.centerY;
                this.freeCoinMenu.add(freeCoins);
                
                var watchVideo = this.add.button( 0, 0,"watchVideo",this.startRewardVideo,this );
                watchVideo.anchor.setTo(0.5,0.5);
                watchVideo.x = this.world.centerX;
                watchVideo.y = this.world.centerY + freeCoins.height/2 - watchVideo.height/1.5;
                this.freeCoinMenu.add(watchVideo);
                
                var closeBtn = this.add.button( 0, 0,"closeBtn",this.buyMenu,this,0,0,1,0);
                closeBtn.anchor.setTo(0.5,0.5);
                closeBtn.x = freeCoins.x + freeCoins.width/2 - closeBtn.width/1.5;
                closeBtn.y = this.world.centerY - freeCoins.height/2 + closeBtn.height/1.5;
                this.freeCoinMenu.add(closeBtn);
        
            }
        else
            {*/
                this.buyMenu();
            //}
    },

    startRewardVideo:function()
    {
        if(this.freeCoinMenu)
            {
                this.freeCoinMenu.destroy(true,false);
                this.freeCoinMenu = null;
            }
        
        //Appodeal.enableRewardedVideoCallbacks(true);
        //Appodeal.show(Appodeal.REWARDED_VIDEO);
    },
    
    successRewardAd:function(result)
    {
        /*Game5x.saveObject.coins += 10;
        localStorage.setItem('TTPsaves', JSON.stringify(Game5x.saveObject));
        
        tempInstance.freeCoinMenu = tempInstance.add.group();
        var buyBG = this.add.graphics( 0, 0 );
        buyBG.beginFill(Game5x.bgThemeColor[Game5x.saveObject.theme-1], 1);
        buyBG.drawRect(0, 0, this.world.width, this.world.height);
        tempInstance.freeCoinMenu.add(buyBG);

        var successSymbol = this.add.sprite( 0, 0,"successSymbol" );
        successSymbol.anchor.setTo(0.5,0.5);
        successSymbol.x = tempInstance.world.centerX;
        successSymbol.y = tempInstance.world.centerY;
        tempInstance.freeCoinMenu.add(successSymbol);

        var applyBtn = this.add.button( 0, 0,"applyBtn",tempInstance.buyMenu,tempInstance );
        applyBtn.anchor.setTo(0.5,0.5);
        applyBtn.x = tempInstance.world.centerX;
        applyBtn.y = tempInstance.world.centerY + successSymbol.height/2 - applyBtn.height/1.5;
        tempInstance.freeCoinMenu.add(applyBtn);*/
    },
    
    errorRewardAd:function(result)
    {
        /*tempInstance.freeCoinMenu = tempInstance.add.group();
        var buyBG = this.add.graphics( 0, 0 );
        buyBG.beginFill(Game5x.bgThemeColor[Game5x.saveObject.theme-1], 1);
        buyBG.drawRect(0, 0, this.world.width, this.world.height);
        tempInstance.freeCoinMenu.add(buyBG);

        var failedSymbol = this.add.sprite( 0, 0,"failedSymbol" );
        failedSymbol.anchor.setTo(0.5,0.5);
        failedSymbol.x = tempInstance.world.centerX;
        failedSymbol.y = tempInstance.world.centerY;
        tempInstance.freeCoinMenu.add(failedSymbol);

        var applyBtn = this.add.button( 0, 0,"applyBtn",tempInstance.buyMenu,tempInstance );
        applyBtn.anchor.setTo(0.5,0.5);
        applyBtn.x = tempInstance.world.centerX;
        applyBtn.y = tempInstance.world.centerY + failedSymbol.height/2 - applyBtn.height/1.5;
        tempInstance.freeCoinMenu.add(applyBtn);*/
    },
   
    themeMenu:function()
    {
        this.disableAllBtns();
        
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
        var themeStrip;
        var purchasePrice;
        for(var i=0;i<4;i++)
            {
                //if(i==0 && !Game5x.saveObject.showAd)       continue;
                //else if(i==1 && Game5x.saveObject.doubleCoin)   continue;
                
                themeStrip = this.add.button( 0, 0,"ThemeStrip",this.buyTheme,this);
                themeStrip.index = i;
                themeStrip.anchor.setTo(0.5,0.5);
                themeStrip.frame = i;
                themeStrip.x = this.world.centerX;
                themeStrip.y = applyBtn.y + applyBtn.height*1.5 + (themeStrip.height*1.15*(i));//(div.y+((div.y-this.world.height/7)))/2;
                themeStrip.scale.x = themeStrip.scale.y = 0.85;
                this.subMenu.add(themeStrip);
                
                if(!Game5x.saveObject.themeBought["theme"+(i+1)])
                    {
                        purchasePrice = this.add.sprite( 0, 0,"ThemePrice");
                        purchasePrice.frame = i-1;
                    }
                else
                    {
                        purchasePrice = this.add.sprite( 0, 0,"applyTheme");
                        if(Game5x.saveObject.theme == i+1)
                            {
                                purchasePrice.frame = 1;
                                this.currentSetBtn = purchasePrice;
                            }
                    }
                
                purchasePrice.anchor.setTo(0.5,0.5);
                purchasePrice.x = this.world.centerX + themeStrip.width/3.5;
                purchasePrice.y = themeStrip.y;
                this.subMenu.add(purchasePrice);
                
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
    
    buyTheme:function(btn)
    {
        if(this.savedThemeBtn == btn.index) return;
        
        this.savedThemeBtn = btn.index;
        
        if(Game5x.saveObject.themeBought["theme"+(btn.index+1)])
            {
                this.changeTheme(btn);
                return;
            }
        
        var gotMoney = false;
        switch(btn.index)
            {
                case 1: if(Game5x.saveObject.coins >= 100)  {gotMoney = true;Game5x.saveObject.coins-=100; Game5x.saveObject.themeBought.theme2 = true;}    break;
                case 2: if(Game5x.saveObject.coins >= 250)  {gotMoney = true;Game5x.saveObject.coins-=250; Game5x.saveObject.themeBought.theme3 = true;}    break;
                case 3: if(Game5x.saveObject.coins >= 250)  {gotMoney = true;Game5x.saveObject.coins-=250; Game5x.saveObject.themeBought.theme4 = true;}    break;
                //case 4: gotMoney = true; purchaseIndex = 6; store.ready(function() {orderProduct("special theme")});   break;  
                //case 5: gotMoney = true; store.refresh();                 break;
            }
        
        if(gotMoney)
            {
                this.resumeGame();
            }
        else
            {
                //this.checkForReward();
            }
        
        NativeStorage.setItem('TTPsaves', JSON.stringify(Game5x.saveObject));
    },
    
    changeTheme:function(btn)
    {
        if(btn.index+1 != Game5x.saveObject.theme)
            {
                var applyThemeBtn = this.subMenu.children[3+(btn.index*2)];
                
                this.currentSetBtn.frame = 0;
                this.currentSetBtn = applyThemeBtn;
                
                applyThemeBtn.frame = 1;
                
                var btnTheme = btn.index+1;
                this.theme = btnTheme == 2?1:btnTheme;
                Game5x.saveObject.theme = btnTheme;
                this.themeChanged = true;
        
                this.currentSetBtn.events.onInputUp.add(this.changeTheme,this);
            }
    },
    
    changeMode:function(btn)
    {
        if(btn.frame == 1) return;
        
        this.subMenu.children[1].frame = 0;
        this.subMenu.children[2].frame = 0;
        this.subMenu.children[3].frame = 0;
        
        if(btn.key == "6xBtn")
            {
                Game5x.saveObject.currentMode = 1;
            }
        else if(btn.key == "8xBtn")
            {
                Game5x.saveObject.currentMode = 2;
            }
        else
            {
                Game5x.saveObject.currentMode = 4;
            }
        
        btn.frame = 1;
    },
    
    changeGameType:function(btn)
    {
        if(btn.frame == 1) return;
        
        this.subMenu.children[4].frame = 0;
        this.subMenu.children[5].frame = 0;
        
        if(btn.key == "pmBtn")
            {
                Game5x.saveObject.currentGameType = 1;
            }
        else
            {
                Game5x.saveObject.currentGameType = 2;
            }
        
        btn.frame = 1;
    },
    
    resumeGame:function(btn)
    {
        if(btn)
            btn.kill();
        this.savedThemeBtn = -1;
        this.add.tween(this.subMenu).to( { y:-this.subMenu.height}, 750, Phaser.Easing.Back.In, true).onComplete.add(this.killPauseMenu,this);
    },
    
    killPauseMenu:function()
    {
        if(this.transBG)
            this.transBG.kill();
        
        if(this.subMenu)
            {
                this.subMenu.destroy(true,false);
                this.subMenu = null;
            }
        
        if(this.themeChanged)
            {
                this.world.removeAll(true,true);
                
                this.game.lockRender = true;
                this.game.load.onLoadComplete.add(this.preloadComplete, this);
                this.preload();
                this.game.load.start();
                
                return;
            }
        
        this.addBtns();
    },
    
    disableAllBtns:function()
    { 
        this.subMenu.destroy(true,false);
        this.subMenu = null;
    },
    
    addBtns:function()
    {
        this.subMenu = this.add.group();
        
        var playBtn = this.add.button(this.world.centerX,this.world.height/1.75,'playBtn',this.changeMenu,this,0,0,1,0);
        playBtn.anchor.setTo(0.5,0.5);
        this.subMenu.add(playBtn);
        playBtn.setDownSound(this.buttonSound);
        
        var leaderBtn = this.add.button(this.world.centerX,0,'leaderBtn',this.showLeaderBoard,this,0,0,1,0);
        leaderBtn.y = playBtn.y + playBtn.height + leaderBtn.height/2;
        leaderBtn.anchor.setTo(0.5,0.5);
        this.subMenu.add(leaderBtn);
        leaderBtn.setDownSound(this.buttonSound);
        
        var credits = this.add.button(0,0,'credits',this.showCredits,this,0,0,1,0);
        credits.x = this.world.width - credits.height;
        credits.y = this.world.height - credits.height;
        credits.anchor.setTo(0.5,0.5);
        this.subMenu.add(credits);
        credits.setDownSound(this.buttonSound);
        
        var settings = this.add.button(0,0,'settings',this.settingsMenu,this,0,0,1,0);
        settings.x =settings.height;
        settings.y =this.world.height - settings.height;
        settings.anchor.setTo(0.5,0.5);
        this.subMenu.add(settings);
        settings.setDownSound(this.buttonSound);
        
        var buyBtn = this.add.button(0,0,'buyBtn',this.checkForReward,this,0,0,1,0);
        buyBtn.x = this.world.centerX;
        //buyBtn.x =this.world.centerX-buyBtn.width;
        buyBtn.y =this.world.height - buyBtn.height;
        buyBtn.anchor.setTo(0.5,0.5);
        this.subMenu.add(buyBtn);
        buyBtn.setDownSound(this.buttonSound);
        
        /*var themeBtn = this.add.button(0,0,'themeBtn',this.themeMenu,this,0,0,1,0);
        themeBtn.x =this.world.centerX+buyBtn.width;
        themeBtn.y =this.world.height - themeBtn.height;
        themeBtn.anchor.setTo(0.5,0.5);
        this.subMenu.add(themeBtn);
        themeBtn.setDownSound(this.buttonSound);*/
        
        if(this.newLoad)
        {
           for(var i = 0;i<this.subMenu.children.length;i++)
                {
                    this.add.tween(this.subMenu.children[i]).from( { y:this.world.height+this.subMenu.children[i].height}, 750, Phaser.Easing.Back.Out, true,750 + (i*100));
                }
        }

    },
    
    changeMenu:function()
    {
        if(this.changeStarted) return;

        this.changeStarted = true;

        this.add.tween(this.slice).to( { x:this.world.width*1.5,y:this.world.height/2.25}, 250, Phaser.Easing.Linear.None, true);
        this.add.tween(this.gameName).to( { y:-this.gameName.height}, 750, Phaser.Easing.Back.In, true);
        this.add.tween(this.menuCake).to( { x:-this.menuCake.width}, 350, Phaser.Easing.Linear.None, true);
        
        for(var i = 0;i<this.subMenu.children.length;i++)
            {
                this.add.tween(this.subMenu.children[i]).to( { y:this.world.height+this.subMenu.children[i]}, 750, Phaser.Easing.Back.In, true,1050 - (i*100));
            }
            
        var bgTween = this.add.tween(this.gameBG).to( { x:this.world.centerX, y:this.world.centerY, angle:0 }, 500, Phaser.Easing.Linear.None, true,1700);
        bgTween.onStart.add(function () {    this.paperSound.play();   }, this);
        bgTween.onComplete.add(this.startGame,this);
        
    },

    gameResized: function (width, height) {

        // This could be handy if you need to do any extra processing if the 
        // game resizes. A resize could happen if for example swapping 
        // orientation on a device or resizing the browser window. Note that 
        // this callback is only really useful if you use a ScaleMode of RESIZE 
        // and place it inside your main game state.

    }

};