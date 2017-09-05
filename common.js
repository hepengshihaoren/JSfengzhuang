// 封装函数
// 获取id
function id(id){
    return document.getElementById(id);
}

//获取元素的文本

function getText(ele){
    if (typeof ele.textContent=='string'){
        return ele.textContent;
    }else{
        return ele.innerText;
    }
}
// 设置元素的文本
function setText(ele,text){
    if(typeof ele.textContent=="string"){
            ele.textContent=text;
    }else{
        ele.innerText=text;
    }
}
// 获取上一个元素节点   考虑IE8及IE8以下的兼容
function  getPreviousElement(ele){
    if(ele.previousElementSibiling){
        return ele.previousElementSibiling 
    }else{
        var node=ele.previousSibiling;
        while(node.nodeType!=1){
            node=node.previousSibiling;
        }
    }
}
//获取下一个元素节点  
function getnextElement(ele){
    if (ele.nextElementSibiling){
        return ele.nextElementSibling;
    }else{
        var node=ele.nextSibling;
        while(node.nodeType!=1){
            node=node.nextSibling;
        }
        return node;
    }
}
//获取第一个元素节点
function getFirstelementChild(ele){
    if (ele.firstElementChild){
        return ele.firstElementChild
    }else{
        var node=node.firstChild;
        while(node.nodeType!=1){
            node=node.nextSibiling
        }
        return  node;
    }
}
// 获取最后一个元素节点

function getLastelementChild(ele){
    if(ele.lastElementChild){
        return ele.lastElementChild;
    }else{
        var node=node.lastChild;
        while(node.nodeType!=1){
            node=node.previousSibiling;
        }
        return node;
    }
}
// 获取元素样式的值
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return window.getComputedStyle(obj,null)[attr];
    }
}
// 获取页面scroll值
function getScroll(){
    return{
        scrollLeft:window.pageXoffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,
        scrollTop:window.pageYoffset||document.documentElement.scrollTop||document.body.scrollTop||0

    };
}
// 获取页面的page值
function getPage(e){
    e=e||window.event;
    return{
        pageX:e.pageX||e.clientX+document.documentElement.scrollLeft,
        pageY:e.pageY||e.clientY+document.documentElement.scrollTop

    }
}
// 获取offset值
        function offsetTop( elements ){ 
            var top = elements.offsetTop; 
            var parent = elements.offsetParent; 
            while( parent != null ){ 
            top += parent.offsetTop; 
            parent = parent.offsetParent; 
        }; 
            return top; 
        }; 
        function offsetLeft( elements ){ 
            var left = elements.offsetLeft; 
            var parent = elements.offsetParent; 
            while( parent != null ){ 
            left += parent.offsetLeft; 
            parent = parent.offsetParent; 
        }; 
            return parent; 
        }; 
//获取页面client值
function getclient(){
    return{
        clientWidth:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,
        clientHeight:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight

    }
}
//缓动动画 所有参数 (每次判断)
    function animate(obj,json,fn){
        clearInterval(obj.timerId);
        obj.timerId = setInterval(function () {
            var flag = true;
            for(var key in json){
                if(key == "opacity"){
                    var current = getStyle(obj,key) * 100;
                    var step = (json[key]*100 - current)/10;
                    step = step > 0? Math.ceil(step):Math.floor(step);
                    current += step;
                    obj.style[key] = current/100;
                    if(current/100 != json[key]){
                        flag = false;
                    }
                }else if(key == "zIndex"){
                    var current = parseInt( getStyle(obj,key));
                    obj.style[key] = json[key];
                    if(current != json[key]){
                        flag = false;
                    }
                }else{
                    var current = parseInt(getStyle(obj,key));
                    var step = (json[key] - current)/10;
                    step = step > 0? Math.ceil(step):Math.floor(step);

                    current += step;
                    obj.style[key] = current +"px";
                    if(current != json[key]){
                        flag = false;
                    }
                }
            }
            if(flag == true){
                clearInterval(obj.timerId);
                if(typeof fn == "function"){
                    fn();
                }
            }
        },50);
    }
