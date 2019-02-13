/* globals Phaser:false */
// create Game5x Class
var Game5x = {
    
    saveObject:null,
    bgThemeColor:[0xE9E9E9,0x303030,0xFFE9E9,0x0f0f0f,0xEBE3AA,0xE9E9E9],
    darkThemeColor:[0x424242,0x424242,0x556270,0x296A73,0x333333,0x424242],
};

// create Game function in Game5x
Game5x.Boot = function (game) {
};

// set Game function prototype
Game5x.Boot.prototype = {

    init: function () {
        // set up input max pointers
        this.input.maxPointers = 1;
        // set up stage disable visibility change
        //this.stage.disableVisibilityChange = true;
        // Set up the scaling method used by the ScaleManager
        // Valid values for scaleMode are:
        // * EXACT_FIT
        // * NO_SCALE
        // * SHOW_ALL
        // * RESIZE
        // See http://docs.phaser.io/Phaser.ScaleManager.html for full document
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // If you wish to align your game in the middle of the page then you can
        // set this value to true. It will place a re-calculated margin-left
        // pixel value onto the canvas element which is updated on orientation /
        // resizing events. It doesn't care about any other DOM element that may
        // be on the page, it literally just sets the margin.
        //this.scale.pageAlignHorizontally = true;
        //this.scale.pageAlignVertically = true;
        // Force the orientation in landscape or portrait.
        // * Set first to true to force landscape. 
        // * Set second to true to force portrait.
        this.scale.forceOrientation(false, true);
        // Sets the callback that will be called when the window resize event
        // occurs, or if set the parent container changes dimensions. Use this 
        // to handle responsive game layout options. Note that the callback will
        // only be called if the ScaleManager.scaleMode is set to RESIZE.
        //this.scale.setResizeCallback(this.gameResized, this);
        // Set screen size automatically based on the scaleMode. This is only
        // needed if ScaleMode is not set to RESIZE.
        //this.scale.updateLayout(true);
        // Re-calculate scale mode and update screen size. This only applies if
        // ScaleMode is not set to RESIZE.
        //this.scale.refresh();
        
        //this.game.SaveCPU = this.game.plugins.add(Phaser.Plugin.SaveCPU);

    },

    preload: function () 
    {
        var theme = globalSaveObject.theme == 2?1:globalSaveObject.theme;

        if(globalSaveObject.theme != 2)
            this.load.image('gameBG', 'asset/Theme'+theme+'/'+canvasHeight+'/gameBG.png');
        else
            this.load.image('gameBG', 'asset/Theme1/'+canvasHeight+'/darkGameBG.png');
        
        this.load.image('gameBG', 'asset/Theme'+theme+'/'+canvasHeight+'/gameBG.png');
        this.load.image('menuWood', 'asset/Theme'+theme+'/'+canvasHeight+'/menuWood.jpg');
    },

    create: function () 
    {
        //this.add.sprite(0,0,'gridBG');
        Game5x.saveObject = globalSaveObject;
        this.game.stage.backgroundColor = Game5x.bgThemeColor[Game5x.saveObject.theme-1];
        this.state.start('Menu');
    },
    
    gameResized: function (width, height) {

        // This could be handy if you need to do any extra processing if the 
        // game resizes. A resize could happen if for example swapping 
        // orientation on a device or resizing the browser window. Note that 
        // this callback is only really useful if you use a ScaleMode of RESIZE 
        // and place it inside your main game state.

    }

};