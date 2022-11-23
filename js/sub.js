//a속성 제거
$(document).on('click','a[href="#"]', function(e){
	e.preventDefault();
});

//스크롤 시, gnb 색상변경
$(window).scroll(function(){
	scr = $(window).scrollTop();
	if( scr > 10 ) {
		$('header .lang_btn').css('backgroundImage','url(../img/black_bar.png)');
		$('.hamburger').css('backgroundImage','url(../img/hamburger_bar_gr.svg)');
	} else {
		$('header .lang_btn').css('backgroundImage','url(../img/white_bar.png)');
		$('.hamburger').css('backgroundImage','url(../img/hamburger_bar.svg)');
	}
});

//호버시, gnb 색상변경
$('header').hover(function(){
	$('header .lang_btn').css('backgroundImage','url(../img/black_bar.png)');

}, function(){
	$('header .lang_btn').css('backgroundImage','url(../img/white_bar.png)');

});

//모바일 사이드메뉴 노출

var wt = $(window).width();
if ( wt <= 1024 ) {
	//사이드 소메뉴 노출 - lnb 노출
	var i = 0;
		$('.plus').on('click', function(){
			if( i == 0 ) {
				$('.side_gnb span').css('background','url(../img/minus.svg) no-repeat 50%');
				$('.side_lnb').stop().slideDown();
				i = 1;
			} else {
				$('.side_gnb span').css('background','url(../img/plus.svg) no-repeat 50%');
				$('.side_lnb').stop().slideUp();
				i = 0;
			}
		});
} //모바일