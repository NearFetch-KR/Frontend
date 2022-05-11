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
selectedValue = urlParams.get("selectedValue");

// /* -----------상단 Navbar 펼치기(Designers,여성,남성,Sale----------- */

function spreadNavbar() {
  var navBar = document.getElementById("myTopnav");
  if (navBar.className === "topnav") {
    navBar.className += " responsive";
  } else {
    navBar.className = "topnav";
  }
}

// /* -----------로그인&회원가입(모달창&기능)----------- */
window.onload = function () {
  console.log("로그인모달창 테스트");
  function goSearch() {
    document.myForm.action = `http://127.0.0.1:5500/NEARFETCH_js_version/search%20list/search.html`;
    const keyword_default = document.querySelector("form .keyword");
    searchItemList();
  }
  const form = document.querySelector(".itemCategory form");
  form.addEventListener("submit", goSearch);

  //   로그인 모달창
  var loginModal = document.getElementById("loginModal");
  var loginBtn = document.getElementById("loginBtn");
  var loginClose = document.querySelector(".loginClose");

  loginBtn.onclick = function () {
    loginModal.style.display = "block";
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
      ".registerBtnWrapper .inputWrapper #mail"
    ).value;
    let pw = document.querySelector(
      ".registerBtnWrapper .inputWrapper #password"
    ).value;
    e.preventDefault();
    let param = {
      name: name,
      email: mail,
      password: pw,
    };
    fetch("http://172.30.1.52:8000/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("회원가입이 완료되었습니다. 로그인을 진행해주세요.");
        document.getElementById("registerModal").style.display = "none";
      })
      .catch((error) => console.log("error:", error));
  });

  console.log("로그인상태 테스트");
  if (localStorage.getItem("login-token")) {
    document.querySelector(".InfoMenu #loginBtn").innerText = "로그아웃";
    // console.log(document.getElementById("loginBtn"));
    document.querySelector("#logout").innerText = "로그아웃";
  } else {
    document.querySelector(".InfoMenu #loginBtn").innerText = "로그인";
    document.querySelector("#logout").innerText = "로그인";
  }

  // 로그인(기능)
  const mailLogin = document.querySelector(".login .mailLogin");
  mailLogin.addEventListener("click", (e) => {
    let mail = document.querySelector(
      ".loginInfoWrapper .inputWrapper #mail"
    ).value;
    let pw = document.querySelector(
      ".loginInfoWrapper .inputWrapper #password"
    ).value;
    e.preventDefault();
    let param = {
      email: mail,
      password: pw,
    };
    fetch("http://172.30.1.52:8000/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.access_token) {
          localStorage.setItem("login-token", response.access_token);
          alert("로그인 성공");
          document.getElementById("loginModal").style.display = "none";
        } else {
          alert("회원 정보를 재확인해주세요.");
        }
      })
      .catch((error) => console.log("error:", error));
  });

  // 카카오 로그인
  // Kakao.init('c06d45d83cfbe0482ac643895bc7aea1'); //발급받은 키 중 javascript키를 사용해준다.
  // // console.log(Kakao.isInitialized()); // sdk초기화여부판단
  // function kakaoLogin() {
  //     Kakao.Auth.login({
  //     success: function (response) {
  //         Kakao.API.request({
  //         url: '/v2/user/me',
  //         success: function (response) {
  //             console.log(response)
  //         },
  //         fail: function (error) {
  //             console.log(error)
  //         },
  //         })
  //     },
  //     fail: function (error) {
  //         console.log(error)
  //     },
  //     })
  // }
  // //카카오로그아웃
  // function kakaoLogout() {
  //     if (Kakao.Auth.getAccessToken()) {
  //     Kakao.API.request({
  //         url: '/v1/user/unlink',
  //         success: function (response) {
  //             console.log(response)
  //         },
  //         fail: function (error) {
  //         console.log(error)
  //         },
  //     })
  //     Kakao.Auth.setAccessToken(undefined)
  //     }
  // }

  //로그아웃(기능)
  const logoutBtn = document.querySelector(".infoBar #logout");
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let token = localStorage.getItem("login-token");
    fetch("http://172.30.1.52:8000/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        if (localStorage.getItem("login-token")) {
          localStorage.removeItem("login-token");
          alert("로그아웃 성공");
          window.location.href =
            "http://127.0.0.1:5500/NEARFETCH_js_version/main%20page/main.html";
        } else {
          alert("로그아웃 실패");
        }
      })
      .catch((error) => console.log("error:", error));
  });
};

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

      fetch("http://172.30.1.52:8000/users/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: localStorage.getItem('login-token')
        },
        body: JSON.stringify(param),
      })
        .then((response) => response.json())
        .then((response) => console.log(response))
        .then(function () {
          let text = "장바구니로 이동하시겠습니까?";
          if (confirm(text) == true) {
            window.location.href =
              "http://127.0.0.1:5500/NEARFETCH_js_version/myinfoAll/cart.html";
          }
        })
        .catch((error) => console.log("error:", error));
    };
  });
}

