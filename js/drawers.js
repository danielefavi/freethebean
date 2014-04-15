/*
    Playground fields drawer
    
    FIELD'S PARAMETER
    lo --> connector line offset (half with of connector size)
    lw --> connector line width
    no --> node offset (node width + border size)
    ms --> matrix size
*/

var minheight = 250;

function sizeThePlayground (fieldWidth, fieldHeight, container_name) {
    
        var margin = 0;
        
        if ( fieldHeight > minheight) {
            $("#" + container_name).css('height', fieldHeight);
        }
        else {
            $("#" + container_name).css('height', fieldHeight);
            margin = (minheight - fieldHeight) / 2;
            $("#" + container_name).css('margin-top', margin);
            $("#" + container_name).css('margin-bottom', margin);
        }
        
        $("#" + container_name).css('width', fieldWidth);
    
}



// Playground Cleaner

    function playgroundCleaner(container_name) {
        $("#" + container_name).html('');
    }



// Square scheme playground

    function drawPlaygrownd_square(ms, lo, lw, no, container_name) {

        /*
            var obl_line = Math.sqrt(2*lw*lw);

            var obl_off = (obl_line/2)*Math.sin(Math.PI/4);
            var obl_off_pre = obl_line/2-obl_off;
        */

        var obl_line = Math.round(Math.sqrt(2*lw*lw));

        var obl_off = Math.round((obl_line/2)*Math.sin(Math.PI/4));
        var obl_off_pre = Math.round(obl_line/2-obl_off);


        var node_id = 0;

        for (var i=0; i<ms; i++) {
            for (var j=0; j<ms; j++) {

                node_id++;

                $("#" + container_name).append( '<div id="n'+node_id+'" class="node" style="top:' + ((i*lw)-no) + 'px; left:' + ((j*lw)-no) + 'px;"></div>' );

                if (j < (ms-1))
                    $("#" + container_name).append( '<div id="c'+node_id+'c'+(node_id+1)+'" class="conn conn-hor" style="top:' + ((i*lw)-lo) + 'px; left:' + ((j*lw)-lo) + 'px;"></div>' );
                if (i < (ms-1))
                    $("#" + container_name).append( '<div id="c'+node_id+'c'+(node_id+ms)+'" class="conn conn-ver" style="top:' + ((i*lw)-lo) + 'px; left:' + ((j*lw)-lo) + 'px;"></div>' );
                if ( (i < (ms-1)) && (j < (ms-1)) )
                    $("#" + container_name).append( '<div id="c'+node_id+'c'+(node_id+ms+1)+'" class="conn conn-obl-r" style="top:' + (obl_off+(i*lw)-lo) + 'px; left:' + ((j*lw)-obl_off_pre) + 'px;"></div>' );
                if ( (i < (ms-1)) && (j < (ms-1)) )
                    $("#" + container_name).append( '<div id="c'+(node_id+1)+'c'+(node_id+ms)+'" class="conn conn-obl-l" style="top:' + (obl_off+(i*lw)-lo) + 'px; left:' + ((j*lw)-obl_off_pre) + 'px;"></div>' );

            }
        }

        
        var fieldHeight = (ms-1)*lw;
        var fieldWidth = (ms-1)*50;
        
         sizeThePlayground (fieldWidth, fieldHeight, container_name);
        
        /*
        if ( fieldHeight > minheight) {
            $("#" + container_name).css('height', fieldHeight);
        }
        else {
            $("#" + container_name).css('height', fieldHeight);
            margin = (minheight - fieldHeight) / 2;
            $("#" + container_name).css('margin-top', margin);
            $("#" + container_name).css('margin-bottom', margin);
        }
        
        
        $("#" + container_name).css('width', (ms-1)*50);
        */
    }




    function drawPlaygrownd_triangle(ms, lo, lw, no, container_name) {
        
        var node_id = 0;
        var h = Math.round( (1.73205) * lw / 2 );
        
        for (var line = 0; line < (ms+1); line++) {
            
            for (var k=0; k<line; k++) {
                
                node_id++;

                
                
                $("#" + container_name).append( '<div id="n'+node_id+'" class="node" style="top:' + ((line-1)*h-no) + 'px; left:' + (lw/2*(ms-line)+k*lw-no) + 'px;"></div>' );
                
                if (k < (line-1))
                    $("#" + container_name).append( '<div id="c'+node_id+'c'+(node_id+1)+'" class="conn conn-hor" style="top:' + ((line-1)*h-lo) + 'px; left:' + (lw/2*(ms-line)+k*lw-lo) + 'px;"></div>' );
                if (line < ms)
                    $("#" + container_name).append( '<div id="c'+node_id+'c'+(node_id+line+1)+'" class="conn conn-obl-r-triangle " style="top:' + ((line-1)*h+h/2) + 'px; left:' + (lw/2*(ms-line)+k*lw-no) + 'px;"></div>' );
                if (line < ms)
                    $("#" + container_name).append( '<div id="c'+node_id+'c'+(node_id+line)+'" class="conn conn-obl-l-triangle " style="top:' + ((line-1)*h+h/2) + 'px; left:' + (lw/2*(ms-line-1)+k*lw-no-lo-2) + 'px;"></div>' );      
                
                
            }
            
        }
        
        
        // ((ms-1)*h) --> is the height of the playground in px
        
        
        
        
        var fieldHeight = (ms-1)*h;
        var fieldWidth = (ms-1)*50;
        
        sizeThePlayground (fieldWidth, fieldHeight, container_name);
        
        /*
        var margin = 0;
        
        if ( fieldHeight > minheight) {
            $("#" + container_name).css('height', fieldHeight);
        }
        else {
            $("#" + container_name).css('height', fieldHeight);
            margin = (minheight - fieldHeight) / 2;
            $("#" + container_name).css('margin-top', margin);
            $("#" + container_name).css('margin-bottom', margin);
        }
        
        $("#" + container_name).css('width', (ms-1)*50);
        */
        
    }