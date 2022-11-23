$(document).ready(function() {
    initPage();
})

var initPage = function() {

    Header.init();
    Footer.init();
    Scroll.init();

    var pageId = $('#page-id').attr('data');
    switch(pageId) {
        case 'main':
            Main.init();
            break;

        case 'company-list':
            CompanyList.init();
            break;

        case 'company-detail':
            CompanyDetail.init();
            break;

        case 'direct-inquiry':
            DirectInquiry.init();
            break;

        case 'resume-add':
            ResumeAdd.init();
            break;
    }
}

var API_ENDPOINTS =  {
    USER: 'https://kmayotmt9c.execute-api.ap-northeast-2.amazonaws.com/dev',
    AUTH: 'https://uv5pls8x67.execute-api.ap-northeast-2.amazonaws.com/dev',
    COMPANY: 'https://oi1us1dry0.execute-api.ap-northeast-2.amazonaws.com/dev',
    INQUIRY: 'https://svmhz8lvg8.execute-api.ap-northeast-2.amazonaws.com/dev',
    SURVEY: 'https://zi4n2651d9.execute-api.ap-northeast-2.amazonaws.com/dev',
    RESUME: 'https://u6bxvx5vvj.execute-api.ap-northeast-2.amazonaws.com/dev',
};

var USERINFO = null;

var Util = (function() {

    var assertInputNotBlank = function(targets) {
        var result = true;

        if( targets.constructor === Array ) {
            for(var i=0; i<targets.length; i++) {
                if( targets[i].is('img') ) {
                    if( targets[i].attr('src') === '' ) {
                        targets[i].css('border-color', 'red')
                        targets[i].css('border-style', 'solid')
                        targets[i].css('border-width', '1px')

                        result = false;
                    }
                    else {
                        targets[i].css('border-color', '')
                        targets[i].css('border-style', '')
                        targets[i].css('border-width', '')
                    }
                }
                else {
                    if( targets[i].val() === '' ) {
                        targets[i].css('border-color', 'red')
                        result = false;
                    }
                    else {
                        targets[i].css('border-color', '')
                    }
                }
            }
        }
        else {
            if( targets.is('img') ) {
                if( targets.attr('src') === '' ) {
                    targets.css('border-color', 'red')
                    targets.css('border-style', 'solid')
                    targets.css('border-width', '1px')

                    result = false;
                }
                else {
                    targets.css('border-color', '')
                    targets.css('border-style', '')
                    targets.css('border-width', '')
                }
            }
            else {
                if( targets.val() === '' ) {
                    targets.css('border-color', 'red')
                    result = false;
                }
                else {
                    targets.css('border-color', '')
                }
            }
        }

        return result;
    };

    var isValidEmailFormat = function(email) {
        var regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regExp.test(email);
    };

    var isValidPhoneFormat = function(phone) {
        var regExp = /^\d{2,3}-\d{3,4}-\d{4}$/;
        return regExp.test(phone);
    };

    var isValidDateFormat = function(date) {
        regExp = /(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,2})$/;
        return regExp.test(date);
    }

    var isValidDateTimeFormat = function(datetime) {
        regExp = /(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,2})(\s*(?:0?[1-9]:[0-5]|1(?=[012])\d:[0-5])\d\s*[ap]m)?$/;
        return regExp.test(datetime);
    }

    var arrayToString = function(arr) {
        var str = '';
        for(var i=0; i<arr.length; i++) {
            str += arr[i]
            str += i == arr.length - 1 ? '' : '!!@@##'
        }

        return str;
    }

    return {
        assertInputNotBlank: assertInputNotBlank,
        isValidEmailFormat: isValidEmailFormat,
        isValidPhoneFormat: isValidPhoneFormat,
        isValidDateFormat: isValidDateFormat,
        isValidDateTimeFormat: isValidDateTimeFormat,
        arrayToString: arrayToString,
    }
})();


var Scroll = (function() {

    var pageReloaded = true;
    var scrollPos = 0;

    var init = function() {

        hideSurveySlide();

        if( USERINFO !== null ) {
            if( USERINFO.has_survey && USERINFO.has_resume ) {
                return;
            }
        }

        $(window).scroll(function(){
            var lastScrollPos = scrollPos;
            scrollPos = $(window).scrollTop();

            // Footer Survey Slide
            if( pageReloaded ) {
                hideSurveySlide();
                pageReloaded = false;
            }
            else {
                // console.log( Math.abs(scrollPos - lastScrollPos) );

                var isIE = false;
                var agent = navigator.userAgent.toLowerCase();
                if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
                     isIE = true;
                }
                if( isIE ) {
                    if( scrollPos - lastScrollPos > 20 ) {
                        showSurveySlide();
                    }
                    else if( lastScrollPos - scrollPos > 20 ) {
                        hideSurveySlide();
                    }
                }
                else {
                    if( scrollPos - lastScrollPos > 0 ) {
                        showSurveySlide();
                    }
                    else {
                        hideSurveySlide();
                    }
                }
            }

            // Header
            if(scrollPos){
                $('#header .h_wrap').addClass('on');
                $('#header .h_wrap').css('background','rgba(255,255,255,1)');
                $('.menu-item').css('background','#333');
                $('#wrap #header .nav ul li a').css('color','#333');
                $('#wrap #header .login_bx a').css('color','#333');
                $('.login_bx a.join:before').css('background','rgba(255,255,255,1)');
                $('.h_logo img') .attr('src', '../img/h_logo01.png');
                $('#wrap #header .logout_bx a').css('color','#333');
                $('.logout_bx a.join:before').css('background','rgba(255,255,255,1)');
            }

            else{
                $('#header .h_wrap').removeClass('on');
                $('#header .h_wrap').css('background','rgba(0,0,0,0.15)');
                $('.menu-item').css('background','#fff');
                $('.h_logo img') .attr('src', '../img/h_logo.png');
                $('#wrap #header .nav ul li a').css('color','#fff');
                $('#wrap #header .login_bx a').css('color','#fff');
                $('.login_bx a.join:before').css('background','rgba(255,255,255,1)');
                $('#wrap #header .logout_bx a').css('color','#fff');
                $('.logout_bx a.join:before').css('background','rgba(255,255,255,1)');
            }

            
         });
    };


    var showSurveySlide = function() {
        // console.log('scroll down')
        $('.f_pop_bx_wrap ').css('display','block');
    };

    var hideSurveySlide = function() {
        // console.log('scroll up')
        $('.f_pop_bx_wrap ').css('display','none');
    };


    return {
        init: init,
    }
})();

