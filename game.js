$(document).ready(function()
{
    var canvas = $("#gameCanvas");
    var context = canvas.get(0).getContext("2d");
    
    //Canvas dimensions
    var canvasWidth = canvas.width();
    var canvasHeight = canvas.height();
    
    //game settings
    var playGame;
    var platformX;
    var platformY;
    var platformOuterRadius;
    var platformInnerRadius;
    var asteroids;
    
    //User Interface (UI/GUI)
    var ui = $("#gameUI");
    var uiIntro = $("#gameIntro");
    var uiStats = $("#gameStats");
    var uiComplete = $("#gameComplete");
    
    var uiPlay = $("#gamePlay");
    var uiReset = $(".gameReset");
    var uiRemaining = $("#gameRemaining");
    var uiScore = $(".gameScore");
    
    var Obj_Asteroid = function(x,y,radius, mass, friction)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.mass = mass;
        this.friction = friction;
        this.vX = 0;
        this.vY = 0;
        this.player = false;
    };
    
    //reset and start the game
    function startGame() 
    {
        uiScore.html("0");
        uiStats.show();
        
        //set up initial game settings
        playGame = false;
        platformX = canvasWidth/2;
        platformY = 150;
        platformOuterRadius = 100;
        platformInnerRadius = 75;
        
        asteroids = new Array();
        var outerRing = 8; //Asteriod around the outer ring
        var ringCount = 3; //Number of ring
        // distance between each ring
        var ringSpacing = (platformInnerRadius / (ringCount-1));
        
        for (var r = 0; r < ringCount; r++)
        {
            var currentRing = 0; //asteroids around current ring
            var angle = 0; //angle between each asteroid
            var ringRadius = 0;
            //is this the inner most ring?
            if(r == ringCount-1)
            {
               currentRing = 1; 
            }
            else
            {
                currentRing = outerRing-(r*3);
                angle = 360/currentRing;
                ringRadius = platformInnerRadius-(ringSpacing*r);
            }
            for(var a = 0; a < currentRing; a++)
            {
                var x = 0;
                var y = 0;
                //is this the inner most ring?
                if(r == ringCount-1)
                {
                    x = platformX;
                    y = platformY;
                }
                else
                {
                    x = platformX+(ringRadius*Math.cos((angle*a)*(Math.PI/180)));
                    y = platformY+(ringRadius*Math.sin((angle*a)*(Math.PI/180)));

                }
            }
            
        };
        
        
        
        
        
        //Start animation loop
        animate();
    };
    
    uiPlay.click(function(e)
    {
        e.preventDefault();
        uiIntro.hide();
        startGame();
        
    });
    
    uiReset.click(function(e)
    {
        e.preventDefault();
        uiComplete.hide();
        startGame();
        
    });
    
    
    
    function init()
    {
        uiStats.hide();
        uiComplete.hide();
    };
    function animate()
    {
        //Clear
        context.clearRect(0,0,canvasWidth, canvasHeight);
        context.fillStyle = "rgb(100,100,100)";
        context.beginPath();
        context.arc(platformX, platformY, platformOuterRadius, 0, Math.PI*2, true);
        context.closePath();
        context.fill();
        
        if(playGame)
        {
            //Run the animation loop again in 33 milliseconds
            setTimeout(animate, 33);
        }
    };
    init();
});














