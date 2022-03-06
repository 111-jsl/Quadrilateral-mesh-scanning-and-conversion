//该函数在一个canvas上绘制一个点
//其中cxt是从canvas中获得的一个2d上下文context
//    x,y分别是该点的横纵坐标
//    color是表示颜色的整形数组，形如[r,g,b]
//    color在这里会本转化为表示颜色的字符串，其内容也可以是：
//        直接用颜色名称:   "red" "green" "blue"
//        十六进制颜色值:   "#EEEEFF"
//        rgb分量表示形式:  "rgb(0-255,0-255,0-255)"
//        rgba分量表示形式:  "rgba(0-255,1-255,1-255,透明度)"
//由于canvas本身没有绘制单个point的接口，所以我们通过绘制一条短路径替代
function drawPoint(cxt, x, y, color) {
    //建立一条新的路径
    cxt.beginPath();
    //设置画笔的颜色
    cxt.strokeStyle = "rgb(" + color[0] + "," +
        +color[1] + "," +
        +color[2] + ")";
    //设置路径起始位置
    cxt.moveTo(x, y);
    //在路径中添加一个节点
    cxt.lineTo(x + 1, y + 1);
    //用画笔颜色绘制路径
    cxt.stroke();
}

//绘制线段的函数绘制一条从(x1,y1)到(x2,y2)的线段，cxt和color两个参数意义与绘制点的函数相同，
function drawLine(cxt, x1, y1, x2, y2, color) {

    cxt.beginPath();
    cxt.strokeStyle = "rgba(" + color[0] + "," +
        +color[1] + "," +
        +color[2] + "," +
        +255 + ")";
    //这里线宽取1会有色差，但是类似半透明的效果有利于debug，取2效果较好
    cxt.lineWidth = 1;
    cxt.moveTo(x1, y1);
    cxt.lineTo(x2, y2);
    cxt.stroke();
}

//draw single polygon
function drawplane(cxt, polygon, color){
    num_point = polygon.length;
    // ini edges list
    var edges_list = new Array();
    for(j = 0; j < num_point; j++){
        
        var k;
        if(j == num_point - 1) k = 0;
        else k = j + 1;
        
        //sort point1, point2 by y
        var point1, point2;
        if(vertex_pos[polygon[j]][1] < vertex_pos[polygon[k]][1]){
            point1 = vertex_pos[polygon[j]];
            point2 = vertex_pos[polygon[k]];
        }
        else{
            point1 = vertex_pos[polygon[k]];
            point2 = vertex_pos[polygon[j]];
        }

        // exclude horizontal edge
        if(point2[1] - point1[1] <= 1) continue;
        
        // solve delta_x float
        delta_x = (point1[0] - point2[0]) 
                / (point1[1] - point2[1]);
            
        var line = new Line(point1, point2, delta_x);
                            
        edges_list.push(line);
    }

    //sort edges by maxy
    edges_list.sort(function (a, b){ return a.point1[1] - b.point1[1] });

    //make empty list for further process
    var active_edges_list = new Array();

    //scan line
    for(y = 0; y < canvasSize.maxY; y++){ 
        //insert edges
        // console.log(edges_list);
        for(e = 0; e < edges_list.length;){
            if(y >= edges_list[e].point1[1]){
                active_edges_list.push(edges_list[e]);
                edges_list.splice(e, 1);
            }
            else break;
        }
        
        // console.log(active_edges_list);
        //remove edges
        for(e = 0; e < active_edges_list.length;){
            if(y >= active_edges_list[e].point2[1]){
                active_edges_list.splice(e, 1);
            }
            else e++;
        }

        //update x coordinate in active_edges_list
        ael_len = active_edges_list.length;
        for(p = 0; p < ael_len; p++){
            active_edges_list[p].point1[0] += active_edges_list[p].delta_x;
            active_edges_list[p].point1[1]++;
        }

        //sort edges by x
        active_edges_list.sort(function (a, b) { return a.point1[0] - b.point1[0] })
        
        //draw line
        
        for(p = 0; p < ael_len - 1; p += 2){
            drawLine(cxt,
                     active_edges_list[p].point1[0],
                     active_edges_list[p].point1[1],
                     active_edges_list[p + 1].point1[0],
                     active_edges_list[p + 1].point1[1],
                     color);
        }
    }
}

//draw point for user to drag
function drawUI(cxt, vertices, color){
    num = vertices.length;
    for(i = 0; i < num; i++){
        cxt.beginPath();
        cxt.arc(vertices[i][0], vertices[i][1], 10, 0, Math.PI * 2);
        cxt.fillstyle = color;
        cxt.fill();
        cxt.strokeStyle = color;
        cxt.stroke();
    }
}


var c = document.getElementById("myCanvas");
var cxt = c.getContext("2d");

//将canvas坐标整体偏移0.5，用于解决宽度为1个像素的线段的绘制问题，具体原理详见project文档
cxt.translate(0.5, 0.5);
chosen_vertex = 0;


//ini
num_polygons = polygons.length;
for(i = 0; i < num_polygons; i++){
    drawplane(cxt, polygons[i], shape_color[i]);
}
drawUI(cxt, vertex_pos, UIcolor);


c.onmousemove = function (event){
    mouse_pos[0] = event.pageX;
    mouse_pos[1] = event.pageY;
}

c.onmousedown = function (event){
    mouse_pos[0] = event.pageX;
    mouse_pos[1] = event.pageY;
    ismatch = false;
    for(i = 0; i < 9; i++){
        //if mouse is in [x - ofs, x + ofs] && [y - ofs, y + ofs], then get the chosen vertex
        //problem: multiple matching vertex
        if(Math.abs(mouse_pos[0] - vertex_pos[i][0]) < offset && Math.abs(mouse_pos[1] - vertex_pos[i][1]) < offset){
            chosen_vertex = i;
            ismatch = true;
            break;
        }
    }
    if(ismatch){
        tid = setInterval(function(){
            //clear the screen before next render
            cxt.clearRect(0, 0, canvasSize.maxX, canvasSize.maxY);
            //set the chosen vertex's position
            vertex_pos[chosen_vertex][0] = mouse_pos[0];
            vertex_pos[chosen_vertex][1] = mouse_pos[1];
            num_polygons = polygons.length;
            for(i = 0; i < num_polygons; i++){
                drawplane(cxt, polygons[i], shape_color[i]);
            }
            drawUI(cxt, vertex_pos, UIcolor);
        }, render_frequency);
    }
    
}

c.onmouseup = function (event){
    clearInterval(tid);
}

c.onmouseout = function (event){
    clearInterval(tid);
}