var Header = (function() {

    // HEADER PANE
    var $loggedOutStateDiv = null;
    var $loggedInStateDiv = null;
    var $logoutButton = null;
    var $showUpdateUserInfoPopButton = null;

    // HEADER BUTTONS
    var $headerRegisterResumeButton = null;
    var $headerJobInfoButton = null;
    var $headerMobileRegisterResumeButton = null;
    var $headerMobileJobInfoButton = null;

    // LOG IN
    var $loginPop = null;
    var $loginUserId = null;
    var $loginUserPwd = null;
    var $loginUserSignUpButton = null;
    var $loginFindUserIdButton = null;
    var $loginFindUserPwdButton = null;
    var $loginButton = null;

    // SIGN UP
    var $signupPop = null;
    var $signupUserIdCheck = null;
    var $signupUserId = null;
    var $signupUserPwd = null;
    var $signupUserPwdRepeat = null;
    var $signupUserName = null;
    var $signupUserBirth = null;
    var $signupUserPhoneFirst = null;
    var $signupUserPhoneSecond = null;
    var $signupUserPhoneThird = null;
    var $signupUserEmailId = null;
    var $signupUserEmailDomain = null;
    var $signupAllAgreed = null;
    var $signupSnsLoginButton = null;
    var $signupButton = null;

    // FIND USER ID
    var $findUserIdPop = null;
    var $findUserIdUserName = null;
    var $findUserIdUserPhoneFirst = null;
    var $findUserIdUserPhoneSecond = null;
    var $findUserIdUserPhoneThird = null;
    var $findUserIdButton = null;
    var $findUserIdCancelButton = null;
    var $findUserIdResult = null;

    // FIND USER PASSWORD
    var $findUserPwdPop = null;
    var $findUserPwdUserName = null;
    var $findUserPwdUserId = null;
    var $findUserPwdUserEmail = null;
    var $findUserPwdUserPhoneFirst = null;
    var $findUserPwdUserPhoneSecond = null;
    var $findUserPwdUserPhoneThird = null;
    var $findUserPwdButton = null;
    var $findUserPwdCancelButton = null;

    // UPDATE USER INFO
    var $updateUserInfoPop = null;
    var $updateUserInfoUserPwd = null;
    var $updateUserInfoUserPwdRepeat = null;
    var $updateUserInfoUserPhoneFirst = null;
    var $updateUserInfoUserPhoneSecond = null;
    var $updateUserInfoUserPhoneThird = null;
    var $updateUserInfoUserEmailId = null;
    var $updateUserInfoUserEmailDomain = null;
    var $updateUserInfoUserButton = null;
    var $updateUserInfoUserCancelButton = null;


    var naverLoginDiv = null;
    var isKakaoInitialized = false;
    var isFacebookInitialized = false;
    var isNaverInitialized = false;
    var isLinkedInInitialized = false;

    var isUserIdAvailable = false;

    var isLoginBeingProcessed = false;
    var isCheckUserIdAvailableBeingProcessed = false;
    var isSignupBeingProcessed = false;
    var isFindUserIdBeingProcessed = false;
    var isFindUserPwdBeingProcessed = false;
    var isUpdateUserInfoBeingProcessed = false;

    var init = function() {

        // HEADER PANE
        $loggedOutStateDiv = $('#logged-out-state-div');
        $loggedInStateDiv = $('#logged-in-state-div');
        $logoutButton = $('#btn-logout');
        $showUpdateUserInfoPopButton = $('#btn-show-update-user-info');

        // HEADER BUTTONS
        $headerRegisterResumeButton = $('#header-btn-register-resume');
        $headerJobInfoButton = $('#header-btn-job-info');
        $headerMobileRegisterResumeButton = $('#header-mobile-btn-register-resume');
        $headerMobileJobInfoButton = $('#header-mobile-btn-job-info');

        // LOG IN
        $loginPop = $('#pop-login');
        $loginUserId = $('#login-form-user-id');
        $loginUserPwd = $('#login-form-user-pwd');
        $loginUserSignUpButton = $('#btn-login-user-sign-up');
        $loginFindUserIdButton = $('#btn-login-find-user-id');
        $loginFindUserPwdButton = $('#btn-login-find-user-pwd');
        $loginButton = $('#btn-login');

        // SIGN UP
        $signupPop = $('#pop-signup');
        $signupUserIdCheck = $('#btn-user-id-check');
        $signupUserId = $('#signup-form-user-id');
        $signupUserPwd = $('#signup-form-user-pwd');
        $signupUserPwdRepeat = $('#signup-form-user-pwd-repeat');
        $signupUserName = $('#signup-form-user-name');
        $signupUserBirth = $('#signup-form-user-birth');
        $signupUserPhoneFirst = $('#signup-form-user-phone-first');
        $signupUserPhoneSecond = $('#signup-form-user-phone-second');
        $signupUserPhoneThird = $('#signup-form-user-phone-third');
        $signupUserEmailId = $('#signup-form-user-email-id');
        $signupUserEmailDomain = $('#signup-form-user-email-domain');
        $signupAllAgreed = $('#signup-form-all-agreed');
        $signupSnsLoginButton = $('#signup-btn-sns-login');
        $signupButton = $('#btn-signup');

        // FIND USER ID
        $findUserIdPop = $('#pop-find-user-id');
        $findUserIdUserName = $('#find-user-id-user-name');
        $findUserIdUserPhoneFirst = $('#find-user-id-user-phone-first');
        $findUserIdUserPhoneSecond = $('#find-user-id-user-phone-second');
        $findUserIdUserPhoneThird = $('#find-user-id-user-phone-third');
        $findUserIdButton = $('#btn-find-user-id');
        $findUserIdCancelButton = $('#btn-find-user-id-cancel');
        $findUserIdResult = $('#find-user-id-result');

        // FIND USER PWD
        $findUserPwdPop = $('#pop-find-user-pwd');
        $findUserPwdUserName = $('#find-user-pwd-user-name');
        $findUserPwdUserId = $('#find-user-pwd-user-id');
        $findUserPwdUserEmail = $('#find-user-pwd-user-email');
        $findUserPwdUserPhoneFirst = $('#find-user-pwd-user-phone-first');
        $findUserPwdUserPhoneSecond = $('#find-user-pwd-user-phone-second');
        $findUserPwdUserPhoneThird = $('#find-user-pwd-user-phone-third');
        $findUserPwdCancelButton = $('#btn-cancel-find-user-pwd');
        $findUserPwdButton = $('#btn-find-user-pwd');

        // UPDATE USER INFO
        $updateUserInfoPop = $('#pop-update-user-info');
        $updateUserInfoUserPwd = $('#update-user-info-form-user-pwd');
        $updateUserInfoUserPwdRepeat = $('#update-user-info-form-user-pwd-repeat');
        $updateUserInfoUserPhoneFirst = $('#update-user-info-form-user-phone-first');
        $updateUserInfoUserPhoneSecond = $('#update-user-info-form-user-phone-second');
        $updateUserInfoUserPhoneThird = $('#update-user-info-form-user-phone-third');
        $updateUserInfoUserEmailId = $('#update-user-info-form-user-email-id');
        $updateUserInfoUserEmailDomain = $('#update-user-info-form-user-email-domain');
        $updateUserInfoUserButton = $('#btn-update-user-info');
        $updateUserInfoUserCancelButton = $('#btn-cancel-update-user-info');

        
        registerListeners();

        var userInfo = localStorage.getItem('userInfo');
        if( userInfo !== null ) {
            USERINFO = JSON.parse(userInfo);
            refreshHeaderUI();
        }

        if( location.search.length > 0 ) {
            naverInit();
        }
    };

    var registerListeners = function() {

        //--- legacy code --
        $(".join").click(function(){
            $("#pop-signup").addClass('open');
            $('#wrap').addClass('on');
        });

        $(".login").click(function() {
            $(".pop_login_bx").addClass('open');
            $('#wrap').addClass('on');
            
            if( !isKakaoInitialized ) {
                kakaoInit();
                isKakaoInitialized = true;
            }
            if( !isFacebookInitialized ) {
                facebookInit();
                isFacebookInitialized = true;
            }
            if( !isNaverInitialized ) {
                naverInit();
                isNaverInitialized = true;
            }
            if( !isLinkedInInitialized ) {
                linkedInInit();
                isLinkedInInitialized = true;
            }
        }); 
        //------------------


        // popup close button
        $('.btn_popup_close').click(function() {
            console.log('popup closed')
            $("#pop-login").removeClass('open');
            $("#pop-signup").removeClass('open');
            $("#pop-find-user-pwd").removeClass('open');
            $("#pop-update-user-info").removeClass('open');
            $("#pop-find-user-id").removeClass('open');
            $("#pop-privacy-policy").removeClass('open');
            $("#pop-terms-of-service").removeClass('open');
            $('#wrap').removeClass('on');
        })

        $headerRegisterResumeButton.click(function() {
            var userInfo = localStorage.getItem('userInfo');
            if( userInfo !== null ) {
                document.location.href = './member_enrollment.html';
            }
            else {
                alert('로그인 해주세요.');
                $('#header-btn-login').trigger('click');
            }
        });

        $headerJobInfoButton.click(function() {
            var userInfo = localStorage.getItem('userInfo');
            if( userInfo !== null ) {
                document.location.href = './sub1_2.html';
            }
            else {
                alert('로그인을 하신 후에 이용할 수 있는 서비스입니다.');
                $('#header-btn-login').trigger('click');
            }
        });

        $headerMobileRegisterResumeButton.click(function() {
            var userInfo = localStorage.getItem('userInfo');
            if( userInfo !== null ) {
                document.location.href = './member_enrollment.html';
            }
            else {
                alert('로그인 해주세요.');
                $('#header-btn-login').trigger('click');
            }
        });

        $headerMobileJobInfoButton.click(function() {
            var userInfo = localStorage.getItem('userInfo');
            if( userInfo !== null ) {
                document.location.href = './sub1_2.html';
            }
            else {
                alert('로그인을 하신 후에 이용할 수 있는 서비스입니다.');
                $('#header-btn-login').trigger('click');
            }
        });

        $showUpdateUserInfoPopButton.click(function() {
            $updateUserInfoPop.css('display', 'block');
            $('#wrap').addClass('on');
            $("#pop-signup").removeClass('open');

            updateUserInfoPopFillUserInfo();
        });

        $loginUserSignUpButton.click(function() {
            $(".pop_login_bx").removeClass('open');
            $signupPop.addClass('open');
        });

        $loginFindUserIdButton.click(function() {
            $(".pop_login_bx").removeClass('open');
            $findUserIdPop.css('display', 'block');
        });

        $loginFindUserPwdButton.click(function() {
            $(".pop_login_bx").removeClass('open');
            $findUserPwdPop.css('display', 'block');
        });

        $logoutButton.click(function() {
            localStorage.removeItem('userInfo');
            USERINFO = null;
            refreshHeaderUI();
        });

        $loginButton.click(function() {
            login();
        })

        $signupUserIdCheck.click(function() {
            checkUserIdAvailable();
        });

        $signupSnsLoginButton.click(function() {
            $(".join_bx").removeClass('open');
            $loginPop.addClass('open');
        });

        $signupButton.click(function() {
            signup();
        });

        $findUserIdButton.click(function() {
            findUserId();
        });

        $findUserIdCancelButton.click(function() {
            $findUserIdPop.css('display', 'none');
            $('#wrap').removeClass('on');
        });

        $findUserPwdButton.click(function() {
            findUserPwd();
        });

        $findUserPwdCancelButton.click(function() {
            $findUserPwdPop.css('display', 'none');
            $('#wrap').removeClass('on');
        });

        $updateUserInfoUserButton.click(function() {
            updateUserInfo();
        });

        $updateUserInfoUserCancelButton.click(function() {
            $updateUserInfoPop.css('display', 'none');
            $('#wrap').removeClass('on');
        });
    };

    var refreshHeaderUI = function() {
        if( USERINFO !== null ) {
            $loggedOutStateDiv.css('display', 'none');
            $loggedInStateDiv.css('display', 'block');
        }
        else {
            $loggedOutStateDiv.css('display', 'block');
            $loggedInStateDiv.css('display', 'none');
        }
    };

    var login = function() {
        if( isLoginBeingProcessed ) { alert('현재 처리중입니다. 잠시만 기다려주세요.'); return; }
        isLoginBeingProcessed = true;

        var assertBlankResult = Util.assertInputNotBlank([ $loginUserId, $loginUserPwd ])
        if( !assertBlankResult ) {
            alert('입력하지 않은 항목이 있습니다.');
            isLoginBeingProcessed = false;
            return;
        }

        var userId = $loginUserId.val();
        var userPwd = $loginUserPwd.val();

        var url = API_ENDPOINTS.AUTH + '/user/login/default';
        var method = 'post';
        var param = {
            user_id: userId,
            user_pwd: userPwd,
        };

        $.ajax({
            url: url,
            type: method,
            data: param,
            success: function(response) {
                var result = JSON.parse(response.body);
                if( result.error ) {
                    alert('아이디 혹은 비밀번호가 틀렸습니다.');
                    console.error(result.errorMsg);
                }
                else {
                    var userInfo = JSON.parse(result.data);
                    delete userInfo['pwd_hash']

                    $(".pop_login_bx").removeClass('open');
                    $('#wrap').removeClass('on');
                    
                    localStorage.setItem('userInfo', JSON.stringify(userInfo));
                    USERINFO = userInfo;
                    document.location.reload();
                }

                isLoginBeingProcessed = false;
            },
            error: function(error) {
                alert('알 수 없는 오류가 발생했습니다.');
                console.error(error);

                isLoginBeingProcessed = false;
            }

        });
    };


    var kakaoInit = function() {
        var KAKAO_APP_KEY = 'd2e7b24cd2e4925a1563c316c6948bc8';
        Kakao.init(KAKAO_APP_KEY);
        
        Kakao.Auth.createLoginButton({ 
            container: '#kakao-login-btn',
            success: function(authObj) {
                Kakao.API.request({
                    url: '/v1/user/me',
                    success: function(user) {
                        console.log(user)
                        if( user.id ) {
                            user.snsType = 'kakao';
                            snsLogin(user);
                        }
                        else {
                            alert('카카오 서버 인증에 실패했습니다.');
                            console.error(err);    
                        }
                    },
                    fail: function(err) {
                        alert('카카오 사용자 정보 가져오기에 실패하였습니다.');
                        console.error(err);
                    }
                });
            },
            fail: function(err) { 
                alert('카카오 로그인에 실패했습니다.');
                console.error(JSON.stringify(err)); 
            }
        });
    };

    var facebookInit = function() {
        var FB_APP_ID = '803554209981326';

        $.ajaxSetup({ cache: true });
        $.getScript('https://connect.facebook.net/en_US/sdk.js', function() {
            FB.init({
                appId: FB_APP_ID,
                version: 'v2.7',
            });
        });

        $('#facebook-login-btn').click(function() {
            FB.login(function(response) {
                if (response.status === 'connected') {
                    // Logged into your app and Facebook.
                    console.log('connected!');
                    console.log(response);

                    FB.api('/me', { locale: 'ko_KR', fields: 'name, email' }, function(user) {
                        user.snsType = 'facebook';
                        snsLogin(user);
                    });
                }
                else {
                    alert('페이스북 로그인에 실패했습니다.');
                }
            }, { scope: 'public_profile,email' });
        });
    }


    var naverInit = function() {
        var NAVER_CLIENT_ID = 'VSdHfXQiAuRz0mTdnF3j';
        naverLoginDiv = new naver_id_login(NAVER_CLIENT_ID, 'http://oqfi.io');
        
        if( opener ) {
            naverLoginDiv.get_naver_userprofile('Header.naverPopupCallback()');
        }
        else {
            var state = naverLoginDiv.getUniqState();
            naverLoginDiv.setButton("white", 2,40);
            naverLoginDiv.setDomain('http://oqfi.io');
            naverLoginDiv.setState(state);
            naverLoginDiv.setPopup();
            naverLoginDiv.init_naver_id_login();
        }


        $('#naver-login-btn').click(function() {
            $('#naver_id_login > a').trigger('click');
        });
    
    };

    var naverPopupCallback = function() {
        var paramBody = {
            id : naverLoginDiv.getProfileData('id'),
            name : naverLoginDiv.getProfileData('name'),
            email : naverLoginDiv.getProfileData('email'),
        };
        opener.Header.naverIdLoginCallback(paramBody); // 팝업을 호출한 모창에 있는 naverIdLoginCallback function에 사용자 프로필 전달
        self.close()
    };

    var naverIdLoginCallback = function(param) {
        var user = {};
        user.snsType = 'naver';
        user.id = param.id;
        user.name = param.name;
        user.email = param.email;

        snsLogin(user);
    };

    var linkedInInit = function() {
        $('#linkedin-login-btn').click(function() {
            IN.Event.on(IN, 'auth', linkedInCallback);
            IN.User.authorize(linkedInCallback, Header);
        });
    };

    var linkedInCallback = function() {
        IN.API.Profile("me").fields('id', 'formatted-name', 'first-name', 'last-name', 'email-address').result(function(profile) {
            var user = {};
            user.snsType = 'linkedin';
            user.id = profile.values[0].id;
            user.name = profile.values[0].formattedName;

            snsLogin(user);
        });
    };

    var snsLogin = function(user) {
        var url = API_ENDPOINTS.AUTH + '/user/login/sns';
        var method = 'post';
        var param = {};

        if( user.snsType === 'kakao' ) {
            param.sns_type = user.snsType;
            param.user_id = 'kakao' + user.id;
            param.name = user.nickname;
            param.email = user.kaccount_email;
        }
        else if( user.snsType === 'naver' ) {
            param.sns_type = user.snsType;
            param.user_id = 'naver' + user.id;
            param.name = user.name;
            param.email = user.email;
        }
        else if( user.snsType === 'linkedin' ) {
            param.sns_type = user.snsType;
            param.user_id = 'in' + user.id;
            param.name = user.name;
        }
        else if( user.snsType === 'facebook' ) {
            param.sns_type = user.snsType;
            param.user_id = 'fb' + user.id;
            param.name = user.name;
            param.email = user.email;
        }
        else {
            console.error('wrong access!');
        }

        $.ajax({
            url: url,
            type: method,
            data: param,
            success: function(response) {
                var result = JSON.parse(response.body);
                if( result.error ) {
                    alert('오류가 발생했습니다.');
                    console.error(result.errorMsg);
                }
                else {
                    var userInfo = JSON.parse(result.data);
                    delete userInfo['pwd_hash']

                    $(".pop_login_bx").removeClass('open');
                    $('#wrap').removeClass('on');
                    
                    localStorage.setItem('userInfo', JSON.stringify(userInfo));
                    USERINFO = userInfo;
                    document.location.reload();
                }
            },
            error: function(error) {
                alert('알 수 없는 오류가 발생했습니다.');
                console.error(error);
            }

        });

    };


    var checkUserIdAvailable = function() {
        if( isCheckUserIdAvailableBeingProcessed ) { alert('현재 처리중입니다. 잠시만 기다려주세요.'); return; }
        isCheckUserIdAvailableBeingProcessed = true;

        var assertBlankResult = Util.assertInputNotBlank([ $signupUserId ])
        if( !assertBlankResult ) {
            alert('아이디를 입력해주세요.');
            isCheckUserIdAvailableBeingProcessed = false;
            return;
        }

        var url = API_ENDPOINTS.USER + '/user/' + $signupUserId.val() +'/test';
        var method = 'get';
        var param = {};

        $.ajax({
            url: url,
            type: method,
            data: param,
            success: function(response) {
                var result = JSON.parse(response.body);
                if( result.error ) {
                    alert('오류가 발생했습니다.');
                    console.error(result.errorMsg);
                }
                else {
                    var data = JSON.parse(result.data);
                    if( data.is_available ) {
                        alert('사용가능한 아이디입니다.');
                        isUserIdAvailable = true;
                    }
                    else {
                        alert('이미 사용중인 아이디입니다.');
                        isUserIdAvailable = false;
                    }
                }

                isCheckUserIdAvailableBeingProcessed = false;
            },
            error: function(error) {
                alert('알 수 없는 오류가 발생했습니다.');
                console.error(error);

                isCheckUserIdAvailableBeingProcessed = false;
            }

        });
    };

    var signup = function() {

        if( isSignupBeingProcessed ) { alert('현재 처리중입니다. 잠시만 기다려주세요.'); return; }

        isSignupBeingProcessed = true;

        var userId = $signupUserId.val()
        var userPwd  = $signupUserPwd.val()
        var userName = $signupUserName.val()
        var userBirth = $signupUserBirth.val()
        var userPhone = $signupUserPhoneFirst.val() + '-' + $signupUserPhoneSecond.val() + '-' + $signupUserPhoneThird.val()
        var userEmail = $signupUserEmailId.val() + '@' + $signupUserEmailDomain.val()


        var assertBlankResult = Util.assertInputNotBlank([ $signupUserId, $signupUserPwd, $signupUserPwdRepeat, $signupUserName, $signupUserBirth, $signupUserPhoneFirst, $signupUserPhoneSecond, $signupUserPhoneThird, $signupUserEmailId, $signupUserEmailDomain ])
        if( !assertBlankResult ) {
            alert('입력하지 않은 항목이 있습니다.');
            isSignupBeingProcessed = false;
            return;
        }

        if( !isUserIdAvailable ) {
            alert('아이디 중복확인 해주세요.');
            isSignupBeingProcessed = false;
            return;
        }

        if( $signupUserPwd.val() !== $signupUserPwdRepeat.val() ) {
            alert('비밀번호가 일치하지 않습니다.');
            $signupUserPwdRepeat.focus();
            isSignupBeingProcessed = false;
            return;
        }

        if( !Util.isValidPhoneFormat(userPhone) ) {
            alert('휴대폰 번호가 올바르지 않습니다.');
            $signupUserPhoneFirst.focus();
            isSignupBeingProcessed = false;
            return;
        }

        if( !Util.isValidEmailFormat(userEmail) ) {
            alert('이메일 형식이 올바르지 않습니다.');
            $signupUserEmailDomain.focus();
            isSignupBeingProcessed = false;
            return;
        }

        if( !$signupAllAgreed.prop('checked') ) {
            alert('이용약관에 동의하지 않으면 서비스를 이용하실 수 없습니다.');
            $signupAllAgreed.focus();
            isSignupBeingProcessed = false;
            return;
        }

        var url = API_ENDPOINTS.USER + '/user';
        var method = 'post';
        var param = {
            name: userName,
            birth: userBirth,
            phone: userPhone,
            email: userEmail,
            user_id: userId,
            user_pwd: userPwd,
        };

        $.ajax({
            url: url,
            type: method,
            data: param,
            success: function(response) {
                var result = JSON.parse(response.body);
                if( result.error ) {
                    alert('오류가 발생했습니다.');
                    console.error(result.errorMsg);
                }
                else {
                    alert('회원가입이 완료되었습니다. 로그인 해주세요.');
                    $(".join_bx").removeClass('open');
                    $('#wrap').removeClass('on');
                }

                isSignupBeingProcessed = false;
            },
            error: function(error) {
                alert('알 수 없는 오류가 발생했습니다.');
                console.error(error);

                isSignupBeingProcessed = false;
            }

        });
    };


    var findUserId = function() {
        if( isFindUserIdBeingProcessed ) { alert('현재 처리중입니다. 잠시만 기다려주세요.'); return; }
        isFindUserIdBeingProcessed = true;


        var userName = $findUserIdUserName.val();
        var userPhone = $findUserIdUserPhoneFirst.val() + '-' + $findUserIdUserPhoneSecond.val() + '-' + $findUserIdUserPhoneThird.val();

        var assertBlankResult = Util.assertInputNotBlank([ $findUserIdUserName, $findUserIdUserPhoneFirst, $findUserIdUserPhoneSecond, $findUserIdUserPhoneThird ])
        if( !assertBlankResult ) {
            alert('입력하지 않은 항목이 있습니다.');
            isFindUserIdBeingProcessed = false;
            return;
        }

        if( !Util.isValidPhoneFormat(userPhone) ) {
            alert('휴대폰 번호가 올바르지 않습니다.');
            $findUserIdUserPhoneFirst.focus();
            isFindUserIdBeingProcessed = false;
            return;   
        }

        var url = API_ENDPOINTS.USER + '/user/find/userid';
        var method = 'get';
        var param = {
            name: userName,
            phone: userPhone,
        };

        $.ajax({
            url: url,
            type: method,
            data: param,
            success: function(response) {
                var result = JSON.parse(response.body);
                if( result.error ) {
                    alert('오류가 발생했습니다.');
                    console.error(result.errorMsg);
                }
                else {
                    var user_id = JSON.parse(result.data);
                    if( user_id === '' ) {
                        $findUserIdResult.css('display', 'block');
                        $findUserIdResult.html('<p style="color: red;">입력하신 정보로 검색되는 ID 가 없습니다.</p>');
                    }
                    else {
                        $findUserIdResult.css('display', 'block');
                        $findUserIdResult.html('<p style="color: green;">회원님의 ID는 ' + user_id + ' 입니다.</p>');
                    }
                }

                isFindUserIdBeingProcessed = false;
            },
            error: function(error) {
                alert('알 수 없는 오류가 발생했습니다.');
                console.error(error);

                isFindUserIdBeingProcessed = false;
            }

        });
    };


    var findUserPwd = function() {
        if( isFindUserPwdBeingProcessed ) { alert('현재 처리중입니다. 잠시만 기다려주세요.'); return; }
        isFindUserPwdBeingProcessed = true;


        var userName = $findUserPwdUserName.val();
        var userId = $findUserPwdUserId.val();
        var userEmail = $findUserPwdUserEmail.val();
        var userPhone = $findUserPwdUserPhoneFirst.val() + '-' + $findUserPwdUserPhoneSecond.val() + '-' + $findUserPwdUserPhoneThird.val();

        var assertBlankResult = Util.assertInputNotBlank([ $findUserPwdUserName, $findUserPwdUserId, $findUserPwdUserEmail, $findUserPwdUserPhoneFirst, $findUserPwdUserPhoneSecond, $findUserPwdUserPhoneThird ])
        if( !assertBlankResult ) {
            alert('입력하지 않은 항목이 있습니다.');
            isFindUserPwdBeingProcessed = false;
            return;
        }

        if( !Util.isValidEmailFormat(userEmail) ) {
            alert('이메일 주소가 올바르지 않습니다.');
            $findUserPwdUserEmail.focus();
            isFindUserPwdBeingProcessed = false;
            return;
        }

        if( !Util.isValidPhoneFormat(userPhone) ) {
            alert('휴대폰 번호가 올바르지 않습니다.');
            $findUserPwdUserPhoneFirst.focus();
            isFindUserPwdBeingProcessed = false;
            return;
        }

        var url = API_ENDPOINTS.USER + '/user/find/userpwd';
        var method = 'get';
        var param = {
            name: userName,
            user_id: userId,
            phone: userPhone,
            email: userEmail,
        };

        $.ajax({
            url: url,
            type: method,
            data: param,
            success: function(response) {
                var result = JSON.parse(response.body);
                if( result.error ) {
                    alert('가입된 회원 ID가 아니거나, 입력하신 정보가 잘못되었습니다.');
                    console.error(result.errorMsg);
                }
                else {
                    alert('입력하신 이메일 주소로 임시 비밀번호가 발급되었습니다.');
                    $findUserPwdPop.css('display', 'none');
                    $('#wrap').removeClass('on');

                }

                isFindUserPwdBeingProcessed = false;
            },
            error: function(error) {
                alert('알 수 없는 오류가 발생했습니다.');
                console.error(error);

                isFindUserPwdBeingProcessed = false;
            }

        });
    };


    var updateUserInfo = function () {
        if( isUpdateUserInfoBeingProcessed ) { alert('현재 처리중입니다. 잠시만 기다려주세요.'); return; }

        isUpdateUserInfoBeingProcessed = true;

        var userPwd  = $updateUserInfoUserPwd.val()
        var userPhone = $updateUserInfoUserPhoneFirst.val() + '-' + $updateUserInfoUserPhoneSecond.val() + '-' + $updateUserInfoUserPhoneThird.val()
        var userEmail = $updateUserInfoUserEmailId.val() + '@' + $updateUserInfoUserEmailDomain.val()


        var assertBlankResult = Util.assertInputNotBlank([ $updateUserInfoUserPwd, $updateUserInfoUserPwdRepeat, $updateUserInfoUserPhoneFirst, $updateUserInfoUserPhoneSecond, $updateUserInfoUserPhoneThird, $updateUserInfoUserEmailId, $updateUserInfoUserEmailDomain ])
        if( !assertBlankResult ) {
            alert('입력하지 않은 항목이 있습니다.');
            isUpdateUserInfoBeingProcessed = false;
            return;
        }

        if( $updateUserInfoUserPwd.val() !== $updateUserInfoUserPwdRepeat.val() ) {
            alert('비밀번호가 일치하지 않습니다.');
            $updateUserInfoUserPwd.focus();
            isUpdateUserInfoBeingProcessed = false;
            return;
        }

        if( !Util.isValidPhoneFormat(userPhone) ) {
            alert('휴대폰 번호가 올바르지 않습니다.');
            $updateUserInfoUserPhoneFirst.focus();
            isUpdateUserInfoBeingProcessed = false;
            return;
        }

        if( !Util.isValidEmailFormat(userEmail) ) {
            alert('이메일 형식이 올바르지 않습니다.');
            $updateUserInfoUserEmailDomain.focus();
            isUpdateUserInfoBeingProcessed = false;
            return;
        }

        var url = API_ENDPOINTS.USER + '/user/' + USERINFO.id;
        var method = 'put';
        var param = {
            name: USERINFO.name,
            birth: USERINFO.birth,
            phone: userPhone,
            email: userEmail,
            user_pwd: userPwd,
        };

        $.ajax({
            url: url,
            type: method,
            data: param,
            success: function(response) {
                var result = JSON.parse(response.body);
                if( result.error ) {
                    alert('오류가 발생했습니다.');
                    console.error(result.errorMsg);
                }
                else {
                    alert('회원정보가 변경되었습니다.');
                    $updateUserInfoPop.css('display', 'none')
                    $('#wrap').removeClass('on');

                    USERINFO.phone = userPhone
                    USERINFO.email = userEmail
                    localStorage.setItem('userInfo', JSON.stringify(USERINFO))
                }

                isUpdateUserInfoBeingProcessed = false;
            },
            error: function(error) {
                alert('알 수 없는 오류가 발생했습니다.');
                console.error(error);

                isUpdateUserInfoBeingProcessed = false;
            }

        });
    };


    var updateUserInfoPopFillUserInfo = function() {
        var email = USERINFO.email;
        var phone = USERINFO.phone;

        emailSplitted = email.split('@');
        $updateUserInfoUserEmailId.val( emailSplitted[0] );
        $updateUserInfoUserEmailDomain.val( emailSplitted[1] );

        phoneSplitted = phone.split('-');
        $updateUserInfoUserPhoneFirst.val( phoneSplitted[0] );
        $updateUserInfoUserPhoneSecond.val( phoneSplitted[1] );
        $updateUserInfoUserPhoneThird.val( phoneSplitted[2] );
    };


    return {
        init: init,
        linkedInCallback: linkedInCallback,
        naverPopupCallback: naverPopupCallback,
        naverIdLoginCallback: naverIdLoginCallback,
    }
})();


