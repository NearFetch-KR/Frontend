/* ---------------공용---------------- */

// html include
function includeRouter(cb) {
  var content, file, xhttp, i;
  document.body.addEventListener('click', function (e) {
    file = e.target.getAttribute('route-link');
    if (file) {
      content = document.getElementById('content');
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            content.innerHTML = this.responseText; 
            var scripts = content.getElementsByTagName('script');
            for (var i = 0; i < scripts.length; i++) {
              eval(scripts[i].text); 
            }
            setTimeout(function() {
              cb(e);
            }, 0)
          }
          if (this.status == 404) {
            content.innerHTML = 'Page not found.';
          }
        }
      }      
      xhttp.open('GET', file, true);
      xhttp.send();
    }
  });
}

function includeHTML(callback) {
  var z, i, elmnt, file, xhr;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName('*');
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute('include-html');
    //console.log(file);
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = 'Page not found.';}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute('include-html');
          includeHTML(callback);
        }
      }      
      xhr.open('GET', file, true);
      xhr.send();
      /*exit the function:*/
     return;
    }
  }
  setTimeout(function() {
    callback();
  }, 0)
};

includeHTML( function () {
  includeRouter( function () {
});
});


// /* ---------------로그인(기능)---------------- */

// 로그인(이메일)
// window.onload=function(){
//     const signInBtn = document.querySelector('.mailLogin');
//     signInBtn.addEventListener('click', e => {
//         let mail = document.querySelector('.inputWrapper #mail').value;
//         let pw = document.querySelector('.inputWrapper #password').value;
//         e.preventDefault();
//         let param = {
//             'email' : mail,
//             'password' : pw
//         }  
          
//         $.ajax({
//             url : 'http://192.168.0.171:8000/users/signin',
//             type : 'POST',
//             data : JSON.stringify(param),
//             success:function(response){
//                 console.log(response);
//             },
//             error: function(){
//               console.log('로그인 불가');
//             }
//         });
//     });  
//   }


// 로그인(카카오)
// window.onload=function(){
//   const signInBtn = document.querySelector('.kakaoLogin');
//   signInBtn.addEventListener('click', e => {
//       e.preventDefault();
      
        
//       $.ajax({
//           url : 'http://192.168.0.171:8000/users/signin/kakao',
//           type : 'GET',
          
//           success:function(response){
//               console.log(response);
//           },
//           error: function(){
//             console.log('로그인 불가');
//           }
//       });
//   });  
// }

