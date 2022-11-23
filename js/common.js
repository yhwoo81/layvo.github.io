
//스크롤 시, gnb 색상변경
$(window).scroll(function(){
	scr = $(window).scrollTop();
	if( scr > 10 ) {
		$('.logo_gr').css('display','none');
		$('.logo_co').css('display','block');
		$('header').css({'backgroundColor':'#fff','border-color':'#eaeaea'});
		$('header .gnb > li > a').css('color','#222222');
		$('header .lang').css({'color':'#222222','border-color':'#222222'});
	} else {
		$('.logo_gr').css('display','block');
		$('.logo_co').css('display','none');
		$('header').css({'backgroundColor':'transparent','border-color':'rgba(255,255,255,.6)'});
		$('header .gnb > li > a').css('color','#fff');
		$('header .lang').css({'color':'#fff','border-color':'#fff'});
	}
});


//서브메뉴 노출
$('.lnb_hover').mouseenter(function(){
	$('.lnb').stop().slideDown();
});
$('.lnb_hover').mouseleave(function(){
	$('.lnb').stop().slideUp();
});

//Top버튼 위로
$('.top').click(function(){
	$('html, body').animate({
		scrollTop:0
	},700);
});

//모바일 사이드메뉴 노출

$(function(){
    var wt = $(window).width();
    if ( wt <= 1024 ) {
        $('.hamburger').click(function(){
            $('.side').stop().slideDown();
        });
        $('.close a').click(function(){
            $('.side').stop().slideUp();
        });
    } //모바일 
})