var Footer = (function() {

    var $footerSurveyDiv = null;
    var $footerSurveyQuestionDefault = null;
    var $footerSurveyQuestionDefaultButton = null;
    var $footerSurveyQuestion1 = null;
    var $footerSurveyQuestion1YesButton = null;
    var $footerSurveyQuestion1NoButton = null;
    var $footerSurveyQuestion2 = null;
    var $footerSurveyQuestion2NextButton = null;
    var $footerSurveyQuestion3 = null;
    var $footerSurveyQuestion3SelectBox = null;
    var $footerSurveyQuestion3NextButton = null;
    var $footerSurveyQuestion4 = null;
    var $footerSurveyQuestion4SelectBoxPc = null;
    var $footerSurveyQuestion4SelectBoxMobile = null;
    var $footerSurveyQuestion4NextButton = null;
    var $footerSurveyQuestion5 = null;
    var $footerSurveyQuestion5YesButton = null;
    var $footerSurveyQuestion5NoButton = null;



    var currentQuestion = 0;
    var ans1 = null;
    var ans2 = null;
    var ans3 = null;
    var ans4 = null;

    var init = function() {
        $footerSurveyDiv = $('#footer-survey-div');
        
        $footerSurveyQuestionDefault = $('#footer-survey-default');
        $footerSurveyQuestionDefaultButton = $('#btn-footer-survey-default');

        $footerSurveyQuestion1 = $('#footer-survey-q1');
        $footerSurveyQuestion1YesButton = $('#btn-yes-footer-survey-q1');
        $footerSurveyQuestion1NoButton = $('#btn-no-footer-survey-q1');

        $footerSurveyQuestion2 = $('#footer-survey-q2');
        $footerSurveyQuestion2NextButton = $('#btn-next-footer-survey-q2');

        $footerSurveyQuestion3 = $('#footer-survey-q3');
        $footerSurveyQuestion3SelectBox = $('#sb-footer-survey-q3');
        $footerSurveyQuestion3NextButton = $('#btn-yes-footer-survey-q3');

        $footerSurveyQuestion4 = $('#footer-survey-q4');
        $footerSurveyQuestion4SelectBoxPc = $('#sb-footer-survey-q4-pc');
        $footerSurveyQuestion4SelectBoxMobile = $('#sb-footer-survey-q4-mo');
        $footerSurveyQuestion4NextButton = $('#btn-yes-footer-survey-q4');

        $footerSurveyQuestion5 = $('#footer-survey-q5');
        $footerSurveyQuestion5YesButton = $('#btn-yes-footer-survey-q5');
        $footerSurveyQuestion5NoButton = $('#btn-no-footer-survey-q5');


        registerListeners();

        if( USERINFO === null ) {
            currentQuestion = 0;
        }
        else {
            if( USERINFO.has_survey && USERINFO.has_resume ) {
                currentQuestion = -1;
            }
            else if( USERINFO.has_survey ) {
                currentQuestion = 5;
            }
            else {
                currentQuestion = 1;
            }
        }

        refreshQuestion();
    };


    var registerListeners = function() {
        $footerSurveyQuestionDefaultButton.click(function() {
            $('#wrap').addClass('on');
            $(".pop_login_bx").addClass('open');
        });

        $footerSurveyQuestion1YesButton.click(function() {
            ans1 = true;
            currentQuestion++;
            refreshQuestion();
        });

        $footerSurveyQuestion1NoButton.click(function() {
            $(".f_pop .x_btn a").trigger('click');
        });

        $footerSurveyQuestion2NextButton.click(function() {
            ans2 = $('input:radio[name="radio-footer-survey-q2"]:checked').val();
            if( ans2 === undefined) {
                alert('경력여부를 선택해주세요')
                return;
            }
            currentQuestion++;
            refreshQuestion();
        });

        $footerSurveyQuestion3NextButton.click(function() {
            ans3 = $footerSurveyQuestion3SelectBox.val();
            if( ans3 === '' ) {
                alert('직종을 선택해주세요')
                return;
            }
            currentQuestion++;
            refreshQuestion();
        });

        $footerSurveyQuestion4NextButton.click(function() {
            var ans4Pc = $footerSurveyQuestion4SelectBoxPc.val();
            var ans4Mobile = $footerSurveyQuestion4SelectBoxMobile.val();
            
            ans4 = ans4Pc === '' ? ans4Mobile : ans4Pc
            if( ans4 === '' ) {
                alert('희망근무지를 선택해주세요')
                return
            }
            currentQuestion++;
            refreshQuestion();
            registerSurveyResult();
        });


        $footerSurveyQuestion5YesButton.click(function() {
            document.location.href = './member_enrollment.html';
        });

        $footerSurveyQuestion5NoButton.click(function() {
            $(".f_pop .x_btn a").trigger('click');
        });
    };


    var refreshQuestion = function() {
        if( currentQuestion >= 0 )    $footerSurveyDiv.css('display', 'block');
        else                          $footerSurveyDiv.css('display', 'none');

        switch(currentQuestion) {
            case 0:
                $footerSurveyQuestionDefault.css('display', 'block');
                $footerSurveyQuestion1.css('display', 'none');
                $footerSurveyQuestion2.css('display', 'none');
                $footerSurveyQuestion3.css('display', 'none');
                $footerSurveyQuestion4.css('display', 'none');
                $footerSurveyQuestion5.css('display', 'none');
                break;

            case 1:
                $footerSurveyQuestionDefault.css('display', 'none');
                $footerSurveyQuestion1.css('display', 'block');
                $footerSurveyQuestion2.css('display', 'none');
                $footerSurveyQuestion3.css('display', 'none');
                $footerSurveyQuestion4.css('display', 'none');
                $footerSurveyQuestion5.css('display', 'none');
                break;

            case 2:
                $footerSurveyQuestionDefault.css('display', 'none');
                $footerSurveyQuestion1.css('display', 'none');
                $footerSurveyQuestion2.css('display', 'block');
                $footerSurveyQuestion3.css('display', 'none');
                $footerSurveyQuestion4.css('display', 'none');
                $footerSurveyQuestion5.css('display', 'none');
                break;

            case 3:
                $footerSurveyQuestionDefault.css('display', 'none');
                $footerSurveyQuestion1.css('display', 'none');
                $footerSurveyQuestion2.css('display', 'none');
                $footerSurveyQuestion3.css('display', 'block');
                $footerSurveyQuestion4.css('display', 'none');
                $footerSurveyQuestion5.css('display', 'none');
                break;

            case 4:
                $footerSurveyQuestionDefault.css('display', 'none');
                $footerSurveyQuestion1.css('display', 'none');
                $footerSurveyQuestion2.css('display', 'none');
                $footerSurveyQuestion3.css('display', 'none');
                $footerSurveyQuestion4.css('display', 'block');
                $footerSurveyQuestion5.css('display', 'none');
                break;

            case 5:
                $footerSurveyQuestionDefault.css('display', 'none');
                $footerSurveyQuestion1.css('display', 'none');
                $footerSurveyQuestion2.css('display', 'none');
                $footerSurveyQuestion3.css('display', 'none');
                $footerSurveyQuestion4.css('display', 'none');
                $footerSurveyQuestion5.css('display', 'block');
                break;

        }
    };

    var registerSurveyResult = function() {
        var url = API_ENDPOINTS.SURVEY + '/survey';
        var method = 'post';
        var param = {
            user_id: USERINFO.id,
            ans1: ans1,
            ans2: ans2,
            ans3: ans3,
            ans4: ans4,
        };

        $.ajax({
            url: url,
            type: method,
            data: param,
            success: function(response) {
                var result = JSON.parse(response.body);
                if( result.error ) {
                    console.error(result.errorMsg);
                }
                else {
                    USERINFO.has_survey = true;
                    localStorage.setItem('userInfo', JSON.stringify(USERINFO))

                    console.log('설문조사 등록 완료');
                }
            },
            error: function(error) {
                console.error(error);
            }
        });
    };

    return {
        init: init,
    }
})();