// --------------------------------------------------
window.onload=function(){
//상단 Navbar 펼치기(Designers,여성,남성,Sale)
function spreadNavbar() {
  var navBar = document.getElementById("myTopnav");
  if (navBar.className === "topnav") {
      navBar.className += " responsive";
  } else {
      navBar.className = "topnav";
  }
  }
// /* ---------------로그인(모달창 열기)---------------- */
  // // 로그인
  //   var loginModal = document.querySelector("#loginModal");
  //   var loginBtn = document.querySelector("#loginBtn");
  //   var loginClose = document.querySelectorAll(".closeBtn")[0];
  
  //   loginBtn.onclick = function() {
  //     loginModal.style.display = "block";
  //   }
  
  //   loginClose.onclick = function() {
  //     loginModal.style.display = "none";
  //   }
  
  //   window.onclick = function(event) {
  //     if (event.target == loginModal) {
  //       loginModal.style.display = "none";
  //     }
  //   }
  
  //    // 회원가입
  //    const signInModal = document.querySelector("#signInModal");
  //    const signInBtn = document.querySelector("#signInBtn");
  //    const signInClose = document.querySelectorAll(".closeBtn")[1];

  //    signInBtn.onclick = function() {
  //     signInModal.style.display = "block";
  //    }
  
  //    signInClose.onclick = function() {
  //     signInModal.style.display = "none";
  //    }
  
  //    window.onclick = function(event) {
  //      if (event.target == signInModal) {
  //       signInModal.style.display = "none";
  //      }
  //    }

  
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
  var slides = document.querySelectorAll(".mySlides");

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

 
// navbar 숨기기
// window.onscroll = function() {
//   if (document.documentElement.scrollTop > 50) {
//     document.querySelector(".itemCategory").style.display = "none";
//   } else {
//     document.querySelector(".itemCategory").style.display  = "";
//   }
// };

 // json파일 불러오기
 let itemList = JSON.parse(JSON.stringify(data));

 // main>최하단에 추천 상품 리스트 넣기(women,bags)
 const itemListWrapper = document.querySelector('.Recommend>.itemListWrapper')
 const ul = document.createElement('ul');
 itemListWrapper.appendChild(ul);
 ul.setAttribute("class","list");

  //추천할 상품 40개 랜덤 추출
 var recomItemList = itemList.filter(item => { 
      if (item.categoryMedium.includes('bags')  && item.gender.includes('WOMEN')) { 
          return true; 
      } 
      return false; 
          });
          
   // 중복값 제외한 추천상품 뽑기
   var randomRecomItem=[];
  for (var i = 0; i < recomItemList.length; i++) {
      const randomItem=recomItemList[Math.floor(Math.random() * recomItemList.length)]
     if (!randomRecomItem.includes(randomItem)) {
          randomRecomItem.push(randomItem);   
          if(randomRecomItem.length==40){//40개만 노출
              break;
          }
      } else {
          i--;
      }
  }


 for (let i = 0; i < randomRecomItem.length; i += 1) {
       // 추천 상품(여성,bags 제품을 객체에 담은 후 랜덤추출)
     const cart = document.createElement('img')
     cart.setAttribute("class","cart")
     cart.src="/images/shopping-cart.png";

     const img = document.createElement('img')
     img.setAttribute("class","itemImg")
     img.src=randomRecomItem[i].itemImg[0];

     const li = document.createElement('li');

     const div = document.createElement('div');
     div.setAttribute("class","itemBrand");

     const div1 = document.createElement('div');
     div1.setAttribute("class","itemName");

     const div2 = document.createElement('div');
     div2.setAttribute("class","price");

     const div3 = document.createElement('div');
     div3.setAttribute("class","skuNum");


      ul.appendChild(li); //itemwrapper>li 추가
      li.appendChild(cart);//itemwrapper>li>img 추가
      li.appendChild(img);//itemwrapper>li>img 추가
      li.appendChild(div);//itemwrapper>li>div 추가
      li.appendChild(div1);//itemwrapper>li>div 추가
      li.appendChild(div2);//itemwrapper>li>div 추가
      li.appendChild(div3);//itemwrapper>li>div 추가


      div.textContent=randomRecomItem[i].itemBrand; 
      div1.textContent=randomRecomItem[i].itemName; 
      div2.textContent=randomRecomItem[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","); 
      div3.textContent=randomRecomItem[i].skuNum; 
      // const price=document.querySelectorAll(".price");
      // price.toLocaleString()
  }

  // 클릭한 요소 정보
    const clickedImgInfo = document.querySelectorAll('.itemListWrapper img');
    clickedImgInfo.forEach((el, index, ) => {
    el.onclick = (e) => {
    const parentTag=e.target.parentElement; //클릭한 요소의 부모 태그 전체
    const child=parentTag.childNodes; //클릭한 요소들의 형제 태그 전체
    const sku=child[5].innerText;//클릭한 요소의 sku넘버(=전달할 요소)
    console.log(sku)
    }});




//* ----------------상품 리스트(특정 브랜드)/branditem.html---------------- *//
  // 상품 리스트에 상품 추가
  window.onload=function(){
   
  }

//* ----------------상품 리스트(검색)/search.html---------------- *//
// 상품 리스트 끌어오기
window.onload=function(){
  let itemList = JSON.parse(JSON.stringify(data));
  const itemListWrapper = document.querySelector('.searchItemWrapper>.itemListWrapper')
  const ul = document.createElement('ul');
  itemListWrapper.appendChild(ul);

  function isGUCCI(itemList)  {
       if(itemList.itemBrand === 'GUCCI')  {
           return true;
       }
       }

   const gucciItem = itemList.filter(isGUCCI);

   for (let i = 0; i < gucciItem.length; i += 1) {
       const cart = document.createElement('img')
       cart.setAttribute("class","cart")
       cart.src="/images/shopping-cart.png";

       const img = document.createElement('img')
       img.setAttribute("class","itemImg")
       img.src=gucciItem[i].itemImg[0];

       const li = document.createElement('li');
   
       const div = document.createElement('div');
       div.setAttribute("class","itemBrand");

       const div1 = document.createElement('div');
       div1.setAttribute("class","itemName");

       const div2 = document.createElement('div');
       div2.setAttribute("class","price");

       const div3 = document.createElement('div');
       div3.setAttribute("class","skuNum");

       ul.appendChild(li); //itemwrapper>li 추가
       li.appendChild(cart);//itemwrapper>li>img 추가
       li.appendChild(img);//itemwrapper>li>img 추가
       li.appendChild(div);//itemwrapper>li>div 추가
       li.appendChild(div1);//itemwrapper>li>div 추가
       li.appendChild(div2);//itemwrapper>li>div 추가
       li.appendChild(div3);//itemwrapper>li>div 추가

       div.textContent=gucciItem[i].itemBrand; 
       div1.textContent=gucciItem[i].itemName; 
       div2.textContent=gucciItem[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","); 
       div3.textContent=gucciItem[i].skuNum; 
       const price=document.querySelectorAll(".price");
       price.toLocaleString();
   }
}

// 카테고리 대 필터(좌)>대
// var filterDetail=document.querySelector('.filterDetail');//가려진 부분
// var filterWrapper=document.querySelector('.filterWrapper'); //filterBox
// var leftrightBtn=document.querySelector('.leftrightBtn');//필터 화살표(좌우)
// var itemListWrapper=document.querySelector('.itemListWrapper');//상품리스트
// var filter=document.querySelector('.filter');//'핕터'글자

// window.onload=function(){
//   filter.addEventListener('click',()=>{
//     filterDetail.classList.toggle('active');
//     filterWrapper.classList.toggle('active');
//     leftrightBtn.classList.toggle('active');
//     itemListWrapper.classList.toggle('active');
// })
// }



//카테고리 대 필터(좌)>대>중
// var clothing=document.getElementById('clothing');//가려진 부분(의류)
// var shoes=document.getElementById('shoes');//가려진 부분(신발)
// var bags=document.getElementById('bags');//가려진 부분(가방)
// var acc=document.getElementById('acc');//가려진 부분(악세사리)
// var jewerly=document.getElementById('jewerly');//가려진 부분(주얼리)

// var updownBtnClothing=document.querySelectorAll('.updownBtn')[0];//필터 화살표
// var updownBtnShoes=document.querySelectorAll('.updownBtn')[1];//필터 화살표
// var updownBtnBags=document.querySelectorAll('.updownBtn')[2];//필터 화살표
// var updownBtnAcc=document.querySelectorAll('.updownBtn')[3];//필터 화살표
// var updownBtnJewerly=document.querySelectorAll('.updownBtn')[4];//필터 화살표

// window.onload=function(){
//   updownBtnClothing.addEventListener('click',()=>{
//     clothing.classList.toggle('active');
//     updownBtnClothing.toggle('active');
// })

// updownBtnShoes.addEventListener('click',()=>{
//     shoes.classList.toggle('active');
// })

// updownBtnBags.addEventListener('click',()=>{
//     bags.classList.toggle('active');
// })

// updownBtnAcc.addEventListener('click',()=>{
//     acc.classList.toggle('active');
// })

// updownBtnJewerly.addEventListener('click',()=>{
//     jewerly.classList.toggle('active');
// })
// }


// 정렬필터(우)
// var sortDetail=document.querySelector('.sortDetail');//가려진 부분
// var sortWrapper=document.querySelector('.sortWrapper'); //sortingBox
// var updownBtn=document.querySelector('.updownBtn'); //정렬 화살표(상하)

// window.onload=function(){
//   sortWrapper.addEventListener('click',()=>{
//     sortDetail.classList.toggle('active');
//     sortWrapper.classList.toggle('active');
//     updownBtn.classList.toggle('active');
// })

// }



/* ----------------제품 상세/itemdetail.html---------------- */
window.onload=function(){
  let itemList = JSON.parse(JSON.stringify(data));
  //우//상품정보 
  const itemInfoWrapper = document.querySelector('.itemBuy>.itemDes')


  for (let i = 0; i < 4; i ++) {
      const className=['itemBrand','itemName','price','sale_price'];
      const li = document.createElement('li');
      itemInfoWrapper.appendChild(li); 
      li.textContent=itemList[1][className[i]] 
      li.setAttribute("class",className[i])

  }

  // 좌//이미지
  const itemImgWrapper = document.querySelector('.buy>.itemDetail')
  const ul = document.createElement('ul');
  itemImgWrapper.appendChild(ul);
  ul.setAttribute("class","itemImages");

 
  const informWrapper = document.querySelector('.informWrapper')
  informWrapper.appendChild(ul);
  ul.setAttribute("class","itemInfos");
  for (let i = 0; i < itemList[1].itemImg.length; i += 1) {
      const li = document.createElement('li'); 
      itemImgWrapper.appendChild(li);  //사진 갯수만큼 li태그 추가

      const img = document.createElement('img');
      li.appendChild(img)
      img.src=itemList[1].itemImg[i];
  }

  // 옵션 추가
  const select=document.querySelector(".itemBuyBtn>.option")
  for(i=0;i<itemList[1]["itemOption"].length;i++){
      const option=document.createElement("option");
      select.appendChild(option);
      option.textContent=itemList[1]["itemOption"][i];
  }


  const skuNum=document.querySelector(".informDes .skuNum")
  const materials=document.querySelector(".informDes .materials")
  skuNum.textContent=itemList[1]["skuNum"];
  materials.textContent=itemList[1]["materials"];

  

  // 추천 상품(현재 보고있는 상품과 성별,소카테고리,브랜드가 같은 제품을 객체에 담은 후 랜덤추출)
  // 뽑기 상품 조건
  var sameBrandItemList = itemList.filter(item => { 
      if (item.itemBrand.includes('MONCLER')  && item.gender.includes('WOMEN') &&item.categoryMedium.includes('clothing')) { 
          return true; 
      } 
      return false; 
  });


  // 중복값 제외한 추천상품 뽑기
  var randomRecomItem=[];
  for (var i = 0; i < sameBrandItemList.length; i++) {
      const randomItem=sameBrandItemList[Math.floor(Math.random() * sameBrandItemList.length)]
     if (!randomRecomItem.includes(randomItem)) {
          randomRecomItem.push(randomItem); 
          if(randomRecomItem.length==10){//10개만 노출
              break;
          }  
      } else {
          i--;
      }
  }

  const recomItemWrapper=document.querySelector(".row__inner")
  for (let i = 0; i < 8; i++) {
      const div1 = document.createElement('div');
      recomItemWrapper.appendChild(div1); 
      div1.setAttribute("class","RecomItem");    

      const RecomItem=document.querySelectorAll(".RecomItem")
      const div2 = document.createElement('div');
      const div3 = document.createElement('div');
      
      RecomItem[i].appendChild(div2)
      div2.setAttribute("class","RecomItem__content");  

      RecomItem[i].appendChild(div3)
      div3.setAttribute("class","RecomItem__details");  

      const RecomItem__details=document.querySelectorAll(".RecomItem__details")
      const div4 = document.createElement('div');
      const div5 = document.createElement('div');

      RecomItem__details[i].appendChild(div4)
      div4.setAttribute("class","itemName");
      div4.textContent=randomRecomItem[i]["itemName"];  

      RecomItem__details[i].appendChild(div5)
      div5.setAttribute("class","price");  
      div5.textContent=randomRecomItem[i]["price"].toString().replace(/\B(?=(\d{3})+(?!\d))/g,","); ;  
      const price=document.querySelectorAll(".price");
      price.toLocaleString()
      
      // 추천상품명/가격
      const recomImgBox=document.querySelectorAll(".RecomItem__content")
      const imgTag = document.createElement('img');
      imgTag.setAttribute("class","RecomItem__img")
      recomImgBox[i].appendChild(imgTag);

      const RecomItem__img=document.querySelectorAll(".RecomItem__img")
      RecomItem__img[i].src=randomRecomItem[i].itemImg[0];

      const div6 = document.createElement('div');
      div6.setAttribute("class","skuNum");
      recomImgBox[i].appendChild(div6);
      div6.textContent=randomRecomItem[i]["skuNum"];  
  }

    // 클릭한 요소 정보
      const clickedImgInfo = document.querySelectorAll('img');
      clickedImgInfo.forEach((el, index, ) => {
      el.onclick = (e) => {
      const parentTag=e.target.parentElement; //클릭한 요소의 부모 태그 전체
      const child=parentTag.childNodes; //클릭한 요소들의 형제 태그 전체
      const sku=child[1].innerText;//클릭한 요소의 sku넘버(=전달할 요소)
      console.log(sku)
      }});

      // 오늘 날짜
      var now = new Date();
      // 7일 뒤 날짜
      var arrival = new Date(now.setDate(now.getDate() + 7));	
      //7일 뒤 날짜에서 월,일 가져오기
      const month=arrival.getMonth()+1;
      const date=arrival.getDate();
      const arrivalMonth=document.querySelector('.itemBuyBtn .arrivalMonth');
      const arrivalDate= document.querySelector('.itemBuyBtn .arrivalDate');
      arrivalMonth.innerText=month;
      arrivalDate.innerText=date;



  }


/* ----------------내 정보(통합)/myinfoAll.html---------------- */
// 주소 검색(by kakao)
function findAddr(){
	new daum.Postcode({
        oncomplete: function(data) {
        	console.log(data);
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

 // 장바구니, 주문창 총 금액 계산
 window.onload=function(){
 const totalAmount=document.querySelector(".totalAmount>span");
 const prices=document.querySelectorAll(".price");
 const priceArry=[];
 for(i=0;i<prices.length;i++){
     priceArry.push(Number(prices[i].innerText));
 }
 const sum = priceArry.reduce((a,b) => (a+b));
 totalAmount.textContent=sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","); ;
 }







/* ----------------결제/pay.html---------------- */
window.onload=function(){

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
}



//전체 동의
function selectAll(selectAll)  {
    const checkboxes = document.getElementsByName('agree');
    
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAll.checked;
    })
  }


/* ----------------결제 완료/paydone.html---------------- */

/* ----------------앱 소개/appDown.html---------------- */
window.onload=function(){
// //스크롤 이동
const circles = document.querySelectorAll(".circle");
const contents = document.querySelectorAll(".appinfo");
const firstTop = contents[0].offsetTop;
const secondTop = contents[1].offsetTop;
const thirdTop = contents[2].offsetTop;
const fourTop = contents[3].offsetTop;

 
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
ScrollReveal({ reset: true });
ScrollReveal().reveal('.show', { delay: 500 });


}





/* ----------------회사 소개/usp.html---------------- */


/* ----------------QnA/qna.html---------------- */
 