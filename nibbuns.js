function removeLoadingLayer() {
    var loadingWrapper = document.getElementById('snap-sync-loading-wrapper');
    if(loadingWrapper !== null && loadingWrapper !== 'undefined') document.body.removeChild(loadingWrapper);
    document.body.style.removeProperty("overflow");
}

function setLoadingLayer() {
    var hosting;
    var solutiontype = document.getElementById("spm_page_type").getAttribute('sf-solution');
    hosting = (solutiontype) ? solutiontype : "";
    if(solutiontype == "cafeapi") hosting = "cafe24";
    hosting = (hosting) ? hosting.toUpperCase() : "";

    var hostings = {
        CAFE24: [
            "/member/login.html", // 로그인
            "/member/join.html", // 회원가입
            "/member/agreement.html"
        ],
        MAKESHOP: [
            "/shop/member.html", // 피씨 회원 로그인
            "/shop/confirm_login.html", // 피씨 비회원 로그인
            "/shop/idinfo.html", // 피씨 회원가입
            "/m/login.html", // 모바일 회원/비회원 로그인
            "/m/join_contract.html" // 모바일 회원가입
        ]
    }

    if(hosting && hostings[hosting].indexOf(window.location.pathname) > -1) {
        var loadStyleTag = document.createElement("style");
        loadStyleTag.innerHTML += '#snap-sync-loading-wrapper {position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #fff; z-index: 100000;}';
        loadStyleTag.innerHTML += '#snap-sync-loading-container {display: inline-block; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);}';
        loadStyleTag.innerHTML += '.snap-sync-loader,#snap-sync-loader:after {border-radius: 50%; width: 2em; height: 2em;}';
        loadStyleTag.innerHTML += '.snap-sync-loader {font-size: 10px; position: relative; text-indent: -9999em; border-top: 0.5em solid rgba(156, 176, 221, 0.2); border-right: 0.5em solid rgba(156, 176, 221, 0.2); border-bottom: 0.5em solid rgba(156, 176, 221, 0.2); border-left: 0.5em solid #fee500; -webkit-transform: translateZ(0); -ms-transform: translateZ(0); transform: translateZ(0); -webkit-animation: snapLoading 1.1s infinite linear; animation: snapLoading 1.1s infinite linear;}';
        loadStyleTag.innerHTML += '@-webkit-keyframes snapLoading { 0% {-webkit-transform: rotate(0deg); transform: rotate(0deg);} 100% {-webkit-transform: rotate(360deg); transform: rotate(360deg);} }';
        loadStyleTag.innerHTML += '@keyframes snapLoading { 0% {-webkit-transform: rotate(0deg); transform: rotate(0deg);} 100% {-webkit-transform: rotate(360deg); transform: rotate(360deg);}';
        document.head.appendChild(loadStyleTag);

        var loadingWrapper = document.createElement("div");
        loadingWrapper.setAttribute("id","snap-sync-loading-wrapper");
        loadingWrapper.innerHTML = '<div id="snap-sync-loading-container"><div class="snap-sync-loader"></div></div>';
        document.querySelector('body').insertBefore(loadingWrapper,document.querySelector('body').firstChild);
        document.body.style.overflow = "hidden";
        setTimeout(removeLoadingLayer,5000);
    }
}
if(document.getElementById("snap-sync-loading-wrapper") == null){
	setLoadingLayer();
}

/**
 * Created by intop on 2017-11-14.
 */
/**
 * 로컬푸시 관련 프론트 자바스크립트
 *
 * @author 이민수
 * @version 0.7
 */
// if (typeof(sfsnapfitTest) == 'undefined') sfsnapfitTest = false;

window.addEventListener("message", snap_spm_receiveMessage, false);
var snap_sf_resultview_window;

var snap_spm_is_interval_init_efuv = false; //현재
var snap_spm_is_show_banner_status = false; // 현재 배너를 보여줄 수 있는 상태인지를 나타냄
var snap_spm_is_hidden_banner_waiting_efuv = false; // 배너가 꺼져야하는 상태인지를 나타냄
var snap_spm_view_condition_type_efuv; //
var snap_spm_view_condition_value_efuv;
var snap_spm_viewclear_type_efuv;
var snap_spm_viewclear_value_efuv;
var snap_spm_direct_push_efuv;
window.PUSH_KAKAO_SYNC_DATA = {};

var spmValue = {};


var delegateBannerHTML = '';
delegateBannerHTML += '<div id="spm-delegate-banner-main">';
delegateBannerHTML += '<ul>';
//delegateBannerHTML += '<li class="active"><a href="javascript:loginWithKakao()"><img src="//cdn.snapfit.co.kr/image/kakao_banner.jpg"></a></li>';
//delegateBannerHTML += '<li><a href="https://push.snapfit.co.kr/DelegateWebPush/index/candyglow/pc" target="_blank"><img src="//cdn.snapfit.co.kr/image/delegate_banner.jpg"></a></li>';
delegateBannerHTML += '</ul>';
delegateBannerHTML += '</div>';
delegateBannerHTML += '<div id="spm-delegate-banner-ico">';
delegateBannerHTML += '<div>';
// delegateBannerHTML += '<a data-slide-index="0"><img src="//cdn.snapfit.co.kr/image/delegate_ico.png" width="70px"></a>';
// delegateBannerHTML += '<a data-slide-index="1"><img src="//cdn.snapfit.co.kr/image/kakao_ico.png" width="70px"></a>';
delegateBannerHTML += '</div>';
delegateBannerHTML += '</div>';
delegateBannerHTML += '<div id="spm-delegate-banner-footer">';
delegateBannerHTML += '<div class="spm-footer-left">';
delegateBannerHTML += '<input type="checkbox" name="no" value="yes" id="spm-day-close" >';
delegateBannerHTML += '<span>오늘 하루 열지않음</span>';
delegateBannerHTML += '</div>';
delegateBannerHTML += '<div class="spm-footer-right"><a href="#" onclick="spmBannerClose();">닫기X</a></div>';
delegateBannerHTML += '</div>';
delegateBannerHTML += '';


/**
 * iframe 내에서의 postmessage를 receive해주는 함수
 * @param array event iframe내에서 온 이벤트.

 */