var Main = (function() {

    var $mainResumeAddButton = null;
    var $mainCompanyList = null;
    var $mainCompanyListMobile = null;
    var $mainLoadMoreCompanyListButton = null;

    var init = function() {
        $mainResumeAddButton = $('#main-resume-add-btn');
        $mainCompanyList = $('#main-company-list');
        $mainCompanyListMobile = $('#main-company-list-mobile');
        $mainLoadMoreCompanyListButton = $('#main-btn-load-more-company-list');


        if( USERINFO !== null) {
            if( USERINFO.has_resume ) {
                $mainResumeAddButton.text('회원등록정보 수정');
            }
        }

        $('.click-to-resume-add').click(function() {
            var userInfo = localStorage.getItem('userInfo');
            if( userInfo !== null ) {
                document.location.href = './member_enrollment.html';
            }
            else {
                alert('로그인 해주세요.');
                $('#header-btn-login').trigger('click');
            }
        });

        $mainLoadMoreCompanyListButton.click(function() {
            var userInfo = localStorage.getItem('userInfo');
            if( userInfo !== null ) {
                document.location.href = './sub1_2.html';
            }
            else {
                alert('로그인 해주세요.');
                $('#header-btn-login').trigger('click');
            }
        });

        fetchCompanyList();
    };

    var fetchCompanyList = function() {
        var url = API_ENDPOINTS.COMPANY + '/company';
        var method = 'get';
        var param = {
            page_num: 1,
            page_size: 20,
            is_admin: false,
        };

        $.ajax({
            url: url,
            type: method,
            data: param,
            success: function(response) {
                var result = JSON.parse(response.body);
                if( result.error ) {
                    alert('회사 리스트를 불러오는데 실패했습니다.');
                    console.error(result.errorMsg);
                }
                else {
                    data = JSON.parse(result.data);
                    companyList = data.list;

                    renderList(companyList);
                }
            },
            error: function(error) {
                alert('알 수 없는 오류가 발생했습니다.');
                console.error(error);
            }
        });
    };

    var renderList = function(companyList) {
        var shouldAppendMobile = true;
        for(var i=0; i<companyList.length; i++) {
            shouldAppendMobile = i < 4 ? true : false;
            appendCompany(companyList[i], shouldAppendMobile);
        }
    };


    var appendCompany = function(company, shouldAppendMobile) {
        var companyComponent = '<li>' +
                                '<div class="list_wrap">' +
                                    '<div>' +
                                        '<div class="img_bx img_bx01" style="height: 150px;">' +
                                            '<span style="height: 100%; vertical-align: middle; display: inline-block;"></span>' +
                                            '<img src="' + company.main_image_url + '" style="max-width: 100%; vertical-align: middle;">' +
                                        '</div>' +
                                        '<div class="txt_bx">' +
                                            '<p class="txt1">' + company.name + '</p>' +
                                            '<p class="txt2">' + company.job_type + '</p>'
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</li>';

        $mainCompanyList.append(companyComponent);

        if( shouldAppendMobile ) {
            $mainCompanyListMobile.append(companyComponent);
        }
    }

    return {
        init: init,
    }
})();


