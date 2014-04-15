
/*
    searchNodeOneConn returns an array containing all the nodes with only one connection
*/

    function searchNodeOneConn(mtrx) {
        var nodes_list = [];
        var counter = 0;

        // Matrix node element loop
        for (var node_number=1; node_number<mtrx.length; node_number++) {
            counter = 0;
            // Node connection loop
            if (mtrx[node_number][0] == 0) {
                for (var j=1; j<mtrx[node_number].length; j++) {
                    if (mtrx[node_number][j] != 0) {
                        counter++;
                    }
                }
            }
            if (counter == 1) {
                nodes_list.push(node_number);

                for (var j=1; j<mtrx[node_number].length; j++) {
                    if (mtrx[node_number][j] != 0) {
                        nodes_list.push(mtrx[node_number][j]);
                        break;
                    }
                }
            }
        }
        return nodes_list;
    }



/*
    searchNodeMaximumConn returns an array containing all the nodes with maximum connteciont
*/

    function searchNodeMaximumConn(mtrx) {
        var nodes_list = [];
        var connection_counter = 0;
        var max_conn = 0;


        // Finding maximum connection number per node
        for (var node_number=1; node_number<mtrx.length; node_number++) {
            connection_counter = 0;

            // Node connection loop
            if (mtrx[node_number][0] == 0) {
                for (var j=1; j<mtrx[node_number].length; j++) {
                    if (mtrx[node_number][j] != 0) connection_counter++;
                }
            }
            if (connection_counter > max_conn) max_conn = connection_counter;
        }

        // Push in the array the node with maximum node numer
        for (var node_number=1; node_number<mtrx.length; node_number++) {
            connection_counter = 0;
            if (mtrx[node_number][0] == 0) {
                for (var j=1; j<mtrx[node_number].length; j++) {
                    if (mtrx[node_number][j] != 0) connection_counter++;
                }
                if (connection_counter == max_conn) {
                    for (var k=1; k<mtrx[node_number].length; k++) {
                        if (mtrx[node_number][k] != 0) {
                            nodes_list.push(node_number);
                            nodes_list.push(mtrx[node_number][k]);
                        }
                    }
                }
            }
        }


        return nodes_list;
    }






           function removeMatrixConnectorByConnID(connector_id) {
                
                // get the NODES id by the clicked connector id
                var node_id1 = '';
                var node_id2 = '';
                
                for (var i=1; i<connector_id.length; i++) {
                    if (connector_id.substring(i,i+1) != 'c') node_id1 += connector_id.substring(i,i+1);
                    else {
                        node_id2 = connector_id.substring(i+1, connector_id.length);
                        break;
                    }
                }

                // delete the corrispondent clicked connector on the matrix
                matrix = deleteMatrixConnector(node_id1, node_id2, matrix);

            }
            
            
            
            
            
            function removeConnectorByConnID(connector_id, mode) {
                
                /* Mode is the animation mode to fade the connectors:
                    0 is the standard animation
                    1 is the computer disappearing way
                    
                    The animation function return a PROMISE object in order to check when the animation end
                */
                
                if (typeof(mode) === 'undefined') mode = 0;
                
                if (mode != 0) {
                    $("#" + connector_id).css("background-color","red");
                    $("#" + connector_id).css("z-index","11");
                    $("#" + connector_id).addClass("pulse");

                    return $("#" + connector_id).fadeTo("slow",0.1).fadeTo("slow",1).fadeOut(300).promise();
                }
                else {
                    return $("#" + connector_id).fadeOut(300).promise();
                }
                
            }
            
            

            
            function getFreeNode() {
                
                // Check free nodes
                var free_node = true;
                
                for (var node_number=1; node_number<matrix.length; node_number++) {
                    free_node = true;
                    if (matrix[node_number][0] == 0) {
                        for (var k=1; k<matrix[node_number].length; k++) {
                            if (matrix[node_number][k] != 0) free_node = false;
                        }
                        if (free_node == true) {
                            matrix[node_number][0] = game[0]; // Set who freed the node
                            return node_number;
                        }
                    }
                    
                }
                
                return null;
                
            }
            
            
            
            function removeNode(node_number) {
                return $("#n" + node_number).fadeOut(500).promise();
            }
            
            
            function computerChoise() {
                var node_list = [];
                var arRet = [];
                
                node_list = searchNodeOneConn(matrix);
                
                if (node_list.length > 0) {
                    /* Choise of a random connector from the ramdom list result */
                    var conn_position = Math.floor(Math.random() * (node_list.length/2) ) * 2;
                    
                    if (node_list[conn_position] < node_list[conn_position+1]) arRet = [ node_list[conn_position] , node_list[conn_position+1] ];
                    else arRet = [ node_list[conn_position+1] , node_list[conn_position] ];
                    
                    return arRet;

                }
                else {
                    node_list = [];
                    
                    node_list = searchNodeMaximumConn(matrix);
                    
                    if (node_list.length > 0) {
                        /* Choise of a random connector from the ramdom list result */
                        var conn_position = Math.floor(Math.random() * (node_list.length/2) ) * 2;

                    if (node_list[conn_position] < node_list[conn_position+1]) arRet = [ node_list[conn_position] , node_list[conn_position+1] ];
                    else arRet = [ node_list[conn_position+1] , node_list[conn_position] ];
                    
                        return arRet;
                    }
                    
                }
             
            }