/*
* @Author: luo
* @Date:   2019-08-08 21:04:31
* @Last Modified by:   luo
* @Last Modified time: 2019-08-12 16:01:39
*/
    var div2 = document.getElementsByTagName('div')[1];
 	var div3 = document.getElementsByTagName('div')[2];
 	var images = document.getElementsByTagName('img');
 	var alist = document.getElementsByTagName('a');
    var index = 1;
    div3.style.marginLeft = -100 +'%';
    var prev = document.getElementsByClassName('prev')[0];
    var next = document.getElementsByClassName('next')[0];
     var Timer = null; 
     var alistTime = null;
    next.onclick = function(){
       if (index > alist.length) {
        	index = 2;
        	
        }else{
        	var marginLeft = parseInt(window.getComputedStyle(div3,null).marginLeft)/400;
        	index = -marginLeft; 
        	index++;
           
        }
        div3.style.marginLeft = -index * 100 +'%';    
        var num = index;
        if (num <= alist.length ) {
        	if (num == 1) {
        		num = alist.length-1;
        		alist[num].setAttribute('class','');
        		alist[index-1].setAttribute('class','san');
        		return;
        	}
        	    num--; 
            
        }else if(num == alist.length+1){
        	
        	num = 0;

        	
        } 
            alist[num].setAttribute('class','san');
            alist[index-2].setAttribute('class','');

    }
    // }
    
    prev.onclick = function(){
    	
        if (index == 0) {
        	index = alist.length-1;
        	
        }else{

        	var marginLeft = parseInt(window.getComputedStyle(div3,null).marginLeft)/400;
        	index = -marginLeft; 

        	index--;
           
        }
        div3.style.marginLeft = -index * 100 +'%';
        var num = index;
        if (num == 0 || num == alist.length) {
             num = 0;
            alist[num].setAttribute('class','');
            alist[alist.length-1].setAttribute('class','san');
        }else if(num <= alist.length-1){
        	num--;
        	alist[num].setAttribute('class','san');
            alist[index].setAttribute('class','');
        }
    }
    //闭包按钮点击事件实例
    
    for (var i = 0; i < alist.length; i++) {
     
     (function(i){
         
        alist[i].addEventListener('mouseover',function() {
        	    over();
        },false);
    	alist[i].onclick = function(){
   
             var j = 0;
             var num = 0;
         while(j < alist.length) {
            if (j == i ) {

             alist[j].setAttribute('class','san');
            }else if(j != i ){
          
             alist[j].setAttribute('class','');	
            }else if (i > alist.length) {
            	
            }
            j++;
        }   

            num = i+1; 
            var start = -parseInt(div3.style.marginLeft);
            var  end  = - (num * 100);
            var dis = end - start;
            var duration = 500;
            var speed = dis/duration;
            if (alistTime) {
            	clearInterval(alistTime);
            }
            alistTime = setInterval(function (){ 

            start += speed *50;
            div3.style.marginLeft = start +'%'; 
            console.log(start);
            if (Math.abs(end - start) < 1) {
            	console.log(end);
                 div3.style.marginLeft = end +'%';
                clearInterval(alistTime);
            }
    },10);
        	
    }
   }(i))

  }
     
    function out() {

       Timer = setInterval(function (){ 
       next.onclick();   
    },1500);
 }
    
    out();

   function over(){
   	 clearInterval(Timer);
   	 Timer = null;

   }
    div2.onmouseover = function(e) {

         prev.style.display = 'inline-block';
         next.style.display = 'inline-block';
         over();
    }
   div2.onmouseout = function(e){

         prev.style.display = 'none';
         next.style.display = 'none';
         out();    
   }