var CompanyList = (function() {

    var $companyList = null;
    var $companyListPagination = null;
    var $companyListPaginationBeforeBeforeButton = null;
    var $companyListPaginationBeforeButton = null;
    var $companyListPaginationNextButton = null;
    var $companyListPaginationNextNextButton = null;


    var companyList = [];
    var oqfiList = [];
    var totalCount = [];
    var pageEnd = 0;
    var pageRangeStart = 1;
    var pageRangeEnd = 1;
    var currentPageNum = 1;



    var init = function() {
        if( !USERINFO ) {
            alert('로그인 해야 이용하실 수 있는 서비스입니다.');
            document.location.href = './main.html'
            return;
        }

        $companyList = $('#ul-company-list');
        $companyListPagination = $('#company-list-pagination');
        $companyListPaginationBeforeBeforeButton = $('#company-list-pagination-before-before-btn');
        $companyListPaginationBeforeButton = $('#company-list-pagination-before-btn');
        $companyListPaginationNextButton = $('#company-list-pagination-next-btn');
        $companyListPaginationNextNextButton = $('#company-list-pagination-next-next-btn');

        registerListeners();
        fetchCompanyList(1);
    };

    var registerListeners = function() {
        $companyListPaginationBeforeBeforeButton.click(function() {
            currentPageNum = 1;
            fetchCompanyList(currentPageNum);
        });

        $companyListPaginationBeforeButton.click(function() {
            currentPageNum = Math.floor(currentPageNum / 10) * 10;
            if( currentPageNum === 0 ) 
                currentPageNum = 1;

            fetchCompanyList(currentPageNum);
        });

        $companyListPaginationNextButton.click(function() {
            currentPageNum = Math.ceil(currentPageNum / 10) * 10 + 1;
            if( currentPageNum > pageEnd )
                currentPageNum = pageEnd

            fetchCompanyList(currentPageNum);
        });

        $companyListPaginationNextNextButton.click(function() {
            currentPageNum = pageEnd
            fetchCompanyList(currentPageNum);
        });
    };


    var fetchCompanyList = function(page_num) {
        var url = API_ENDPOINTS.COMPANY + '/company';
        var method = 'get';
        var param = {
            page_num: page_num,
            page_size: 21,
            is_admin: false,
            user_id: USERINFO.id,
        };

        $.ajax({
            url: url,
            type: method,
            data: param,
            success: function(response) {
                var result = JSON.parse(response.body);
                if( result.error ) {
                    alert('회사 리스트를 불러오는데 실패했습니다.');
                    console.error(result.errorMsg);
                }
                else {
                    data = JSON.parse(result.data);
                    companyList = data.list;
                    oqfiList = data.oqfi_list;
                    totalCount = data.total_count;
                    pageEnd = data.page_end;

                    renderList();
                    renderPagination();
                }
            },
            error: function(error) {
                alert('알 수 없는 오류가 발생했습니다.');
                console.error(error);
            }
        });
    };

    var renderList = function() {
        $companyList.empty();

        console.log(oqfiList);

        
        for(var i=companyList.length-1; i>=0; i--) {
            var oqfiButtonAdded = false;
            var liComponentFormat = 
                '<li style="height: 350px;">' +
                    '<div>' +
                        '<div class="list_title_name">' +
                            '<dl>' +
                                '<dt>' +
                                    '<div class="dt_img01">' +
                                        '<img src="' + companyList[i].main_image_url + '"/>' +
                                    '</div>' +
                                '</dt>' +
                                '<dd>' +
                                    '<div>' +
                                        '<p>' + companyList[i].name  + '</p>' +
                                        '<span>' + companyList[i].job_type + '</span>' +
                                    '</div>' +
                                '</dd>' +
                            '</dl>' +
                        '</div>' +
                        '<div class="list_info" style="height: 60px;">' +
                            '<p></p>' +
                            '<span>' + companyList[i].workplace.split(' ')[0] + ' ' + companyList[i].workplace.split(' ')[1] + '</span>' + 
                            '<span>' + (companyList[i].wage.length < 20 ? companyList[i].wage : companyList[i].wage.substring(0, 15) + '...') + '</span>' +
                            '<span>' + companyList[i].career_type.substring(0, 24) + '</span>' +
                            // '<span>' + companyList[i].workplace.split(' ')[0] + ' ' + companyList[i].workplace.split(' ')[1] + ' | ' + companyList[i].wage + ' | ' + companyList[i].career_type + '</span>' +
                        '</div>' +
                        '<div class="list_more">' +
                            '<ul>' +
                                '<li>' +
                                    '<a style="cursor: pointer;" class="more_btn company-list-detail-btn" data="' + companyList[i].id + '">상세보기</a>' +
                                '</li>' +
                                '<li>';
            for(var j=0; j<oqfiList.length; j++) {
                if( oqfiList[j].company_id === companyList[i].id ) {
                    console.log('dd')
                    liComponentFormat += '<a style="cursor: pointer; background-color: #ff8756;" class="oqfi_like btn-favorite" data="' + i + '" oqfi-id="' + oqfiList[j].id + '" data-method="delete"><span>오큐파이</span></a>';
                    oqfiButtonAdded = true;
                    break;
                }
            }
            if( !oqfiButtonAdded ) {
                liComponentFormat += '<a style="cursor: pointer;" class="oqfi_like btn-favorite" data="' + i + '" data-method="post"><span>오큐파이</span></a>';
            }

            liComponentFormat += '</li>' +
                            '</ul>' +
                        '</div>' +
                    '</div>' +
                '</li>';
            
            $companyList.prepend(liComponentFormat);
        }

        $('.company-list-detail-btn').click(function() {
            var companyId = $(this).attr('data');
            localStorage.setItem('temp-companyId', companyId);

            document.location.href = './sub1_2_1.html';
        })

        $('.btn-favorite').click(function() {
            var companyIndex = parseInt($(this).attr('data'));
            var company = companyList[companyIndex];
            var favId = parseInt($(this).attr('oqfi-id'));

            var url = API_ENDPOINTS.COMPANY + '/user/' + USERINFO.id + '/favorite';
            var method = $(this).attr('data-method');
            var param = {
                'company_id': company.id,
                'company_name': company.name,
                'company_image_url': company.main_image_url,
            };
            if( method === 'delete' ) {
                param['favorite_id'] = favId
            }


            $.ajax({
                url: url,
                type: method,
                data: param,
                success: function(response) {
                    var result = JSON.parse(response.body);
                    if( result.error ) {
                        alert('오큐파이 찜 등록 또는 해제에 실패했습니다.');
                        console.error(result.errorMsg);
                    }
                    else {
                        document.location.reload();
                    }
                },
                error: function(error) {
                    alert('알 수 없는 오류가 발생했습니다.');
                    console.error(error);
                }
            });
        })
    };

    var renderPagination = function() {
        $companyListPagination.empty();

        pageRangeStart = Math.floor(currentPageNum / 10) * 10 + 1;
        pageRangeEnd = pageEnd < pageRangeStart + 9 ? pageEnd : pageRangeStart + 9;

        for(var page=pageRangeStart; page<=pageRangeEnd; page++) {
            var paginationComponentFormat = '';
            if(page == currentPageNum) {
                paginationComponentFormat = '<strong>' + page + '</strong>';
                $companyListPagination.append(paginationComponentFormat);
            }
            else {
                paginationComponentFormat = '<a style="cursor:pointer; " id="company-list-pagination-page' + page + '" data="' + page + '">' + page + '</a>'
                $companyListPagination.append(paginationComponentFormat);
            }
        }

        for(var page=pageRangeStart; page<=pageRangeEnd; page++) {
            $('#company-list-pagination-page' + page).click(function() {
                var clickedPage = $(this).attr('data');

                currentPageNum = clickedPage;
                fetchCompanyList(clickedPage);
            });
        }
    }

    return {
        init: init,
    }
})();


var CompanyDetail = (function() {

    var $companyDetailMainImage = null;
    var $companyDetailCompanyName = null;
    var $companyDetailCompanyAddress = null;
    var $companyDetailTitle = null;
    var $companyDetailJobType = null;
    var $companyDetailJobDesc = null;
    var $companyDetailWage = null;
    var $companyDetailCareerType = null;
    var $companyDetailEduLevel = null;
    var $companyDetailWorkPattern = null;
    var $companyDetailWorkplace = null;
    var $companyDetailAnnounceBeginDt = null;
    var $companyDetailAnnounceEndDt = null;
    var $companyDetailEtc = null;
    var $companyDetailBizType = null;
    var $companyDetailBizNo = null;
    var $companyDetailHomepageUrl = null;
    var $companyDetailPresidentName = null;
    var $companyDetailNumEmployees = null;
    var $companyDetailImage1 = null;
    var $companyDetailImage2 = null;
    var $companyDetailImage3 = null;

    var companyId = null;
    var company = null;


    var init = function() {

        $companyDetailMainImage = $('#company-detail-main-image');
        $companyDetailCompanyName = $('#company-detail-company-name');
        $companyDetailCompanyAddress = $('#company-detail-company-address');
        $companyDetailTitle = $('#company-detail-title');
        $companyDetailJobType = $('#company-detail-job-type');
        $companyDetailJobDesc = $('#company-detail-job-desc');
        $companyDetailWage = $('#company-detail-wage');
        $companyDetailCareerType = $('#company-detail-career-type');
        $companyDetailEduLevel = $('#company-detail-edu-level');
        $companyDetailWorkPattern = $('#company-detail-work-pattern');
        $companyDetailWorkplace = $('#company-detail-workplace');
        $companyDetailAnnounceBeginDt = $('#company-detail-announce-begin-dt');
        $companyDetailAnnounceEndDt = $('#company-detail-announce-end-dt');
        $companyDetailEtc = $('#company-detail-etc');
        $companyDetailBizType = $('#company-detail-biz-type');
        $companyDetailBizNo = $('#company-detail-biz-no');
        $companyDetailHomepageUrl = $('#company-detail-homepage-url');
        $companyDetailPresidentName = $('#company-detail-president-name');
        $companyDetailNumEmployees = $('#company-detail-num-employees');
        $companyDetailImage1 = $('#company-detail-image1');
        $companyDetailImage2 = $('#company-detail-image2');
        $companyDetailImage3 = $('#company-detail-image3');

        companyId = localStorage.getItem('temp-companyId');
        localStorage.removeItem('temp-companyId');
        fetchCompanyData();
    };

    var fetchCompanyData = function() {
        if( companyId === null ) {
            alert('잘못된 접근입니다.')
            history.back();
            return;
            // companyId = 5;
        }

        var url = API_ENDPOINTS.COMPANY + '/company/' + companyId;
        var method = 'get';
        var param = {};

        $.ajax({
            url: url,
            type: method,
            data: param,
            success: function(response) {
                var result = JSON.parse(response.body);
                if( result.error ) {
                    alert('회사 정보를 불러오는데 실패했습니다.');
                    console.error(result.errorMsg);
                }
                else {
                    company = JSON.parse(result.data);
                    renderData();
                }
            },
            error: function(error) {
                alert('알 수 없는 오류가 발생했습니다.');
                console.error(error);
            }
        });
    };

    var renderData = function() {
        $companyDetailMainImage.attr('src', company.main_image_url);
        $companyDetailCompanyName.html(company.name);
        $companyDetailCompanyAddress.html(company.address);
        $companyDetailTitle.html(company.title);
        $companyDetailJobType.html(company.job_type);
        $companyDetailJobDesc.html(company.job_desc);
        $companyDetailWage.html(company.wage);
        $companyDetailCareerType.html(company.career_type);
        $companyDetailEduLevel.html(company.edu_level);
        $companyDetailWorkPattern.html(company.work_pattern);
        $companyDetailWorkplace.html(company.workplace);
        $companyDetailAnnounceBeginDt.html(company.announce_begin_dt);
        $companyDetailAnnounceEndDt.html(company.announce_end_dt);
        $companyDetailEtc.html(company.etc);
        $companyDetailBizType.html(company.biz_type);
        $companyDetailBizNo.html(company.biz_no);
        $companyDetailHomepageUrl.html(company.homepage_url);
        $companyDetailPresidentName.html(company.president_name);
        $companyDetailNumEmployees.html(company.num_employees);

        console.log(company.image1_url)
        console.log(company.image2_url)
        console.log(company.image3_url)
        
        if( company.image1_url !== '' ) { $companyDetailImage1.attr('src', company.image1_url); }
        else { $companyDetailImage1.css('display', 'none'); }
        
        if( company.image2_url !== '' ) { $companyDetailImage2.attr('src', company.image2_url); }
        else { $companyDetailImage2.css('display', 'none'); }

        if( company.image3_url !== '' ) { $companyDetailImage3.attr('src', company.image3_url); }
        else { $companyDetailImage3.css('display', 'none'); }
    };

    return {
        init: init,
    }
})();


var DirectInquiry = (function() {

    var $directInquiryTitle = null;
    var $directInquiryContent = null;
    var $directInquiryEmailId = null;
    var $directInquiryEmailDomain = null;
    var $directInquiryEmailDomainSelectBox = null;
    var $directInquiryButton = null;


    var isSubmitDirectInquiryBeingProcessed = false;

    var init = function() {

        $directInquiryTitle = $('#direct-inquiry-form-title');
        $directInquiryContent = $('#direct-inquiry-form-content');
        $directInquiryEmailId = $('#direct-inquiry-form-email-id');
        $directInquiryEmailDomain = $('#direct-inquiry-form-email-domain');
        $directInquiryEmailDomainSelectBox = $('#direct-inquiry-sb-email-domain');
        $directInquiryButton = $('#direct-inquiry-btn');

        registerListeners();
    };


    var registerListeners = function() {
        $directInquiryButton.click(function() {
            submitDirectInquiry();
        });

        $directInquiryEmailDomainSelectBox.change(function() {
            var domain = $(this).val();
            if( domain === 'user' ) {
                $directInquiryEmailDomain.val('');
                $directInquiryEmailDomain.prop('disabled', false);
            }
            else {
                $directInquiryEmailDomain.val(domain);
                $directInquiryEmailDomain.prop('disabled', true);
            }
        });
    };


    var submitDirectInquiry = function() {
        if( isSubmitDirectInquiryBeingProcessed ) { alert('현재 처리중입니다. 잠시만 기다려주세요.'); return; }

        isSubmitDirectInquiryBeingProcessed = true;

        var title = $directInquiryTitle.val();
        var content = $directInquiryContent.val();
        var replyEmail = $directInquiryEmailId.val() + '@' + $directInquiryEmailDomain.val();

        var assertBlankResult = Util.assertInputNotBlank([ $directInquiryTitle, $directInquiryContent, $directInquiryEmailId, $directInquiryEmailDomain, $directInquiryEmailDomainSelectBox ])
        if( !assertBlankResult ) {
            alert('입력하지 않은 항목이 있습니다.');
            isSubmitDirectInquiryBeingProcessed = false;
            return;
        }

        if( !Util.isValidEmailFormat(replyEmail) ) {
            alert('이메일 형식이 올바르지 않습니다.');
            $directInquiryEmailDomain.focus();
            isSubmitDirectInquiryBeingProcessed = false;
            return;
        }

        var url = API_ENDPOINTS.INQUIRY + '/inquiry';
        var method = 'post';
        var param = {
            user_id: USERINFO.id,
            title: title,
            content: content,
            reply_email: replyEmail,
        };

        $.ajax({
            url: url,
            type: method,
            data: param,
            success: function(response) {
                var result = JSON.parse(response.body);
                if( result.error ) {
                    alert('오류가 발생했습니다.');
                    console.error(result.errorMsg);
                }
                else {
                    alert('1:1 문의가 등록되었습니다. 답변은 관리자가 확인 후 기재하신 이메일 주소로 전송됩니다.');
                    document.location.href = './main.html';
                }

                isSubmitDirectInquiryBeingProcessed = false;
            },
            error: function(error) {
                alert('알 수 없는 오류가 발생했습니다.');
                console.error(error);

                isSubmitDirectInquiryBeingProcessed = false;
            }
        });
    };


    return {
        init: init,
    }
})();


