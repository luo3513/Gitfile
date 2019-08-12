/*
* @Author: luo
* @Date:   2019-08-06 17:25:28
* @Last Modified by:   luo
* @Last Modified time: 2019-08-06 22:45:54
*/
  
  var darwingLineObj = {
    
    cavs:$('.cavs'),
    context:$('.cavs').get(0).getContext("2d"),
  	colorBoard:$('#colorBoard'),
  	cleanBoard:$('#cleanBoard'),
  	eraer:$('#eraer'),
  	rescind:$('#rescind'),
  	lineRuler:$('#lineRuler'),
  	bool:false,
  	arrImg:[],
  	init: function(){
        this.draw();
        this.btnFn();
        this.context.lineCap = 'round';   //平滑 线条起始和结尾的样式
        this.context.lineJoin = 'round';  //平滑 转弯的样式
  	},
  	draw:function(){
  		var cavs = this.cavs,
  		    self = this;
        var c_x = cavs.offset().left,
            c_y = cavs.offset().top;
            
        cavs.mousedown(function(e){

        	e = e || window.event;
        	self.bool = true;
        	var m_x = e.pageX - c_x,
        	    m_y = e.pageY - c_y;
        	self.context.beginPath();
        	self.context.moveTo(m_x, m_y);     //鼠标在画布的触点
            cavs.mousemove(function(e) {
            	if (self.bool) {
            		self.context.lineTo(e.pageX - c_x, e.pageY - c_y);
            		self.context.stroke();
            	}
            })
            cavs.mouseup(function(e) {
            	/* Act on the event */
            	self.context.closePath();
            	self.bool = false;
            })
            cavs.mouseleave(function(e) {
            	self.context.closePath();
            	self.bool = false;
            })
            var imgData = self.context.getImageData(0,0,self.cavs[0].width,self.cavs[0].height);
  		    self.arrImg.push(imgData);
  		    // console.log(self.arrImg);
        });

  	},
  	btnFn:function(){

  	    var	self = this;
  		$('.btn-list').on('click',  function(e) {
  		   
  		   e = e || window.event;
  		   switch(e.target.id){
  		   	case 'cleanBoard':        //清屏
            self.context.clearRect(0, 0, self.cavs[0].width, self.cavs[0].height)
  		   	break
  		   	case 'eraer':             //橡皮
  		   	self.context.strokeStyle = '#fff';
  		   	break
  		   	case 'rescind':           //撤销
  		   	self.context.putImageData(self.arrImg.pop(),0,0);
  		   	break
  		   }
  		})
  		this.lineRuler.change(function(e){        //当滑动条宽度变化时改变线条的值
  		 self.context.lineWidth  = $(this).val();
      
  		})
  		  
  		this.colorBoard.change(function(e) {     //当颜色变化时改变字体颜色
  			self.context.strokeStyle = $(this).val();
             
  		});
  		 
  	}
   }
darwingLineObj.init();
 