function snap_spm_receiveMessage(event) {
    try {
        if (event.origin.indexOf('snapfit') != -1) {
            var data = event.data;
            if (!data || !data.match(/^{.*}$/g)) {
                return;
            }
            var values = JSON.parse(data);
            var params = values.params;
            if (values.e == 'spm_message_dialog') {
                var msg = params['msg'];
                var dialog_type = params['dialog_type'];
                if(dialog_type == 'alert') {
                    alert(msg);
                    return;
                }
            }
            if (values.e == 'spm_draw_full_popup') {

                document.querySelector('body').style.overflow = 'hidden';
                var url = params['src'];
                var aIframe = document.createElement("iframe");
                aIframe.setAttribute("id", 'snapfit_resultview_popup_full_iframe');
                aIframe.setAttribute("name", "snapfit_resultview_popup_full_iframe");
                aIframe.style.width = "100%";
                aIframe.style.height = "100%";
                aIframe.style.zIndex = "99999";
                aIframe.style.position = "fixed";
                aIframe.style.left = '0px';
                aIframe.style.right = '0px';
                aIframe.style.top = '0px';
                aIframe.style.bottom = '0px';
                aIframe.allowtransparency = true;
                aIframe.frameborder = 0;
                aIframe.src = url;
                document.querySelector('body').appendChild(aIframe);
            } else if (values.e == 'spm_resultview_resize') {
                var resultviewiframe = document.getElementById('snapfit_resultview_iframe')
                if (resultviewiframe) {
                    var iframeheight = params['height'];
                    if (iframeheight > 50) {
                        resultviewiframe.style.setProperty('height', iframeheight + 'px', 'important');
                    }
                }
            } else if (values.e == 'spm_close_popup') {

                document.querySelector('body').style.overflow = 'visible';
                document.querySelector('html').style.overflow = 'visible';

                var fullpopup = document.getElementById('snapfit_resultview_popup_full_iframe')
                if (fullpopup) {
                    var parentnode = fullpopup.parentNode;
                    if (parentnode)
                        parentnode.removeChild(fullpopup);
                }
            } else if (values.e == 'spm_post_to_resultviewmessage') {

                document.querySelector('body').style.overflow = 'visible';
                document.querySelector('html').style.overflow = 'visible';
                var frameid = '';

                if ("data" in params && 'frameid' in params["data"]) {
                    frameid = params['data']['frameid'];
                } else {
                    frameid = 'snapfit_resultview_iframe';
                }
                var fullpopup = document.getElementById('snapfit_resultview_popup_full_iframe')
                if (fullpopup) {
                    var parentnode = fullpopup.parentNode;
                    if (parentnode)
                        parentnode.removeChild(fullpopup);
                }

                snap_sf_post_to_resultviewmessage(data, frameid);

            } else if (values.e == 'spm_redirect_url') {
                var itemurl = params['url'];
                if (itemurl) {
                    window.location.href = itemurl;
                }
            } else if (values.e == 'spm_init_scroll_eventinfo') {
                snap_spm_view_condition_type_efuv = params['view_condition_type'];
                snap_spm_view_condition_value_efuv = params['view_condition_value'];
                snap_spm_viewclear_type_efuv = params['viewclear_type'];
                snap_spm_viewclear_value_efuv = params['viewclear_value'];
                snap_spm_direct_push_efuv = params['direct_push'];
                if(snap_spm_direct_push_efuv && snap_spm_direct_push_efuv.direct == 1){
                    snap_spm_set_open_status(snap_spm_view_condition_type_efuv , snap_spm_view_condition_value_efuv, snap_spm_viewclear_type_efuv , snap_spm_viewclear_value_efuv );
                }
                window.addEventListener((navigator.userAgent.indexOf("iPhone OS") > -1) ? "pagehide" : "beforeunload", snap_spm_hidden_banner, { capture: false, once: true, passive: false });
            }else if(values.e == 'spm_show_banner'){
              console.log("============================================================= push 조건 만족 완료 !");
              if(document.getElementById("spm_outter_css")){
                document.getElementById("spm_outter_css").setAttribute("href",params.data.outtercss);
              }else{
                var outtercss = document.createElement("link");
                outtercss.setAttribute("id","spm_outter_css");
                outtercss.setAttribute("href",params.data.outtercss);
                outtercss.setAttribute("type","text/css");
                outtercss.setAttribute("rel","stylesheet");
                document.head.appendChild(outtercss);
              }

              if(document.getElementById("spm_custom_css")){
                document.getElementById("spm_custom_css").setAttribute("href",params.data.customcss);
              }else{
                var customcss = document.createElement("link");
                customcss.setAttribute("id","spm_custom_css");
                customcss.setAttribute("href",params.data.customcss);
                customcss.setAttribute("type","text/css");
                customcss.setAttribute("rel","stylesheet");
                document.head.appendChild(customcss);
              }

              if(document.getElementById("snapfit_resultview_popup_full_iframe")){
                document.getElementById("snapfit_resultview_popup_full_iframe").remove();
              }

              document.querySelector('body').style.overflow = "";
              if(document.getElementById("spm_outter_css").getAttribute('listener')){
                    snap_spm_show_banner();
              } else {
                  document.getElementById("spm_outter_css").addEventListener('load', function() {
                        snap_spm_set_open_status(snap_spm_view_condition_type_efuv , snap_spm_view_condition_value_efuv, snap_spm_viewclear_type_efuv , snap_spm_viewclear_value_efuv );
                        document.getElementById("spm_outter_css").setAttribute('listener', 'true');
                    }, false);   
              }

              if (document.getElementById("spm_img_logo")) {
                  document.getElementById("spm_img_logo").style.display = "block";
              }              
              
            }else if(values.e == 'spm_hide_banner'){
              snap_spm_hidden_banner();
            }else if(values.e == 'spm_show_detail_before'){
              document.querySelector('#spm_banner_main').style.display = "none";
              document.querySelector('#spm_banner_main').style.visibility = "hidden";
              document.querySelector('#spm_banner_main').style.opacity = "0";
              document.querySelector('#spm_banner_main').style.transition = "visibility 0s, opacity 2s linear";
              //debugger;
            }else if(values.e == 'spm_show_detail'){
              if(snap_spm_is_show_banner_status == false) return false;
              if(params.data.templateStyle !== null){
                  document.querySelector('#spm_banner_main').style.setProperty('width',params.data.templateStyle['width']);
                  document.querySelector('#spm_banner_main').style.setProperty('min-width', params.data.templateStyle['min-width']);
                  document.querySelector('#spm_banner_main').style.setProperty('max-width', params.data.templateStyle['max-width']);
              } else {
                  document.querySelector('#spm_banner_main').style.width = '100%';
              }
              
              document.querySelector('#spm_banner_main').style.height = '100%';
              document.querySelector('#spm_banner_frame_form').style.width = '100%';
              document.querySelector('#spm_banner_frame_form').style.height = '100%';
              //document.querySelector('#spm_banner_frame_form').style.position = 'fixed';
                
              console.log(document.getElementById('spm_banner_frame_form').offsetWidth,
              document.getElementById('spm_banner_frame_form').offsetHeight,
              document.getElementById('spm_banner_main').offsetWidth,
              document.getElementById('spm_banner_main').offsetHeight);

              if(document.getElementById("spm_outter_css")){
                document.getElementById("spm_outter_css").setAttribute("href",params.data.outtercss);
                setTimeout(function(){
                    snap_sf_post_to_resultviewmessage(JSON.stringify({e: 'spm_banner_style_loader', params: {} }), 'spm_banner_frame_form');
                }, 200);
              }else{
                var outtercss = document.createElement("link");
                outtercss.setAttribute("id","spm_outter_css");
                outtercss.setAttribute("href",params.data.outtercss);
                outtercss.setAttribute("type","text/css");
                outtercss.setAttribute("rel","stylesheet");
                outtercss.setAttribute('listener', 'false');
                outtercss.addEventListener('load', function() {                    
                    snap_sf_post_to_resultviewmessage(JSON.stringify({e: 'spm_banner_style_loader', params: {} }), 'spm_banner_frame_form');
                    document.getElementById("spm_outter_css").setAttribute('listener', 'true');
                }, false);
                document.head.appendChild(outtercss);
              }

              if(document.getElementById("spm_custom_css")){
                document.getElementById("spm_custom_css").setAttribute("href",params.data.customcss);
              }else{
                var customcss = document.createElement("link");
                customcss.setAttribute("id","spm_custom_css");
                customcss.setAttribute("href",params.data.customcss);
                customcss.setAttribute("type","text/css");
                customcss.setAttribute("rel","stylesheet");
                document.head.appendChild(customcss);
              }

              document.querySelector('#spm_banner_frame_form').style.zIndex = '10000';
              document.querySelector('#spm_banner_main').style.visibility = "visible";
              document.querySelector('#spm_banner_main').style.opacity = "0";
              if(spmValue.spmScrollCheck) clearInterval(spmValue.spmScrollCheck);
              if(snap_spm_direct_push_efuv.direct != 1){
                  if(spmValue.hiddenTimer)clearTimeout(spmValue.hiddenTimer);
              }
              
            } else if (values.e == 'spm_show_detail_background'){

                if(snap_spm_is_show_banner_status && !document.querySelector("#snapfit_resultview_popup_full_iframe")){
                    var spmBannerStyle = values.params.data.bannerStyle;
                    document.querySelector('#spm_banner_frame_form').style.position = 'relative';

                    var bannerWrapper = document.querySelector('#spm_banner_main');
                    bannerWrapper.style.setProperty('width', spmBannerStyle.width);
                    bannerWrapper.style.setProperty(spmBannerStyle.xPosition.type, spmBannerStyle.xPosition.value);
                    bannerWrapper.style.setProperty('height', spmBannerStyle.height);
                    bannerWrapper.style.setProperty(spmBannerStyle.yPosition.type, spmBannerStyle.yPosition.value);
                    bannerWrapper.style.opacity = "1";
                    
                    var timeSec = 0;
                    if(spmBannerStyle.animation.type !== "none"){
                        bannerWrapper.setAttribute('class', spmBannerStyle.animation.type + ' ' + spmBannerStyle.animation.method);
                        if(spmBannerStyle.animation.method == "animate-fast") {
                            timeSec = 1200;
                        } else if(spmBannerStyle.animation.method == "animate-normal") {
                            timeSec = 2200;
                        } else if(spmBannerStyle.animation.method == "animate-slow") {
                            timeSec = 3200;
                        }
                    }

                    setTimeout(function() {
                        var bannerWidth = bannerWrapper.offsetWidth;
                        var bannerHeight = bannerWrapper.offsetHeight;
                        var bannerLeft = bannerWrapper.offsetLeft;
                        var bannerTop = bannerWrapper.offsetTop;
                        var winWidth = window.innerWidth;
                        var winHeight = window.innerHeight;

                        if(spmBannerStyle.background.boolean == "true" && bannerWidth > 0 && bannerHeight > 0 && (bannerLeft > -(bannerWidth) && bannerLeft < winWidth && bannerTop > -(bannerHeight) && bannerTop < winHeight)){
                            var aIframe = document.createElement("div");
                            aIframe.setAttribute("id", 'snapfit_resultview_popup_full_iframe');
                            aIframe.style.width = "100%";
                            aIframe.style.height = "100%";
                            aIframe.style.zIndex = "1000";
                            aIframe.style.position = "fixed";
                            aIframe.style.left = '0px';
                            aIframe.style.right = '0px';
                            aIframe.style.display = 'none';
                            aIframe.style.top = '0px';
                            aIframe.style.bottom = '0px';
                            aIframe.style.backgroundColor = 'rgba(' + spmBannerStyle.background.value + ')';
                            aIframe.style.zIndex = "1147483647";
                            if(window.spmIsWebView){
                                aIframe.innerHTML = "<div id='spm_logo'><a href='intent:snapcompany.net/#Intent;scheme=http;package=com.android.chrome;end' target='_blank'>SNAPPUSH</a></div>";
                            }else{
                                aIframe.innerHTML = "<div id='spm_logo'><a href='//snapcompany.net/' target='_blank'>SNAPPUSH</a></div>";                        
                            }                        
                            document.querySelector('#spm_banner_main').parentNode.insertBefore(aIframe, document.querySelector('#spm_banner_main'));
                            document.querySelector("#spm_logo a").style.color = "white";
                            document.querySelector("#spm_logo a").style.fontSize = "12pt";
                            document.querySelector("#spm_logo a").style.position = "absolute";
                            document.querySelector("#spm_logo a").style.bottom = "20px";
                            document.querySelector("#spm_logo a").style.right = "20px";
                            document.querySelector("#snapfit_resultview_popup_full_iframe").style.display = 'block';
                            snap_spm_hidden_banner_event();
                            snap_spm_set_Modal();
                        } else {
                            if(spmBannerStyle.background.scrollEvent !== undefined && spmBannerStyle.background.scrollEvent.type == 'hide'){
                                window.addEventListener('scroll', snap_spm_banner_scroll_event, false);
                            }                        
                        }

                        if(document.querySelector("#spm_banner_main").style.opacity != 1) {
                            document.getElementById("snapfit_resultview_popup_full_iframe").remove();
                        }
                    },timeSec);
                    
                    if(document.querySelector('#spm_img_logo')) {
                        document.querySelector('#spm_img_logo').style.display = "none";
                    }
                }else{
                    var spmBannerStyle = values.params.data.bannerStyle;
                    var bannerWrapper = document.querySelector('#spm_banner_main');
                    bannerWrapper.style.setProperty('width', spmBannerStyle.width);
                    bannerWrapper.style.setProperty(spmBannerStyle.xPosition.type, spmBannerStyle.xPosition.value);
                    bannerWrapper.style.setProperty('height', spmBannerStyle.height);
                    bannerWrapper.style.setProperty(spmBannerStyle.yPosition.type, spmBannerStyle.yPosition.value);
                    var frameWrapper = document.querySelector('#spm_banner_main');
                    frameWrapper.style.setProperty('width', spmBannerStyle.width);
                    frameWrapper.style.setProperty('height', spmBannerStyle.height);
                }


            } else if (values.e == 'spm_show_detail_background_v2'){                 

            } else if(values.e == 'spm_use_kakao'){
              window.spmKakaoDevKey = params.data.kakaoDevKey;
              window.spmUseBanner = params.data.useBanner;

              window.spmKakaoBannerImage = params.data.kakaoBannerImage;
              window.spmKakaoBannerIcon = params.data.kakaoBannerIcon;
              window.delegateBannerLogin = params.data.delegateBannerLogin;

              if(document.getElementById("spm_ico_css") == null){
                var icoCss = document.createElement("link");
                icoCss.setAttribute("id","spm_ico_css");
                icoCss.setAttribute("href","//cdn.snapfit.co.kr/css/push/spm_ico.css");
                icoCss.setAttribute("type","text/css");
                icoCss.setAttribute("rel","stylesheet");
                document.head.appendChild(icoCss);
              }

              this.send_spm_init(this.getServerInfo(true)+'js/spm_kakao.js',{},"");

            }else if(values.e == 'spm_use_delegate'){
              window.spmUseBanner = params.data.useBanner;
              window.spmIsWebView = params.data.isWebView;

              window.spmDelegateBannerImage = params.data.delegateBannerImage;
              window.spmDelegateBannerIcon = params.data.delegateBannerIcon;
              window.delegateBannerLogin = params.data.delegateBannerLogin;


              if(document.getElementById("spm_ico_css") == null){
                var icoCss = document.createElement("link");
                icoCss.setAttribute("id","spm_ico_css");
                icoCss.setAttribute("href","//cdn.snapfit.co.kr/css/push/spm_ico.css");
                icoCss.setAttribute("type","text/css");
                icoCss.setAttribute("rel","stylesheet");
                document.head.appendChild(icoCss);
              }

              this.send_spm_init(this.getServerInfo(true)+'js/spm_delegate.js',{},"");

            }else if(values.e == 'spm_agree_kakao'){
              if(typeof(loginWithKakao) == "undefined") alert("이미 동의 하신 회원 입니다.");
              else loginWithKakao();
            } else if(values.e == 'spm_today_hide_banner'){
                snap_spm_set_todayShowBanner(params.data.pushType);
                snap_spm_hidden_banner();
            } else if(values.e == 'spm_information_push'){
                var informationTag = document.createElement("script");
                var spmInformationDesign = JSON.parse(params.information.design);
                informationTag.type = 'text/javascript';
                informationTag.async = 'true';
                informationTag.setAttribute('charset','utf-8');
                informationTag.src = sf_spm_init.getServerInfo() +'js/push/information/index.js';
                informationTag.onload = function() { 
                    spmInformationPush.init({
                        config: params.information.config, 
                        type: params.information.type,
                        data: params.information.data,
                        design: spmInformationDesign,
                    });
                    var scripttag = document.createElement("script");
                    scripttag.type = 'text/javascript';
                    scripttag.async = 'true';
                    scripttag.setAttribute('charset','utf-8');
                    scripttag.src = sf_spm_init.getServerInfo() +'/js/push/information/' + spmInformationDesign.template + '.js';
                    scripttag.onload = function() { 
                        spmInformationTemplate.init(spmInformationPush);
                    };
                    document.head.appendChild(scripttag);
                };
                document.head.appendChild(informationTag);
            }
        }
    }catch (e){

    }
}
/*
scroll 이벤트 보다는 퍼포먼스 영향이 더 적을 듯 하여 사용함
*/

