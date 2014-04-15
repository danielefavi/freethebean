          /* DEBUG FUNCTION */
            

            $(document).on("click", function() {
                                        console.log("col-2-3 : " + $(".col-2-3").height());
                        console.log("content-space : " + $(".content-space").height());
                        console.log("field-container : " + $("#field-container").height());
            console.log("main-container : " + $(".main-container").height());
            });
            
            /*
            function doDebug() {
                debugDisplayGame(game, 'debugGame');
                debugDisplayMatrix('debugMatrix');
            }
            
            */
            
            function debugFunction() {
                debugDisplayGame(game, 'debugGame');
                debugDisplayMatrix('debug');
                debugBrainMoves('debugBrain');
                debugSearchNodeMaximumConn('debugBrainMax');
                debugcomputerTactic('debug_computer_turn');
            }
            
            
            function debugcomputerTactic(field_name) {

                
            }
            
            
            function debugSearchNodeMaximumConn(field_name) {
                var mtrx = searchNodeMaximumConn(matrix);
                $("#" + field_name).html('<br />BRAIN max connection: ');
                for (var i=0; i<mtrx.length; i++) {
                    $("#" + field_name).append(' - ' + mtrx[i] + ':' + mtrx[++i] + ' - ');
                }
            }
            
            function debugBrainMoves(field_name) {
                var mtrx = searchNodeOneConn(matrix);
                $("#" + field_name).html('<br />BRAIN one connection: ');
                for (var i=0; i<mtrx.length; i++) {
                    $("#" + field_name).append(' - ' + mtrx[i] + ':' + mtrx[++i] + ' - ');
                }
            }
            
            
            function debugDisplayGame(game, field_name) {
                $("#" + field_name).html('<br />GAME: ');
                for (var i=0; i<game.length; i++) {
                    $("#" + field_name).append(' - ' + game[i] + ' - ');
                }
            }
            

            function debugDisplayMatrix(field_name) {
                $("#" + field_name).html('<br />MATRIX: <br />');
                for (var node_number=1; node_number<matrix.length; node_number++) {

                    $("#" + field_name).append('<span style="color:red">'+node_number+'</span> -- ');
                    
                    for (var k=0; k<matrix[node_number].length; k++) {
                        $("#" + field_name).append(' - ' + matrix[node_number][k]);
                    }

                    $("#" + field_name).append(' <br /> ');
                }
            }