// 缓动动画  (一次判断)
 function animateOnce(obj, json, fn) {
        clearInterval(obj.timeId);
        obj.timeId = setInterval(function () {
            var flag = true;
            for (var key  in  json) {
                if(key=="opacity"){

                    var current = parseInt(getStyle(obj, key)*100);
                    var target = json[key]*100;
                    var step = (target - current) / 10;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    current +=step;
                    console.log(current);
                    obj.style[key] = current/100;
                }else if(key =="zIndex"){
                    var current = parseInt(getStyle(obj, key)) ;
                    var target = json[key];
                    var step = (target - current) / 10;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    current+=step;
                    console.log(current);
                    obj.style[key] = current;
                }else {
                    var current = parseInt(getStyle(obj, key)) ;
                    var target = json[key];
                    var step = (target - current) / 10;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    current += step;
                    console.log(step+":"+current);
                    obj.style[key] = current + 'px';
                }


                if (current != target) {
                    flag = false;
                }
            }
            if (flag) {
                clearInterval(obj.timeId);

                if (typeof fn == "function") {
                    fn();
                }
            }

        }, 15)
    }
//缓动动画  (控制步数 匀速动画 )
     function animateStep(obj,json,fn){
        clearInterval(obj.timerId);
        obj.timerId = setInterval(function () {
            var flag = true;
            for(var key in json){
                if(key == "opacity"){
                    var current = getStyle(obj,key) * 100;
                    var step = (json[key]*100 - current)/10;
                    step = step > 0? Math.ceil(step):Math.floor(step);
                    current += step;
                    obj.style[key] = current/100;
                    if(current/100 != json[key]){
                        flag = false;
                    }
                }else if(key == "zIndex"){
                    var current = parseInt( getStyle(obj,key));
                    obj.style[key] = json[key];
                    if(current != json[key]){
                        flag = false;
                    }
                }else{
                    var current = parseInt(getStyle(obj,key));
                    var  step=current<json[key]?1:-1;

                    current+=step;
                    if(Math.abs(json[key]-current)<Math.abs(step)){                      
                        clearInterval(obj.timerId);
                        obj.current=json[key]+"px";
                    }else{
                        obj.style[key]=current+"px";
                    }
                    if(current != json[key]){
                        flag = false;
                    }
                }
            }
            if(flag == true){
                clearInterval(obj.timerId);
                if(typeof fn == "function"){
                    fn();
                }
            }


         
        },50);
    }
//  增加类
 function addClass(obj,className){
               
                if(obj.className == ""){
                    obj.className = className;
                }else{
                    var _index = classIndexOf(obj,className);
                    if(_index == -1){
                        obj.className += " " + className;
                    }
                }
            }
   
// 移出类
 function removeClass(obj,className){
                if(obj.className != ""){
                    var arrClassName = obj.className.split(" ");
                    var _index = classIndexOf(obj,className);
                    if(_index != -1){
                        arrClassName.splice(_index,1);
                    }
                    obj.className = arrClassName.join(" ");
                }
            }
// 检验是否有这个类
  function classIndexOf(obj,v){
                var arrClassName = obj.className.split(" ");
                for(var i=0;i<arrClassName.length;i++){
                    if(arrClassName[i] == v){
                        return i;
                    }
                }
                return -1;
            }