// -----------navbar카테고리 리스트 생성-----------
fetch(`http://172.30.1.52:8000/products/make/category`, {
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

// window.onload = function () {
//상품 카테고리 직접 눌러 search.html으로 이동

// category 정보를 입력

// const navCategoryList = document.querySelectorAll(".topnav");
// debugger;

/****
fetch("http://172.30.1.52:8000/products/list", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((response) => {
    //선택 카테고리(navbar 카테고리 선택)
    const navCategoryList = document.querySelectorAll(".topnav");
    const categoryLarge = document.querySelectorAll(".dropbtn");
    const categoryLargeArr = []; //라지카테고리 종류
    for (let i = 0; i < categoryLarge.length; i++) {
      categoryLargeArr.push(categoryLarge[i].innerText);
    }

    const categoryMid = document.querySelectorAll(".categoryMedium>a");
    const categoryMidArr = []; //미드카테고리 종류
    for (let i = 0; i < categoryMid.length; i++) {
      categoryMidArr.push(categoryMid[i].innerText);
    }

    const categorySmall = document.querySelectorAll(".categoryMedium li>a");
    const categorySmallArr = []; //스몰카테고리 종류
    for (let i = 0; i < categorySmall.length; i++) {
      categorySmallArr.push(categorySmall[i].innerText);
    }

    //   console.log(navCategoryList);
    navCategoryList.forEach((el, index) => {
      el.onclick = (e) => {
        const categorySmallItem = e.target.innerText; //스몰카테고리(=클릭한 자신)
        const categoryMidItem =
          e.target.parentElement.parentElement.parentElement.childNodes[1]
            .innerText; //미드카테고리
        const categoryLargeItem =
          e.target.parentElement.parentElement.parentElement.parentElement
            .parentElement.childNodes[1].innerText;

        //   현재 카테고리 위치
        //   document.querySelector("#currentGender>a").innerText =
        //     categoryMidItem;
        //   document.querySelector("#currentBrand>a").innerText =
        //     categorySmallItem;
        //클릭한 아이템이 라지카테고리 안에 해당될 때 =>라지카테고리,'','' 전달
        if (
          //소카테고리
          !(categorySmallItem == undefined) &&
          !(categoryMidItem == undefined) &&
          !(categoryLargeItem == undefined)
        ) {
          // console.log("이것은 소카테고리");
          let gender = categoryLargeItem;
          let categoryMedium = categoryMidItem;
          let categorySmall = categorySmallItem;
          // e.target.href = `/NEARFETCH_js_version/search%20list/searchCategory.html?categorySmall=${categorySmallItem}&categoryMidItem=${categoryMidItem}&categoryLargeItem=${categoryLargeItem}`;
          // e.preventDefault();
          //   localStorage.setItem("gender", categoryLargeItem);
          //   localStorage.setItem("categoryMedium", categoryMidItem);
          //   localStorage.setItem("categorySmall", categorySmallItem);
        } else if (
          categoryLargeItem == undefined &&
          !(categoryMidItem == undefined) &&
          !(categorySmallItem == undefined)
        ) {
          // console.log("이것은 중카테고리");
          let gender = categoryMidItem;
          let categoryMedium = categorySmallItem;
          let categorySmall = null;
          // e.target.href = `/NEARFETCH_js_version/search%20list/searchCategory.html?categorySmall=${categorySmallItem}&categoryMidItem=${categoryMidItem}&categoryLargeItem=${categoryLargeItem}`;

          //   localStorage.setItem("gender", categoryMidItem);
          //   localStorage.setItem("categoryMedium", categorySmallItem);
          //   localStorage.setItem("categorySmall", null);
        } else if (
          !(categorySmallItem == undefined) &&
          categoryMidItem == undefined &&
          categoryLargeItem == undefined
        ) {
          // console.log("이것은 대카테고리");
          let gender = categorySmallItem;
          let categoryMedium = null;
          let categorySmall = null;
          // e.target.href = `/NEARFETCH_js_version/search%20list/searchCategory.html?categorySmall=${categorySmallItem}&categoryMidItem=${categoryMidItem}&categoryLargeItem=${categoryLargeItem}`;

          //   localStorage.setItem("gender", categorySmallItem);
          //   localStorage.setItem("categoryMedium", null);
          //   localStorage.setItem("categorySmall", null);
        }

        //   e.target.href = `http://127.0.0.1:5500/search%20list/search.html?large_category=${gender}&medium_category=${categoryMedium}&small_category=${categorySmall}`;
      };
    });
    fetch(
      `http://172.30.1.52:8000/products/list?large_category=${gender}&medium_category=${categoryMedium}&small_category=${categorySmall}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.result);
      });

    // filterNsorter();
  });
// };
****/

// -------------------------필터&정렬-------------------------
function filterNsorter() {
  // 정렬(우)
  var sortDetail = document.querySelector(".sortDetail"); //가려진 부분
  var sortWrapper = document.querySelector(".sortWrapper"); //sortingBox
  var updownBtn = document.querySelector(".updownBtn"); //정렬 화살표(상하)
  sortWrapper.addEventListener("click", () => {
    sortDetail.classList.toggle("active");
    sortWrapper.classList.toggle("active");
    updownBtn.classList.toggle("active");
  });

  const highToRow = document.querySelector(".sortDetail .highToRow"); //높은가격순
  const rowToHigh = document.querySelector(".sortDetail .rowToHigh"); //낮은가격순
  const views = document.querySelector(".sortDetail .views"); //인기순(=view순)
  const sortDetailList = [highToRow, rowToHigh, views];

  for (let k = 0; k < sortDetailList.length; k++) {
    sortDetailList[k].addEventListener("click", () => {
      fetch(
        `http://172.30.1.52:8000/products/list?order=${sortDetailList[k].innerText}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((response) => {
          const brandItemListWrapper =
            document.querySelector(".itemListWrapper");
          brandItemListWrapper.textContent = "";
          //   console.log(response.result);

          const ul = document.createElement("ul");
          brandItemListWrapper.appendChild(ul);

          for (let i = 0; i < response.result.length; i += 1) {
            const cart = document.createElement("img");
            cart.setAttribute("class", "cart");
            cart.src = "/images/shopping-cart.png";

            const aTag = document.createElement("a");
            aTag.setAttribute("class", "imgWrapAtag");
            aTag.href = `/NEARFETCH_js_version/item%20detail/itemdetail.html?sku=${response.result[i]["skuNum"]}`;

            const img = document.createElement("img");
            img.setAttribute("class", "itemImg");
            img.src = response.result[i].itemImg[0];

            const li = document.createElement("li");
            ul.appendChild(li);
            li.appendChild(cart);
            aTag.appendChild(img);
            li.appendChild(aTag);

            const classList = [
              "itemBrand",
              "itemName",
              "price",
              "sale_price",
              "skuNum",
            ];

            for (let k = 0; k < classList.length; k++) {
              const div = document.createElement("div");
              div.setAttribute("class", classList[k]);
              li.appendChild(div);
            }

            document.querySelectorAll(".itemListWrapper .itemBrand")[
              i
            ].innerText = response.result[i][classList[0]];
            document.querySelectorAll(".itemListWrapper .itemName")[
              i
            ].innerText = response.result[i][classList[1]];
            document.querySelectorAll(".itemListWrapper .price")[i].innerText =
              response.result[i][classList[2]];
            document.querySelectorAll(".itemListWrapper .sale_price")[
              i
            ].innerText = response.result[i][classList[3]];
            document.querySelectorAll(".itemListWrapper .skuNum")[i].innerText =
              response.result[i][classList[4]];
          }
        });
    });
  }

  // 카테고리 필터(좌)
  var filter_category = document.querySelector(".filter_category"); //가려진 부분
  var filterWrapper = document.querySelector(".filterWrapper"); //filterBox
  var filter = document.querySelector(".filter"); //
  var leftrightBtn = document.querySelector(".leftrightBtn"); //필터 화살표(좌우)
  var itemListWrapper = document.querySelector(".itemListWrapper"); //상품리스트
  var clicked_li = document.querySelectorAll(".filter_category li"); //필터 카테고리

  filter.addEventListener("click", () => {
    filter_category.classList.toggle("active");
    filterWrapper.classList.toggle("active");
    leftrightBtn.classList.toggle("active");
    itemListWrapper.classList.toggle("active");
  });

  //   팔터 클릭 시 클릭 상태 유지
  for (let i = 0; i < clicked_li.length; i++) {
    clicked_li[i].addEventListener("click", () => {
      clicked_li[i].classList.toggle("active");
    });
  }
  fetch(`http://172.30.1.52:8000/products/make/filter`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      const filter_gender_ul = document.querySelector(".filter_gender_ul");
      for (let i = 0; i < response.result.gender.length; i++) {
        const liTag = document.createElement("li");
        filter_gender_ul.appendChild(liTag);
        const aTag = document.createElement("a");
        const li = document.querySelectorAll(".filter_gender_ul li");
        li[i].appendChild(aTag);

        const a = document.querySelectorAll(".filter_gender_ul li>a");
        a[i].textContent = response.result.gender[i];
      }

      const filter_category_small_ul = document.querySelector(
        ".filter_category_small_ul"
      );
      for (let i = 0; i < response.result.categorySmall.length; i++) {
        const liTag = document.createElement("li");
        filter_category_small_ul.appendChild(liTag);
        const aTag = document.createElement("a");
        const li = document.querySelectorAll(".filter_category_small_ul li");
        li[i].appendChild(aTag);

        const a = document.querySelectorAll(".filter_category_small_ul li>a");
        a[i].textContent = response.result.categorySmall[i];
      }
    });

  clicked_li.forEach((el, index) => {
    el.onclick = (e) => {
      const filter_small = e.target.innerText; //스몰카테고리(=클릭한 자신)
      const filter_mid =
        e.target.parentElement.parentElement.childNodes[1].innerText; //상위카테고리

      const filteredList = document
        .querySelector(".filter_category")
        .getElementsByClassName("active");

      const data = {};
      data.gender = [];
      data.categorySmall = [];
      data.brand = [];

      for (let i = 0; i < filteredList.length; i++) {
        const aa =
          filteredList[i].parentElement.parentElement.childNodes[1].innerText;
        if (aa == "GENDER") {
          data.gender.push(filteredList[i].innerText);
        } else if (aa == "SMALL CATEGORY") {
          data.categorySmall.push(filteredList[i].innerText);
        } else if (aa == "BRAND") {
          data.brand.push(filteredList[i].innerText);
        }
      }

      const filterAll = [];

      for (let k = 0; k < Object.values(data).length; k++) {
        for (let j = 0; j < Object.keys(data).length; j++) {
          if (Object.values(data)[k][j] !== undefined) {
            filterAll.push(
              Object.keys(data)[k] + "=" + Object.values(data)[k][j]
            );
          }
        }
      }

      const filterAllList = filterAll.join("&");
      console.log(filterAllList);
      history.pushState(
        null,
        null,
        `/NEARFETCH_js_version/brand%20item%20list/branditem.html?brand=GUCCI&${filterAllList}`
      );

      //필터 적용하여 데이터 요청
      fetch(`http://172.30.1.52:8000/products/list${location.search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          https: console.log(response.result);
          document.querySelector(".hotBrandItem .itemListWrapper").textContent =
            "";
          const itemListWrapper = document.querySelector(
            ".hotBrandItem .itemListWrapper"
          );

          const ul = document.createElement("ul");
          itemListWrapper.appendChild(ul);

          //   상품리스트 UI에 뿌려주기
          for (let i = 0; i < response.result.length; i += 1) {
            const cart = document.createElement("img");
            cart.setAttribute("class", "cart");
            cart.src = "/images/shopping-cart.png";

            const aTag = document.createElement("a");
            aTag.setAttribute("class", "imgWrapAtag");
            aTag.href = `/NEARFETCH_js_version/item%20detail/itemdetail.html?sku=${response.result[i]["skuNum"]}`;

            const img = document.createElement("img");
            img.setAttribute("class", "itemImg");
            img.src = response.result[i].itemImg[0];

            const li = document.createElement("li");
            ul.appendChild(li);
            li.appendChild(cart);
            aTag.appendChild(img);
            li.appendChild(aTag);

            const classList = [
              "itemBrand",
              "itemName",
              "price",
              "sale_price",
              "skuNum",
            ];

            for (let k = 0; k < classList.length; k++) {
              const div = document.createElement("div");
              div.setAttribute("class", classList[k]);
              li.appendChild(div);
            }

            document.querySelectorAll(".itemListWrapper .itemBrand")[
              i
            ].innerText = response.result[i][classList[0]];
            document.querySelectorAll(".itemListWrapper .itemName")[
              i
            ].innerText = response.result[i][classList[1]];
            document.querySelectorAll(".itemListWrapper .price")[i].innerText =
              response.result[i][classList[2]];
            document.querySelectorAll(".itemListWrapper .sale_price")[
              i
            ].innerText = response.result[i][classList[3]];
            document.querySelectorAll(".itemListWrapper .skuNum")[i].innerText =
              response.result[i][classList[4]];
          }
        });
    };
  });

  var minSlider = document.getElementById("min");
  var maxSlider = document.getElementById("max");

  var outputMin = document.getElementById("min-value");
  var outputMax = document.getElementById("max-value");

  outputMin.innerHTML = minSlider.value;
  outputMax.innerHTML = maxSlider.value;

  minSlider.oninput = function () {
    outputMin.innerHTML = this.value;
  };

  maxSlider.oninput = function () {
    outputMax.innerHTML = this.value;
  };
}

//* ----------------상품 리스트(검색)/search.html---------------- *//
// case1.직접 검색하여 상품 찾기
function searchItemList() {
  keyword = urlParams.get("search");

  fetch(`http://172.30.1.52:8000/products/search?word=${keyword}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      //   console.log(response.result);
      const searchItemListWrapper = document.querySelector(
        ".searchItemWrapper .itemListWrapper"
      );
      const ul = document.createElement("ul");
      searchItemListWrapper.appendChild(ul);
      for (let i = 0; i < response.result.length; i += 1) {
        // 추천 상품(여성,bags 제품을 객체에 담은 후 랜덤추출)

        const cart = document.createElement("img");
        cart.setAttribute("class", "cart");
        cart.src = "/images/shopping-cart.png";
        const aTag = document.createElement("a");
        aTag.setAttribute("class", "imgWrapAtag");
        aTag.href = `/NEARFETCH_js_version/item%20detail/itemdetail.html?sku=${response.result[i]["skuNum"]}`;
        const img = document.createElement("img");
        img.setAttribute("class", "itemImg");
        img.src = response.result[i].itemImg[0];
        const li = document.createElement("li");
        ul.appendChild(li);
        li.appendChild(cart);
        aTag.appendChild(img);
        li.appendChild(aTag);
        const classList = [
          "itemBrand",
          "itemName",
          "price",
          "sale_price",
          "skuNum",
        ];
        for (let k = 0; k < classList.length; k++) {
          const div = document.createElement("div");
          div.setAttribute("class", classList[k]);
          li.appendChild(div);
        }
        document.querySelectorAll(".itemListWrapper .itemBrand")[i].innerText =
          response.result[i][classList[0]];
        document.querySelectorAll(".itemListWrapper .itemName")[i].innerText =
          response.result[i][classList[1]];
        document.querySelectorAll(".itemListWrapper .price")[i].innerText =
          response.result[i][classList[2]];
        document.querySelectorAll(".itemListWrapper .sale_price")[i].innerText =
          response.result[i][classList[3]];
        document.querySelectorAll(".itemListWrapper .skuNum")[i].innerText =
          response.result[i][classList[4]];
      }
      // 카트 로고 눌러서 장바구니 담기
      const cartBtn = document.querySelectorAll(".cart");
      cartBtn.forEach((el, index) => {
        el.onclick = (e) => {
          let parentTag = e.target.parentElement; //클릭한 요소의 부모 태그 전체
          let sku = parentTag.childNodes[6].innerText;
          e.preventDefault();

          let param = {
            sku_number: sku,
          };

          fetch("http://172.30.1.52:8000/users/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Authorization: localStorage.getItem('login-token')
            },
            body: JSON.stringify(param),
          })
            .then((response) => response.json())
            .then((response) => console.log(response))
            .then(function () {
              let text = "장바구니로 이동하시겠습니까?";
              if (confirm(text) == true) {
                window.location.href =
                  "http://127.0.0.1:5500/NEARFETCH_js_version/myinfoAll/cart.html";
              }
            })
            .catch((error) => console.log("error:", error));
        };
      });

      const highToRow = document.querySelector(".sortDetail .highToRow"); //높은가격순
      const rowToHigh = document.querySelector(".sortDetail .rowToHigh"); //낮은가격순
      const views = document.querySelector(".sortDetail .views"); //인기순(=view순)
      const sortDetailList = [highToRow, rowToHigh, views];
      for (let k = 0; k < sortDetailList.length; k++) {
        sortDetailList[k].addEventListener("click", () => {
          fetch(
            `http://172.30.1.52:8000/products/list?order=${sortDetailList[k].innerText}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
            .then((response) => {
              const brandItemListWrapper =
                document.querySelector(".itemListWrapper");
              brandItemListWrapper.textContent = "";
              //   console.log(response.result);

              const ul = document.createElement("ul");
              searchItemListWrapper.appendChild(ul);

              for (let i = 0; i < response.result.length; i += 1) {
                const cart = document.createElement("img");
                cart.setAttribute("class", "cart");
                cart.src = "/images/shopping-cart.png";

                const aTag = document.createElement("a");
                aTag.setAttribute("class", "imgWrapAtag");
                aTag.href =
                  "http://127.0.0.1:5500/NEARFETCH_js_version/item%20detail/itemdetail.html";

                const img = document.createElement("img");
                img.setAttribute("class", "itemImg");
                img.src = response.result[i].itemImg[0];

                const li = document.createElement("li");
                ul.appendChild(li);
                li.appendChild(cart);
                aTag.appendChild(img);
                li.appendChild(aTag);

                const classList = [
                  "itemBrand",
                  "itemName",
                  "price",
                  "sale_price",
                  "skuNum",
                ];

                for (let k = 0; k < classList.length; k++) {
                  const div = document.createElement("div");
                  div.setAttribute("class", classList[k]);
                  li.appendChild(div);
                }

                document.querySelectorAll(".itemListWrapper .itemBrand")[
                  i
                ].innerText = response.result[i][classList[0]];
                document.querySelectorAll(".itemListWrapper .itemName")[
                  i
                ].innerText = response.result[i][classList[1]];
                document.querySelectorAll(".itemListWrapper .price")[
                  i
                ].innerText = response.result[i][classList[2]];
                document.querySelectorAll(".itemListWrapper .sale_price")[
                  i
                ].innerText = response.result[i][classList[3]];
                document.querySelectorAll(".itemListWrapper .skuNum")[
                  i
                ].innerText = response.result[i][classList[4]];
              }
            });
        });
      }

      // 사진 클릭 시 상품상세보기 페이지로 이동
      //   const itemImg = document.querySelectorAll(".imgWrapAtag");
      //   itemImg.forEach((el, index) => {
      //     el.onclick = (e) => {
      //       // e.preventDefault();
      //       let parentTag = e.target.parentElement; //클릭한 요소의 부모 태그 전체
      //       let aa = parentTag.parentElement; //클릭한 요소의 부모 태그 전체
      //       let child = aa.childNodes; //클릭한 요소들의 형제 태그 전체
      //       sku = child[6].innerText;
      //       localStorage.setItem("sku", sku);
      //     };
      //   });
    });
  //   filterNsorter();
}

if (
  location.href.indexOf(
    "http://127.0.0.1:5500/NEARFETCH_js_version/search%20list/search.html"
  ) > -1
) {
  searchItemList();
}

// case2.navbar 카테고리 클릭하여 상품 찾기
function searchCategoryList() {
  fetch(
    `http://172.30.1.52:8000/products/list?small_category=${categorySmall}&medium_category=${categoryMedium}&large_category=${gender}&sale=${new URLSearchParams(
      location.search
    ).get("sale")}&brand=${new URLSearchParams(location.search).get("brand")}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response.result);
      const searchItemListWrapper = document.querySelector(
        ".searchItemWrapper .itemListWrapper"
      );

      const ul = document.createElement("ul");
      searchItemListWrapper.appendChild(ul);
      for (let i = 0; i < response.result.length; i += 1) {
        // 추천 상품(여성,bags 제품을 객체에 담은 후 랜덤추출)

        const cart = document.createElement("img");
        cart.setAttribute("class", "cart");
        cart.src = "/images/shopping-cart.png";
        const aTag = document.createElement("a");
        aTag.setAttribute("class", "imgWrapAtag");
        aTag.href = `/NEARFETCH_js_version/item%20detail/itemdetail.html?sku=${response.result[i]["skuNum"]}`;
        const img = document.createElement("img");
        img.setAttribute("class", "itemImg");
        img.src = response.result[i].itemImg[0];
        const li = document.createElement("li");
        ul.appendChild(li);
        li.appendChild(cart);
        aTag.appendChild(img);
        li.appendChild(aTag);
        const classList = [
          "itemBrand",
          "itemName",
          "price",
          "sale_price",
          "skuNum",
        ];
        for (let k = 0; k < classList.length; k++) {
          const div = document.createElement("div");
          div.setAttribute("class", classList[k]);
          li.appendChild(div);
        }
        document.querySelectorAll(".itemListWrapper .itemBrand")[i].innerText =
          response.result[i][classList[0]];
        document.querySelectorAll(".itemListWrapper .itemName")[i].innerText =
          response.result[i][classList[1]];
        document.querySelectorAll(".itemListWrapper .price")[i].innerText =
          response.result[i][classList[2]];
        document.querySelectorAll(".itemListWrapper .sale_price")[i].innerText =
          response.result[i][classList[3]];
        document.querySelectorAll(".itemListWrapper .skuNum")[i].innerText =
          response.result[i][classList[4]];
      }
      // 카트 로고 눌러서 장바구니 담기
      const cartBtn = document.querySelectorAll(".cart");
      cartBtn.forEach((el, index) => {
        el.onclick = (e) => {
          let parentTag = e.target.parentElement; //클릭한 요소의 부모 태그 전체
          let sku = parentTag.childNodes[6].innerText;
          e.preventDefault();

          let param = {
            sku_number: sku,
          };

          fetch("http://172.30.1.52:8000/users/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Authorization: localStorage.getItem('login-token')
            },
            body: JSON.stringify(param),
          })
            .then((response) => response.json())
            .then((response) => console.log(response))
            .then(function () {
              let text = "장바구니로 이동하시겠습니까?";
              if (confirm(text) == true) {
                window.location.href =
                  "http://127.0.0.1:5500/NEARFETCH_js_version/myinfoAll/cart.html";
              }
            })
            .catch((error) => console.log("error:", error));
        };
      });

      const highToRow = document.querySelector(".sortDetail .highToRow"); //높은가격순
      const rowToHigh = document.querySelector(".sortDetail .rowToHigh"); //낮은가격순
      const views = document.querySelector(".sortDetail .views"); //인기순(=view순)
      const sortDetailList = [highToRow, rowToHigh, views];
      for (let k = 0; k < sortDetailList.length; k++) {
        sortDetailList[k].addEventListener("click", () => {
          fetch(
            `http://172.30.1.52:8000/products/list?order=${sortDetailList[k].innerText}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
            .then((response) => {
              const brandItemListWrapper =
                document.querySelector(".itemListWrapper");
              brandItemListWrapper.textContent = "";
              //   console.log(response.result);

              const ul = document.createElement("ul");
              searchItemListWrapper.appendChild(ul);

              for (let i = 0; i < response.result.length; i += 1) {
                const cart = document.createElement("img");
                cart.setAttribute("class", "cart");
                cart.src = "/images/shopping-cart.png";

                const aTag = document.createElement("a");
                aTag.setAttribute("class", "imgWrapAtag");
                aTag.href =
                  "http://127.0.0.1:5500/NEARFETCH_js_version/item%20detail/itemdetail.html";

                const img = document.createElement("img");
                img.setAttribute("class", "itemImg");
                img.src = response.result[i].itemImg[0];

                const li = document.createElement("li");
                ul.appendChild(li);
                li.appendChild(cart);
                aTag.appendChild(img);
                li.appendChild(aTag);

                const classList = [
                  "itemBrand",
                  "itemName",
                  "price",
                  "sale_price",
                  "skuNum",
                ];

                for (let k = 0; k < classList.length; k++) {
                  const div = document.createElement("div");
                  div.setAttribute("class", classList[k]);
                  li.appendChild(div);
                }

                document.querySelectorAll(".itemListWrapper .itemBrand")[
                  i
                ].innerText = response.result[i][classList[0]];
                document.querySelectorAll(".itemListWrapper .itemName")[
                  i
                ].innerText = response.result[i][classList[1]];
                document.querySelectorAll(".itemListWrapper .price")[
                  i
                ].innerText = response.result[i][classList[2]];
                document.querySelectorAll(".itemListWrapper .sale_price")[
                  i
                ].innerText = response.result[i][classList[3]];
                document.querySelectorAll(".itemListWrapper .skuNum")[
                  i
                ].innerText = response.result[i][classList[4]];
              }
            });
        });
      }
    });
  //   filterNsorter();
}

if (
  location.href.indexOf(
    "http://127.0.0.1:5500/NEARFETCH_js_version/search%20list/searchCategory.html"
  ) > -1
) {
  searchCategoryList();
}

/* ----------------결제 완료/paydone.html---------------- */
// 가격
const price = document.querySelectorAll(".itemListWrapper .price");
//   console.log(price);
const sale_price = document.querySelectorAll(".itemListWrapper .sale_price");
for (let i = 0; i < sale_price.length; i++) {
  if (sale_price.innerText == null) {
    price[i].style.display = "block";
    sale_price[i].style.display = "none";
    price[i].textContent = price[i].textContent
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    sale_price[i].style.display = "block";
    price[i].style.display = "none";
    sale_price[i].textContent = sale_price[i].textContent
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
/* ----------------회사 소개/usp.html---------------- */

/* ----------------QnA/qna.html---------------- */

// -----------------alert box----------
