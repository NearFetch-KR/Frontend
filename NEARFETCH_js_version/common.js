// let AllItemList = JSON.parse(JSON.stringify(data));
/* ---------------공용---------------- */
// html include
function includeRouter(cb) {
  var content, file, xhttp, i;
  document.body.addEventListener("click", function (e) {
    file = e.target.getAttribute("route-link");
    if (file) {
      content = document.getElementById("content");
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            content.innerHTML = this.responseText;
            var scripts = content.getElementsByTagName("script");
            for (var i = 0; i < scripts.length; i++) {
              eval(scripts[i].text);
            }
            setTimeout(function () {
              cb(e);
            }, 0);
          }
          if (this.status == 404) {
            content.innerHTML = "Page not found.";
          }
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
    }
  });
}

function includeHTML(callback) {
  var z, i, elmnt, file, xhr;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("include-html");
    //console.log(file);
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("include-html");
          includeHTML(callback);
        }
      };
      xhr.open("GET", file, true);
      xhr.send();
      /*exit the function:*/
      return;
    }
  }
  setTimeout(function () {
    callback();
  }, 0);
}

includeHTML(function () {
  includeRouter(function () {});
});

// -----------전 페이지에서 파라미터로 사용할 것들-----------
urlParams = new URLSearchParams(location.search);
gender = urlParams.get("gender");
categoryMedium = urlParams.get("categoryMedium");
categorySmall = urlParams.get("categorySmall");
sale = urlParams.get("sale");
brand = urlParams.get("brand");
selectedValue = urlParams.get("selectedValue");
highToRow = urlParams.get("highToRow");
rowToHigh = urlParams.get("rowToHigh");
views = urlParams.get("views");

// /* -----------상단 Navbar 펼치기(Designers,여성,남성,Sale----------- */
function spreadNavbar() {
  var navBar = document.getElementById("myTopnav");
  if (navBar.className === "topnav") {
    navBar.className += " responsive";
  } else {
    navBar.className = "topnav";
  }
}

// 필터 클릭 조건들 담을 객체
const data = {};

// 검색 결과가 없을 경우 실행 함수
function noResult() {
  if (response.result.length == 0) {
    ul.innerText = "검색되는 상품이 없습니다🙅🏻‍♀️";
    ul.style.fontSize = "50px";
    ul.style.fontWeight = "300";
    ul.style.textAlign = "center";
    ul.style.display = "block";
  }
}

// /* -----------로그인&회원가입(모달창&기능)----------- */