function snap_spm_scrollposition_check_function() {
    //debugger;
    spmValue.spmScrollCheck = setInterval(function () {
        var stop = $(window).scrollTop();
        var sheight = $(document).height() - $(window).height();

        if(snap_spm_is_show_banner_status == false && (snap_spm_view_condition_type_efuv == 'px' || snap_spm_view_condition_type_efuv == 'percent')) {
            if(snap_spm_view_condition_type_efuv == 'percent') snap_spm_view_condition_value = sheight*(snap_spm_view_condition_value_efuv/100);
            if(snap_spm_view_condition_type_efuv == 'px') snap_spm_view_condition_value = snap_spm_view_condition_value_efuv;

            if (snap_spm_view_condition_value <= stop) {
                snap_spm_show_banner();
                if(snap_spm_viewclear_type_efuv == 'second') {
                    if(snap_spm_is_hidden_banner_waiting_efuv == false) {
                        spmValue.hiddenTimer = setTimeout(snap_spm_hidden_banner, snap_spm_viewclear_value_efuv * 1000);
                        snap_spm_is_hidden_banner_waiting_efuv = true;
                    }
                }
            }
        }

        if(snap_spm_is_show_banner_status == true && snap_spm_viewclear_type_efuv == 'px') {
            if (snap_spm_viewclear_value_efuv >= stop) {
                snap_spm_hidden_banner();
            }
        }
    }, 500);
}

function snap_spm_init_hidden_function(viewclear_type,viewclear_value) {
    if(viewclear_type == 'px'){
        if(!snap_spm_is_interval_init_efuv || snap_spm_is_interval_init_efuv == false) {
            snap_spm_scrollposition_check_function();
            snap_spm_is_interval_init_efuv = true;
        }
    } else if(viewclear_type == 'second'){
        spmValue.hiddenTimer = setTimeout(snap_spm_hidden_banner, viewclear_value);
    }
}

function snap_spm_banner_display()
{
    document.getElementById('spm_banner_main').style.setProperty('display', 'block');
}

function snap_spm_show_banner(viewclear_type,viewclear_value) {
    var spm_banner_main = document.getElementById('spm_banner_main');
    var spm_banner_frame_form = document.getElementById('spm_banner_frame_form');
    if (spm_banner_main && spm_banner_frame_form) {
        spm_banner_main.style.setProperty('display', 'block');
        spm_banner_main.style.setProperty('position', 'fixed');
        spm_banner_main.style.setProperty('z-index', '9999999999999');

        spm_banner_frame_form.style.setProperty('display', 'block', 'important');
        spm_banner_frame_form.style.setProperty('height', '100%', 'important');
        spm_banner_frame_form.style.setProperty('width', 'inherit', 'important');//20190812 100% to inherit modify
        spm_banner_frame_form.style.setProperty('min-width', '100%', 'important');//20190812 100% to inherit modify
        if(snap_spm_direct_push_efuv && snap_spm_direct_push_efuv.direct == 1){
            snap_sf_post_to_resultviewmessage(JSON.stringify({e: 'snap_show_directPush', params: {data: { url : snap_spm_direct_push_efuv.url}}}), 'spm_banner_frame_form');
        }
    }
    snap_spm_is_show_banner_status = true;
    snap_spm_init_hidden_function(viewclear_type,viewclear_value);    
}