//鼠标滚轮   fnUp fnDown分别为鼠标向上和向下滚动的回调函数
function mouseWheel(obj,fnUp,fnDown){
    obj.onmousewheel = fn;

    if (obj.addEventListener) {
        obj.addEventListener('DOMMouseScroll', fn, false);
    }

    function fn(ev) {
        var ev = ev || event;
        var b = true;

        if (ev.wheelDelta) {
            b = ev.wheelDelta > 0 ? true : false;
        } else {
            b = ev.detail < 0 ? true : false;
        }

        if ( b ) {
            fnUp&&fnUp();
        } else {
            fnDown&&fnDown();
        }
        if (ev.preventDefault) {
            ev.preventDefault();
        }
        return false;
    }
}
//鼠标滚轮事件
function MouseWheelHandle (obj,handle){
    var info = navigator.userAgent;
    var down = null;//用来记录滚轮的上下,down=true表示向下
    if(info.indexOf("Firefox") !=-1){
        obj.addEventListener("DOMMouseScroll",function(event){
            var ev = event ||window.event;
                if(ev.detail>0){
                    
                    down = true;
                }else{
                    down = false;            
                }
             
                handle(down,ev);
               ////apply 可以让每一个函数都有一个自带的方法apply, 这个方法可以切换函数的运行环境,如果函数需要传递参数,以数组的形式传递
                handle.apply(obj,[down,ev]);
        },false);

    }else{

        obj.onmousewheel = function(event){
            var ev = event || window.event;
            if(ev.wheelDelta >0){
                down =false;
            }else{
                down = true;
            }
            handle(down,ev);
            handle.apply(obj,[down,ev]);
             //call 每个函数也都有一个call方法,他的功能和apply一样,
            //都可以实现切换一个函数的调用者(运行环境);
            //call和apply唯一的区别在于:函数有参数的时候,传递方式不一样,call
            //依次传递参数,参数用逗号隔开即可
            handle.call(obj,down,ev);
        }
    }


   // call 和 apply 都是为了改变某个函数运行时的 context 即上下文而存在的，换句话说，就是为了改变函数体内部 this 的指向。
//call 和 apply二者的作用完全一样，只是接受参数的方式不太一样。
//语法：foo.call(this, arg1,arg2,arg3) == foo.apply(this, arguments) == this.foo(arg1, arg2, arg3);
}
//在实际开发中，经常会遇到this指向被不经意改变的场景。有一个局部的fun方法，fun被作为普通函数调用时，fun内部的this指向了window，但我们往往是想让它指向某个节点
//拖拽事件的封装函数
function drag(index){
　　index.onmousedown = function(event){
       　　 var ev = event ||window.event;
        　　ev.preventDefault();
       　　 disX = ev.clientX-this.offsetLeft;
      　　  disY = ev.clientY-this.offsetTop;
       　　 //给index绑定moousemove事件
       　　 document.onmousemove = function(event){
         　　   var ev = event ||window.event;
         　　   ev.preventDefault();
          　　  var x = ev.clientX;
          　　  var y = ev.clientY;
          　　  index.style.left = x-disX+'px';
           　　 index.style.top = y-disY+'px';
       　　 }
    　　}
    　　document.onmouseup =function(){
       　　 document.onmousemove = null;
  　　  }
　　}
// 判断两个矩形是否碰撞
function hitfun(obj1,obj2){
        
        var l1 = obj1.offsetLeft;
        var t1 = obj1.offsetTop;
        var r1 = l1+obj1.offsetWidth;
        var b1 = t1+obj1.offsetHeight;

        
        var l2 = obj2.offsetLeft;
        var t2 = obj2.offsetTop;
        var r2 = l2+obj2.offsetWidth;
        var b2 = t2+obj2.offsetHeight;
        if(l1 >r2 || t1 > b2 ||r1<l2 ||b1<t2 ){
                return false;
        }else{
            return true;
        }
}  
//检测两个圆形是否发生碰撞
    function hitfun(obj1,obj2){
        //记录两个圆的半径
        var r1 = obj1.offsetWidth/2;
        var r2 = obj2.offsetWidth/2;
        var l1 = obj1.offsetLeft+r1;
        var t1 = obj1.offsetTop +r1;
        var l2 = obj2.offsetLeft +r2;
        var t2 = obj2.offsetTop +r2;
        var a = l2-l1;
        var b = t2-t1;
        var c = Math.sqrt(Math.pow((l2-l1),2)+Math.pow((t2-t1),2))
        var d = r1+r2;
        if(c <=d){
            return true;
        }else{
            return false;
        }

    }
