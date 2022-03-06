# Quadrilateral-mesh-scanning-and-conversion
use polygon scan-line algorithm to implement plane drawing for basic CG learning

# 计算机图形学 Project 1
## 四边形网格扫描转化与交互式编辑
发布时间：2022-03-02
Deadline：2022-03-23

### 一、项目目录：
config.js: 数据文件
core.js: 核心代码
scanConversion.html: 网页框架

### 二、开发环境：vscode
    运行环境：chrome 版本 99.0.4844.51 (正式版本) (64 位元)

### 三、运行方法：打开scanConversion.html
    使用方法：可以在config.js中调参

### 四、项目中的亮点：
1、思路清晰，可读性强；
2、由于光栅渲染的方向性，对于活化链表的插入只判断是否大于miny，删除只考虑是否大于maxy，略微减少判断次数；

### 五、开发中遇到的问题：
1、对于js不是很熟悉而出现一些语法错误：
    （1）html标签中元素之间不用加','；
    （2）js的类可以通过函数+this赋值来实现
        注意！！外部对象直接赋值后，是以引用的方式传值，若一个值赋给多个对象，会出现数据耦合的情况
        为了避免这种情况，可以将里面的元素一个一个拿出来赋值；
    （3）js创建数组没有a[100]这种形式，可以用var a = new Array()或var a = []实现；
    （4）sort自定义比较函数function (a, b){ return a.point1[1] - b.point1[1] } 此处为升序；
    （5）for a in container, a[0]或a.xxx会出现错误，尽量少用for in
    （6）对于onmousedown + setinterval组合，event只传入一次，所以如果要求鼠标坐标可以在onmousemove中求坐标，赋给全局变量，再返回去
    （7）event.clientX是针对页面的，但没有把页面滚动算进去，event.pageX可以

2、对于图形算法的疑问以及可能的不足：
    在本项目中，光栅算法自上而下的过程中，y递增1，x递增k，k为斜率，是否可以使用bresenham line算法，但是这里限制了y递增1，如果|k| < 1的话会出现gap没法搞
    各个地方都是按照ppt算法按部就班，基本上没有优化的地方

### 六、对于pj的想法
我觉得这个pj能够让我很快的上手并熟悉js的语法，熟悉图形学基础算法的代码实现，以及各类api的调用
