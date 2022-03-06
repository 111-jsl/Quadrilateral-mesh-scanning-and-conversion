//�����Ĵ�С
var canvasSize = {"maxX": 1024, "maxY": 768};

//������ÿ��Ԫ�ر�ʾһ���������[x,y,z]������һ����9����
var vertex_pos = [
    [0, 0, 0],
    [700, 0, 0],
    [1000, 0, 0],
    [100, 400, 0],
    [600, 450, 0],
    [1000, 400, 0],
    [50, 650, 0],
    [700, 700, 0],
    [1000, 700, 0]
];

//������ɫ���飬���������涥��������ÿ��������ɫ��Ϣ[r,g,b]
var vertex_color = [
    [0, 0, 255],
    [0, 255, 0],
    [0, 255, 255],
    [255, 255, 0],
    [0, 255, 255],
    [0, 255, 0],
    [0, 255, 0],
    [0, 200, 100],
    [255, 255, 0]
];

//�ı������飬������ÿ��Ԫ�ر�ʾһ���ı��Σ����е��ĸ��������ı����ĸ������index������vertex[polygon[2][1]]��ʾ����������εĵ�2�����������
var polygons = [
    [0, 1, 4, 3],
    [1, 2, 5, 4],
    [3, 4, 7, 6],
    [4, 5, 8, 7]
];

var shape_color = [
    [0, 0, 255],
    [0, 255, 0],
    [0, 255, 255],
    [255, 255, 0]
];

var mouse_pos = [0, 0];

const INF = canvasSize.maxX + 100;

var offset = 20;
var UIcolor = [255, 255, 255];

function Line(point1, point2, delta_x){
    this.point1 = [point1[0], point1[1]];
    this.point2 = [point2[0], point2[1]];
    this.delta_x = delta_x;
    // this.current_y = current_y;
};

var render_frequency = 20;