//事件封装函数
var EventHandle = {
    addEvent:function(ele,type,handle){
        if(ele.addEventListener){
            ele.addEventListener(type,handle,false);
        }else if(ele.attachEvent){
            ele.attachEvent("on"+type,handle);
        }else{
            ele["on"+type] = handle;
        }
    },
    deleteEvent:function(ele,type,handle){
        if(ele.removeEventListener){
            ele.removeEventListener(type,handle,false);
        }else if(ele.detachEvent){
            ele.detachEvent("on"+type,handle);
        }else{
            ele["on"+type] = null;
        }
    }
}
//运动框架 startMove
function startMove(obj,json,fun){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var isStop = true;
        for(var attr in json){
            var iCur = 0;
            //判断运动的是不是透明度值
            if(attr=="opacity"){
                iCur = parseInt(parseFloat(getStyle(obj,attr))*100);
            }else{
                iCur = parseInt(getStyle(obj,attr));
            }
            var ispeed = (json[attr]-iCur)/8;

            ispeed = ispeed>0?Math.ceil(ispeed):Math.floor(ispeed);

            if(iCur!=json[attr]){
                isStop = false;
            }
            //运动开始
            if(attr=="opacity"){
                obj.style.filter = "alpha:(opacity:"+(json[attr]+ispeed)+")";
                obj.style.opacity = (json[attr]+ispeed)/100;
            }else{
                obj.style[attr] = iCur+ispeed+"px";
            }
        }
        //判断是否全部完成
        if(isStop){
            clearInterval(obj.timer);
            if(fun){
                fun();
            }
        }
    },30);
}
// 完整版运动框架
function startTMove(obj,json,endFn){
//每一次只能传一个样式，和一个值。那么就要把这些改成一个json对象  如果需要回调函数,设置为先判断再执行
    clearInterval(obj.timer);

    obj.timer = setInterval(function(){

        var bBtn = true;//// 假设：所有的值都已经到了

        for(var attr in json){

            var iCur = 0;

            if(attr == 'opacity'){ //处理透明度，不能使用parseInt否则就为0了 
                if(Math.round(parseFloat(getStyle(obj,attr))*100)==0){
                    iCur = Math.round(parseFloat(getStyle(obj,attr))*100);  // *100 会有误差  所以要用 Math.round() 会四舍五入

                }
                else{
                    iCur = Math.round(parseFloat(getStyle(obj,attr))*100) || 100;
                }
            }               //当前移动的数值
            else{
                iCur = parseInt(getStyle(obj,attr)) || 0;
            }

            var iSpeed = (json[attr] - iCur)/8;//物体运动的速度 数字越小动的越慢  /8: 自定义的数字
            iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if(iCur!=json[attr]){
                bBtn = false;  // 某个值不等于目标点
            }

            if(attr == 'opacity'){
                obj.style.filter = 'alpha(opacity=' +(iCur + iSpeed)+ ')';
                obj.style.opacity = (iCur + iSpeed)/100;

            }
            else{
                obj.style[attr] = iCur + iSpeed + 'px';
            }


        }
          // 都达到了目标点
        if(bBtn){
            clearInterval(obj.timer);

            if(endFn){//只有传这个函数才会去调用
                endFn.call(obj);
            }
        }

    },30);

}
// 拖拽事件
function setDrag(obj){
       obj.onmouseover = function(){
           obj.style.cursor = "move";
       }
       obj.onmousedown = function(event){
           var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
           var scrollLeft = document.documentElement.scrollLeft||document.body.scrollLeft;
           obj.style.zIndex = minZindex++;
            
           disX = event.clientX +scrollLeft-obj.offsetLeft;//当鼠标按下时计算鼠标与拖拽对象的距离
           disY = event.clientY +scrollTop-obj.offsetTop;
           document.onmousemove=function(event){
    
               var l = event.clientX -disX +scrollLeft;    //当鼠标拖动时计算div的位置
               var t = event.clientY -disY + scrollTop;
               obj.style.left = l + "px";
               obj.style.top = t + "px";
    
               for(var i=0;i<aLi.length;i++){
                   aLi[i].className = aLi[i].className;
               }
               var oNear = findMin(obj);
    
    
               if(oNear){
                   //oNear.className = "active";
               }
           }
           document.onmouseup = function(){
               document.onmousemove = null;   //当鼠标弹起事时移出移动事件
               document.onmouseup = null;
    
               var oNear = findMin(obj);  //检测是否碰撞上,在交换位置
               if(oNear){
                   var width1=oNear.clientWidth;
                   var height1=oNear.clientHeight;
                   var width2=obj.clientWidth;
                   var height2=obj.clientHeight;
                   console.log(width1+width2)
                   console.log(oNear.className);
                   console.log(obj.className)
                   var className1=obj.className;
                   var className2=oNear.className;
                   obj.className=className2;
                   oNear.className=className1;
                   oNear.style.zIndex = minZindex++;
                   obj.style.zIndex = minZindex++;
                   startMove(oNear,aPos[obj.index]);
                   startMove(obj,aPos[oNear.index]);      //交换index
                
                   oNear.index += obj.index;
                   obj.index = oNear.index - obj.index;
                   oNear.index = oNear.index - obj.index;
    
    
                   obj.clientWidth=width2;
                   obj.clientHeight=height2;
    
                   oNear.clientWidth=width1;
                   oNear.clientHeight=height1;
    
               }else{
    
                   startMove(obj,aPos[obj.index]);
               }
           }
           clearInterval(obj.timer);
           return false;
       }
    }
    //碰撞检测
    function colTest(obj1,obj2){
       var t1 = obj1.offsetTop;
       var r1 = obj1.offsetWidth+obj1.offsetLeft;
       var b1 = obj1.offsetHeight+obj1.offsetTop;
       var l1 = obj1.offsetLeft;
    
       var t2 = obj2.offsetTop;
       var r2 = obj2.offsetWidth+obj2.offsetLeft;
       var b2 = obj2.offsetHeight+obj2.offsetTop;
       var l2 = obj2.offsetLeft;
    
       if(t1>b2||r1<l2||b1<t2||l1>r2){
           return false;
       }else{
           return true;
       }
    }
    //勾股定理求距离
    function getDis(obj1,obj2){
       var a = obj1.offsetLeft-obj2.offsetLeft;
       var b = obj1.offsetTop-obj2.offsetTop;
       return Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
    }
    //找距离最近的
    function findMin(obj){
       var minDis = 999999999;
       var minIndex = -1;
       for(var i=0;i<aLi.length;i++){
           if(obj==aLi[i])continue;
           if(colTest(obj,aLi[i])){
               var dis = getDis(obj,aLi[i]);
               if(dis<minDis){
                   minDis = dis;
                   minIndex = i;
               }
           }
       }
       if(minIndex==-1){
           return null;
       }else{
           return aLi[minIndex];
       }
    }
