//2016.4.28 
//1.解决类名的兼容函数
//classname: 所要找的类名
//father: 通过父元素来找这个类名
function getClass(classname,father){//兼容函数
    father=father||document;
    //1. 判断浏览器
    if(father.getElementsByClassName){//条件为真时，代表就是FF和chrome
        return father.getElementsByClassName(classname);
    }else{//条件为假时，代表是IE
      //ID  Tag  name
      var all=father.getElementsByTagName("*");//所有的
      /*[<html></html>,<head></head>,<body></body>,<div class="box"></div>,<div class="one">111</div>,<div class="one">222</div>,<div class="one">333</div>]*/
      var newarr=[];
      //遍历数组
      for (var i = 0; i < all.length; i++) {
      	//"one fi".split()["one","fi"]  "one"
      	  //if(all[i].className==classname){//如果条件相等，表示找见了
      	  if(checkRep(all[i].className,classname)){
            newarr.push(all[i]);
      	  }
      };
      return newarr;
    }
  }
  function checkRep(str,classname){//"two one three" "one"  ["two","fi","three"]  判断str与classname是否一样
    var arr=str.split(" ");//以空格做分隔符转换数组
    for(var i in arr){//遍历数组
    	if(arr[i]==classname){//判断元素与classname是否相同，相同时返回true
    		return true;
    	}
    }
    return false;// 所有比较以后，没有找到返回false
  }

/****************************************************************************************************/
//2016.5.3
//2.纯文本的兼容函数(获取和设置)
//obj:获取--获取谁的
//    设置--给谁设置
//value:要设置的内容(纯文本)
function getText(obj,value){
  if(value!=undefined){//如果传入的value值不是未定义的(就是有值),设置
      if(obj.textContent){//FF,Chrome
       obj.textContent=value;
      }else{
       obj.innerText=value;//IE
      }
  }else{//否则(就是没有值),获取
      if(obj.textContent){//FF,Chrome
      return obj.textContent;
      }else{
      return obj.innerText;//IE
      }
  }
}

/****************************************************************************************************/
//2016.5.3
//3.获取样式的兼容函数
//obj:对象(要获取的对象)
//attr:对象的属性
function getStyle(obj,attr){
  if(obj.currentStyle){//IE
    return parseInt(obj.currentStyle[attr]);//parseInt字符串转换为数值类型的方法
  }else{
    return parseInt(getComputedStyle(obj,null)[attr]);
  }
}

/****************************************************************************************************/
//2016.5.5
//4.获取元素的兼容函数
//selector:选择器[# . li]
function $(selector,father){
  father=father||document//给父容器设置默认值
  //对selector的值进行判断，是那种类型
  if(typeof selector=="string"){//如果是字符串，判断那种
    selector=selector.replace(/^\s*|\s*$/g,"");//去除字符串左右的空格
    if(selector.charAt(0)=="."){
      //charAt返回指定位置的字符，if是.就是类名
     return getClass(selector.slice(1),father);
    }else if(selector.charAt(0)=="#"){//if是#,就是id
    return father.getElementById(selector.slice(1));
    }else if(/^[a-zA-Z1-6]{1,6}$/.test(selector)){
      //正则判断标签名
     return father.getElementsByTagName(selector);
    }
  }else if(typeof selector=="function"){
    //是一个函数，执行window.onload事件
      window.onload=function(){
        selector();
    }
  }
}

/*************************************************************************************************************/

//2016.5.6
//5.获取子节点的兼容函数
function getChild(father){
 var all=father.childNodes;
  var arr=[];
  for(var i=0; i<all.length;i++){
    if(all[i].nodeType==1 || (all[i].nodeValue.replace(/^\s*|\s*$/g,"")!="" && all[i].nodeType==3)){
//如果节点类型是1的话，是元素节点,放入新数组  或者 正则去除空格，如果没有空格的话，就留下，并且保证文本内容没有注释
      arr.push(all[i]);
}
}
 return arr;
}


//6.获得子节点中的第一个
function getFirst(father){
  return getChild(father)[0];
} 

//7.获得子节点中的最后一个
function getLast(father){
  return getChild(father)[getChild(father).length-1]
}


//8.通过指定下标来获得子节点中一个
function getNum(father,num){
   return getChild(father)[num];
  }


//9.获取上一个兄弟节点

function getUp(obj){
 var up=obj.previousSibling;
 if(up==null){
   return false;
 }
 while(up.nodeType==8 || (up.nodeType==3 && up.nodeValue.replace(/^\s*|\s*$/g,"")=="")){//条件满足时，接着再找(条件为注释节点或者文本节点为空字符串时,条件满足)
   up=up.previousSibling;
      if(up==null){
        return false;
      }
 }
  return up;
}


//10.获取下一个兄弟节点

function getNext(obj){
  var next=obj.nextSibling;
   if(next==null){
     return false;
   }
   while(next.nodeType==8 || (next.nodeType==3 && next.nodeValue.replace(/^\s*|\s*$/g,"")=="")){
    next=next.nextSibling;
       if(next==null){
        return false;
       }
   }
  return next;
}


//11.插入某个对象之后

function insertAfter(father,newNode,obj){
  var next=getNext(obj);
  if(next){
    father.insertBefore(newNode,next);
  }else{
    father.appendChild(newNode);
  }
}


/*************************************************************************************************************/

//2016.5.9
//12.事件绑定兼容函数
function addEvent(obj,event,fun){
  if(obj.addEventListener){//FF,Chrome
   return  obj.addEventListener(event,fun,false)
  }else{
    //IE
   return obj.attachEvent("on"+event,function(){
    fun.call(obj);
   })
  }
}

//13.删除绑定事件兼容函数
function deleteEvent(obj,event,fun){
  if(obj.removeEventListener){
    return  obj.removeEventListener(event,fun,false) 
  }else{
    return obj.detachEvent("on"+event,fun);
  }
}

/*************************************************************************************************************/
//2016.5.9
//14.滚轮事件
//obj:对象   up:向上的函数   down:向下的函数


function mouseWheel(obj,up,down){
  if(obj.attachEvent){
    obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
     }else if(obj.addEventListener){
     obj.addEventListener("mousewheel",scrollFn,false);
//chrome,safari -webkit-
     obj.addEventListener("DOMMouseScroll",scrollFn,false);
//firefox -moz-
}
function scrollFn(e){//处理程序
  var ev=e || window.event;//获取事件对象(scrollTn)
  var val=ev.detail || ev.wheelDelta;//获取滚轮滚动方向
  if(val==-3 || val==120){
    if(up){
     up(); 
    }
    
  }else if(val==3 || val==-120){
    if(down){
      down();
    }
   
  }
}
}