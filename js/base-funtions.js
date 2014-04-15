// FIELD'S PARAMETER
var lo = 3; //connector line offset (half with of connector size)
var lw = 50; // connector line width
var no = 10; //node offset (node width + border size)


/* Numerical matrix gamefield */
var matrix = [];

/*
    this array keeps the game infos:
        game[0] : player turn (NOTE: in case of a match vs Computer the player 2 is the computer)
        game[1] : player 1 points
        game[2] : player 2 points
        game[3] : turn number
        game[4] : game status --> not_started / ongoing / completed
*/
var game = [];
game[0] = 1;
game[1] = 0;
game[2] = 0;
game[3] = 0;
game[4] = 'not_started'; // game status --> not_started / ongoing / completed

/* 
    Game settings 
        settings[0] : oppenent --> local / vsComputer
        settings[1] : playground type --> triangle / square
        settings[2] : playground size --> small = 3 / normal = 4 / big = 5
        settings[3] : difficulty --> easy / normal / difficult
*/

var settings = [];
settings[0] = 'vsComputer';
settings[1] = 'square';
settings[2] = 4;
settings[3] = 'normal';




    function setLocalGame() {
        settings[0] = 'local';
        checkSettingsButtons();
    }

    function setVsComputer() {
        settings[0] = 'vsComputer';
        checkSettingsButtons();
    }


    function setPlaygroundForm(param) {
        settings[1] = param;
        checkSettingsButtons();
    }

    function setPlaygroundSize(param) {
        settings[2] = param;
        checkSettingsButtons();
    }

    function resumeGame() {
        $("#info-box").fadeOut(300);
    }
            
            

    /*
        This function change the color theme on button palette colors click
    */
    function changeColor(lightColor, darkColor) {

        $(".main-container").css("background-color", "#" + lightColor);
        $(".main-container").css("border-color", "#" + darkColor);

        $(".bottom-main-container").css("background-color", "#" + lightColor);
        $(".bottom-main-container").css("border-color", "#" + darkColor);

        $(".main-title").css("color", "#" + lightColor);

        $("b").css("color", "#" + darkColor);
        $(".external-container a").css("color", "#" + darkColor);

    }



    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
            


    function checkSettingsButtons() {

        // Check Opponent type
        if (settings[0] == 'local') {
            $('#localBtn').css('background','rgba(0, 0, 0, 0.2)');
            $('#vsComputerBtn').css('background','');
        }
        else {
            $('#vsComputerBtn').css('background','rgba(0, 0, 0, 0.2)');
            $('#localBtn').css('background','');
        }

        // Check Playground type
        if (settings[1] == 'triangle') {
            $('#triangleBtn').css('background','rgba(0, 0, 0, 0.2)');
            $('#squareBtn').css('background','');
        }
        else {
            $('#squareBtn').css('background','rgba(0, 0, 0, 0.2)');
            $('#triangleBtn').css('background','');
        }


        // Check Playground Size
        $("#smallPlaygroundBtn").css('background','');
        $("#normalPlaygroundBtn").css('background','');
        $("#bigPlaygroundBtn").css('background','');
        if (settings[2] == 3) $("#smallPlaygroundBtn").css('background','rgba(0, 0, 0, 0.2)');
        else if (settings[2] == 4) $("#normalPlaygroundBtn").css('background','rgba(0, 0, 0, 0.2)');
        else if (settings[2] == 5) $("#bigPlaygroundBtn").css('background','rgba(0, 0, 0, 0.2)');
    }


            
    /*
        When a game is finished a dialog box pop up aking you if you want to restart a match or a new game
    */
    function showDialogBoxEndGame() {
        var endmessage = 'Draw';

        if (settings[0] == 'vsComputer') {
            if (game[1]>game[2]) endmessage = 'YOU WIN!';
            else endmessage = 'Computer wins';
        }
        else if (settings[0] == 'local') {
            if (game[1]>game[2]) endmessage = 'Player #1 WINS';
            else endmessage = 'Player #2 WINS';
        }

        $("#info-box").fadeIn(300).promise().done(function () { $("#gameTurn").html(" " + endmessage); });
        $("#info-box").html('<h3>' + endmessage + '</h3><button id="restartMatchBtn" class="btn btn-info btn-end-match btn-rounded" onclick="javascript:startGame();"> Restart the match </button><button id="restartGameBtn" class="btn btn-info btn-end-match btn-rounded" onclick="javascript:newGame();"> Start a new game </button>');
    }
            
    
    /*
        This function is called during the game when the player press "START NEW GAME BUTTON" and a confirm dialog box appears
    */
    function showDialogBoxNewGame() {
        // if the match is not finished a dialog box show up with a confirm request; if the match is finished the button redirect to a new game straight away
        if (game[4] != 'completed') {
            $("#info-box").fadeIn(300);
            $("#info-box").html('<button id="restartGameBtn" class="btn btn-info btn-rounded" onclick="javascript:newGame();"> Start a new game </button><button id="resumeBtn" class="btn btn-info btn-rounded" onclick="javascript:resumeGame();"> Resume </button>');
        }
        else newGame();
    }

            
    /*
        This function is called during the game when the player press "RESTART THE MATCH" and a confirm dialog box appears
    */ 
    function showDialogBoxRestartMatch() {
        // if the match is not finished a dialog box show up with a confirm request; if the match is finished the button restarts a new game straight away
        if (game[4] != 'completed') {
            $("#info-box").fadeIn(300);
            $("#info-box").html('<button id="restartMatchBtn" class="btn btn-info btn-rounded" onclick="javascript:startGame();"> Restart the match </button><button id="resumeBtn" class="btn btn-info btn-rounded" onclick="javascript:resumeGame();"> Resume </button>');
        }
        else startGame();
    }
            



    /*
        This function starts a new game: reset the game array and shows the main first game panel
    */
    function newGame() {

        $("#info-box").fadeOut(300);
        $("#disable-click-box").hide();
        $("#field-container").fadeOut(300).promise().done( function () { $("#intro").fadeIn(300); } );

        game[0] = 1;
        game[1] = 0;
        game[2] = 0;
        game[3] = 0;
        game[4] = 'not_started'; 

        $(".game-elements").attr('style', 'display: none !important').promise().done( function() {
            $(".game-settings").fadeIn("slow");
        });

        checkSettingsButtons();
    }
            
    


    /*
        This function starts a new game and sets the playground depengind on settings array
    */
            
    function startGame() {

        $("#info-box").fadeOut(300);
        $("#disable-click-box").hide();
        $("#intro").fadeOut(300).promise().done(function () { $("#field-container").fadeIn(300); });

        if (settings[0] == 'vsComputer') {
            $("#player1-icon").html('<i class="fa fa-user"></i>');
            $("#player2-icon").html('<i class="fa fa-desktop"></i>');
        }
        else {
            $("#player1-icon").html('1up');
            $("#player2-icon").html('2up');
        }

        $(".game-settings").fadeOut("slow").promise().done( function() {
            //$(".game-elements").css("display", "block !important");
            $(".game-elements").attr('style', 'display: inline-block !important');
            $(".game-elements").fadeIn("slow");
        });

        game[0] = 1; // player turn (NOTE: in case of a match vs Computer the player 2 is the computer)
        game[1] = 0; // player 1 points
        game[2] = 0; // player 2 points
        game[3] = 0; // turn number
        game[4] = 'ongoing'; // game status --> not_started / ongoing / completed


        playgroundCleaner('field-container');

        if (settings[1] == 'triangle') {
            // Build TRIANGLE playground
            drawPlaygrownd_triangle((settings[2]+1), lo, lw, no, 'field-container');
            matrix = createMatrixTriangle((settings[2]+1));
        }
        else {
            // Build SQUARE playground
            drawPlaygrownd_square(settings[2], lo, lw, no, 'field-container');
            matrix = createMatrixSquare(settings[2]);
        }


        updateAll();

        // Reset the connector's onclick event
        $(".conn").off("click");

        /* 
            Connectors event onclick settings 
                if the game is player vs player (local) connector's onclick event is localGameSteps($(this))
                if the game is computer vs player (local) connector's onclick event is vsComputerGameSteps($(this))
        */
        if (settings[0] == 'local') {
            $(".conn").click(function() {
                localGameSteps($(this));
            });
        }
        else {
            $(".conn").click(function() {
                vsComputerGameSteps($(this));
            });
        }

    }

            
            
            


    /*
        In order to disallow the human player to play during the computer's turn, the layer #disable-click-box appears over the game board.
        This is just a trick to disable onclick event :)
    */
    function disableConnectorsEvent() {
        $("#disable-click-box").show();
    }

    function enableConnectorsEvent() {
        $("#disable-click-box").fadeOut(420);
    }
            



    function localGameSteps(obj_ev) {

        var node = null;
        var node2 = null;

        // Disable ONCLICK event
        disableConnectorsEvent();

        game[3]++;

        updateAll();
        
        // remove the relative clicked connector on the matrix
        removeMatrixConnectorByConnID(obj_ev.attr('id'));

        // remove the visual connector on the game field and when the animation is completed checks if there is free nodes
        removeConnectorByConnID(obj_ev.attr('id'), 0).done( function () {

            updateAll();

            node = getFreeNode();
            if (node != null) {
                removeNode(node).done( function() {
                    node2 = getFreeNode();
                    if (node2 != null) {
                        removeNode(node2);
                        game[game[0]]++;
                        updateAll();
                    }
                    game[game[0]]++;
                    updateAll();
                });
            }
            else {
                if (game[0] == 1) game[0] = 2;
                else game[0] = 1;
            }
            updateAll();    
        });          

        // Enable ONCLICK event
        enableConnectorsEvent();
        updateAll();
    }




    function vsComputerGameSteps(obj_ev) {

        var node = null;
        var node2 = null;

        disableConnectorsEvent();

        game[3]++;
        updateAll();
        removeMatrixConnectorByConnID(obj_ev.attr('id'));

        removeConnectorByConnID(obj_ev.attr('id'), 0).done( function () {

            updateAll();

            node = getFreeNode();
            if (node != null) {
                removeNode(node).done( function() {
                    node2 = getFreeNode();
                    if (node2 != null) {
                        removeNode(node2);
                        game[1]++;
                        updateAll();
                    }
                    game[1]++;
                    updateAll();
                });
                game[0] = 1;
                updateAll();

                enableConnectorsEvent();

            }
            else {
                game[0] = 2;
                computerTurn();
            }

        });

    }    

            

    function updateAll() {
        game[4] = getGameStatus();

        if ((game[4]) == 'completed') {
            showDialogBoxEndGame();
            $('#field-container').html();
        }

        $("#turnNumber").html("Turn number: "  + game[3]);

        updateGameScore();
    }



    function computerTurn() {

        var node = null;
        var node2 = null;

        var connArr = computerChoise();
        var connId = "c" + connArr[0] + "c" + connArr[1];

        game[3]++;
        updateAll();

        removeMatrixConnectorByConnID(connId);


        removeConnectorByConnID(connId, 1).done( function () {

            updateAll();

            node = getFreeNode();

            if (node != null) {
                removeNode(node).done( function() {
                    node2 = getFreeNode();
                    if (node2 != null) {
                        removeNode(node2);
                        game[2]++;
                        updateAll();
                    }
                    game[2]++;
                    updateAll();

                    if (game[4] != 'completed') computerTurn();
                });
                game[0] = 2;
                updateAll();
            }
            else {
                game[0] = 1;

                enableConnectorsEvent();

                updateAll();
            }

        });



    }




    function updateGameScore() {

        if (settings[0] == 'vsComputer') {
            if (game[0] == 1) $("#gameTurn").html("Player's turn");
            else $("#gameTurn").html("Computer's turn");
        }
        else {
            if (game[0] == 1) $("#gameTurn").html("Player #1's turn");
            else $("#gameTurn").html("Player #2's turn");
        }

        $("#player1-score").html(game[1]);
        $("#player2-score").html(game[2]);

    }



    /*
        Returns game status checking the matrix
    */
    function getGameStatus() {

        var status = true;

        for (var node_number=1; node_number<matrix.length; node_number++) {
            if (matrix[node_number][0] == 0) {
                status = false;
                break;
            }
        }
        if (status == true) return 'completed';

        status = true;
        for (var node_number=1; node_number<matrix.length; node_number++) {
            if (matrix[node_number][0] != 0) {
                status = false;
                break;
            }
        }
        if (status == true) {
            if (game[3] > 0) return 'ongoing';
            else return 'not_started';
        }

        return 'ongoing';

    }