//正则封装

//{文本id} textId
//{文本框的最大长度} length
//{文本框描述内容} msg
//return {有错就返回false,否则返回true}
        // 检查文本框的长度是否超出指定长度
    function checkLength(textId, length, msg) {
        obj = $(textId);
        str = obj.value;
        str = str.replace(/[^\x00-\xff]/g, "**");
        realLen = str.length;
        if (realLen > len) {
            alert("[" + msg + "]" + "长度最大为" + length + "位," + "请重新输入！\n注意：一个汉字占2位。");
            obj.focus();
            return false;
        } else
            return true;
    }
        //判定文本框  必须为邮箱地址
        function checkIsMail(textId, msg) {
            var obj = $(textId);
            if (!_isEmail(obj.value)) {
                alert('[' + msg + ']不是合法的邮箱地址！');
                obj.focus();
                return false;
            } else
                return true;
        }

//验证是不是邮件

function _isEmail(strEmail) {
//接下来的验证是否有两个以上的‘.'号，有的话就是错的！
    var first = strEmail.indexOf('.');
    if (strEmail.indexOf('@')== -1) {
        return false;
    }
    var tempStr = strEmail.substring(first + 1);
    if (tempStr.indexOf('.') != -1) {
        return false;
    }
    if (strEmail
            .search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) {
        return true;
    } else
        return false;
}