function snap_spm_hidden_banner() {
    var spm_banner_main = document.getElementById('spm_banner_main');
    var spm_banner_frame_form = document.getElementById('spm_banner_frame_form');
    if (spm_banner_main && spm_banner_frame_form) {
        snap_spm_remove_modal();
        window.removeEventListener('scroll', snap_spm_banner_scroll_event);
        snap_spm_set_attributeByIdSelector("spm_outter_css", "href", "");
        snap_spm_set_attributeByIdSelector("spm_custom_css", "href", "");
        
        spm_banner_main.style.setProperty('display', 'none', 'important');
        spm_banner_frame_form.style.setProperty('display', 'none', 'important');
        spm_banner_main.remove();
    }
    snap_spm_is_show_banner_status = false;
    snap_spm_is_hidden_banner_waiting_efuv = false;
}

function snap_spm_set_open_status(view_condition_type, view_condition_value, viewclear_type, viewclear_value) {
    //debugger;
    if(!view_condition_type) {
        return false;
    }

    if(view_condition_type == 'px' || view_condition_type == 'percent'){
        if(!snap_spm_is_interval_init_efuv || snap_spm_is_interval_init_efuv == false) {
            snap_spm_scrollposition_check_function();
            snap_spm_is_interval_init_efuv = true;
        }
    }else if(view_condition_type == 'second'){

         if(typeof view_condition_value == 'string'){
            view_condition_value = parseInt(view_condition_value);
        }

        if(typeof viewclear_value == 'string'){
            viewclear_value = parseInt(viewclear_value);
        }

        if( (view_condition_value && typeof view_condition_value != 'number') || (viewclear_value && typeof viewclear_value != 'number')){
            return false;
        }

        setTimeout(function(){snap_spm_show_banner(viewclear_type, viewclear_value * 1000 )}, (view_condition_value * 1000));
    }else if(view_condition_type == 'immediately'){
      snap_spm_show_banner(viewclear_type, viewclear_value * 1000);
    }


    if(viewclear_type == 'px'){
        if(!snap_spm_is_interval_init_efuv || snap_spm_is_interval_init_efuv == false) {
            snap_spm_scrollposition_check_function();
            snap_spm_is_interval_init_efuv = true;
        }
    }
}


function snap_sf_post_to_resultviewmessage(data, frameid) {
    var iframe = document.getElementById(frameid);
    if (iframe && iframe.contentWindow) {
        return data ? iframe.contentWindow.postMessage(data, '*') : false;
    }
}

function spmBannerClose(){
  if(document.querySelector("#spm-day-close").checked)
  snap_spm_setCookie("noDelegateBanner","FALSE",1);
  document.querySelector("#spm-delegate-banner").style.display = "none";
}

function spmBannerKakaoClose(){
  if(document.querySelector("#spm-day-kakao-close").checked)
  snap_spm_setCookie("noDelegateKakaoBanner","FALSE",1);
  document.querySelector("#spm-channel-kakao").style.display = "none";
}

function spmBannerWebClose(){
  if(document.querySelector("#spm-day-web-close").checked)
  snap_spm_setCookie("noDelegateWebBanner","FALSE",1);
  document.querySelector("#spm-channel-fcm").style.display = "none";
}

function snap_spm_hidden_banner_event(){
    document.getElementById('snapfit_resultview_popup_full_iframe').onclick = function(){        
        //20191125 베니토 예외 처리 !! todo 클릭 이벤트 DB 변경 해야함 
        if(sf_get_value('sf_store_name') != 'benito' && sf_get_value('sf_store_name') != 'midasb'){
            snap_spm_hidden_banner();
        }
    }
}