window.onload = function () {
  console.log("로그인 성공 시 로그인 버튼 사라짐");
  if (
    localStorage.getItem("login-token") ||
    localStorage.getItem("kakao_d00e298d264188749cec865d2f70fa40")
  ) {
    document.getElementById("loginBtn").style.display = "none";
    
  } else {
    document.getElementById("loginBtn").innerText = "로그인";
  }

  // 검색
  function goSearch() {
    document.myForm.action = `http://127.0.0.1:5500/NEARFETCH_js_version/search%20list/search.html`;
    const keyword_default = document.querySelector("form .keyword");
    searchItemList();
  }

  const form = document.querySelector(".itemCategory .form");
  console.log("form test");
  form.addEventListener("submit", goSearch);

  //   로그인 모달창
  var loginModal = document.getElementById("loginModal");
  var loginBtn = document.getElementById("loginBtn");
  var loginClose = document.querySelector(".loginClose");

  loginBtn.onclick = function () {
    loginModal.style.display = "block";

        // 로그인(기능)
      const mailLogin = document.querySelector(".login .mailLogin");
      mailLogin.addEventListener("click", (e) => {
        let mail = document.querySelector(
          ".loginInfoWrapper .inputWrapper #loginMail"
        ).value;
        let pw = document.querySelector(
          ".loginInfoWrapper .inputWrapper #loginPW"
        ).value;
        e.preventDefault();
        let param = {
          email: mail,
          password: pw,
        };
        fetch("http://13.209.72.165:8000/users/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(param),
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.message == "SUCCESS") {
              localStorage.setItem("login-token", response.access_token);
              alert("로그인 성공");
              document.getElementById("loginModal").style.display = "none";
            } else if (response.message == "INVALID_EMAIL") {
              alert(
                "올바르지 않은 이메일 주소입니다. 다른 이메일 주소를 입력해주세요."
              );
            } else if (response.message == "INVALID_PASSWORD") {
              alert("올바르지 않은 비밀번호입니다. 다시 입력해주세요.");
            }
          })
          .catch((error) => console.log("error:", error));
      });

      // 카카오 로그인
      Kakao.init("c06d45d83cfbe0482ac643895bc7aea1"); //발급받은 키 중 javascript키를 사용해준다.
      console.log(Kakao.isInitialized()); // sdk초기화여부판단
      function kakaoLogin() {
        Kakao.Auth.login({
          success: function (response) {
            Kakao.API.request({
              url: "/v2/user/me",
              success: function (response) {
                console.log(response);
              },
              fail: function (error) {
                console.log(error);
              },
            });
          },
          fail: function (error) {
            console.log(error);
          },
        });
      }
      const kakaoLoginBtn = document.querySelectorAll(".kakaoLogin");
      for (let i = 0; i < kakaoLoginBtn.length; i++) {
        kakaoLoginBtn[i].addEventListener("click", kakaoLogin);
      }
  };

  loginClose.onclick = function () {
    loginModal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == loginModal) {
      loginModal.style.display = "none";
    }
  };

  //   회원가입 모달창
  var registerModal = document.getElementById("registerModal");
  var registerBtn = document.getElementById("registerBtn");
  var registerClose = document.querySelector(".registerClose");

  registerBtn.onclick = function () {
    registerModal.style.display = "block";
  };

  registerClose.onclick = function () {
    registerModal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == registerModal) {
      registerModal.style.display = "none";
    }
  };

  //회원가입(기능)
  const mailRegister = document.querySelector(".goRegister");
  mailRegister.addEventListener("click", (e) => {
    let name = document.querySelector(
      ".registerBtnWrapper .inputWrapper #name"
    ).value;
    let mail = document.querySelector(
      ".registerBtnWrapper .inputWrapper #registerMail"
    ).value;
    let pw = document.querySelector(
      ".registerBtnWrapper .inputWrapper #registerPW"
    ).value;

  
    e.preventDefault();
    let param = {
      name: name,
      email: mail,
      password: pw,
    };
    fetch("http://13.209.72.165:8000/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.message == "SUCCESS") {
          alert("회원가입이 완료되었습니다. 로그인을 진행해주세요.");
          document.getElementById("registerModal").style.display = "none";
        } else if (response.message == "INVALID_EMAIL") {
          alert("이미 존재하는 이메일입니다. 다른 이메일 주소를 입력해주세요.");
        } else if (response.message == "INVALID_PASSWORD") {
          alert("올바른 양식으로 입력해주세요.");
        }
      })
      .catch((error) => {
        console.log("error:", error);
      });
  });

 

  
};

// ---------------할인 가격 같이 보여주기---------------

function priceShow() {
  const price = document.querySelectorAll(" .price");
  const sale_price = document.querySelectorAll(" .sale_price");

  for (let i = 0; i < price.length; i++) {
    if (sale_price[i].innerText == "") {
      //  할인가격 보여주기
      price[i].style.display = "block";
      sale_price[i].style.display = "none";
      price[i].textContent = price[i].textContent
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      sale_price[i].style.display = "block";
      price[i].style.textDecoration = "line-through";
      sale_price[i].textContent = sale_price[i].textContent
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
}
function fetchCart(){
  
    let text = "장바구니로 이동하시겠습니까?";
    if (confirm(text) == true) {
      window.location.href =
        "http://127.0.0.1:5500/NEARFETCH_js_version/myinfoAll/cart.html";
    }
  
}



// -----------카트 로고 눌러서 장바구니 담기-----------
function goCart() {
  const cartBtn = document.querySelectorAll(".cart");
  cartBtn.forEach((el, index) => {
    el.onclick = (e) => {
      let parentTag = e.target.parentElement; //클릭한 요소의 부모 태그 전체
      let sku = parentTag.childNodes[6].innerText;
      let param = {
        sku_number: sku,
      };

      fetch("http://13.209.72.165:8000/users/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("login-token"),
        },
        body: JSON.stringify(param),
      })
        .then((response) => response.json())
        .then((response) => console.log(response))
        .then(
          fetchCart()
          )
        .catch((error) => console.log("error:", error));
    };
  });
}

