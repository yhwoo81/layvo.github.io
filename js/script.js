//스크롤 시, gnb 색상변경
$(window).scroll(function(){
	scr = $(window).scrollTop();
	if( scr > 10 ) {
		$('header .lang_btn').css('backgroundImage','url(img/black_bar.png)');
		$('.hamburger').css('backgroundImage','url(img/hamburger_bar_gr.svg)');
	} else {
		$('header .lang_btn').css('backgroundImage','url(img/white_bar.png)');
		$('.hamburger').css('backgroundImage','url(img/hamburger_bar.svg)');
	}
});

//호버시, gnb 색상변경
$('header').hover(function(){
	$('header .lang_btn').css('backgroundImage','url(img/black_bar.png)');

}, function(){
	$('header .lang_btn').css('backgroundImage','url(img/white_bar.png)');

});

//gnb 위치로 이동
$('.about_scroll').click(function(){
	var offset = $('#about').offset(); //선택한 태그의 위치를 반환
	$('html').animate({scrollTop : offset.top}, 500);
});
$('.product_scroll').click(function(){
	var offset = $('#scroll-product').offset(); //선택한 태그의 위치를 반환
	$('html').animate({scrollTop : offset.top}, 500);
});
$('.contact_scroll').click(function(){
	var offset = $('#scroll-contact').offset(); //선택한 태그의 위치를 반환
	$('html').animate({scrollTop : offset.top}, 500);
});

//서브 페이지에서 메뉴 클릭 시 index이동
$(document).ready(function(){
    var page_url = window.location.href; 
    var page_id = page_url.substring(page_url.lastIndexOf("#") + 1); 
    //alert(page_id); 

    if (page_id == 'product') { 
        $('html, body').animate({ scrollTop: $('#scroll-' + page_id).offset().top }, 1000); 
    } else if (page_id == 'contact') { 
        $('html, body').animate({ scrollTop: $('#scroll-' + page_id).offset().top }, 1000); 
    } 
});

// 메인 이미지 슬라이드
$('#index').each(function(){
    $('.main_bg').slick({
        arrows:true,
        dots:true,
        autoplay: true,
        autoplaySpeed:3000,
        pauseOnHover:false,
        pauseOnFocus:false
    });
});

//선택한 버튼으로 이미지 이동
$('.indi li').on('click', function(){
	var i = $(this).index();
	$('.main_bg').animate({
		marginLeft: -100 * i + '%'
	}, 1000);

	$('.indi li').removeClass('indi_on');
	$(this).addClass('indi_on');
});

//모바일 사이드메뉴 노출
var wt = $(window).width();
if ( wt <= 1024 ) {
	//사이드 소메뉴 노출 - lnb 노출
	var i = 0;
		$('.plus').on('click', function(){
			if( i == 0 ) {
				$('.side_gnb span').css('background','url(img/minus.svg) no-repeat 50%');
				$('.side_lnb').stop().slideDown();
				i = 1;
			} else {
				$('.side_gnb span').css('background','url(img/plus.svg) no-repeat 50%');
				$('.side_lnb').stop().slideUp();
				i = 0;
			}
		}); 

	//사이드 소메뉴 - 메인섹션이동
	$('#side_logo').click(function(){
		$('.side').slideUp();
		var offset = $('#scroll-main').offset(); //선택한 태그의 위치를 반환
		$('html').animate({scrollTop : offset.top}, 500);	
	});
	$('#sub_about').on('click', function(){
		$('.side').slideUp();
		var offset = $('#about').offset(); //선택한 태그의 위치를 반환
		$('html').animate({scrollTop : offset.top}, 500);		
	});
	$('#sub_product').on('click', function(){
		$('.side').slideUp();
		var offset = $('#scroll-product').offset(); //선택한 태그의 위치를 반환
		$('html').animate({scrollTop : offset.top}, 500);	
	});

	$('#sub_contact').on('click', function(){
		$('.side').slideUp();
		var offset = $('#scroll-contact').offset(); //선택한 태그의 위치를 반환
		$('html').animate({scrollTop : offset.top}, 500);	
	});
} //모바일