var sf_spm_init = function sf_spm_init(sf_spm_init) {
    
    this.isTestUser = true;

    this.getServerInfo = function(isCDN){
      isCDN =  (typeof isCDN !== 'undefined') ?  isCDN : false;


      var isDev = "<?=1?>";
      var liveDomain = "https://push.snapfit.co.kr/";
      var developDomain = "//pushdev.snapfit.co.kr/";
      var CDNDomain = "//cdn.snapfit.co.kr/";

      if(typeof(isCDN) == 'undefined') isCDN = false;

      if(isDev == true){
        return developDomain;
      }else{
        if(isCDN){
          return CDNDomain;
        }else{
          return liveDomain;
        }
      }
    }

    this.snap_spm_setCookie = function(cName, cValue, cDay,cHours,cMinutes,cSeconds){
        var expire = new Date();
        var domain = document.domain.replace(/^www\./,'');
        var mainDomain = document.domain.replace(/^www\./,'').replace(/^m\./,'');
        expire.setDate(expire.getDate() + cDay);
        if(typeof cHours != 'undefined') expire.setHours(cHours);
        if(typeof cMinutes != 'undefined') expire.setMinutes(cMinutes);
        if(typeof cSeconds != 'undefined') expire.setSeconds(cSeconds);
        
        cookies = ('snap_spm459_' + cName) + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
        if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
        document.cookie = cookies + 'Domain=' + domain;
        document.cookie = cookies + 'Domain=' + mainDomain;
    }

    this.snap_spm_getCookie = function(cName) {

        cName = ('snap_spm459_' + cName + '=');
        var cookieData = document.cookie;
        var start = cookieData.indexOf(cName);
        var cValue = '';
        if(start != -1){
            start += cName.length;
            var end = cookieData.indexOf(';', start);
            if(end == -1)end = cookieData.length;
            cValue = cookieData.substring(start, end);
        }
        return unescape(cValue);
    }

    this.snap_spm_setCommonCookie = function(cName, cValue, cDay,cHours,cMinutes,cSeconds){
        var expire = new Date();
        var domain = document.domain.replace(/^www./,'');
        var mainDomain = document.domain.replace(/^www./,'').replace(/^m./,'');
        expire.setDate(expire.getDate() + cDay);
        if(typeof cHours != 'undefined') expire.setHours(cHours);
        if(typeof cMinutes != 'undefined') expire.setMinutes(cMinutes);
        if(typeof cSeconds != 'undefined') expire.setSeconds(cSeconds);
        
        cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
        if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
        document.cookie = cookies + 'Domain=' + domain;
        document.cookie = cookies + 'Domain=' + mainDomain;
    }

    this.snap_spm_getCommonCookie = function(cName) {

        cName = (cName + '=');
        var cookieData = document.cookie;
        var start = cookieData.indexOf(cName);
        var cValue = '';
        if(start != -1){
            start += cName.length;
            var end = cookieData.indexOf(';', start);
            if(end == -1)end = cookieData.length;
            cValue = cookieData.substring(start, end);
        }
        return unescape(cValue);
    }

    this.snap_spm_get_fcmid = function () {
        cName = ('snapCloudMessageToken=');
        var cookieData = document.cookie;
        var start = cookieData.indexOf(cName);
        var cValue = '';
        if(start != -1){
            start += cName.length;
            var end = cookieData.indexOf(';', start);
            if(end == -1)end = cookieData.length;
            cValue = cookieData.substring(start, end);
        }
        return unescape(cValue);
    }

    this.snap_spm_set_Modal = function () 
    {
        document.querySelector('html').style.overflow = "hidden";
        document.querySelector('html').style.position = "relative";
        document.querySelector('html').style.height = "100%";
        document.querySelector('html').style.setProperty('touch-action', 'none');
        document.querySelector('body').style.height = "100%";
        document.querySelector('body').style.width = "100%";
        document.querySelector('body').style.background = "transparent";
        if(this.snap_spm_get_device_type() == 'mobile'){
            setTimeout(function(){ //아이폰 사파리 fixed 
                //document.querySelector('body').style.overflow = "hidden";
                //document.querySelector('body').style.position = "fixed";
            }, 500);
        }
    }

    this.snap_spm_banner_scroll_event = function()
    {
        document.querySelector('#spm_banner_main').style.display = 'none';
        window.removeEventListener('scroll', snap_spm_banner_scroll_event);
        setTimeout(function(){
            document.querySelector('#spm_banner_main').style.display = 'block';
            window.addEventListener('scroll', snap_spm_banner_scroll_event, false);
        }, 2000);
    }

    this.snap_spm_remove_modal = function () 
    {        
        if(document.querySelector('#snapfit_resultview_popup_full_iframe')){
            document.querySelector('#snapfit_resultview_popup_full_iframe').style.display = 'none';
        }
        document.querySelector('html').style.setProperty('position','');
        document.querySelector('html').style.setProperty('height','');
        document.querySelector('html').style.setProperty('overflow','');
        document.querySelector('body').style.setProperty('height','');
        document.querySelector('body').style.setProperty('overflow','');        
        document.querySelector('body').style.setProperty('background','');
        document.querySelector('body').style.setProperty('width','');
        document.querySelector('body').style.setProperty('position','');
        if(document.querySelector('#container')){//cafe24 iphone safari scroll error
            document.querySelector('#container').style.setProperty('overflow','unset');
            setTimeout(function(){
                document.querySelector('#container').style.setProperty('overflow','');
            },300);
        }
        document.querySelector('html').style.setProperty('touch-action', '');
    }

    this.snap_spm_set_attributeByIdSelector = function(elementID, attr, val)
    {
        if(document.getElementById(elementID)){
            document.getElementById(elementID).setAttribute(attr,val);
        }
    }
    
    this.snap_spm_get_spmuserid_pc = function () {
        return this.snap_spm_getCommonCookie(this.snap_spm_spmuser_hash(this.snap_spm_get_cookie_pre_fix() + 'spm_member_id_pc'));
    }

    this.snap_spm_get_spmuserid_m = function () {
        return this.snap_spm_getCommonCookie(this.snap_spm_spmuser_hash(this.snap_spm_get_cookie_pre_fix() + 'spm_member_id_m'));
    }

    this.snap_spm_set_spmuserid_pc = function (value) {
        this.snap_spm_setCommonCookie(this.snap_spm_spmuser_hash(this.snap_spm_get_cookie_pre_fix() + 'spm_member_id_pc'), 
                                    value,9999,999,999,999);
    }

    this.snap_spm_set_spmuserid_m = function (value) {
        this.snap_spm_setCommonCookie(this.snap_spm_spmuser_hash(this.snap_spm_get_cookie_pre_fix() + 'spm_member_id_m'), 
                                    value,9999,999,999,999);
    }

    this.snap_spm_get_cookie_pre_fix = function() {
        return this.sf_get_value('sf_store_name') + '_';
    }

    this.snap_spm_spmuser_hash = function(value) {
        if (value) {
            return encodeURIComponent(btoa(value));
        }
        return value;
    }

    this.snap_spm_get_todayShowBanner = function(){
        return this.snap_spm_getCookie('todayBannerStatus');
    }

    this.snap_spm_set_todayShowBanner = function(data){
        var todayBanner = this.snap_spm_get_todayShowBanner();
        todayBanner = (todayBanner == '') ? [] : JSON.parse(todayBanner) ; 
        todayBanner.push(data);
        snap_spm_setCookie("todayBannerStatus",JSON.stringify(todayBanner),0,23,59,59);
    }   

    this.snap_spm_get_idsyncstatus = function () {
        return this.snap_spm_getCookie('idsyncstatus');
    }
    this.snap_spm_set_idsyncstatus = function (value) {
        this.snap_spm_setCookie('idsyncstatus', value,9999,999,999,999);
    }

    this.isSfValid = function (value) {
        if (value === false || value == 'false' || value == "" || value == null || value == 'null' || value == 'undefined' || value == undefined || typeof(value) == 'undefined')
            return false;
        else
            return true;
    }

    this.make_iframe_url = function (datas) {
        for(var key in datas){
            if(param != 0) {
                param += '&';
            }
            param += key + '=' + datas[key];
            i++;
        }
    }

    this.sendinitjsonp = function (requesturl, sendparam,async) {
        var scripttag = document.createElement("script");
        scripttag.type = 'text/javascript';
        scripttag.async = async;
        scripttag.setAttribute('charset','UTF-8');
        // scripttag.src = '//dev.snapfit.co.kr/Resultview/draw_snapfit_main_page';
        scripttag.src = requesturl + sendparam;
        document.head.appendChild(scripttag);
    }


    this.send_spm_init = function (url, datas, devicetype,async) {
        var param = '';
        var i = 0;
        if(typeof(async) == "undefined") async = true;
        for(var key in datas){
            if(param != 0) {
                param += '&';
            }
            param += key + '=' + datas[key];
            i++;
        }
        sendinitjsonp(url, param,async);
    }

    this.spm_info_init = function(datas, devicetype) {
        this.send_spm_init(this.getServerInfo()+'Spm_Mgr/init_info_spm_localpush?', datas, devicetype, false);
    }

    this.sf_get_value = function (idselector) {
        var selector = document.getElementById(idselector);
        if (selector) {
            return selector.value;
        } else {

            return null;
        }
    }

    this.sf_get_solutiontype = function () {
        var selector = document.getElementById('solutiontype');
        if (selector) {
            if(selector.innerText == "cafeapi"){
                return "cafe24";
            } else {
                return selector.innerText;
            }
        } else {
            var spt = document.getElementById("spm_page_type");
            var solutiontype = spt.getAttribute('sf-solution');
            return (solutiontype) ? solutiontype : null;
        }
    }

    this.sf_get_pagetype = function () {
        var selector = document.getElementById('spm_page_type');
        if (selector) {
            return selector.innerText;
        } else {
            return null;
        }
    }

    this.sf_get_user_id = function () {
        var user_id_selector = document.getElementsByClassName('xans-member-var-id');
        if (!user_id_selector || user_id_selector.length <= 0) {
            return null;
        }

        if (user_id_selector.length == 1) {
            return user_id_selector[0].innerText ||  user_id_selector[0].textContent
        } else if (user_id_selector.length > 1) {
            return user_id_selector[0].innerText ||  user_id_selector[0].textContent
        } else {
            return null;
        }
    }

    this.display_spm_log = function (logoPath) {
        var pushLogo = document.createElement("div");
        pushLogo.setAttribute('id', 'spm_img_logo');
        pushLogo.style.setProperty('position', 'absolute');
        pushLogo.style.setProperty('bottom', '-11px');
        pushLogo.style.setProperty('width', '56px');
        pushLogo.style.setProperty('right', '1px');
        pushLogo.style.setProperty('display', 'none');
        var pushLogoImg = document.createElement("img");
        pushLogoImg.setAttribute('src', logoPath);
        pushLogoImg.style.setProperty('width', '100%');
        pushLogo.appendChild(pushLogoImg);
        document.getElementById('spm_banner_main').appendChild(pushLogo);
    }

    this.getBasketTotalPriceCafe = function() {
        var basketTotalPrice = null;
        try {
            // if (aBasketProductData) {
            //     var basketList = aBasketProductData;
            //     basketList.forEach(function(item) {
            //         basketTotalPrice += item.product_sale_price;
            //     });
            // }
            basketTotalPrice = this.sf_get_value('sf_basket_total_price');
        } catch (e) {
            console.log(e);
        } finally {
            return basketTotalPrice;
        }
    }

    this.getBasketTotalPriceMake = function() {
        var basketTotalPrice = null;
        try {
            basketTotalPrice = this.sf_get_value('sf_basket_total_price');
        } catch (e) {
            console.log(e);
        } finally {
            return basketTotalPrice;
        }
    }

    this.removeExceptionHashTags = function(url) {
        var exceptionHashTags = ['#enp_mbris'];
        exceptionHashTags.forEach(function(hashtag){
            url = url.replace(hashtag, ""); 
        });
        return url;
    }

    /**
     * sync-env 
     * only: sync만 사용하는 업체
     * normal: 일반 사용
     * disabled: 페이지 내부 싱크 기능 off
     */
    this.isUseKakaoSync = function () {
        var syncEnv = document.getElementById("spm_page_type").getAttribute('sync-env');
        var pageType = this.sf_get_pagetype();
        if (['sq_join_first_page', 'sq_join_page', 'sq_login_page'].indexOf(pageType) > -1) {
            return !(syncEnv === null || syncEnv === "disabled");
        }
        return true;
    }
    this.request_init_spm_kakaosync = function(obj) {
        if (this.isUseKakaoSync()) {
            this.init_spm_kakao_login_cookie();
            obj.sync_env = document.getElementById("spm_page_type").getAttribute('sync-env');
            window.PUSH_KAKAO_SYNC_DATA = obj;

            this.send_spm_init(this.getServerInfo()+'js/push/sync/form_template.js',{}, "");
            if(this.sf_get_solutiontype() == 'makeshop') {
                this.send_spm_init(this.getServerInfo()+'js/push/snap_sync_euckr.js',{}, "");
            } else {
                this.send_spm_init(this.getServerInfo()+'js/push/snap_sync.js',{}, "");   
            }
        }
    }
    this.init_spm_kakao_login_cookie = function() {
        try {
            if(this.sf_get_solutiontype() == 'cafe24') {
                if (document.getElementById('sf_user_name')) {
                    login_user_id = document.getElementById('sf_user_name').innerHTML;
                    const login_user_arr = login_user_id.split("@");
                    if(login_user_arr.length == 2) {
                        if(login_user_arr[1] == 'k') {
                            this.snap_spm_sync_setCookie('sync_block_popup', '1',9999,999,999,999);
                        }
                    }
                }
            } else if(this.sf_get_solutiontype() == 'makeshop') {
                if(this.snap_getCookie('sns_login_service') == 'kakao_sync') {
                    this.snap_spm_sync_setCookie('sync_block_popup', '1',9999,999,999,999);
                }
            } else {
    
            }
        } catch(e) {

        }
    }
    this.snap_spm_sync_setCookie = function(cName, cValue, cDay,cHours,cMinutes,cSeconds){
        var expire = new Date();
        var domain = document.domain.replace(/^www\./,'');
        var mainDomain = document.domain.replace(/^www\./,'').replace(/^m\./,'');
        expire.setDate(expire.getDate() + cDay);
        if(typeof cHours != 'undefined') expire.setHours(cHours);
        if(typeof cMinutes != 'undefined') expire.setMinutes(cMinutes);
        if(typeof cSeconds != 'undefined') expire.setSeconds(cSeconds);
        
        cookies = ('sync_spm459_' + cName) + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
        if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
        document.cookie = cookies + 'Domain=' + domain;
        document.cookie = cookies + 'Domain=' + mainDomain;
    }
    this.snap_getCookie = function(name) {
        var Cookievalue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return Cookievalue? Cookievalue[2] : null;
    }
    this.removeSyncLoadingbar = function() {
        if (document.getElementById('snapSyncLoaderWrapper') && document.getElementById('snapSyncLoaderStyle')) {
            var loadingbar = document.getElementById('snapSyncLoaderWrapper');
            var loadingbarStyle = document.getElementById('snapSyncLoaderStyle');
            if (loadingbar.parentNode) {
                loadingbar.parentNode.removeChild(loadingbar);
            }
            if (loadingbarStyle.parentNode) {
                loadingbarStyle.parentNode.removeChild(loadingbarStyle);
            }
        }
    }
    this.createSyncLoadingbar = function() {
        if (document.getElementById("spm_page_type").getAttribute('sync-env') !== "normal") {
            return '';
        }
        if (document.getElementById('sf_user_name')) {
            return '';
        }
        var element = document.createElement("div");
        var elementStyle = document.createElement('style');
        elementStyle.setAttribute('type', 'text/css');
        elementStyle.setAttribute('id', 'snapSyncLoaderStyle');                
        elementStyle.innerHTML = '#snapSyncLoaderWrapper { position:fixed; width:100%; height:100%; background: #fff;top: 0;z-index: 100;  }' +
        '#snapSyncLoader { display: block;position: relative;width: 80px;height: 80px;margin: 0 auto;top: calc(50% - 40px);}' +
        '#snapSyncLoader div {' +
        'display: inline-block;position: absolute;left: 8px; width: 16px;background: #fee500; animation: snapload 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;' +
        '}' +
        '#snapSyncLoader div:nth-child(1) { left: 8px; animation-delay: -0.24s; }' +
        '#snapSyncLoader div:nth-child(2) { left: 32px; animation-delay: -0.12s; }' +
        '#snapSyncLoader div:nth-child(3) { left: 56px; animation-delay: 0; }' +
        '@keyframes snapload { 0% { top: 8px; height: 64px; } 50%, 100% { top: 24px; height: 32px; } }' +
        '@-webkit-keyframes snapload { 0% { top: 8px; height: 64px; } 50%, 100% { top: 24px; height: 32px; } }';
        document.querySelector('head').appendChild(elementStyle);
        element.setAttribute("id", "snapSyncLoaderWrapper");
        element.innerHTML = "<div id='snapSyncLoader'><div></div><div></div><div></div></div>";
        document.querySelector("body").appendChild(element);
        setTimeout(removeSyncLoadingbar, 3000);
    };

    this.request_init_spm_iframe = function (obj) {
        if(!obj || typeof(obj) == 'undefined' || obj.length <= 0)
            return null;
        
        if (this.sf_get_pagetype() == "sq_basket_page") {
            obj['basket_total'] = (this.sf_get_solutiontype() == 'cafe24') ? this.getBasketTotalPriceCafe() : this.getBasketTotalPriceMake();
        }

        var result = obj['result'];
        var responseText = JSON.stringify(obj);
        if(!responseText) {
            return null;
        }
        if('spm_spmuserid_pc' in obj && obj['spm_spmuserid_pc'] != '') {
            this.snap_spm_set_spmuserid_pc(obj['spm_spmuserid_pc']);
        }
        if('spm_spmuserid_m' in obj && obj['spm_spmuserid_m'] != '') {
            this.snap_spm_set_spmuserid_m(obj['spm_spmuserid_m']);
        }
        
        responseText = encodeURIComponent(responseText);
        if(result == 'success'){
            var is_exist_is_use  = 'spmislive' in obj;
            if('idsyncstatus' in obj) {
                this.snap_spm_set_idsyncstatus(obj['idsyncstatus']);
            }

            if(is_exist_is_use == false) {
                return null;
            }

            // var is_exist_pageinfo = 'pageinfo' in obj;
            // if(is_exist_pageinfo  == false && ('pagetype' in obj['pageinfo'] == true )) {
            //     return null;
            // }

            // var pagetype = obj['pageinfo']['pagetype'];


            if(!document.getElementById('spm_banner_main')) {
                return null;
            }

            if(is_exist_is_use == true){

                var store_name = encodeURIComponent(this.sf_get_value('sf_store_name'));
                var devicetype = this.snap_spm_get_device_type();

                var landingPageParam = location.hash.replace(/^#/,"").split("=");

                var aIframe = document.createElement("iframe");
                aIframe.setAttribute("id", 'spm_banner_frame_form');//snappush-alarm-popup
                aIframe.setAttribute("name", "spm_banner_frame_form");
                aIframe.style.width = "0px";
                aIframe.style.height = "0px";
                aIframe.style.border = "0";
                aIframe.style.display = "none";
                aIframe.style.frameborder = "0";
                aIframe.scrolling = 'no';
                aIframe.marginheight = 0;
                aIframe.marginwidth = 0;
                aIframe.frameborder = 0;
                aIframe.border = 0;
                if(landingPageParam[0] == "snapcloudmessage"){
                  if(landingPageParam.length == 2)
                  aIframe.src = this.getServerInfo()+"Spm_Mgr/pushLayoutDetail/" + landingPageParam[1] + "/cloudMessage/"+obj.device_type+"/";
                  if(landingPageParam.length == 3)
                  aIframe.src = this.getServerInfo()+"Spm_Mgr/pushLayoutDetail/" + landingPageParam[1] + "/cloudMessage/"+obj.device_type+"/" + landingPageParam[2];
                  if(landingPageParam.length >= 4)
                  aIframe.src = this.getServerInfo()+"Spm_Mgr/pushLayoutDetail/" + landingPageParam[1] + "/cloudMessage/"+obj.device_type+"/" + landingPageParam[2]+"/" + landingPageParam[3];

                  aIframe.src = this.removeExceptionHashTags(aIframe.src +"?store_name="+store_name);
                  var aIframeCss = document.createElement("link");
                  aIframeCss.setAttribute("id","spm_outter_css");
                  aIframeCss.setAttribute("type","text/css");
                  aIframeCss.setAttribute("rel","stylesheet");
                  document.head.appendChild(aIframeCss);
                  document.getElementById('spm_banner_main').appendChild(aIframe);

                  var device_type = obj.device_type;
                  if(device_type == "mobile") device_type = "mo"; // crm 알림 생성시 mo로 값 넣음
                  var outterCss = document.createElement("link");
                  outterCss.setAttribute("id","crm_outter_css");
                  outterCss.setAttribute("href","//cdn.snapfit.co.kr/stores/"+store_name+"/crm_push/css/"+landingPageParam[1]+"/"+device_type+"/outer.css");
                  outterCss.setAttribute("type","text/css");
                  outterCss.setAttribute("rel","stylesheet");
                  document.head.appendChild(outterCss);
                  document.getElementById('spm_banner_main').appendChild(outterCss);
                  this.crm_push_Listener();
                  snap_spm_show_banner();

                }else{
                  aIframe.src = this.getServerInfo()+"Spm_Mgr/make_frame_form?" + responseText;
                  document.getElementById('spm_banner_main').appendChild(aIframe);
                }

                if('pushlogo' in obj && obj['pushlogo'] != '') {
                    this.display_spm_log(obj['pushlogo']);
                }
            }

        }
    }

    this.crm_push_Listener = function(){
        window.addEventListener("message", function(e) {
            if(e.data.crmHeight >= 0) document.getElementById('spm_banner_main').style.height = e.data.crmHeight+'px';
            if(e.data.crmClose == 'close'){
                document.getElementById('spm_banner_frame_form').remove();
                if( document.getElementById('spm_crm_bg') != null ) document.getElementById('spm_crm_bg').remove();
                document.getElementById('spm_banner_main').style.display = "none";
            } 
            if(e.data.crmIsBg == 'show'){ 
                document.querySelector('body').style.overflow = 'hidden';
                var bg = document.createElement("div");
                bg.setAttribute("id", 'spm_crm_bg');
                bg.setAttribute("name", "spm_crm_bg");
                bg.style.width = "100%";
                bg.style.height = "100%";
                bg.style.zIndex = "-1";
                bg.style.position = "fixed";
                bg.style.opacity = '0.5';
                bg.style.left = '0px';
                bg.style.right = '0px';
                bg.style.top = '0px';
                bg.style.bottom = '0px';
                bg.style.backgroundColor = e.data.crmBgColor;
                bg.allowtransparency = true;
                bg.frameborder = 0;
                bg.onclick = function crmClose(){
                                document.getElementById('spm_banner_frame_form').remove(); 
                                document.getElementById('spm_banner_main').style.display = 'none';
                                if( document.getElementById('spm_crm_bg') != null ) document.getElementById('spm_crm_bg').remove();
                            };
                document.getElementById('spm_banner_main').appendChild(bg);
            }
            if(e.data.crmCookie){
                document.cookie = "crmShowFlag=" + e.data.crmCookie + ";";
            }
            if(e.data.crmCookieCheck){
                var cookie = document.cookie;
                if (document.cookie != "") {
                    var cookieArray = cookie.split("; ");
                    for ( var index in cookieArray) {
                        var cookieName = cookieArray[index].split("=");
                        if (cookieName[0] == "crmShowFlag") {
                            if(cookieName[1] < new Date().toUTCString()){
                                document.getElementById('spm_banner_frame_form').remove(); 
                                document.getElementById('spm_banner_main').style.display = 'none';
                                if( document.getElementById('spm_crm_bg') != null ) document.getElementById('spm_crm_bg').remove();
                            }
                            
                        }
                    }
                }
            }
        });
    }

    this.delgateBannerLoginCheck = function(){
      if(window.delegateBannerLogin == true && sf_get_user_id() == null){
        alert("쿠폰 받으실 계정으로 로그인후에 허용해주세요.");
        if(window.spmIsWebView){
          if(sf_get_solutiontype() == "cafe24") location.href="intent:"+document.domain+"/member/login.html#Intent;scheme=https;package=com.android.chrome;end";
          if(sf_get_solutiontype() == "makeshop") location.href="intent:"+document.domain+"/shop/member.html#Intent;scheme=https;package=com.android.chrome;end";
          if(sf_get_solutiontype() == "makeglobal") location.href="intent:"+document.domain+"/Member/Auth/login#Intent;scheme=https;package=com.android.chrome;end";
        }else{
          if(sf_get_solutiontype() == "cafe24") location.href="/member/login.html";
          if(sf_get_solutiontype() == "makeshop") location.href="/shop/member.html";
          if(sf_get_solutiontype() == "makeglobal") location.href="intent:"+document.domain+"/Member/Auth/login";
        }
        return false;
      }else{
        return true;
      }
    }

    this.snap_spm_get_encode_url = function() {
        var returnurl = location.href;
        ["#javascript"].forEach(function(exceptionUrl){
            if (returnurl.indexOf(exceptionUrl) != -1) {
                returnurl = returnurl.split(exceptionUrl)[0];
            }
        });
        return encodeURIComponent(returnurl);
    }

    this.snap_spm_get_encode_referrer_url = function() {
        try {
            var returnurl = top.frames.document.referrer;
            ["kn.acrosspf.com","ad.3dpop.kr","googleads.g.doubleclick.net"]
            .forEach(function(exceptionReferrer){
                if (returnurl.indexOf(exceptionReferrer) != -1) {
                    returnurl = returnurl.split("?")[0];
                }
            });
            return encodeURIComponent(returnurl);
        } catch (e) {
            return '';
        }
    }

    this.snap_spm_get_device_type = function() {
        var sf_draw_type = this.sf_get_value('sf_draw_type') || document.getElementById("spm_page_type").getAttribute('sf-device');
        if (sf_draw_type === 'responsive') {
            return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? 'mobile' : 'pc';
        }
        return sf_draw_type;
    }

    this.snap_spm_ck_cookie_off = function() {
        try {
            let ckdate = new Date();
            check_cookie_off_data = 'ck_'+ ckdate.getFullYear() + ckdate.getMonth() + ckdate.getDate() + ckdate.getDay();
            document.cookie = check_cookie_off_data + "=1";
            ck_co = document.cookie.indexOf(check_cookie_off_data);
            if(ck_co == -1) {
                return false;
            } else {
                return true;
            }
        } catch(e) {
            return true;
        }
    }

    // URL DATA
    this.get_url_data = function(type) {
        var url;
        if(type == "referrer") {
            url = top.frames.document.referrer; // 이전 url
        } else {
            url = location.href; // 현재 url
        }
        var domain = url.split('/')[2];

        return (domain) ? encodeURIComponent(domain) : "";
    }

    this.user_agent_upper = function() {
        return navigator.userAgent.toUpperCase();
    }

    // user agent
    this.get_user_agent = function() {
        return navigator.userAgent;
    }

    // device
    this.get_device = function() {
        var agent = this.user_agent_upper();
        var device;
        if(/(TABLET|IPAD|PLAYBOOK|SILK)|(ANDROID(?!.*MOBI))/i.test(agent)) {
            device = "tablet";
        } else if(/MOBILE|ANDROID|IP(HONE|OD)|IEMOBILE|BLACKBERRY|KINDLE|SILK-ACCELERATED|(HPW|WEB)OS|OPERA M(OBI|INI)/.test(agent)) {
            device = "mobile";
        } else {
            device = "desktop";
        }
        
        return device;
    }

    // os
    this.get_os = function () {
        var agent = this.user_agent_upper();
        var os;
        if((/IPHONE|IPAD|IPOD/i.test(agent)) && (/APPLEWEBKIT/i.test(agent))) {
            os = "ios";
        } else if(/ANDROID/i.test(agent)) {
            os = "android";
        } else if(/MAC|PPC/i.test(agent)) {
            os = "mac";
        } else if(/WINDOWS NT 6.1/i.test(agent)) {
            os = "windows 7";
        } else if(/WINDOWS NT 8.0|WINDOWS NT 6.2/i.test(agent)) {
            os = "windows 8";
        } else if(/WINDOWS NT 8.1|WINDOWS NT 6.3/i.test(agent)) {
            os = "windows 8.1";
        } else if(/WINDOWS NT 10.0|WINDOWS NT 6.4/i.test(agent)) {
            os = "windows 10";
        } else if(/LINUX|X11/i.test(agent)) {
            os = "linux";
        } else if(/UNIX/i.test(agent)) {
            os = "unix";
        } else if(/SUNOS/i.test(agent)) {
            os = "solaris";
        } else {
            os = "unknown";
        }

        if((/windows/i.test(os))) {
            if((/WOW64|WIN64/i.test(agent))) {
                os += " 64bit";
            } else {
                os += " 32bit";
            }
        }

        return os;
    }

    // user browser
    this.get_user_browser = function() {
        var agent = this.user_agent_upper();
        var os = this.get_os();
        var browser;
        if(/TRIDENT|MSIE/i.test(agent)) {
            browser = 'ie';
        } else if(/OPERA|OPR/i.test(agent)) {
            browser = 'opera';
        } else if(/FIREFOX|FXIOS/i.test(agent)) {
            browser = 'firefox';
        } else if(/EDG|EDGE|EDGA|EDGIOS/i.test(agent)) {
            browser = 'edge';
        } else if(/CHROMIUM/i.test(agent)) {
            browser = 'chromium';
        } else if(/CHROME|CRIOS/i.test(agent)) {
            browser = 'chrome';
        } else if((os == "ios" || os == "mac") && /SAFARI/i.test(agent)) {
            browser = 'safari';
        } else if(/BING/i.test(agent)) {
            browser = 'bing';
        } else if(/FBAN|FBAV/i.test(agent)) {
            browser = 'facebook';
        } else if(/POWERAPP/i.test(agent)) {
            browser = 'powerapp';
        } else if(/BYAPPS/i.test(agent)) {
            browser = 'byapps';
        } else if(/ZIGZAG/i.test(agent)) {
            browser = 'zigzag';
        } else if(/INSTAGRAM/i.test(agent)) {
            browser = 'instagram';
        } else if(/INSTIZ/i.test(agent)) {
            browser = 'instiz';
        } else if(/KAKAOTALK/i.test(agent)) {
            browser = 'kakaotalk';
        } else if(/KAKAONAVI/i.test(agent)) {
            browser = 'kakaonavi';
        } else if(/KAKAOSTORY/i.test(agent)) {
            browser = 'kakaostory';
        } else if(/CAFE24PLUS/i.test(agent)) {
            browser = 'cafe24';
        } else if(/NAVER/i.test(agent)) {
            browser = 'naver';
        } else if(/BAND/i.test(agent)) {
            browser = 'band';
        } else if(/DAUM/i.test(agent)) {
            browser = 'daum';
        } else if(/NATE/i.test(agent)) {
            browser = 'nate';
        } else if(/YAHOO/i.test(agent)) {
            browser = 'yahoo';
        } else {
            browser = 'unknown';
        }

        return browser;
    }

    this.init = function () {
        var ck_cookie_off = false;
        if(snap_spm_ck_cookie_off() == false) {
            ck_cookie_off = true;
            console.log('create cookie OFF!');
        }
        
        var type = encodeURIComponent(this.snap_spm_get_device_type());
        var spm_page_type = encodeURIComponent(this.sf_get_pagetype());
        var landingPageParam = location.hash.replace(/^#/,"").split("=");

        var senddata = {};
        senddata['url'] = this.snap_spm_get_encode_url();
        senddata['referrerUrl'] = this.snap_spm_get_encode_referrer_url();
        senddata['device_type'] = encodeURIComponent(type);
        senddata['current_domain'] = this.get_url_data();
        senddata['referrer_domain'] = this.get_url_data('referrer');
        senddata['user_agent'] = this.get_user_agent();
        senddata['browser'] = this.get_user_browser();
        senddata['os'] = this.get_os();
        senddata['device'] = this.get_device();
        senddata['store_username'] = '';
        senddata['chart_id'] = '';
        senddata['draw_target'] = 'iframe';
        senddata['user_id'] = '';
        senddata['page_type'] = spm_page_type;
        senddata['solution_type'] = this.sf_get_solutiontype() || document.getElementById("spm_page_type").getAttribute('sf-solution');
        senddata['spm_user_id_pc'] = this.snap_spm_get_spmuserid_pc();
        senddata['spm_user_id_m'] = this.snap_spm_get_spmuserid_m();
        senddata['is_request_sync_id'] = this.snap_spm_get_idsyncstatus();
        senddata['spm_fcm_id'] = this.snap_spm_get_fcmid();
        senddata['todayBannerStatus'] = this.snap_spm_get_todayShowBanner();

        var store_username = this.sf_get_value('sf_store_name') || document.getElementById("spm_page_type").getAttribute('sf-store');
        if (store_username && store_username != 'undefined')
            senddata['sf_store_name'] = encodeURIComponent(store_username);

        this.is_support_brower = function () {
            // 'use strict';
            var agent = navigator.userAgent.toLowerCase(),
                name = navigator.appName,
                browser;

            // MS 계열 브라우저를 구분하기 위함.
            if (name === 'Microsoft Internet Explorer' || agent.indexOf('trident') > -1 || agent.indexOf('edge/') > -1) {
                browser = 'ie';
                if (name === 'Microsoft Internet Explorer') {  // IE old version (IE 10 or Lower)
                    var version = null;
                    var word = '';
                    if (navigator.appName == "Microsoft Internet Explorer") {
                        word = "msie ";
                    }
                    else if (agent.search("trident") > -1) {
                        word = "trident/.*rv:";
                    }
                    else if (agent.search("edge/") > -1) {
                        word = "edge/";
                    } else {
                        return true;
                    }
                    var reg = new RegExp(word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})");
                    if (reg.exec(agent) != null) {
                        version = RegExp.$1 + RegExp.$2;
                    }

                    if (version <= 12) {
                        console.log('not support ie version:' + agent);
                        return false;
                    }

                    return false;

                } else { // IE 11+
                    if (agent.indexOf('trident') > -1) { // IE 11
                        browser += 11;
                        return false;
                    } else if (agent.indexOf('edge/') > -1) { // Edge
                        browser = 'edge';
                    }
                    console.log('support' + browser);
                    return true;

                }
            } else if (agent.indexOf('safari') > -1) { // Chrome or Safari
                if (agent.indexOf('opr') > -1) { // Opera
                    console.log('not support opr');
                    return true;
                } else if (agent.indexOf('chrome') > -1) { // Chrome
                    console.log('chrome');
                    return true;
                } else { // Safari
                    console.log('safari');
                    return false;
                }
            } else if (agent.indexOf('firefox') > -1) { // Firefox
                console.log('firefox');
                return true;
            } else {
              if(!!navigator.platform.match(/iPhone|iPod|iPad/)){
                console.log('ios unknow browser');
                return false;
              }else{
                console.log('unknow browser');
                return true;
              }
            }
        }();

        // if (is_support_brower == false)
        //     return false;

        if (store_username && store_username != 'undefined' && ck_cookie_off == false) {
            //?�테?�뷰 결과�?초기??
            var is_log_on = document.getElementsByClassName('xans-member-var-id');
            if (is_log_on && is_log_on.length > 0) {

                if (is_log_on[0].innerText != '' || is_log_on[0].textContent != '') {
                    var userid = is_log_on[0].innerText || is_log_on[0].textContent;
                    if (userid && userid != 'undefined') {
                        senddata['user_id'] = encodeURIComponent(userid);
                        if (document.getElementById("sf_group_name")) {
                            senddata['group_name'] = encodeURIComponent(document.getElementById("sf_group_name").textContent);
                        }      
                        if (document.getElementById("sf_member_name")) {
                            senddata['user_name'] = encodeURIComponent(document.getElementById("sf_member_name").textContent);
                        }                              
                    }
                    this.spm_info_init(senddata, type);
                } else {

                    var solutiontype = this.sf_get_solutiontype();
                    //if (typeof(solutiontype) != 'undefined' && solutiontype && solutiontype == 'cafe24') {
                    if (typeof(solutiontype) != 'undefined' && solutiontype) {
                        var count = 0;
                        var interval = setInterval(function () {
                            var userid = this.sf_get_user_id();
                            if (userid || count >= 32) {
                                clearInterval(interval);
                                if (userid && userid != 'undefined') {
                                    senddata['user_id'] = encodeURIComponent(userid);
                                    if (document.getElementById("sf_group_name")) {
                                        senddata['group_name'] = encodeURIComponent(document.getElementById("sf_group_name").textContent);
                                    }
                                    if (document.getElementById("sf_member_name")) {
                                        senddata['user_name'] = encodeURIComponent(document.getElementById("sf_member_name").textContent);
                                    }
                                }
                                this.spm_info_init(senddata, type);
                            }
                            count++;
                        }, 200);
                    } else {
                        this.spm_info_init(senddata, type);
                    }
                }
            } else {
                this.spm_info_init(senddata, type);
            }
        }

        // this.send_spm_init(this.getServerInfo(true)+'js/push/init.js',{},"");

        /**카페24 썸네일 업데이트**/
        if(sf_get_solutiontype() == 'cafe24' && sf_get_pagetype() == "sq_detail_page")
        this.send_spm_init(this.getServerInfo(true)+'js/get_thumb_cafe.js',{},"");

        // /**카페24 회원정보 업데이트**/
        // if(sf_get_solutiontype() == 'cafe24' && sf_get_pagetype() == "sq_join_page")
        // this.send_spm_init(this.getServerInfo()+'js/push/join_cafe.js',{},"");

        // /**카페24 회원정보수정 업데이트**/
        // if(sf_get_solutiontype() == 'cafe24' && sf_get_pagetype() == "sq_member_modify_page")
        // this.send_spm_init(this.getServerInfo()+'js/push/join_cafe.js',{},"");

        /**카페24 SNS회원가입 업데이트 와 레이어 로그인 페이지일 경우를 위해 모든페이지 추가 **/
        if(sf_get_solutiontype() == 'cafe24' && ck_cookie_off == false)
        this.send_spm_init(this.getServerInfo()+'js/push/join_cafe.js',{},"");

        /**카페24 장바구니 업데이트**/
        if(sf_get_solutiontype() == 'cafe24' && sf_get_pagetype() == "sq_basket_page")
        this.send_spm_init(this.getServerInfo(true)+'js/push/basket-catch.js',{},"");

        /**메이크샵 장바구니 업데이트**/
        if(sf_get_solutiontype() == 'makeshop' && sf_get_pagetype() == "sq_basket_page")
        this.send_spm_init(this.getServerInfo(true)+'js/push/make_basket.js',{},"");

        /**카페24 장바구니 업데이트**/
        if(sf_get_solutiontype() == 'makeglobal' && sf_get_pagetype() == "sq_basket_page")
        this.send_spm_init(this.getServerInfo(true)+'js/push/makeglobal_basket.js',{},"");
        
        /**메이크샵 회원정보 업데이트**/
        if(sf_get_solutiontype() == 'makeshop' && (sf_get_pagetype() == "sq_join_page" || sf_get_pagetype() == "sq_member_modify_page") && ck_cookie_off == false)
        this.send_spm_init(this.getServerInfo()+'js/push/join_make.js',{},"");

        /**메이크글로비 회원정보 업데이트**/
        if(sf_get_solutiontype() == 'makeglobal' && (sf_get_pagetype() == "sq_join_page" || sf_get_pagetype() == "sq_member_modify_page"))
        this.send_spm_init(this.getServerInfo(true)+'js/push/join_makeglobal.js',{},"");

        /**메이크샵 회원탈퇴 업데이트**/
        if(sf_get_solutiontype() == 'makeshop' && sf_get_pagetype() == "sq_userout_page")
        this.send_spm_init(this.getServerInfo()+'js/push/join_make.js',{},"");

        /**메이크글로비 회원탈퇴 업데이트**/
        if(sf_get_solutiontype() == 'makeglobal' && sf_get_pagetype() == "sq_userout_page")
        this.send_spm_init(this.getServerInfo(true)+'js/push/join_makeglobal.js',{},"");

        /**리턴푸시 스크립트**/
        if(ck_cookie_off == false)
        this.send_spm_init(this.getServerInfo(true)+'js/push/return_push.js',{}, "",false);

        /**푸시팝업 스크립트**/
        if(ck_cookie_off == false)
        this.send_spm_init(this.getServerInfo(true)+'js/push/push_popup.js',{}, "");

        /**frame 스크립트**/
        if(ck_cookie_off == false)
        this.send_spm_init(this.getServerInfo(true)+'js/push/frame_push.js',{}, "");

        this.send_spm_init(this.getServerInfo()+'custom/js/'+store_username,{}, "");

        if(navigator.userAgent.indexOf("iPhone OS") > -1){
          //this.send_spm_init(this.getServerInfo(false)+'js/push/safari_cookie.js',{}, "");
        }
    }();
    return this;
}();