// -----------navbar카테고리 리스트 생성-----------
fetch(`http://13.209.72.165:8000/products/make/category`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((response) => {
    const women_categoryMedium_clothing = document.querySelector(
      ".women_categoryMedium_clothing"
    );

    for (let i = 0; i < response.women.clothing.length; i++) {
      const liTag = document.createElement("li");
      women_categoryMedium_clothing.appendChild(liTag);
      const aTag = document.createElement("a");
      const li = document.querySelectorAll(".women_categoryMedium_clothing li");
      li[i].appendChild(aTag);

      const a = document.querySelectorAll(
        ".women_categoryMedium_clothing li>a"
      );
      a[i].textContent = response.women.clothing[i];

      a[
        i
      ].href = `/NEARFETCH_js_version/search%20list/searchCategory.html?categorySmall=${response.women.clothing[i]}&categoryMedium=clothing&gender=WOMEN`;
    }

    const women_categoryMedium_shoes = document.querySelector(
      ".women_categoryMedium_shoes"
    );

    for (let i = 0; i < response.women.shoes.length; i++) {
      const liTag = document.createElement("li");
      women_categoryMedium_shoes.appendChild(liTag);
      const aTag = document.createElement("a");
      const li = document.querySelectorAll(".women_categoryMedium_shoes li");
      li[i].appendChild(aTag);

      const a = document.querySelectorAll(".women_categoryMedium_shoes li>a");
      a[i].textContent = response.women.shoes[i];

      a[
        i
      ].href = `/NEARFETCH_js_version/search%20list/searchCategory.html?categorySmall=${response.women.shoes[i]}&categoryMedium=shoes&gender=WOMEN`;
    }

    const women_categoryMedium_bags = document.querySelector(
      ".women_categoryMedium_bags"
    );
    for (let i = 0; i < response.women.bags.length; i++) {
      const liTag = document.createElement("li");
      women_categoryMedium_bags.appendChild(liTag);
      const aTag = document.createElement("a");
      const li = document.querySelectorAll(".women_categoryMedium_bags li");
      li[i].appendChild(aTag);

      const a = document.querySelectorAll(".women_categoryMedium_bags li>a");
      a[i].textContent = response.women.bags[i];

      a[
        i
      ].href = `/NEARFETCH_js_version/search%20list/searchCategory.html?categorySmall=${response.women.bags[i]}&categoryMedium=bags&gender=WOMEN`;
    }

    const women_categoryMedium_accessories = document.querySelector(
      ".women_categoryMedium_accessories"
    );
    for (let i = 0; i < response.women.accessories.length; i++) {
      const liTag = document.createElement("li");
      women_categoryMedium_accessories.appendChild(liTag);
      const aTag = document.createElement("a");
      const li = document.querySelectorAll(
        ".women_categoryMedium_accessories li"
      );
      li[i].appendChild(aTag);

      const a = document.querySelectorAll(
        ".women_categoryMedium_accessories li>a"
      );
      a[i].textContent = response.women.accessories[i];

      a[
        i
      ].href = `/NEARFETCH_js_version/search%20list/searchCategory.html?categorySmall=${response.women.accessories[i]}&categoryMedium=accessories&gender=WOMEN`;
    }

    const men_categoryMedium_clothing = document.querySelector(
      ".men_categoryMedium_clothing"
    );
    for (let i = 0; i < response.men.clothing.length; i++) {
      const liTag = document.createElement("li");
      men_categoryMedium_clothing.appendChild(liTag);
      const aTag = document.createElement("a");
      const li = document.querySelectorAll(".men_categoryMedium_clothing li");
      li[i].appendChild(aTag);

      const a = document.querySelectorAll(".men_categoryMedium_clothing li>a");
      a[i].textContent = response.men.clothing[i];

      a[
        i
      ].href = `/NEARFETCH_js_version/search%20list/searchCategory.html?categorySmall=${response.men.clothing[i]}&categoryMedium=clothing&gender=MEN`;
    }

    const men_categoryMedium_shoes = document.querySelector(
      ".men_categoryMedium_shoes"
    );
    for (let i = 0; i < response.men.shoes.length; i++) {
      const liTag = document.createElement("li");
      men_categoryMedium_shoes.appendChild(liTag);
      const aTag = document.createElement("a");
      const li = document.querySelectorAll(".men_categoryMedium_shoes li");
      li[i].appendChild(aTag);

      const a = document.querySelectorAll(".men_categoryMedium_shoes li>a");
      a[i].textContent = response.men.shoes[i];

      a[
        i
      ].href = `/NEARFETCH_js_version/search%20list/searchCategory.html?categorySmall=${response.men.shoes[i]}&categoryMedium=shoes&gender=MEN`;
    }

    const men_categoryMedium_bags = document.querySelector(
      ".men_categoryMedium_bags"
    );
    for (let i = 0; i < response.men.bags.length; i++) {
      const liTag = document.createElement("li");
      men_categoryMedium_bags.appendChild(liTag);
      const aTag = document.createElement("a");
      const li = document.querySelectorAll(".men_categoryMedium_bags li");
      li[i].appendChild(aTag);

      const a = document.querySelectorAll(".men_categoryMedium_bags li>a");
      a[i].textContent = response.men.bags[i];

      a[
        i
      ].href = `/NEARFETCH_js_version/search%20list/searchCategory.html?categorySmall=${response.men.bags[i]}&categoryMedium=bags&gender=MEN`;
    }

    const men_categoryMedium_accessories = document.querySelector(
      ".men_categoryMedium_accessories"
    );
    for (let i = 0; i < response.men.accessories.length; i++) {
      const liTag = document.createElement("li");
      men_categoryMedium_accessories.appendChild(liTag);
      const aTag = document.createElement("a");
      const li = document.querySelectorAll(
        ".men_categoryMedium_accessories li"
      );
      li[i].appendChild(aTag);

      const a = document.querySelectorAll(
        ".men_categoryMedium_accessories li>a"
      );
      a[i].textContent = response.men.accessories[i];

      a[
        i
      ].href = `/NEARFETCH_js_version/search%20list/searchCategory.html?categorySmall=${response.men.accessories[i]}&categoryMedium=accessories&gender=MEN`;
    }

    const women_categoryMedium_sale = document.querySelector(
      ".women_categoryMedium_sale"
    );
    for (let i = 0; i < Object.keys(response.women).length; i++) {
      const liTag = document.createElement("li");
      women_categoryMedium_sale.appendChild(liTag);
      const aTag = document.createElement("a");
      const li = document.querySelectorAll(".women_categoryMedium_sale li");
      li[i].appendChild(aTag);

      const a = document.querySelectorAll(".women_categoryMedium_sale li>a");
      a[i].textContent = Object.keys(response.women)[i];

      a[
        i
      ].href = `/NEARFETCH_js_version/search%20list/searchCategory.html?categoryMedium=${
        Object.keys(response.women)[i]
      }&gender=WOMEN&sale=true`;
    }
    const men_categoryMedium_sale = document.querySelector(
      ".men_categoryMedium_sale"
    );
    for (let i = 0; i < Object.keys(response.men).length; i++) {
      const liTag = document.createElement("li");
      men_categoryMedium_sale.appendChild(liTag);
      const aTag = document.createElement("a");
      const li = document.querySelectorAll(".men_categoryMedium_sale li");
      li[i].appendChild(aTag);

      const a = document.querySelectorAll(".men_categoryMedium_sale li>a");
      a[i].textContent = Object.keys(response.men)[i];

      a[
        i
      ].href = `/NEARFETCH_js_version/search%20list/searchCategory.html?categoryMedium=${
        Object.keys(response.women)[i]
      }&gender=MEN&sale=true`;
    }
  });

// -------------------------필터&정렬-------------------------
const filterAll = []; //
function sorter(){
  var sortDetail = document.querySelector(".sortDetail"); //가려진 부분
  var sortWrapper = document.querySelector(".sortWrapper"); //sortingBox
  var updownBtn = document.querySelector(".updownBtn"); //정렬 화살표(상하)
  sortWrapper.addEventListener("click", () => {
    sortDetail.classList.toggle("active");
    sortWrapper.classList.toggle("active");
    updownBtn.classList.toggle("active");
  });

  const highToRow = document.querySelector(".sortDetail .highToRow a"); //높은가격순
  const rowToHigh = document.querySelector(".sortDetail .rowToHigh a"); //낮은가격순
  const views = document.querySelector(".sortDetail .views a"); //인기순(=view순)
  const sortDetailList = [highToRow, rowToHigh, views];

  for (let k = 0; k < sortDetailList.length; k++) {
    sortDetailList[k].addEventListener("click", (e) => {
      let url = new URL(location.href);
      url.searchParams.set("order", sortDetailList[k].innerText);
      sortDetailList[k].href = url.toString();
    });
  }
}

function filter(){
  console.log('filter')
}