var ResumeAdd = (function() {

    var $resumeAddImage = null;
    var $resumeAddImageFile = null;
    var $resumeAddDeleteImageButton = null;
    var $resumeAddName = null;
    var $resumeAddGender = null;
    var $resumeAddBirth = null;
    var $resumeAddPhoneFirst = null;
    var $resumeAddPhoneSecond = null;
    var $resumeAddPhoneThird = null;
    var $resumeAddEmailId = null;
    var $resumeAddEmailDomain = null;
    var $resumeAddAddress = null;
    var $resumeAddAddressSearchButton = null;
    var $resumeAddAddressDetail = null;
    var $resumeAddExpectedSalary = null;
    var $resumeAddExpectedWorkplace1 = null;
    var $resumeAddExpectedWorkplace2 = null;
    var $resumeAddExpectedWorkplace3 = null;
    var $resumeAddExpectedJobType = null;
    var $resumeAddExpectedCompanyType = null;
    var $resumeAddExpectedWorkHour = null;
    var $resumeAddImportantFactors = null;
    var $resumeAddJobChangeReason = null;
    var $resumeAddSelfIntro = null;

    var $resumeAddEducationDiv = null;
    var $resumeAddEduButton = null;
    var $resumeAddCareerDiv = null;
    var $resumeAddCareerButton = null;
    var $resumeAddCertificateDiv = null;
    var $resumeAddCertificateButton = null;
    var $resumeAddForeignLanguageDiv = null;
    var $resumeAddForeignLanguageButton = null;

    var $resumeAddMyFavoriteListDiv = null;

    var $resumeAddButton = null;



    var uploadedImageUrl = null;
    
    var numEducationFields = 0;
    var resumeAddEduTypeSelectBoxIdList = [];
    var resumeAddGeomjeonggosiCheckBoxIdList = [];
    var resumeAddSchoolNameIdList = [];
    var resumeAddGraduationYearIdList = [];
    var resumeAddEduMajorIdList = [];

    var numCareerFields = 0;
    var resumeAddCompanyNameIdList = [];
    var resumeAddJobPostIdList = [];
    var resumeAddJobTypeIdList = [];
    var resumeAddJobDutyIdList = [];
    var resumeAddCareerBeginDtIdList = [];
    var resumeAddCareerEndDtIdList = [];
    var resumeAddJobDescIdList = [];

    var numCertificateFields = 0;
    var resumeAddCertificateNameIdList = [];
    var resumeAddCertifiedDtIdList = [];

    var numForeignLanguageFields = 0;
    var resumeAddFlNameIdList = [];
    var resumeAddFlExamNameIdList = [];
    var resumeAddFlExamScoreIdList = [];
    var resumeAddFlCertifiedDtIdList = [];


    var isResumeAddBeingProcessed = false;

    var datePickerConfig = { 
        changeYear: true,
        dateFormat: 'yy-mm-dd',
        yearRange: '1950:2019',
    };


    var init = function() {
        $resumeAddImage = $('#resume-add-image');
        $resumeAddImageFile = $('#resume-add-image-file');
        $resumeAddDeleteImageButton = $('#resume-add-delete-image-btn');
        $resumeAddName = $('#resume-add-name');
        $resumeAddGender = $('#resume-add-gender');
        $resumeAddBirth = $('#resume-add-birth');
        $resumeAddBirth.datepicker(datePickerConfig);
        $resumeAddPhoneFirst = $('#resume-add-phone-first');
        $resumeAddPhoneSecond = $('#resume-add-phone-second');
        $resumeAddPhoneThird = $('#resume-add-phone-third');
        $resumeAddEmailId = $('#resume-add-email-id');
        $resumeAddEmailDomain = $('#resume-add-email-domain');
        $resumeAddAddress = $('#resume-add-address');
        $resumeAddAddressSearchButton = $('#btn-resume-add-address-search');
        $resumeAddAddressDetail = $('#resume-add-address-detail');
        $resumeAddExpectedSalary = $('#resume-add-expected-salary');
        $resumeAddExpectedWorkplace1 = $('#resume-add-expected-workplace-1');
        $resumeAddExpectedWorkplace2 = $('#resume-add-expected-workplace-2');
        $resumeAddExpectedWorkplace3 = $('#resume-add-expected-workplace-3');
        $resumeAddExpectedJobType = $('#resume-add-expected-job-type');
        // $resumeAddExpectedCompanyType = $('input[name=resume-add-expected-company-type]:checked');
        $resumeAddExpectedWorkHour = $('#resume-add-expected-work-hour');
        $resumeAddImportantFactors = $('#resume-add-important-factors');
        $resumeAddJobChangeReason = $('#resume-add-job-change-reason');
        $resumeAddSelfIntro = $('#resume-add-self-intro');

        $resumeAddEducationDiv = $('#resume-add-education-div');
        $resumeAddEduButton = $('#resume-add-edu-btn');
        $resumeAddCareerDiv = $('#resume-add-career-div');
        $resumeAddCareerButton = $('#resume-add-career-btn');
        $resumeAddCertificateDiv = $('#resume-add-certificate-div');
        $resumeAddCertificateButton = $('#resume-add-certificate-btn');
        $resumeAddForeignLanguageDiv = $('#resume-add-foreign-language-div');
        $resumeAddForeignLanguageButton = $('#resume-add-foreign-language-btn');

        $resumeAddMyFavoriteListDiv = $('#resume-add-my-favorite-list-div');

        $resumeAddButton = $('#resume-add-btn');

        registerListeners();

        if( USERINFO.has_resume ) {
            loadResumeData();
        }
    };

    var registerListeners = function() {
        $resumeAddImageFile.change(function() {
            var files = $(this).prop('files');
            AWS_S3.upload(files, function(image_url) {
                uploadedImageUrl = image_url;

                if( image_url === null )
                    $resumeAddImage.attr('src', '../img/member_page02.png');
                else {
                    $resumeAddImage.attr('src', image_url);
                }
            });
        });

        $resumeAddDeleteImageButton.click(function() {
            uploadedImageUrl = null;
            $resumeAddImage.attr('src', '../img/member_page02.png');
            $resumeAddImageFile.val('');
        });

        $resumeAddEduButton.click(function() {
            appendEducationField();
        });

        $resumeAddCareerButton.click(function() {
            appendCareerField();
        });

        $resumeAddCertificateButton.click(function() {
            appendCertificateField();
        });

        $resumeAddForeignLanguageButton.click(function() {
            appendForeignLanguageField();
        });

        $resumeAddButton.click(function() {
            registerResume();
        });

        $resumeAddAddressSearchButton.click(function() {
            new daum.Postcode({
                oncomplete: function(data) {
                    console.log(data)
                    if( data.address ) {
                        var addr = data.address;
                        $resumeAddAddress.val(addr);
                    } 
                }
            }).open();
        });
    };

    var loadResumeData = function() {
        var url = API_ENDPOINTS.RESUME + '/resume/' + USERINFO.resume_id;
        var method = 'get';
        var param = {};

        $.ajax({
            url: url,
            type: method,
            data: param,
            success: function(response) {
                var result = JSON.parse(response.body);
                if( result.error ) {
                    alert('회원등록정보를 불러오는 데 오류가 발생했습니다.');
                    console.error(result.errorMsg);
                }
                else {                    
                    var data = JSON.parse(result.data);
                    
                    renderLoadedData(data);
                }
            },
            error: function(error) {
                alert('알 수 없는 오류가 발생했습니다.');
                console.error(error);
            }

        });
    }

    var renderLoadedData = function(data) {
        var resume = data.resume;
        var resumeEducation = data.resume_education;
        var resumeCareer = data.resume_career;
        var resumeCertificate = data.resume_certificate;
        var resumeForeignLanguage = data.resume_foreign_language;
        var resumeOqfi = data.resume_oqfi;


        $resumeAddImage.attr('src', resume.image_url);
        $resumeAddName.val(resume.name);
        $resumeAddGender.val(resume.gender);
        $resumeAddBirth.val(resume.birth);

        var phoneSplitted = resume.phone.split('-');
        $resumeAddPhoneFirst.val(phoneSplitted[0]);
        $resumeAddPhoneSecond.val(phoneSplitted[1]);
        $resumeAddPhoneThird.val(phoneSplitted[2]);

        var emailSplitted = resume.email.split('@');
        $resumeAddEmailId.val(emailSplitted[0]);
        $resumeAddEmailDomain.val(emailSplitted[1]);

        $resumeAddAddress.val(resume.address);
        $resumeAddAddressDetail.val(resume.address_detail);
        $resumeAddExpectedSalary.val(resume.expected_salary);

        var expectedWorkPlaceSplitted = resume.expected_workplace.split('|')
        $resumeAddExpectedWorkplace1.val(expectedWorkPlaceSplitted[0]);
        $resumeAddExpectedWorkplace2.val(expectedWorkPlaceSplitted[1]);
        $resumeAddExpectedWorkplace3.val(expectedWorkPlaceSplitted[2]);

        $resumeAddExpectedJobType.val(resume.expected_job_type);
        $('input[name=resume-add-expected-company-type]:input[value=' + resume.expected_company_type + ']').attr('checked', true);
        // $resumeAddExpectedCompanyType.val(resume.expected_company_type);

        $resumeAddExpectedWorkHour.val(resume.expected_work_hour);
        $resumeAddImportantFactors.val(resume.important_factors);
        $resumeAddJobChangeReason.val(resume.job_change_reason);
        $resumeAddSelfIntro.val(resume.self_intro);

        
        for(var i=0; i<resumeEducation.length; i++) {
            appendEducationField();

            $('#' + resumeAddEduTypeSelectBoxIdList[i]).val(resumeEducation[i].edu_type);
            $('#' + resumeAddGeomjeonggosiCheckBoxIdList[i]).prop('checked', resumeEducation[i].geomjeonggosi_yn);
            $('#' + resumeAddSchoolNameIdList[i]).val(resumeEducation[i].school_name);
            $('#' + resumeAddGraduationYearIdList[i]).val(resumeEducation[i].graduation_year);
            $('#' + resumeAddEduMajorIdList[i]).val(resumeEducation[i].edu_major);
        }

        for(var i=0; i<resumeCareer.length; i++) {
            appendCareerField();

            $('#' + resumeAddCompanyNameIdList[i]).val(resumeCareer[i].company_name);
            $('#' + resumeAddJobPostIdList[i]).val(resumeCareer[i].job_post);
            $('#' + resumeAddJobTypeIdList[i]).val(resumeCareer[i].job_type);
            $('#' + resumeAddJobDutyIdList[i]).val(resumeCareer[i].job_duty);
            $('#' + resumeAddJobDescIdList[i]).val(resumeCareer[i].job_desc);
            $('#' + resumeAddCareerBeginDtIdList[i]).val(resumeCareer[i].career_begin_dt.substring(0, 10));
            $('#' + resumeAddCareerEndDtIdList[i]).val(resumeCareer[i].career_end_dt.substring(0, 10));
        }

        for(var i=0; i<resumeCertificate.length; i++) {
            appendCertificateField();

            $('#' + resumeAddCertificateNameIdList[i]).val(resumeCertificate[i].certificate_name);
            $('#' + resumeAddCertifiedDtIdList[i]).val(resumeCertificate[i].certified_dt.substring(0, 10));
        }

        for(var i=0; i<resumeForeignLanguage.length; i++) {
            appendForeignLanguageField();

            $('#' + resumeAddFlNameIdList[i]).val(resumeForeignLanguage[i].fl_name);
            $('#' + resumeAddFlExamNameIdList[i]).val(resumeForeignLanguage[i].fl_exam_name);
            $('#' + resumeAddFlExamScoreIdList[i]).val(resumeForeignLanguage[i].fl_exam_score);
            $('#' + resumeAddFlCertifiedDtIdList[i]).val(resumeForeignLanguage[i].fl_certified_dt.substring(0, 10));
        }

        for(var i=0; i<resumeOqfi.length; i++) {
            var myOqfiFav = '<span>' + resumeOqfi[i].company_name + '</span><br/>';
            $resumeAddMyFavoriteListDiv.prepend(myOqfiFav);
        }
    }

    var appendEducationField = function() {
        
        numEducationFields++;
        
        var i = numEducationFields;

        var resumeAddEducationFieldId = 'resume-add-education-field-' + i;
        var resumeAddEduTypeSelectBoxId = 'resume-add-edu-type-sb-' + i;
        var resumeAddGeomjeonggosiCheckBoxId = 'resume-add-geomjeonggosi-cb-' + i;
        var resumeAddSchoolNameId = 'resume-add-school-name-' + i;
        var resumeAddGraduationYearId = 'resume-add-graduation-year-' + i;
        var resumeAddEduMajorId = 'resume-add-edu-major-' + i;
        var resumeAddEducationFieldDeleteButtonId = 'resume-add-btn-delete-education-field-' + i;

        resumeAddEduTypeSelectBoxIdList.push( resumeAddEduTypeSelectBoxId );
        resumeAddGeomjeonggosiCheckBoxIdList.push( resumeAddGeomjeonggosiCheckBoxId );
        resumeAddSchoolNameIdList.push( resumeAddSchoolNameId );
        resumeAddGraduationYearIdList.push( resumeAddGraduationYearId );
        resumeAddEduMajorIdList.push( resumeAddEduMajorId );


        var educationField = '<ul id="' + resumeAddEducationFieldId + '">' +
                                '<li>' +
                                    '<div>' +
                                        '<dl>' +
                                            '<dt>' +
                                                '<div><p>학교구분</p></div>' +
                                            '</dt>' +
                                            '<dd>' +
                                                '<div>' +
                                                     '<select class="edu_select" id="' + resumeAddEduTypeSelectBoxId + '">' +
                                                        '<option value="고등학교">고등학교</option>' +
                                                        '<option value="중학교">중학교</option>' +
                                                        '<option value="대학교">대학교</option>' +
                                                        '<option value="대학원">대학원</option>' +
                                                    '</select>' +
                                                '</div>' +
                                            '</dd>' +
                                        '</dl>' +
                                    '</div>' +
                                '</li>' +
                                '<li>' +
                                    '<div>' +
                                        '<dl>' +
                                            '<dt>' +
                                                '<div style="margin-top: 8px;">검정고시<input type="checkbox" name="edu_bx1" value="검정고시" id="' + resumeAddGeomjeonggosiCheckBoxId + '"></div>' +
                                            '</dt>' +
                                            '<dd>' +
                                                '<div>' +
                                                    
                                                '</div>' +
                                            '</dd>' +
                                        '</dl>' +
                                    '</div>' +
                                '</li>' +
                                '<li>' +
                                    '<div>' +
                                        '<dl>' +
                                            '<dt>' +
                                                '<div><p>학교명</p></div>' +
                                            '</dt>' +
                                            '<dd>' +
                                                '<div>' +
                                                    '<input type="text" name="edu_bx2" id="' + resumeAddSchoolNameId + '">' +
                                                '</div>' +
                                            '</dd>' +
                                        '</dl>' +
                                    '</div>' +
                                '</li>' +
                                '<li>' +
                                    '<div>' +
                                        '<dl>' +
                                            '<dt>' +
                                                '<div><p>졸업연도</p></div>' +
                                            '</dt>' +
                                            '<dd>' +
                                                '<div>' +
                                                    '<input type="text" name="edu_bx3" id="' + resumeAddGraduationYearId + '">' +
                                                '</div>' +
                                            '</dd>' +
                                        '</dl>' +
                                    '</div>' +
                                '</li>' +
                                '<li>' +
                                    '<div>' +
                                        '<dl>' +
                                            '<dt>' +
                                                '<div><p>전     공</p></div>' +
                                            '</dt>' +
                                            '<dd>' +
                                                '<div>' +
                                                    '<input type="text" name="edu_bx4" id="' + resumeAddEduMajorId + '">' +
                                                '</div>' +
                                            '</dd>' +
                                        '</dl>' +
                                    '</div>' +
                                '</li>' +
                                '<li style="float: none;">' + 
                                    '<div>' +
                                        '<a id="' + resumeAddEducationFieldDeleteButtonId + '" style="margin-left: 50px; cursor: pointer; padding: 10px; border-radius: 5px; color: #fff; background: #ff0000;">삭제</a>' +
                                    '</div>' +
                                '</li>' + 
                            '</ul>';
        
        $resumeAddEducationDiv.append(educationField);

        $('#' + resumeAddEducationFieldDeleteButtonId).click(function() {
            $('#' + resumeAddEducationFieldId).remove();
        });
    };

    var appendCareerField = function() {

        numCareerFields++;

        var i = numCareerFields;

        var resumeAddCompanyFieldId = 'resume-add-company-field-' + i;
        var resumeAddCompanyNameId = 'resume-add-company-name-' + i;
        var resumeAddJobPostId = 'resume-add-job-post-' + i;
        var resumeAddJobTypeId = 'resume-add-job-type-' + i;
        var resumeAddJobDutyId = 'resume-add-job-duty-' + i;
        var resumeAddCareerBeginDtId = 'resume-add-career-begin-dt-' + i;
        var resumeAddCareerEndDtId = 'resume-add-career-end-dt-' + i;
        var resumeAddJobDescId = 'resume-add-job-desc-' + i;
        var resumeAddCompanyFieldDeleteButtonId = 'resume-add-btn-delete-company-field-' + i;

        resumeAddCompanyNameIdList.push( resumeAddCompanyNameId );
        resumeAddJobPostIdList.push( resumeAddJobPostId );
        resumeAddJobTypeIdList.push( resumeAddJobTypeId );
        resumeAddJobDutyIdList.push( resumeAddJobDutyId );
        resumeAddCareerBeginDtIdList.push( resumeAddCareerBeginDtId );
        resumeAddCareerEndDtIdList.push( resumeAddCareerEndDtId );
        resumeAddJobDescIdList.push( resumeAddJobDescId );


        var careerField = '<ul class="clr" id="' + resumeAddCompanyFieldId + '">' + 
                                '<li>' + 
                                    '<div>' + 
                                        '<dl>' + 
                                            '<dt>' + 
                                                '<div><p>기 업 명</p></div>' + 
                                            '</dt>' + 
                                            '<dd>' + 
                                                '<div>' + 
                                                     '<input type="text" id="resume-add-company-name-' + i + '"/>' + 
                                                '</div>' + 
                                            '</dd>' + 
                                        '</dl>' + 
                                    '</div>' + 
                                '</li>' + 
                                '<li>' + 
                                    '<div>' + 
                                        '<dl>' + 
                                            '<dt>' + 
                                                '<div><p>직위(직급)</p></div>' + 
                                            '</dt>' + 
                                            '<dd>' + 
                                                '<div>' + 
                                                    '<input type="text" name="edu_bx5" id="resume-add-job-post-' + i + '">' + 
                                                '</div>' + 
                                            '</dd>' + 
                                        '</dl>' + 
                                    '</div>' + 
                                '</li>' + 
                                '<li>' + 
                                    '<div>' + 
                                        '<dl>' + 
                                            '<dt>' + 
                                                '<div><p>직     종</p></div>' + 
                                            '</dt>' + 
                                            '<dd>' + 
                                                '<div>' + 
                                                    '<input type="text" id="resume-add-job-type-' + i + '"/>' + 
                                                '</div>' + 
                                            '</dd>' + 
                                        '</dl>' + 
                                    '</div>' + 
                                '</li>' + 
                                '<li>' + 
                                    '<div>' + 
                                        '<dl>' + 
                                            '<dt>' + 
                                                '<div><p>직     무</p></div>' + 
                                            '</dt>' + 
                                            '<dd>' + 
                                                '<div>' + 
                                                    '<input type="text" id="resume-add-job-duty-' + i + '"/>' + 
                                                '</div>' + 
                                            '</dd>' + 
                                        '</dl>' + 
                                    '</div>' + 
                                '</li>' + 
                                '<li class="w_100">' + 
                                    '<div>' + 
                                        '<dl>' + 
                                            '<dt>' + 
                                                '<div><p>근무기간</p></div>' + 
                                            '</dt>' + 
                                            '<dd>' + 
                                                '<div>' + 
                                                    '<input type="text" name="edu_bx6" value="" id="resume-add-career-begin-dt-' + i + '">' + 
                                                    '&nbsp;&nbsp;&nbsp; ~ &nbsp;&nbsp;&nbsp;' +
                                                    '<input type="text" name="edu_bx7" value="" id="resume-add-career-end-dt-' + i + '">' + 
                                                '</div>' + 
                                            '</dd>' + 
                                        '</dl>' + 
                                    '</div>' + 
                                '</li>' + 
                                '<li class="w_100">' + 
                                    '<div>' + 
                                        '<dl>' + 
                                            '<dt>' + 
                                                '<div>직무내용</div>' + 
                                            '</dt>' + 
                                            '<dd>' + 
                                                '<div>' + 
                                                     '<textarea name="e_s_t1" style="width:100%;" id="resume-add-job-desc-' + i + '"></textarea>' + 
                                                '</div>' + 
                                            '</dd>' + 
                                        '</dl>' + 
                                    '</div>' + 
                                '</li>' + 
                                '<li style="float: none;">' + 
                                    '<div>' +
                                        '<a id="' + resumeAddCompanyFieldDeleteButtonId + '" style="margin-left: 50px; cursor: pointer; padding: 10px; border-radius: 5px; color: #fff; background: #ff0000;">삭제</a>' +
                                    '</div>' +
                                '</li>' + 
                            '</ul>';

        $resumeAddCareerDiv.append(careerField);

        $('#' + resumeAddCareerBeginDtId).datepicker(datePickerConfig);
        $('#' + resumeAddCareerEndDtId).datepicker(datePickerConfig);

        $('#' + resumeAddCompanyFieldDeleteButtonId).click(function() {
            $('#' + resumeAddCompanyFieldId).remove();
        });
    };

    var appendCertificateField = function() {

        numCertificateFields++;

        var i = numCertificateFields;

        var resumeAddCertificateFieldId = 'resume-add-certificate-field-' + i;
        var resumeAddCertificateNameId = 'resume-add-certificate-name-' + i;
        var resumeAddCertifiedDtId = 'resume-add-certified-dt-' + i;
        var resumeAddCertificateFieldDeleteButtonId = 'resume-add-btn-delete-certificate-field-' + i;

        resumeAddCertificateNameIdList.push( resumeAddCertificateNameId );
        resumeAddCertifiedDtIdList.push( resumeAddCertifiedDtId );

        var certificateField = '<ul id="' + resumeAddCertificateFieldId + '">' + 
                                    '<li>' +
                                        '<div>' +
                                            '<dl>' +
                                                '<dt>' +
                                                    '<div><p>자격증명</p></div>' +
                                                '</dt>' +
                                                '<dd>' +
                                                    '<div>' +
                                                        '<input type="text" name="edu_bx8" value="" id="resume-add-certificate-name-' + i + '">' +
                                                    '</div>' +
                                                '</dd>' +
                                            '</dl>' +
                                        '</div>' +
                                    '</li>' +
                                    '<li>' +
                                        '<div>' +
                                            '<dl>' +
                                                '<dt>' +
                                                    '<div><p>취득날짜</p></div>' +
                                                '</dt>' +
                                                '<dd>' +
                                                    '<div>' +
                                                        '<input type="text" name="edu_bx9" value="" id="resume-add-certified-dt-' + i + '">' +
                                                    '</div>' +
                                                '</dd>' +
                                            '</dl>' +
                                        '</div>' +
                                    '</li>' +
                                    '<li style="float: none;">' + 
                                        '<div>' +
                                            '<a id="' + resumeAddCertificateFieldDeleteButtonId + '" style="margin-left: 50px; cursor: pointer; padding: 10px; border-radius: 5px; color: #fff; background: #ff0000;">삭제</a>' +
                                        '</div>' +
                                    '</li>' + 
                                '</ul>';
        
        $resumeAddCertificateDiv.append(certificateField);

        $('#' + resumeAddCertifiedDtId).datepicker(datePickerConfig);

        $('#' + resumeAddCertificateFieldDeleteButtonId).click(function() {
            $('#' + resumeAddCertificateFieldId).remove();
        });
    };

    var appendForeignLanguageField = function() {

        numForeignLanguageFields++;

        var i = numForeignLanguageFields;

        var resumeAddForeignLanguageFieldId = 'resume-add-fl-field-' + i;
        var resumeAddFlNameId = 'resume-add-fl-name-' + i;
        var resumeAddFlExamNameId = 'resume-add-fl-exam-name-' + i;
        var resumeAddFlExamScoreId = 'resume-add-fl-exam-score-' + i;
        var resumeAddFlCertifiedDtId = 'resume-add-fl-certified-dt-' + i;
        var resumeAddForeignLanguageFieldDeleteButtonId = 'resume-add-btn-delete-fl-field-' + i;

        resumeAddFlNameIdList.push( resumeAddFlNameId );
        resumeAddFlExamNameIdList.push( resumeAddFlExamNameId );
        resumeAddFlExamScoreIdList.push( resumeAddFlExamScoreId );
        resumeAddFlCertifiedDtIdList.push( resumeAddFlCertifiedDtId );


        var foreignLanguageField = '<ul id="' + resumeAddForeignLanguageFieldId + '">' + 
                                        '<li>' +
                                            '<div>' +
                                                '<dl>' +
                                                    '<dt>' +
                                                        '<div><p>언어</p></div>' +
                                                    '</dt>' +
                                                    '<dd>' +
                                                        '<div>' +
                                                            '<input type="text" name="edu_bx10" id="resume-add-fl-name-' + i + '">' +
                                                        '</div>' +
                                                    '</dd>' +
                                                '</dl>' +
                                            '</div>' +
                                        '</li>' +
                                        '<li>' +
                                            '<div>' +
                                                '<dl>' +
                                                    '<dt>' +
                                                        '<div><p>시험명</p></div>' +
                                                    '</dt>' +
                                                    '<dd>' +
                                                        '<div>' +
                                                            '<input type="text" name="edu_bx11" value="" id="resume-add-fl-exam-name-' + i + '">' +
                                                        '</div>' +
                                                    '</dd>' +
                                                '</dl>' +
                                            '</div>' +
                                        '</li>' +
                                        '<li>' +
                                            '<div>' +
                                                '<dl>' +
                                                    '<dt>' +
                                                        '<div><p>점수</p></div>' +
                                                    '</dt>' +
                                                    '<dd>' +
                                                        '<div>' +
                                                            '<input type="text" name="edu_bx12" value="" id="resume-add-fl-exam-score-' + i +'">점(급)' +
                                                            
                                                        '</div>' +
                                                    '</dd>' +
                                                '</dl>' +
                                            '</div>' +
                                        '</li>' +
                                        '<li>' +
                                            '<div>' +
                                                '<dl>' +
                                                    '<dt>' +
                                                        '<div><p>취득날짜</p></div>' +
                                                    '</dt>' +
                                                    '<dd>' +
                                                        '<div>' +
                                                            '<input type="text" name="edu_bx13" value="" id="resume-add-fl-certified-dt-' + i + '">' +
                                                            
                                                        '</div>' +
                                                    '</dd>' +
                                                '</dl>' +
                                            '</div>' +
                                        '</li>' +
                                        '<li style="float: none;">' + 
                                            '<div>' +
                                                '<a id="' + resumeAddForeignLanguageFieldDeleteButtonId + '" style="margin-left: 50px; cursor: pointer; padding: 10px; border-radius: 5px; color: #fff; background: #ff0000;">삭제</a>' +
                                            '</div>' +
                                        '</li>' + 
                                    '</ul>';
        
        $resumeAddForeignLanguageDiv.append(foreignLanguageField);

        $('#' + resumeAddFlCertifiedDtId).datepicker(datePickerConfig);

        $('#' + resumeAddForeignLanguageFieldDeleteButtonId).click(function() {
            $('#' + resumeAddForeignLanguageFieldId).remove();
        });
    }


    var registerResume = function() {
        if( isResumeAddBeingProcessed ) { alert('현재 처리중입니다. 잠시만 기다려주세요.'); return; }

        console.log('registering resume...');

        isResumeAddBeingProcessed = true;

        var imageUrl = $resumeAddImage.attr('src');
        var name = $resumeAddName.val();
        var gender = $resumeAddGender.val();
        var birth = $resumeAddBirth.val();
        var phone = $resumeAddPhoneFirst.val() + '-' + $resumeAddPhoneSecond.val() + '-' + $resumeAddPhoneThird.val();
        var email = $resumeAddEmailId.val() + '@' + $resumeAddEmailDomain.val();
        var address = $resumeAddAddress.val();
        var addressDetail = $resumeAddAddressDetail.val();
        var expectedSalary = $resumeAddExpectedSalary.val();
        var expectedWorkplace = $resumeAddExpectedWorkplace1.val() + '|' + $resumeAddExpectedWorkplace2.val() + '|' + $resumeAddExpectedWorkplace3.val();
        var expectedJobType = $resumeAddExpectedJobType.val();
        var expectedCompanyType = $('input[name=resume-add-expected-company-type]:checked').val();
        var expectedWorkHour = $resumeAddExpectedWorkHour.val();
        var importantFactors = $resumeAddImportantFactors.val();
        var jobChangeReason = $resumeAddJobChangeReason.val();
        var selfIntro = $resumeAddSelfIntro.val();


        var eduTypeList = [];
        var schoolNameList = [];
        var graduationYearList = [];
        var eduMajorList = [];
        var geomjeonggosiYnList = [];

        for(var i=0; i<numEducationFields; i++) {
            var eduType = $('#' + resumeAddEduTypeSelectBoxIdList[i]).val();
            var schoolName = $('#' + resumeAddSchoolNameIdList[i]).val();
            var graduationYear = $('#' + resumeAddGraduationYearIdList[i]).val();
            var eduMajor = $('#' + resumeAddEduMajorIdList[i]).val();
            var geomjeonggosiYn = $('#' + resumeAddGeomjeonggosiCheckBoxIdList[i]).prop('checked');

            eduTypeList.push(eduType);
            schoolNameList.push(schoolName);
            graduationYearList.push(graduationYear);
            eduMajorList.push(eduMajor);
            geomjeonggosiYnList.push(geomjeonggosiYn);
        }


        var companyNameList = [];
        var jobPostList = [];
        var jobTypeList = [];
        var jobDutyList = [];
        var jobDescList = [];
        var careerBeginDtList = [];
        var careerEndDtList = [];

        for(var i=0; i<numCareerFields; i++) {
            var companyName = $('#' + resumeAddCompanyNameIdList[i]).val();
            var jobPost = $('#' + resumeAddJobPostIdList[i]).val();
            var jobType = $('#' + resumeAddJobTypeIdList[i]).val();
            var jobDuty = $('#' + resumeAddJobDutyIdList[i]).val();
            var jobDesc = $('#' + resumeAddJobDescIdList[i]).val();
            var careerBeginDt = $('#' + resumeAddCareerBeginDtIdList[i]).val();
            var careerEndDt = $('#' + resumeAddCareerEndDtIdList[i]).val();

            companyNameList.push( companyName );
            jobPostList.push( jobPost );
            jobTypeList.push( jobType );
            jobDutyList.push( jobDuty );
            jobDescList.push( jobDesc );
            careerBeginDtList.push( careerBeginDt );
            careerEndDtList.push( careerEndDt );
        }


        var certificateNameList = [];
        var certifiedDtList = [];

        for(var i=0; i<numCertificateFields; i++) {
            var certificateName = $('#' + resumeAddCertificateNameIdList[i]).val();
            var certifiedDt = $('#' + resumeAddCertifiedDtIdList[i]).val();

            certificateNameList.push( certificateName );
            certifiedDtList.push( certifiedDt );
        }


        var flNameList = [];
        var flExamNameList = [];
        var flExamScoreList = [];
        var flCertifiedDtList = [];

        for(var i=0; i<numForeignLanguageFields; i++) {
            var flName = $('#' + resumeAddFlNameIdList[i]).val();
            var flExamName = $('#' + resumeAddFlExamNameIdList[i]).val();
            var flExamScore = $('#' + resumeAddFlExamScoreIdList[i]).val();
            var flCertifiedDt = $('#' + resumeAddFlCertifiedDtIdList[i]).val();

            flNameList.push( flName );
            flExamNameList.push( flExamName );
            flExamScoreList.push( flExamScore );
            flCertifiedDtList.push( flCertifiedDt );
        }




        var assertBlankResult = Util.assertInputNotBlank([ 
            $resumeAddImage,
            $resumeAddName,
            $resumeAddGender,
            $resumeAddBirth,
            $resumeAddPhoneFirst, $resumeAddPhoneSecond, $resumeAddPhoneThird,
            $resumeAddEmailId, $resumeAddEmailDomain,
            $resumeAddAddress, $resumeAddAddressDetail,
            $resumeAddExpectedWorkplace1, $resumeAddExpectedWorkplace2, $resumeAddExpectedWorkplace3,
            $resumeAddExpectedJobType,
            $resumeAddExpectedWorkHour,
        ]);

        if( !assertBlankResult ) {
            alert('입력하지 않은 항목이 있습니다.');
            isResumeAddBeingProcessed = false;
            return;
        }

        if( !Util.isValidDateFormat(birth) ) {
            alert('생년월일이 올바르지 않습니다..');
            $resumeAddBirth.focus();
            isResumeAddBeingProcessed = false;
            return;
        }

        if( !Util.isValidPhoneFormat(phone) ) {
            alert('휴대폰 번호가 올바르지 않습니다.');
            $resumeAddPhoneFirst.focus();
            isResumeAddBeingProcessed = false;
            return;
        }

        if( !Util.isValidEmailFormat(email) ) {
            alert('이메일 형식이 올바르지 않습니다.');
            $resumeAddEmailDomain.focus();
            isResumeAddBeingProcessed = false;
            return;
        }


        console.log('preparing api call...');

        var url = '';
        var method = '';
        if( USERINFO.has_resume ) {
            url = API_ENDPOINTS.RESUME + '/resume/' + USERINFO.resume_id;
            method = 'put';
        }  
        else {
            url = API_ENDPOINTS.RESUME + '/resume';
            method = 'post';
        }

        var param = {
            user_id: USERINFO.id,
            name: name,
            image_url: imageUrl,
            gender: gender,
            birth: birth,
            phone: phone,
            email: email,
            address: address,
            address_detail: addressDetail,
            expected_salary: expectedSalary,
            expected_workplace: expectedWorkplace,
            expected_job_type: expectedJobType,
            expected_company_type: expectedCompanyType,
            expected_work_hour: expectedWorkHour,
            important_factors: importantFactors,
            job_change_reason: jobChangeReason,
            self_intro: selfIntro,
        };

        if( numEducationFields > 0 ) {
            param['edu_type[]'] = Util.arrayToString(eduTypeList);
            param['school_name[]'] = Util.arrayToString(schoolNameList);
            param['graduation_year[]'] = Util.arrayToString(graduationYearList);
            param['edu_major[]'] = Util.arrayToString(eduMajorList);
            param['geomjeonggosi_yn[]'] = Util.arrayToString(geomjeonggosiYnList);
        }

    
        if( numCareerFields > 0 ) {
            param['company_name[]'] = Util.arrayToString(companyNameList);
            param['job_post[]'] = Util.arrayToString(jobPostList);
            param['job_type[]'] = Util.arrayToString(jobTypeList);
            param['job_duty[]'] = Util.arrayToString(jobDutyList);
            param['job_desc[]'] = Util.arrayToString(jobDescList);
            param['career_begin_dt[]'] = Util.arrayToString(careerBeginDtList);
            param['career_end_dt[]'] = Util.arrayToString(careerEndDtList);
        }

        if( numCertificateFields > 0 ) {
            param['certificate_name[]'] = Util.arrayToString(certificateNameList);
            param['certified_dt[]'] = Util.arrayToString(certifiedDtList);
        }

        if( numForeignLanguageFields > 0 ) {
            param['fl_name[]'] = Util.arrayToString(flNameList);
            param['fl_exam_name[]'] = Util.arrayToString(flExamNameList);
            param['fl_exam_score[]'] = Util.arrayToString(flExamScoreList);
            param['fl_certified_dt[]'] = Util.arrayToString(flCertifiedDtList);
        }

    

        $.ajax({
            url: url,
            type: method,
            data: param,
            success: function(response) {
                var result = JSON.parse(response.body);
                if( result.error ) {
                    alert('오류가 발생했습니다.');
                    console.error(result.errorMsg);
                }
                else {
                    var resume_id = JSON.parse(result.data);
                    USERINFO.resume_id = resume_id;
                    USERINFO.has_resume = true;
                    localStorage.setItem('userInfo', JSON.stringify(USERINFO));

                    alert('회원정보등록(수정)이 완료되었습니다. 감사합니다.');
                }

                isResumeAddBeingProcessed = false;
            },
            error: function(error) {
                alert('알 수 없는 오류가 발생했습니다.');
                console.error(error);

                isResumeAddBeingProcessed = false;
            }

        });

        console.log(url)
        console.log(method)
        console.log(USERINFO.id)


    };

    return {
        init: init,
    }
})();