'use strict';

// 정렬필터(우)
var sortDetail=document.querySelector('.sortDetail');//가려진 부분
var sortWrapper=document.querySelector('.sortWrapper'); //sortingBox
var updownBtn=document.querySelector('.updownBtn'); //정렬 화살표(상하)

sortWrapper.addEventListener('click',()=>{
    sortDetail.classList.toggle('active');
    sortWrapper.classList.toggle('active');
    updownBtn.classList.toggle('active');
})

// ----------------공용----------------
//최상단 Swiper 끄기
const swiper=document.querySelector('.Swiper');
const offBtn=document.querySelector('.swiperOff');

offBtn.addEventListener('click',function(){
  swiper.style.display="none";
}
)

// navbar 숨기기
window.onscroll = function() {myFunction()};

function myFunction() {
  if (document.documentElement.scrollTop > 50) {
    document.querySelector(".itemCategory").style.display = "none";
  } else {
    document.querySelector(".itemCategory").style.display  = "";
  }
}


/* ----------------메인/main.html---------------- */
// 섹션1_캐러셀 이미지
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.querySelectorAll(".mySlides");
  console.log(slides);

  if (n > slides.length) {
    slideIndex = 1
  }

  if (n < 1) {
    slideIndex = slides.length
  }

  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1
  }
  
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); 


  slides[slideIndex-1].style.display = "block";
}


// 섹션2_타이머
function getTime() {
  const target = new Date("Fri Apr 29 2022 00:00:00 GMT+0900");
  const today = new Date();
  const gap = target - today;
  const d = String(Math.floor(gap / (1000 * 60 * 60 * 24))).padStart(2,"0"); // 일
  const h = String(Math.floor((gap / (1000 * 60 * 60)) % 24)).padStart(2,"0"); // 시
  const m = String(Math.floor(((gap / 1000) * 60) % 60)).padStart(2,"0"); // 분
  const s = String(Math.floor((gap / 1000) % 60)).padStart(2,"0"); // 초

  if (gap > 0) {
    document.querySelector(".NumberDays").innerText=d;
    document.querySelector(".NumberHours").innerText=h;
    document.querySelector(".NumberMinutes").innerText=m;
    document.querySelector(".NumberSeconds").innerText=s;
  } 
}

function init() {
    getTime();
    setInterval(getTime, 1000);
  }

init();



//* ----------------상품 리스트(특정 브랜드)/branditem.html---------------- *//


//* ----------------상품 리스트(검색)/search.html---------------- *//
// 카테고리 대 필터(좌)>대
var filterDetail=document.querySelector('.filterDetail');//가려진 부분
var filterWrapper=document.querySelector('.filterWrapper'); //filterBox
var leftrightBtn=document.querySelector('.leftrightBtn');//필터 화살표(좌우)
var itemListWrapper=document.querySelector('.itemListWrapper');//상품리스트
var filter=document.querySelector('.filter');//'핕터'글자


filter.addEventListener('click',()=>{
    filterDetail.classList.toggle('active');
    filterWrapper.classList.toggle('active');
    leftrightBtn.classList.toggle('active');
    itemListWrapper.classList.toggle('active');
})


//카테고리 대 필터(좌)>대>중
var clothing=document.getElementById('clothing');//가려진 부분(의류)
var shoes=document.getElementById('shoes');//가려진 부분(신발)
var bags=document.getElementById('bags');//가려진 부분(가방)
var acc=document.getElementById('acc');//가려진 부분(악세사리)
var jewerly=document.getElementById('jewerly');//가려진 부분(주얼리)

var updownBtnClothing=document.querySelectorAll('.updownBtn')[0];//필터 화살표
var updownBtnShoes=document.querySelectorAll('.updownBtn')[1];//필터 화살표
var updownBtnBags=document.querySelectorAll('.updownBtn')[2];//필터 화살표
var updownBtnAcc=document.querySelectorAll('.updownBtn')[3];//필터 화살표
var updownBtnJewerly=document.querySelectorAll('.updownBtn')[4];//필터 화살표

updownBtnClothing.addEventListener('click',()=>{
    clothing.classList.toggle('active');
    updownBtnClothing.toggle('active');
})

updownBtnShoes.addEventListener('click',()=>{
    shoes.classList.toggle('active');
})

updownBtnBags.addEventListener('click',()=>{
    bags.classList.toggle('active');
})

updownBtnAcc.addEventListener('click',()=>{
    acc.classList.toggle('active');
})

updownBtnJewerly.addEventListener('click',()=>{
    jewerly.classList.toggle('active');
})




/* ----------------제품 상세/itemdetail.html---------------- */
const sale_priceRow=document.querySelectorAll('.itemDes>li')[4];
const sale_price=document.querySelector('.sale_price');
if(sale_price.innerText=''){
  sale_priceRow.style.display="none";
}

/* ----------------내 정보(통합)/myinfoAll.html---------------- */
//X누르면 지워버리기!
const button=document.querySelectorAll('.likeItem>button');
const likeItem=document.querySelectorAll('.likeItem'); //
// console.log(likeItem.length)

