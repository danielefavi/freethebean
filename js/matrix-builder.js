/*
    Matrix builder function
*/




/*

    This functions returns a matrix scheme representing how the nodes are connected with.
    The nodes are numbered from 1

    Following there is matrix square scheme
    For each node 
        matrix[node]
    there are 8 connectors fields that explains how node is conntected with (clockwise direction)
        matrix[node][1] --> top
        matrix[node][2] --> top-right
        matrix[node][3] --> right
        matrix[node][4] --> bottom-right
        matrix[node][5] --> bottom
        matrix[node][6] --> bottom-left
        matrix[node][7] --> left
        matrix[node][8] --> top-left

    For instance: the node#1 is connected with node node#2, node#4, node#5
        matrix[1] = [0,0,2,4,5,0,0,0]

    the field
        matrix[node][0]
    is used for checkes or additional settings
    
*/




    function deleteMatrixConnector(node_id1, node_id2, matrix) {
        
        if (node_id1 == undefined) alert('l:'+node_id1);
        if (node_id2 == undefined) alert('l:'+node_id2);
        
        for (var i=0; i<matrix[node_id1].length; i++) {
            if (matrix[node_id1][i] == node_id2) { matrix[node_id1][i] = 0; }
            if (matrix[node_id2][i] == node_id1) { matrix[node_id2][i] = 0; }
        }
        return matrix;
    }





    function createMatrixSquare(matrix_size) {

        var node_number = 0;
        var mtx = [];

        for (var i=0; i<matrix_size; i++) {
            for (var j=0; j<matrix_size; j++) {

                node_number++;
                mtx[node_number] = [];

                mtx[node_number][0] = 0;

                mtx[node_number][1] = node_number - matrix_size;
                mtx[node_number][2] = node_number - matrix_size + 1;
                mtx[node_number][3] = node_number + 1;
                mtx[node_number][4] = node_number + matrix_size + 1;
                mtx[node_number][5] = node_number + matrix_size;
                mtx[node_number][6] = node_number + matrix_size - 1;
                mtx[node_number][7] = node_number - 1;
                mtx[node_number][8] = node_number - matrix_size - 1;

            }
        }


        for (var node_number=1; node_number<(matrix_size*matrix_size+1); node_number++) {

                // Left side matrix cleaning connector
                if (((node_number + matrix_size - 1) % matrix_size) == 0) {
                    mtx[node_number][6] = 0;
                    mtx[node_number][7] = 0;
                    mtx[node_number][8] = 0;
                }

                // Right side matrix cleaning connector
                if ((node_number % matrix_size) == 0) {
                    mtx[node_number][2] = 0;
                    mtx[node_number][3] = 0;
                    mtx[node_number][4] = 0;
                }

                // Top side matrix cleaning connector
                if ((node_number > 0) && (node_number < (matrix_size + 1))) {
                    mtx[node_number][1] = 0;
                    mtx[node_number][2] = 0;
                    mtx[node_number][8] = 0;
                }

                // Bottom side matrix cleaning connector
                if ((node_number > matrix_size*matrix_size-matrix_size) && (node_number < (matrix_size*matrix_size + 1))) {
                    mtx[node_number][4] = 0;
                    mtx[node_number][5] = 0;
                    mtx[node_number][6] = 0;
                }

        }

        return mtx;

    }



    function createMatrixTriangle(matrix_size) {
        
        var node_number = 0;
        var mtx = [];
        
        for (var line=0; line<(matrix_size); line++) {
            for (var k=0; k<(line+1); k++) {
                
                //console.log("Line:" + line + "  - k:" + k);
                
                node_number++;
                mtx[node_number] = [];

                mtx[node_number][0] = 0;

                mtx[node_number][1] = node_number - line;
                mtx[node_number][2] = node_number + 1;
                mtx[node_number][3] = node_number + line + 2;
                mtx[node_number][4] = node_number + line + 1;
                mtx[node_number][5] = node_number - 1;
                mtx[node_number][6] = node_number - line - 1;
                
                if (k == 0) {
                    mtx[node_number][5] = 0;
                    mtx[node_number][6] = 0;
                }
                
                if (line == 0) {
                    mtx[node_number][1] = 0;
                    mtx[node_number][2] = 0;
                    mtx[node_number][5] = 0;
                    mtx[node_number][6] = 0;
                }
                
                if (k == line) {
                    mtx[node_number][1] = 0;
                    mtx[node_number][2] = 0;
                }
                
                if (line == (matrix_size-1)) {
                    mtx[node_number][3] = 0;
                    mtx[node_number][4] = 0;
                }

            }
        }
        

        return mtx;
        
    }