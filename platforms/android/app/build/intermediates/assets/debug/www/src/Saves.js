
/*function saveData()
{
    var localSave;
    
    if(!localSave)
        {
            createLocalSave();
        }
    else
        {
            localSave = Game5x.saveObject;
        }
    
    localStorage.setItem('saves', JSON.stringify(localSave));
}

function loadData()
{localStorage.clear();
    var localSave = JSON.parse(localStorage.getItem('saves'));
    
    if(!localSave)
        {
            createLocalSave();
        }
    else
        {
            Game5x.saveObject = localSave;
        }
}

function createLocalSave()
{
    Game5x.saveObject = new Object();
    
    var defaultGrid = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    
    Game5x.saveObject = {
                    currentMode:4,currentGameType:1,sound:true,
                    Game4x:{
                                typePM:{
                                            hiScore:0,currentScore:0,rn1:0,rn2:0,rn3:0,
                                            grid:defaultGrid,
                                },
                                typePPPM:{
                                            hiScore:0,currentScore:0,rn1:0,rn2:0,rn3:0,
                                            grid:defaultGrid,
                                }
                    },
                    Game2x:{
                                typePM:{
                                            hiScore:0,currentScore:0,rn1:0,rn2:0,rn3:0,
                                            grid:defaultGrid,
                                },
                                typePPPM:{
                                            hiScore:0,currentScore:0,rn1:0,rn2:0,rn3:0,
                                            grid:defaultGrid,
                                }
                    },
                    Game1x:{
                                typePM:{
                                            hiScore:0,currentScore:0,rn1:0,rn2:0,rn3:0,
                                            grid:defaultGrid,
                                },
                                typePPPM:{
                                            hiScore:0,currentScore:0,rn1:0,rn2:0,rn3:0,
                                            grid:defaultGrid,
                                }
                    }
    };
            
    localSave = Game5x.saveObject;
}*/