//버튼 누르면 누른 박스 사라지게 만들기!
for(var i=0;i<button.length;i++){
    button[i].addEventListener('click',()=>{
        likeItem[i].style.display="none";
    })
}


// 주소 검색(by kakao)
function findAddr(){
	new daum.Postcode({
        oncomplete: function(data) {
        	
        	console.log(data);
        	
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var jibunAddr = data.jibunAddress; // 지번 주소 변수
            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('member_post').value = data.zonecode;
            if(roadAddr !== ''){
                document.getElementById("member_addr").value = roadAddr;
            } 
            else if(jibunAddr !== ''){
                document.getElementById("member_addr").value = jibunAddr;
            }
        }
    }).open();
}

//배송중인것만 배송정보 보여주기!
const trkStatus=document.querySelectorAll('.trkStatus'); //배송상태값
const trkInfo=document.querySelectorAll('.trkInfo'); //배송정보

for(i=0;i<trkStatus.length;i++){
    if(trkStatus[i].innerText=="배송중"){
        trkInfo[i].style.display="block";
    }else{
        trkInfo[i].style.display="none";
    }
}
//n번째 돋보기를 누르면 n번째 송장번호가 들어간 택배 조회창으로 이동
// const n=document.querySelectorAll('.n'); //n번째 순서값
const trkBtn=document.querySelectorAll('.trkInfo>img')// 운송장 조회 버튼
const trkCompany=document.querySelectorAll('.trkCompany') //택배사
const trkNum=document.querySelectorAll('.trkNum') //송장번호


//택배 조회
trkBtn.forEach(function(trkBtn) {
        trkBtn.addEventListener('click', logEvent);
    });
    
  function logEvent(event) {	
     var number = event.target.closest('.trkInfo').children[1].innerText
      if(event.target.closest('.trkInfo').children[0].innerText == '우체국') {
window.open('about:blank').location.href='https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm?sid1='+number+'&displayHeader=N';
      } else {
   window.open('about:blank').location.href='http://www.doortodoor.co.kr/servlets/cmnChnnel?tc=dtd.cmn.command.c03condiCrg01Cmd&invc_no='+number;
      }   
    } 









/* ----------------결제/pay.html---------------- */

// 주소 검색(by kakao)
function findAddr(){
	new daum.Postcode({
        oncomplete: function(data) {
        	
        	console.log(data);
        	
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var jibunAddr = data.jibunAddress; // 지번 주소 변수
            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('member_post').value = data.zonecode;
            if(roadAddr !== ''){
                document.getElementById("member_addr").value = roadAddr;
            } 
            else if(jibunAddr !== ''){
                document.getElementById("member_addr").value = jibunAddr;
            }
        }
    }).open();
}


//결제 수단 선택
const creditCard=document.querySelector('#creditCard')
const transfer=document.querySelector('#transfer')


creditCard.addEventListener('click',()=>{
    creditCard.style.backgroundColor="black";
    creditCard.style.color="white";
    transfer.style.backgroundColor="transparent";
    transfer.style.color="black";

})

transfer.addEventListener('click',()=>{
    transfer.style.backgroundColor="black";
    transfer.style.color="white";
    creditCard.style.backgroundColor="transparent";
    creditCard.style.color="black";
})

//전체 동의
function selectAll(selectAll)  {
    const checkboxes = document.getElementsByName('agree');
    
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAll.checked;
    })
  }


/* ----------------결제 완료/paydone.html---------------- */

/* ----------------앱 소개/appDown.html---------------- */

//스크롤 이동
const circles = document.querySelectorAll(".circle")
const contents = document.querySelectorAll(".appinfo")
const firstTop = contents[0].offsetTop
const secondTop = contents[1].offsetTop
const thirdTop = contents[2].offsetTop
const fourTop = contents[3].offsetTop

 
circles[0].onclick = function(e){
  window.scroll({top:firstTop, behavior: 'smooth'})
  circles[0].style.backgroundColor="black";
  circles[1].style.backgroundColor="transparent";
  circles[2].style.backgroundColor="transparent";
  circles[3].style.backgroundColor="transparent";

}
circles[1].onclick = function(){
  window.scroll({top:secondTop, behavior: 'smooth'})
  circles[0].style.backgroundColor="transparent";
  circles[1].style.backgroundColor="black";
  circles[2].style.backgroundColor="transparent";
  circles[3].style.backgroundColor="transparent";
}
circles[2].onclick = function(){
  window.scroll({top:thirdTop, behavior: 'smooth'})
  circles[0].style.backgroundColor="transparent";
  circles[1].style.backgroundColor="transparent";
  circles[2].style.backgroundColor="black";
  circles[3].style.backgroundColor="transparent";
}

circles[3].onclick = function(){
  window.scroll({top:fourTop, behavior: 'smooth'})
  circles[0].style.backgroundColor="transparent";
  circles[1].style.backgroundColor="transparent";
  circles[2].style.backgroundColor="transparent";
  circles[3].style.backgroundColor="black";
}







/* ----------------회사 소개/usp.html---------------- */


/* ----------------QnA/qna.html---------------- */
