// let AllItemList = JSON.parse(JSON.stringify(data));

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
  //상단 Navbar 펼치기(Designers,여성,남성,Sale)
  function spreadNavbar() {
    var navBar = document.getElementById("myTopnav");
    if (navBar.className === "topnav") {
        navBar.className += " responsive";
    } else {
        navBar.className = "topnav";
    }
    }
  
  
  // /* ---------------로그인&회원가입(모달창 열기)---------------- */
  window.onload=function(){
  //   로그인 모달창
      var loginModal = document.getElementById("loginModal");
      var loginBtn = document.getElementById("loginBtn");
      var loginClose = document.querySelector(".loginClose");
      
     
      loginBtn.onclick = function() {
          loginModal.style.display = "block";
      }
  
      loginClose.onclick = function() {
          loginModal.style.display = "none";
      }
  
      window.onclick = function(event) {
      if (event.target == loginModal) {
          loginModal.style.display = "none";
      }
      }
   
  //   회원가입 모달창
      var registerModal = document.getElementById("registerModal");
      var registerBtn = document.getElementById("registerBtn");
      var registerClose = document.querySelector(".registerClose");
  
      registerBtn.onclick = function() {
          registerModal.style.display = "block";
      }
  
      registerClose.onclick = function() {
          registerModal.style.display = "none";
      }
  
      window.onclick = function(event) {
      if (event.target == registerModal) {
          registerModal.style.display = "none";
      }
      }
  
  
  // 회원가입&로그인(기능)
     //회원가입
     const mailRegister=document.querySelector(".goRegister");
     mailRegister.addEventListener('click', e => {
     let name = document.querySelector('.registerBtnWrapper .inputWrapper #name').value;
     let mail = document.querySelector('.registerBtnWrapper .inputWrapper #mail').value;
     let pw = document.querySelector('.registerBtnWrapper .inputWrapper #password').value;
     e.preventDefault();
     let param = {
         'name': name,
         'email' : mail,
         'password' : pw
     }           
     fetch("http://172.30.1.40:8000/users/signup", {
         method: "POST",
         headers: {
             "Content-Type": "application/json",
         },
         body: JSON.stringify(param),
     })
     .then((response) => response.json())
     .then((data) => {
          alert("로그아웃 되었습니다.")
          window.location.href="http://127.0.0.1:5500/main%20page/main.html";
      }
      )
     .catch((error) => console.log("error:", error));
         }); 
  
        
  
      // 로그인
      const mailLogin=document.querySelector(".login .mailLogin");
      mailLogin.addEventListener('click', e => {
      let mail = document.querySelector('.loginInfoWrapper .inputWrapper #mail').value;
      let pw = document.querySelector('.loginInfoWrapper .inputWrapper #password').value;
      e.preventDefault();
      let param = {
          'email' : mail,
          'password' : pw
      }           
      fetch("http://172.30.1.40:8000/users/signin", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(param),
      })
      .then((response) => response.json())
      .then((response) => {
          if(response.access_token) {
              localStorage.setItem('login-token', response.access_token)
          }
      })
      .catch((error) => console.log("error:", error));
          });  
  
  
      //로그아웃
      const logoutBtn=document.querySelector(".infoBar #logout");
      logoutBtn.addEventListener('click', e => {
          e.preventDefault();
          let token = localStorage.getItem('login-token');      
          fetch("http://172.30.1.40:8000/users/logout", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: token
              },
          })
          .then((response) => response.json())
          .then((response) => {
              console.log(response)
              localStorage.removeItem('login-token')
          })
          .catch((error) => console.log("error:", error));
      });  
  }



  // 마지막 섹션(추천 상품)_확정코드
  function mainRecomInit(){
      fetch("http://172.30.1.40:8000/products/list", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      })
      .then((response) => response.json())
      .then((response) => { 
  
          // main>최하단에 추천 상품 리스트 넣기(women,bags)
          const mainRecomItemWrapper = document.querySelector('.Recommend>.itemListWrapper')
          const ul = document.createElement('ul');
          mainRecomItemWrapper.appendChild(ul);
          ul.setAttribute("class","list");
          //추천할 상품 전체 추출
          var recomItemList = response.result.filter(item => { 
              if (item.categoryMedium.includes('clothing')  && item.gender.includes('WOMEN')) { 
                  return true; 
              } 
              return false; 
                  });
                  
          
          // 중복값 제외한 추천상품 40개 뽑기
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

              const aTag=document.createElement('a')
              aTag.setAttribute("class","imgWrapAtag")
              aTag.href="";
             
  
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
              aTag.appendChild(img);//itemwrapper>li>img 추가

              li.appendChild(aTag);//itemwrapper>li>img 추가
              li.appendChild(div);//itemwrapper>li>div 추가
              li.appendChild(div1);//itemwrapper>li>div 추가
              li.appendChild(div2);//itemwrapper>li>div 추가
              li.appendChild(div3);//itemwrapper>li>div 추가
  
  
              div.textContent=randomRecomItem[i].itemBrand; 
              div1.textContent=randomRecomItem[i].itemName; 
              div2.textContent=randomRecomItem[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","); 
              div3.textContent=randomRecomItem[i].skuNum; 
  
          }   
})}
  
  mainRecomInit()
  // --------------------------------------------
  // 장바구니 카트 로고 눌러서 장바구니에 넣기(공용)
  function goCart(){
      fetch("http://172.30.1.40:8000/products/list", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      })
      .then((response) => response.json())
      .then((response) => {
  
  
          // 카트 로고 눌러서 장바구니 담기(공용)
          const cartBtn=document.querySelectorAll(".cart")
          cartBtn.forEach((el,index) => {
              el.onclick = (e) => {
              let parentTag=e.target.parentElement;   //클릭한 요소의 부모 태그 전체
              let child=parentTag.childNodes; //클릭한 요소들의 형제 태그 전체
              let sku=child[5].innerText;
              e.preventDefault();
              console.log(parentTag);
  
              let param = {
                  'sku_number' : sku
                  }           
  
              fetch("http://172.30.1.40:8000/users/cart", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                      // Authorization: localStorage.getItem('login-token')
                  },
                  body: JSON.stringify(param),
              })
              .then((response) => response.json())
              .then((response) => console.log(response))
              .then(function(){
                  alert('장바구니 페이지로 이동하시겠습니까?');
              }
              )
              .catch((error) => console.log("error:", error));
          }}); 
  
      })}
  
      goCart()
  
  
  // 상품 상세보기
  // function goDetail(){
  //     const itemImg=document.querySelectorAll(".itemImg")
  //     console.log(itemImg)
  //     itemImg.forEach((el,index) => {
  //         el.onclick = (e) => {
  //         let parentTag=e.target.parentElement;   //클릭한 요소의 부모 태그 전체
  //         let child=parentTag.childNodes; //클릭한 요소들의 형제 태그 전체
  //         let sku=child[5].innerText;
  //         e.preventDefault();
  //         console.log(parentTag);
  //         }})
  
  //     fetch(`http://172.30.1.40:8000/products/detail/${sku_number}`, {
  //         method: "GET",
  //         headers: {
  //             "Content-Type": "application/json",
  //         },
  //     })
  //     .then((response) => response.json())
  //     .then((response) => {
       
  // })
  // }
  
  // goDetail()
  /* ----------------장바구니---------------- */
  
  // 장바구니 담기(itemDetail.html>장바구니)
  const itemBuyCart=document.querySelector(".itemBuyBtn>.goCart")
  itemBuyCart.addEventListener('click', e => {
      
      //   클릭한 옵션값 선택
      const selectOption=document.querySelector(".option");
      function changeValue(){
          var value=document.querySelector(".option");
          var selectedValue=value.options[value.selectedIndex].value;
              console.log(selectedValue)
        }
        selectOption.addEventListener('change',changeValue)
  
      e.preventDefault();
      let param = {
          'sku_number' : sku,
          'itemOption' : selectedValue
          }           
  
      fetch("http://172.30.1.40:8000/users/cart", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(param),
      })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .then(function(){
          // alert('장바구니 페이지로 이동하시겠습니까?');
          window.location.href="http://127.0.0.1:5500/myinfoAll/add/add.html";
  
      }
      )
      .catch((error) => console.log("error:", error));
  }); 

  
  
  
  
  
  //* ----------------상품 리스트(특정 브랜드)/branditem.html---------------- *//
  // html파일에...
  
  
  //* ----------------상품 리스트(검색)/search.html---------------- *//
  
  // 클릭한 요소 가져와(ver1)
  // const a = document.querySelectorAll('.categoryMedium');
  // console.log(a);
  // clickedItem.forEach((el,index) => {
  //     el.onclick = (e) => {
         
  //         let categorySmall=e.target.innerText; //클릭한 요소(=clickedItem)
  //         let categoryMedium=e.target.parentElement.parentElement.parentElement.childNodes[1].innerText; //중간 카테고리(=categoryMedium)
  //         let gender=e.target.parentElement.parentElement.parentElement.childNodes[1].parentElement.parentElement.parentElement.childNodes[1].innerText;//대 카테고리(=gender)
          
  //         // e.preventDefault();
  //         e.target.href=`http://127.0.0.1:5500/search%20list/search.html?large_category=${gender}&medium_category=${categoryMedium}&small_category=${categorySmall}`;
  
  //         //상품 리스트 다 내놔
  //         // fetch(`http://172.168.41.89:8000/products/list`, {
  
  //         fetch(`http://172.30.1.40:8000/products/list?large_category=${gender}&medium_category=${categoryMedium}&small_category=${categorySmall}`, {
  //             method: "GET",
  //             headers: {
  //                 "Content-Type": "application/json",
  //             },
  //         })
  //         .then((response) => response.json())
  //         .then((response) => {
  
  //             // 가져온 상품 보여주기
  //             const searchItemListWrapper = document.querySelector('.searchItemWrapper>.itemListWrapper')
  //             const ul = document.createElement('ul');
  //             searchItemListWrapper.appendChild(ul);
          
  //             for (let i = 0; i < response.result.length; i += 1) {
  
  //                 const cart = document.createElement('img')
  //                 cart.setAttribute("class","cart")
  //                 cart.src="/images/shopping-cart.png";
  
  //                 const img = document.createElement('img')
  //                 img.setAttribute("class","itemImg")
  //                 img.src=response.result[i].itemImg[0];
  
  //                 const li = document.createElement('li');
              
  //                 const div = document.createElement('div');
  //                 div.setAttribute("class","itemBrand");
  
  //                 const div1 = document.createElement('div');
  //                 div1.setAttribute("class","itemName");
  
  //                 const div2 = document.createElement('div');
  //                 div2.setAttribute("class","price");
  
  //                 const div3 = document.createElement('div');
  //                 div3.setAttribute("class","skuNum");
              
  //                 ul.appendChild(li); 
  //                 li.appendChild(cart);
  //                 li.appendChild(img);
  //                 li.appendChild(div);
  //                 li.appendChild(div1);
  //                 li.appendChild(div2);
  //                 li.appendChild(div3);
  
  
  //                 div.textContent=response.result[i].itemBrand; 
  //                 div1.textContent=response.result[i].itemName; 
  //                 div2.textContent=response.result[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","); 
  //                 div3.textContent=response.result[i].skuNum; 
  //                 const price=document.querySelectorAll(".price");
  //                 price.toLocaleString()
  //             }   
  // })
  
  // }});  
  
  // // ver2
  // function searchRecomInit(){
  
  //     fetch("http://172.30.1.40:8000/products/list", {
  //         method: "GET",
  //         headers: {
  //             "Content-Type": "application/json",
  //         },
  //     })
  //     .then((response) => response.json())
  //     .then((response) => {
  
  //         // 클릭한 요소 가져와
  //         const a = document.querySelectorAll('.categoryMedium li>a');
  //         console.log(a)
  //         clickedItem.forEach((el,index) => {
  //         el.onclick = (e) => { 
             
  //             let categorySmall=e.target.innerText; //클릭한 요소(=clickedItem)
  //             let categoryMedium=e.target.parentElement.parentElement.parentElement.childNodes[1].innerText; //중간 카테고리(=categoryMedium)
  //             let gender=e.target.parentElement.parentElement.parentElement.childNodes[1].parentElement.parentElement.parentElement.childNodes[1].innerText;//대 카테고리(=gender)
              
  //             e.target.href=`http://127.0.0.1:5500/search%20list/search.html?large_category=${gender}&medium_category=${categoryMedium}&small_category=${categorySmall}`;
  //             e.preventDefault()
         
              
  
  
  //             //상품 리스트 다 내놔
  //             fetch(`http://172.30.1.40:8000/products/list?large_category=${gender}&medium_category=${categoryMedium}&small_category=${categorySmall}`, {
  //                 method: "GET",
  //                 headers: {
  //                     "Content-Type": "application/json",
  //                 },
  //             })
  //             .then((response) => response.json())
  //             .then((response) => {
  
  //                 const searchItemListWrapper = document.querySelector('.searchItemWrapper>.itemListWrapper')
  //                 const ul = document.createElement('ul');
  //                 searchItemListWrapper.appendChild(ul);
              
  //                 for (let i = 0; i < response.result.length; i += 1) {
  
  //                     const cart = document.createElement('img')
  //                     cart.setAttribute("class","cart")
  //                     cart.src="/images/shopping-cart.png";
  
  //                     const img = document.createElement('img')
  //                     img.setAttribute("class","itemImg")
  //                     img.src=response.result[i].itemImg[0];
  
  //                     const li = document.createElement('li');
                  
  //                     const div = document.createElement('div');
  //                     div.setAttribute("class","itemBrand");
  
  //                     const div1 = document.createElement('div');
  //                     div1.setAttribute("class","itemName");
  
  //                     const div2 = document.createElement('div');
  //                     div2.setAttribute("class","price");
  
  //                     const div3 = document.createElement('div');
  //                     div3.setAttribute("class","skuNum");
                  
  //                     ul.appendChild(li); 
  //                     li.appendChild(cart);
  //                     li.appendChild(img);
  //                     li.appendChild(div);
  //                     li.appendChild(div1);
  //                     li.appendChild(div2);
  //                     li.appendChild(div3);
  
  
  //                     div.textContent=response.result[i].itemBrand; 
  //                     div1.textContent=response.result[i].itemName; 
  //                     div2.textContent=response.result[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","); 
  //                     div3.textContent=response.result[i].skuNum; 
  //                     const price=document.querySelectorAll(".price");
  //                     price.toLocaleString()
         
  
  //                 }      
  
  //         })
  
  //         }});  
  //     }).catch(response => console.log(response))
  // }
  
  //     searchRecomInit()
  
      
  
  
    
  
  
  // 카테고리 대 필터(좌)>대
  // var filterDetail=document.querySelector('.filterDetail');//가려진 부분
  // var filterWrapper=document.querySelector('.filterWrapper'); //filterBox
  // var leftrightBtn=document.querySelector('.leftrightBtn');//필터 화살표(좌우)
  // var itemListWrapper=document.querySelector('.itemListWrapper');//상품리스트
  // var filter=document.querySelector('.filter');//'핕터'글자
  
 
  //   filter.addEventListener('click',()=>{
  //     filterDetail.classList.toggle('active');
  //     filterWrapper.classList.toggle('active');
  //     leftrightBtn.classList.toggle('active');
  //     itemListWrapper.classList.toggle('active');
  // })
 
  
  
  
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
  
  
  
  // 정렬필터(우)
  // var sortDetail=document.querySelector('.sortDetail');//가려진 부분
  // var sortWrapper=document.querySelector('.sortWrapper'); //sortingBox
  // var updownBtn=document.querySelector('.updownBtn'); //정렬 화살표(상하)
  
 
  //   sortWrapper.addEventListener('click',()=>{
  //     sortDetail.classList.toggle('active');
  //     sortWrapper.classList.toggle('active');
  //     updownBtn.classList.toggle('active');
  // })
  

  
  
  
  /* ----------------제품 상세/itemdetail.html---------------- */
  // 최종 확정 코드
  function showItemDetail(){
      window.location.href=`http://127.0.0.1:5500/item%20detail/itemdetail.html`;
  
      fetch("http://172.30.1.40:8000/products/list", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      })
      .then((response) => response.json())
      .then((response) => {
          console.log(response.result)
         
          // 좌//이미지
          const itemImgWrapper = document.querySelector('.buy>.itemDetail')
          const ul = document.createElement('ul');
          itemImgWrapper.appendChild(ul);
          ul.setAttribute("class","itemImages");
          for (let i = 0; i < response.result.itemImg.length; i += 1) {
              const li = document.createElement('li'); 
              itemImgWrapper.appendChild(li);  //사진 갯수만큼 li태그 추가
  
              const img = document.createElement('img');
              li.appendChild(img)
              img.src=response.result.itemImg[i];
          }
  
          //우//상품정보 
          const itemInfoWrapper = document.querySelector('.itemBuy>.itemDes')
          for (let i = 0; i < 4; i ++) {
              const className=['itemBrand','itemName','price','sale_price'];
              const li = document.createElement('li');
              itemInfoWrapper.appendChild(li); 
              li.textContent=response.result[4][className[i]] 
              li.setAttribute("class",className[i])
          }
  
         
  
        
  
          // 옵션 추가
          const select=document.querySelector(".itemBuyBtn>select")
          for(i=0;i<response.result[4]["itemOption"].length;i++){
              const option=document.createElement("option");
              select.appendChild(option);
              option.textContent=response.result[4]["itemOption"][i];
          }
  
          // 상품 상세 정보(sku,materials)
          const skuNum=document.querySelector(".informDes .skuNum")
          const materials=document.querySelector(".informDes .materials")
          skuNum.textContent=response.result[4]["skuNum"];
          materials.textContent=response.result[4]["materials"];
  
  
      // 추천 상품(현재 보고있는 상품과 성별,소카테고리,브랜드가 같은 제품을 객체에 담은 후 랜덤추출)
      const samBrand=response.result[4].itemBrand;
      const sameGender=response.result[4].gender;
      const sameCategoryMedium=response.result[4].categoryMedium;
      var sameBrandItemList = response.result.filter(item => { 
          if (item.itemBrand.includes(samBrand)  && item.gender.includes(sameGender) &&item.categoryMedium.includes(sameCategoryMedium)) { 
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
      for (let i = 0; i < randomRecomItem.length; i++) {
          const div=document.createElement('div');
          recomItemWrapper.appendChild(div); 
          div.setAttribute("class","RecomItem");  
  
          const recomDivClassName=["RecomItem__content","RecomItem__details"]
      
          for(let j=0;j<recomDivClassName.length;j++){
          const RecomItem=document.querySelectorAll(".RecomItem")
          const div=document.createElement('div');
          RecomItem[i].appendChild(div)
          div.setAttribute("class",recomDivClassName[j])
          }
  
  
          //추천상품명/가격
          const recomImgBox=document.querySelectorAll(".RecomItem__content");
          const imgTag=document.createElement('img')
          recomImgBox[i].appendChild(imgTag);
          imgTag.setAttribute("class","RecomItem__img");
  
          const RecomItem__img=document.querySelectorAll(".RecomItem__img");
          RecomItem__img[i].src=randomRecomItem[i]["itemImg"][0];
  
          const RecomItem__details=document.querySelectorAll(".RecomItem__details");
          
          const recomItemClassList=['itemName','price']
          for(let k=0;k<recomItemClassList.length;k++){
              const div = document.createElement('div');
              RecomItem__details[i].appendChild(div);
              div.setAttribute("class",recomItemClassList[k]);
          }
          const itemName=document.querySelectorAll(".RecomItem__details>.itemName")
          const price=document.querySelectorAll(".RecomItem__details>.price")
  
  
          itemName[i].textContent=randomRecomItem[i]["itemName"];  
          price[i].textContent=randomRecomItem[i]["price"];  
      }
  
       // 예상 수령일 계산
          var now = new Date();  // 오늘 날짜
          // 7일 뒤 날짜
          var arrival = new Date(now.setDate(now.getDate() + 7));	
          //7일 뒤 날짜에서 월,일 가져오기
          const month=arrival.getMonth()+1;
          const date=arrival.getDate();
          const arrivalMonth=document.querySelector('.expectedArrival .arrivalMonth');
          const arrivalDate= document.querySelector('.expectedArrival .arrivalDate');
          arrivalMonth.innerText=month;
          arrivalDate.innerText=date;
  
          
          //   클릭한 옵션값 선택
              const itemSku=document.querySelector(".skuNum").innerText;
          //   클릭한 옵션값 선택
              // console.log(itemSku)
          const selectOption=document.querySelector(".option");
          function changeValue(){
                  var value=document.querySelector(".option");
                  selectedValue=value.options[value.selectedIndex].value;
                  // console.log(selectedValue)
              }
              selectOption.addEventListener('change',changeValue)
              const itemBuyCart=document.querySelector(".itemBuyBtn>.goCart")
  
              itemBuyCart.addEventListener('click', e => {
                  
                  e.preventDefault();
                  let param = {
                      'sku_number' : itemSku,
                      'itemOption' : selectedValue
                      }           
  
                  fetch("http://172.30.1.40:8000/users/cart", {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                          // Authorization: localStorage.getItem('login-token')
                      },
                      body: JSON.stringify(param),
                  })
                  .then((response) => response.json())
                  .then((response) => console.log(response))
                  .then(function(){
                      alert('장바구니 페이지로 이동하시겠습니까?');
                  }
                  )
                  .catch((error) => console.log("error:", error));
      }); 
      
      })
    }
  
  
  
     
  
  
  
   
  /* ----------------내 정보(통합)/myinfoAll.html---------------- */
  
  // 주소 검색(by kakao)
  function findAddr(){
      new daum.Postcode({
          oncomplete: function(data) {
              // console.log(data);
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
  
  // 주소 저장(성공)
  const saveAddressBtn=document.querySelector(".myInfoAddress #save");
  const member_post_Default=document.querySelector(".myInfoAddress #member_post");
  const member_addr_Default=document.querySelector(".myInfoAddress #member_addr");
  const addr_detail_Default=document.querySelector(".myInfoAddress #addr_detail");
  
  function getAddressValue(){
      member_post=document.querySelector(".myInfoAddress #member_post").value;
      member_addr=document.querySelector(".myInfoAddress #member_addr").value
      addr_detail=document.querySelector(".myInfoAddress #addr_detail").value;
  }
  
  
  member_post_Default.addEventListener("onkeyup",getAddressValue);
  member_addr_Default.addEventListener("onkeyup",getAddressValue);
  addr_detail_Default.addEventListener("onkeyup",getAddressValue);
  
  
  saveAddressBtn.addEventListener('click', e => {
      e.preventDefault();
      let param = {
          'post_number' : member_post,
          'address1' : member_addr,
          'address2' : addr_detail,
          }       
      let token = localStorage.getItem('login-token');      
      fetch("http://172.30.1.40:8000/users/register/location", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: token
          },
          body: JSON.stringify(param),
      })
      .then((response) => response.json())
      .then((response) => {
          alert("주소 저장이 완료되었습니다.")
      })
      .catch((error) => console.log("error:", error));
  }); 
  
  const member_post_saved=document.querySelector(".myInfoAddress #member_post").value;
  const member_addr_saved=document.querySelector(".myInfoAddress #member_addr").value;
  const addr_detail_saved=document.querySelector(".myInfoAddress #addr_detail").value;
  
  
  
  //저장해둔 주소 노출
  fetch("http://172.30.1.40:8000/users/register/location", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem('login-token')
          }   
      })
      .then((response) => response.json())
      .then((response) => {
  
          const member_post_saved=response.result.post_number;
          const member_addr_saved=response.result.address1;
          const addr_detail_saved=response.result.address2;
  
          if(member_post_saved&&member_addr_saved&&addr_detail_saved){
              member_post_Default.value=member_post_saved;
              member_addr_Default.value=member_addr_saved;
              addr_detail_Default.value=addr_detail_saved;
          }
      })
      .catch((error) => console.log("error:", error));
  
  
  
  
  
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
  
  
  
  //  장바구니, 주문창 총 금액 계산
 
      const totalAmount=document.querySelector(".totalAmount>span");
      const prices=document.querySelectorAll(".price");
      const priceArry=[];
      for(i=0;i<prices.length;i++){
          priceArry.push(Number(prices[i].innerText));
      }
      const sum = priceArry.reduce((a,b) => (a+b));
      totalAmount.textContent=sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","); 
   
  
  
  
  
  
  
  
  /* ----------------결제/pay.html---------------- */
 
  
  //     //결제 수단 선택
  //     const creditCard=document.querySelector('#creditCard')
  //     const transfer=document.querySelector('#transfer')
  
  //     creditCard.addEventListener('click',()=>{
  //         creditCard.style.backgroundColor="black";
  //         creditCard.style.color="white";
  //         transfer.style.backgroundColor="transparent";
  //         transfer.style.color="black";
  
  //     })
  
  //     transfer.addEventListener('click',()=>{
  //         transfer.style.backgroundColor="black";
  //         transfer.style.color="white";
  //         creditCard.style.backgroundColor="transparent";
  //         creditCard.style.color="black";
  //     })
  
  
  //     //전체 동의
  //     function selectAll(selectAll)  {
  //         const checkboxes = document.getElementsByName('agree');
          
  //         checkboxes.forEach((checkbox) => {
  //         checkbox.checked = selectAll.checked;
  //         })
  //     }
 
  
  
  /* ----------------결제 완료/paydone.html---------------- */
  
  /* ----------------앱 소개/appDown.html---------------- */
  
  // // //스크롤 이동
  // const circles = document.querySelectorAll(".circle");
  // const contents = document.querySelectorAll(".appinfo");
  // const firstTop = contents[0].offsetTop;
  // const secondTop = contents[1].offsetTop;
  // const thirdTop = contents[2].offsetTop;
  // const fourTop = contents[3].offsetTop;
  
   
  // circles[0].onclick = function(e){
  //   window.scroll({top:firstTop, behavior: 'smooth'})
  //   circles[0].style.backgroundColor="black";
  //   circles[1].style.backgroundColor="transparent";
  //   circles[2].style.backgroundColor="transparent";
  //   circles[3].style.backgroundColor="transparent";
  
  // }
  // circles[1].onclick = function(){
  //   window.scroll({top:secondTop, behavior: 'smooth'})
  //   circles[0].style.backgroundColor="transparent";
  //   circles[1].style.backgroundColor="black";
  //   circles[2].style.backgroundColor="transparent";
  //   circles[3].style.backgroundColor="transparent";
  // }
  // circles[2].onclick = function(){
  //   window.scroll({top:thirdTop, behavior: 'smooth'})
  //   circles[0].style.backgroundColor="transparent";
  //   circles[1].style.backgroundColor="transparent";
  //   circles[2].style.backgroundColor="black";
  //   circles[3].style.backgroundColor="transparent";
  // }
  
  // circles[3].onclick = function(){
  //   window.scroll({top:fourTop, behavior: 'smooth'})
  //   circles[0].style.backgroundColor="transparent";
  //   circles[1].style.backgroundColor="transparent";
  //   circles[2].style.backgroundColor="transparent";
  //   circles[3].style.backgroundColor="black";
  // }
  // ScrollReveal({ reset: true });
  // ScrollReveal().reveal('.show', { delay: 500 });
  
 
  
  
  
  
  
  /* ----------------회사 소개/usp.html---------------- */
  
  
  /* ----------------QnA/qna.html---------------- */
  
  
  
  
  // ----------------장바구니 상품 리스트 노출----------------
  function makeCartList(){
      fetch("http://172.30.1.40:8000/users/cart", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      })
      .then((response) => response.json())
      .then((response) => {
      
         
          // 장바구니에 5개 담겨있음
          for(let k=0;k<response.result.length;k++){
              // 장바구니에 있는 상품 노출(태그 완성)
              const addItemListWrapper=document.querySelector('.addListTable tbody');
              const tr = document.createElement('tr');
              addItemListWrapper.appendChild(tr);
  
              for(let i=0;i<5;i++){
                  const tdClassList=['addImg','contents','itemOption','itemQt','price'];
                  const td = document.createElement('td');
                  tr.appendChild(td);
                  td.setAttribute("class",tdClassList[i]);
              }
  
              const addImg=document.querySelectorAll("tbody .addImg");
              const img=document.createElement("img");
              addImg[k].appendChild(img);
              const imgInner=document.querySelectorAll(".addImg img");
              imgInner[k].src=response.result[k].image;
              
              const contents=document.querySelectorAll("tbody .contents");
              const contentsClassList=['itemBrand','itemName'];
              for(let j=0;j<contentsClassList.length;j++){
                  const div=document.createElement('div');
                  contents[k].appendChild(div);
                  div.setAttribute("class",contentsClassList[j]);
                  }
  
              const itemOption=document.querySelectorAll("tbody .itemOption");
              const price=document.querySelectorAll("tbody .price");
              const itemQt=document.querySelectorAll(".itemQt");
              const itemBrand=document.querySelectorAll(".itemBrand");
              const itemName=document.querySelectorAll(".itemName");
  
  
              itemBrand[k].textContent=response.result[k].brand;
              itemName[k].textContent=response.result[k].name;
  
  
              itemQt[k].textContent=response.result[k].quantity;
              itemOption[k].textContent=response.result[k].option;
              price[k].textContent=response.result[k].price;
  
          }
      })}
  
      makeCartList()
    
  
  
  
  
  
  // -----------------alert box----------
  // 주소저장
  // const saveAddressBtn=document.querySelector("#save");
  // function saveDone(){
  //     alert("주소 저장이 완료되었습니다.")
  // }
  // saveAddressBtn.addEventListener('click',saveDone)
  
  // 선택지 2개 이상일 시에는 Confirm
  //메인페이지 가기
//   const goMainPageBtn=document.querySelectorAll(".goMainPage")
//   function goMainPage(){
//     window.location.href="http://127.0.0.1:5500/main%20page/main.html";
// }
//   goMainPageBtn.addEventListener('click',goMainPage)