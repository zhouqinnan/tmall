$(function(){
// banner轮播实现
	var num=0
	setInterval(function(){
		num++;
		if(num==$(".banner img").length){
			num=0
		}
		$(".banner img").css({opacity:0}).eq(num).css({opacity:1})
		$(".btnbox .btn").css({background:"#999"}).eq(num).css({background:"#ccc"})
	},2000)

	$(".btnbox .btn").mouseover(function(){
		var index=$(this).index()
		$(".banner img").css({opacity:0}).eq(index).css({opacity:1})
		$(".btnbox .btn").css({background:"#999"}).eq(index).css({background:"#ccc"})
		num=index;
	})

// 楼层跳转实现
	


})

