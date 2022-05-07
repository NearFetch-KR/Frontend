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
    fetch("http://172.30.1.19:8000/users/signup", {
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

  if (!localStorage.getItem("login-token")) {
    document.querySelector(".InfoMenu #loginBtn").innerText = "로그인";
    document.querySelector("#logout").innerText = "로그인";
  } else {
    document.querySelector(".InfoMenu #loginBtn").innerText = "로그아웃";
    document.querySelector("#logout").innerText = "로그아웃";
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
    fetch("http://172.30.1.19:8000/users/signin", {
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
          //   document.querySelector("#loginBtn").innerText = "로그아웃";
          //   document.querySelector("#logout").innerText = "로그아웃";
        } else {
          alert("회원 정보를 재확인해주세요.");
        }
      })
      .catch((error) => console.log("error:", error));
  });

  //로그아웃(기능)
  const logoutBtn = document.querySelector(".infoBar #logout");
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let token = localStorage.getItem("login-token");
    fetch("http://172.30.1.19:8000/users/logout", {
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
          //   document.getElementById("loginBtn").innerText = "로그인";
          //   document.querySelector("#logout").innerText = "로그인";
        } else {
          alert("로그아웃 실패");
        }
      })
      .catch((error) => console.log("error:", error));
  });

  //   검색(공용
  const keyword_default = document.querySelector("form .keyword");
  function getKeyword() {
    keyword = document.querySelector("form .keyword").value;
    localStorage.setItem("searchKeyword", keyword);
  }

  keyword_default.addEventListener("input", getKeyword);
  console.log(keyword_default);

  function goSearch() {
    document.myForm.action = `http://127.0.0.1:5500/NEARFETCH_js_version/search%20list/search.html`;
    searchItemList();
  }
  const form = document.querySelector(".itemCategory form");
  form.addEventListener("submit", goSearch);
};

// -----------main.html_마지막 섹션(추천 상품)-----------
function mainRecomInit() {
  fetch("http://172.30.1.19:8000/products/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      //   console.log(response.result);

      const mainRecomItemWrapper = document.querySelector(
        ".Recommend>.itemListWrapper"
      );
      const ul = document.createElement("ul");
      mainRecomItemWrapper.appendChild(ul);
      ul.setAttribute("class", "list");

      //추천할 상품 전체 추출(women,clothing)
      var recomItemList = response.result.filter((item) => {
        if (
          item.categoryMedium.includes("clothing") &&
          item.gender.includes("WOMEN")
        ) {
          return true;
        }
        return false;
      });

      // 중복값 제외한 추천상품 40개 뽑기
      var randomRecomItem = [];
      for (var i = 0; i < recomItemList.length; i++) {
        const randomItem =
          recomItemList[Math.floor(Math.random() * recomItemList.length)];
        if (!randomRecomItem.includes(randomItem)) {
          randomRecomItem.push(randomItem);
          if (randomRecomItem.length == 40) {
            //40개만 노출
            break;
          }
        } else {
          i--;
        }
      }

      //   상품리스트 UI에 뿌려주기
      for (let i = 0; i < randomRecomItem.length; i += 1) {
        // 추천 상품(여성,bags 제품을 객체에 담은 후 랜덤추출)
        const cart = document.createElement("img");
        cart.setAttribute("class", "cart");
        cart.src = "/images/shopping-cart.png";

        const aTag = document.createElement("a");
        aTag.setAttribute("class", "imgWrapAtag");
        aTag.href =
          "http://127.0.0.1:5500/NEARFETCH_js_version/item%20detail/itemdetail.html";

        const img = document.createElement("img");
        img.setAttribute("class", "itemImg");
        img.src = randomRecomItem[i].itemImg[0];

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
          randomRecomItem[i][classList[0]];
        document.querySelectorAll(".itemListWrapper .itemName")[i].innerText =
          randomRecomItem[i][classList[1]];
        document.querySelectorAll(".itemListWrapper .price")[i].innerText =
          randomRecomItem[i][classList[2]];
        document.querySelectorAll(".itemListWrapper .sale_price")[i].innerText =
          randomRecomItem[i][classList[3]];
        document.querySelectorAll(".itemListWrapper .skuNum")[i].innerText =
          randomRecomItem[i][classList[4]];
      }

      // 가격
      const price = document.querySelectorAll(".itemListWrapper .price");
      console.log(price);
      const sale_price = document.querySelectorAll(
        ".itemListWrapper .sale_price"
      );
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

      //   장바구니 로고 클릭 시 장바구니로 추가
      const cartBtn = document.querySelectorAll(".cart");
      cartBtn.forEach((el, index) => {
        el.onclick = (e) => {
          let parentTag = e.target.parentElement; //클릭한 요소의 부모 태그 전체
          let sku = parentTag.childNodes[6].innerText;
          e.preventDefault();

          let param = {
            sku_number: sku,
          };

          fetch("http://172.30.1.19:8000/users/cart", {
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
              alert("장바구니 페이지로 이동하시겠습니까?");
            })
            .catch((error) => console.log("error:", error));
        };
      });

      // 사진 클릭 시 상품상세보기 페이지로 이동
      const itemImg = document.querySelectorAll(".imgWrapAtag");
      itemImg.forEach((el, index) => {
        el.onclick = (e) => {
          // e.preventDefault();
          let parentTag = e.target.parentElement; //클릭한 요소의 부모 태그 전체
          let aa = parentTag.parentElement; //클릭한 요소의 부모 태그 전체
          let child = aa.childNodes; //클릭한 요소들의 형제 태그 전체
          sku = child[6].innerText;
          localStorage.setItem("sku", sku);
        };
      });
    });
}

mainRecomInit();

// 필터
function filterNsorter() {
  // 정렬필터(우)
  var sortDetail = document.querySelector(".sortDetail"); //가려진 부분
  var sortWrapper = document.querySelector(".sortWrapper"); //sortingBox
  var updownBtn = document.querySelector(".updownBtn"); //정렬 화살표(상하)
  sortWrapper.addEventListener("click", () => {
    sortDetail.classList.toggle("active");
    sortWrapper.classList.toggle("active");
    updownBtn.classList.toggle("active");
  });

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

  for (let i = 0; i < clicked_li.length; i++) {
    clicked_li[i].addEventListener("click", () => {
      clicked_li[i].classList.toggle("active");
    });
  }

  //    const filterList = document.querySelectorAll("filter_category li");
  //   var filteredGender=[];
  //   var filteredSmallCategory=[];
  //   var filteredBrand=[];
  clicked_li.forEach((el, index) => {
    el.onclick = (e) => {
      const filter_small = e.target.innerText; //스몰카테고리(=클릭한 자신)
      const filter_mid =
        e.target.parentElement.parentElement.childNodes[1].innerText; //상위카테고리

      //   console.log(filter_small, filter_mid);
      const filteredList = document
        .querySelector(".filter_category")
        .getElementsByClassName("active");

      //     console.log(filteredList)
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

      fetch(`http://172.30.1.19:8000/products/list?${filterAllList}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response.result);
        });
    };
  });
}

//   -----------itemdetail.html(=상품 상세보기 페이지) 에서만 해당 코드 실행-----------
if (
  location.href.indexOf(
    "http://127.0.0.1:5500/NEARFETCH_js_version/item%20detail/itemdetail.html"
  ) > -1
) {
  fetch("http://172.30.1.19:8000/products/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      //   const skuNum = localStorage.getItem("sku");
      fetch(
        `http://172.30.1.19:8000/products/detail/${localStorage.getItem(
          "sku"
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((response) => {
          // 좌//이미지
          const itemImgWrapper = document.querySelector(".buy>.itemDetail");
          const ul = document.createElement("ul");
          itemImgWrapper.appendChild(ul);
          ul.setAttribute("class", "itemImages");
          for (let i = 0; i < response.result.itemImg.length; i += 1) {
            const li = document.createElement("li");
            itemImgWrapper.appendChild(li); //사진 갯수만큼 li태그 추가

            const img = document.createElement("img");
            li.appendChild(img);
            img.src = response.result.itemImg[i];
          }

          //우//상품정보
          const itemInfoWrapper = document.querySelector(".itemBuy>.itemDes");
          for (let i = 0; i < 4; i++) {
            const className = ["itemBrand", "itemName", "price", "sale_price"];
            const li = document.createElement("li");
            itemInfoWrapper.appendChild(li);
            li.textContent = response.result[className[i]];
            li.setAttribute("class", className[i]);
          }

          // 옵션 추가
          const select = document.querySelector(".itemBuyBtn>select");
          for (i = 0; i < response.result["itemOption"].length; i++) {
            const option = document.createElement("option");
            select.appendChild(option);
            option.textContent = response.result["itemOption"][i];
          }

          // 상품 상세 정보(sku,materials)
          const skuNum = document.querySelector(".informDes .skuNum");
          const materials = document.querySelector(".informDes .materials");
          skuNum.textContent = response.result["skuNum"];
          materials.textContent = response.result["materials"];

          // 추천 상품(현재 보고있는 상품과 성별,소카테고리,브랜드가 같은 제품을 객체에 담은 후 랜덤추출)
          const samBrand = response.result.itemBrand;
          const sameGender = response.result.gender;
          const sameCategoryMedium = response.result.categoryMedium;

          // 예상 수령일 계산
          var now = new Date(); // 오늘 날짜
          var arrival = new Date(now.setDate(now.getDate() + 7)); // 7일 뒤 날짜

          //7일 뒤 날짜에서 월,일 가져오기
          const month = arrival.getMonth() + 1;
          const date = arrival.getDate();
          const arrivalMonth = document.querySelector(
            ".expectedArrival .arrivalMonth"
          );
          const arrivalDate = document.querySelector(
            ".expectedArrival .arrivalDate"
          );
          arrivalMonth.innerText = month;
          arrivalDate.innerText = date;

          //    현재 보고 있는 상품의 sku넘버/
          const itemSku =
            document.querySelector(".informDes .skuNum").innerText;

          //   클릭한 옵션값 선택
          const selectOption = document.querySelector(".option"); //select
          function changeValue() {
            let value = document.querySelector(".option");
            let selectedValue = value.options[value.selectedIndex].value;
            return selectedValue;
          }

          selectOption.addEventListener("change", changeValue);
          const itemBuyCart = document.querySelector(".itemBuyBtn .goCart");

          // 하단 추천상품 가져오기
          fetch(
            `http://172.30.1.19:8000/products/recommend?skuNum=${localStorage.getItem(
              "sku"
            )}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
            .then((response) => {
              const recomItemWrapper = document.querySelector(".row__inner");
              for (let i = 0; i < response.result.length; i++) {
                const div = document.createElement("div");
                recomItemWrapper.appendChild(div);
                div.setAttribute("class", "RecomItem");

                const recomDivClassName = [
                  "RecomItem__content",
                  "RecomItem__details",
                ];

                for (let j = 0; j < recomDivClassName.length; j++) {
                  const RecomItem = document.querySelectorAll(".RecomItem");
                  const div = document.createElement("div");
                  RecomItem[i].appendChild(div);
                  div.setAttribute("class", recomDivClassName[j]);
                }

                //추천상품명/가격
                const recomImgBox = document.querySelectorAll(
                  ".RecomItem__content"
                );
                const imgTag = document.createElement("img");
                recomImgBox[i].appendChild(imgTag);
                imgTag.setAttribute("class", "RecomItem__img");

                const RecomItem__img =
                  document.querySelectorAll(".RecomItem__img");
                RecomItem__img[i].src = response.result[i]["itemImg"][0];

                const RecomItem__details = document.querySelectorAll(
                  ".RecomItem__details"
                );

                const recomItemClassList = [
                  "itemBrand",
                  "itemName",
                  "price",
                  "sale_price",
                  "skuNum",
                  "itemOption",
                  "materials",
                ];
                for (let k = 0; k < recomItemClassList.length; k++) {
                  const div = document.createElement("div");
                  RecomItem__details[i].appendChild(div);
                  div.setAttribute("class", recomItemClassList[k]);
                }

                const itemBrand = document.querySelectorAll(
                  ".RecomItem__details>.itemBrand"
                );
                const itemName = document.querySelectorAll(
                  ".RecomItem__details>.itemName"
                );
                const price = document.querySelectorAll(
                  ".RecomItem__details>.price"
                );
                const sale_price = document.querySelectorAll(
                  ".RecomItem__details>.sale_price"
                );
                const skuNum = document.querySelectorAll(
                  ".RecomItem__details>.skuNum"
                );
                const itemOption = document.querySelectorAll(
                  ".RecomItem__details>.itemOption"
                );
                const materials = document.querySelectorAll(
                  ".RecomItem__details>.materials"
                );

                itemBrand[i].textContent = response.result[i]["itemBrand"];
                itemName[i].textContent = response.result[i]["itemName"];
                price[i].textContent = response.result[i]["price"];
                sale_price[i].textContent = response.result[i]["sale_price"];
                skuNum[i].textContent = response.result[i]["skuNum"];
                itemOption[i].textContent = response.result[i]["itemOption"];
                materials[i].textContent = response.result[i]["materials"];
              }

              // 가격
              const price = document.querySelectorAll(".price");
              const sale_price = document.querySelectorAll(".sale_price");
              for (let i = 0; i < sale_price.length; i++) {
                if (sale_price.innerText == null) {
                  price[i].style.display = "block";
                  sale_price[i].style.display = "none";
                } else {
                  sale_price[i].style.display = "block";
                  price[i].style.display = "none";
                }
              }

              //추천 상품 이미지 클릭 시 클릭한 상품 정보가 메인 자리로 이동
              const RecomItem__img =
                document.querySelectorAll(".RecomItem__img");
              RecomItem__img.forEach((el, index) => {
                el.onclick = (e) => {
                  let parentTag = e.target.parentElement;
                  let itemBrand =
                    parentTag.parentElement.childNodes[1].childNodes[0]
                      .innerText;
                  let itemName =
                    parentTag.parentElement.childNodes[1].childNodes[1]
                      .innerText;
                  let price =
                    parentTag.parentElement.childNodes[1].childNodes[2]
                      .innerText;
                  let sale_price =
                    parentTag.parentElement.childNodes[1].childNodes[3]
                      .innerText;
                  let skuNum =
                    parentTag.parentElement.childNodes[1].childNodes[4]
                      .innerText;
                  let itemOption =
                    parentTag.parentElement.childNodes[1].childNodes[5]
                      .innerText;
                  let materials =
                    parentTag.parentElement.childNodes[1].childNodes[6]
                      .innerText;
                  let RecomItem__img = parentTag.parentElement;

                  console.log(
                    itemBrand,
                    itemName,
                    price,
                    sale_price,
                    skuNum,
                    itemOption,
                    materials
                  );

                  localStorage.setItem("sku", skuNum);

                  fetch(`http://172.30.1.19:8000/products/detail/${skuNum}`, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                    .then((response) => response.json())
                    .then((response) => {
                      // 기존에 보고 있던 상품 사진&이미지 삭제
                      const preItemImgs = document.querySelector(".itemDetail");
                      preItemImgs.textContent = "";

                      const preItemOption = document.querySelector(".option");
                      preItemOption.textContent = "";

                      // 추천상품 클릭 시 추천상품이 메인으로 보여짐
                      // 좌//이미지
                      const itemImgWrapper =
                        document.querySelector(".buy>.itemDetail");
                      const ul = document.createElement("ul");
                      itemImgWrapper.appendChild(ul);
                      ul.setAttribute("class", "itemImages");
                      for (
                        let i = 0;
                        i < response.result.itemImg.length;
                        i += 1
                      ) {
                        const li = document.createElement("li");
                        itemImgWrapper.appendChild(li); //사진 갯수만큼 li태그 추가

                        const img = document.createElement("img");
                        li.appendChild(img);
                        img.src = response.result.itemImg[i];
                      }

                      //우//상품정보
                      document.querySelector(
                        ".itemBuy .itemBrand"
                      ).textContent = response.result.itemBrand;
                      document.querySelector(".itemBuy .skuNum").textContent =
                        response.result.skuNum;
                      document.querySelector(".itemBuy .itemName").textContent =
                        response.result.itemName;
                      document.querySelector(".itemBuy .price").textContent =
                        response.result.price;
                      document.querySelector(
                        ".itemBuy .sale_price"
                      ).textContent = response.result.sale_price;
                      document.querySelector(
                        ".itemBuy .materials"
                      ).textContent = response.result.materials;

                      // 옵션 추가
                      const select =
                        document.querySelector(".itemBuyBtn>select");
                      for (
                        i = 0;
                        i < response.result["itemOption"].length;
                        i++
                      ) {
                        const option = document.createElement("option");
                        select.appendChild(option);
                        option.textContent = response.result["itemOption"][i];
                      }
                    });
                };
              });

              //자바스크립트 방식으로 추천상품 추출 방식
              //     var sameBrandItemList = response.result.filter(item => {
              //     if (item.itemBrand.includes(response.result[0])  && item.gender.includes(recomItemList[1]) &&item.categoryMedium.includes(recomItemList[2])) {
              //         return true;
              //     }
              //     return false;
              // });

              // // 중복값 제외한 추천상품 뽑기
              // var randomRecomItem=[];
              // for (var i = 0; i < sameBrandItemList.length; i++) {
              //     const randomItem=sameBrandItemList[Math.floor(Math.random() * sameBrandItemList.length)]
              //     if (!randomRecomItem.includes(randomItem)) {
              //         randomRecomItem.push(randomItem);
              //         if(randomRecomItem.length==10){//10개만 노출
              //             break;
              //         }
              //     } else {
              //         i--;
              //     }
              // }
            });

          // itemdetail.html에서 바로 장바구니에 넣기
          itemBuyCart.addEventListener("click", (e) => {
            // e.preventDefault();
            let param = {
              sku_number: localStorage.getItem("sku"),
              itemOption: changeValue(),
            };

            fetch("http://172.30.1.19:8000/users/cart", {
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
                alert("장바구니 페이지로 이동하시겠습니까?");
              })
              .catch((error) => console.log("error:", error));
          });
        });
    });
}

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

//     fetch(`http://172.30.1.19:8000/products/detail/${sku_number}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     })
//     .then((response) => response.json())
//     .then((response) => {

// })
// }
// window.onload = function () {
//상품 카테고리 직접 눌러 search.html으로 이동
fetch("http://172.30.1.19:8000/products/list", {
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
          e.target.href = `http://127.0.0.1:5500/NEARFETCH_js_version/search%20list/searchCategory.html`;
          // e.preventDefault();
          localStorage.setItem("gender", categoryLargeItem);
          localStorage.setItem("categoryMedium", categoryMidItem);
          localStorage.setItem("categorySmall", categorySmallItem);

          fetch(
            `http://172.30.1.19:8000/products/list?large_category=${localStorage.getItem(
              "gender"
            )}&medium_category=${localStorage.getItem(
              "categoryMedium"
            )}&small_category=${localStorage.getItem("categorySmall")}`,
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
        } else if (
          categoryLargeItem == undefined &&
          !(categoryMidItem == undefined) &&
          !(categorySmallItem == undefined)
        ) {
          // console.log("이것은 중카테고리");
          let gender = categoryMidItem;
          let categoryMedium = categorySmallItem;
          let categorySmall = null;
          e.target.href = `http://127.0.0.1:5500/NEARFETCH_js_version/search%20list/searchCategory.html`;

          localStorage.setItem("gender", categoryMidItem);
          localStorage.setItem("categoryMedium", categorySmallItem);
          localStorage.setItem("categorySmall", null);

          fetch(
            `http://172.30.1.19:8000/products/list?large_category=${gender}&medium_category=${categoryMedium}&small_category=${categorySmall}`,
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
        } else if (
          !(categorySmallItem == undefined) &&
          categoryMidItem == undefined &&
          categoryLargeItem == undefined
        ) {
          // console.log("이것은 대카테고리");
          let gender = categorySmallItem;
          let categoryMedium = null;
          let categorySmall = null;
          e.target.href = `http://127.0.0.1:5500/NEARFETCH_js_version/search%20list/searchCategory.html`;

          localStorage.setItem("gender", categorySmallItem);
          localStorage.setItem("categoryMedium", null);
          localStorage.setItem("categorySmall", null);

          fetch(
            `http://172.30.1.19:8000/products/list?large_category=${gender}&medium_category=${categoryMedium}&small_category=${categorySmall}`,
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
        }

        //   e.target.href = `http://127.0.0.1:5500/search%20list/search.html?large_category=${gender}&medium_category=${categoryMedium}&small_category=${categorySmall}`;
      };
    });

    // filterNsorter();
  });
// };

//* ----------------상품 리스트(특정 브랜드)/branditem.html---------------- *//

function hobrandItemList() {
  fetch("http://172.30.1.19:8000/products/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      //   console.log(response.result);
      // const mainHotBrand=document.querySelector(".mainHotBrand")
      // const array=[];
      // for(let k=0;k<response.result.length;k++){
      //     array.push(response.result[k].itemBrand)
      // };

      // // 브랜드별 상품 갯수
      // const result = array.reduce((accu, curr) => {
      // accu[curr] = (accu[curr] || 0)+1;
      // return accu;
      // }, {});

      // // 10개 상품 이상 보유한 브랜드
      // for(let j=0;j<result.length;j++){
      //     if(result[j]>5){
      //     const overTen=[];
      //     overTen.push(result[j]);
      //     }
      // }
      const searchItemListWrapper = document.querySelector(
        ".hotBrandItem>.itemListWrapper"
      );

      const ul = document.createElement("ul");
      searchItemListWrapper.appendChild(ul);

      for (let i = 0; i < response.result.length; i += 1) {
        const cart = document.createElement("img");
        cart.setAttribute("class", "cart");
        cart.src = "/images/shopping-cart.png";

        //   아이템 이미지를 누르면 상품 상세로 이동
        const itemImg = document.querySelectorAll(".imgWrapAtag");
        itemImg.forEach((el, index) => {
          el.onclick = (e) => {
            // e.preventDefault();
            let parentTag = e.target.parentElement; //클릭한 요소의 부모 태그 전체
            let aa = parentTag.parentElement; //클릭한 요소의 부모 태그 전체
            let child = aa.childNodes; //클릭한 요소들의 형제 태그 전체
            sku = child[6].innerText;
            localStorage.setItem("sku", sku);
            // console.log(sku)
          };
        });

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

        document.querySelectorAll(".itemBrand")[i].innerText =
          response.result[i][classList[0]];
        document.querySelectorAll(".itemName")[i].innerText =
          response.result[i][classList[1]];
        document.querySelectorAll(".price")[i].innerText =
          response.result[i][classList[2]];
        document.querySelectorAll(".sale_price")[i].innerText =
          response.result[i][classList[3]];
        document.querySelectorAll(".skuNum")[i].innerText =
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

          fetch("http://172.30.1.19:8000/users/cart", {
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
              //   alert("장바구니 페이지로 이동하시겠습니까?");
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
            `http://172.30.1.19:8000/products/list?order=${sortDetailList[k].innerText}`,
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
      filterNsorter();
    });
}

hobrandItemList();

//* ----------------상품 리스트(검색)/search.html---------------- *//
// case1.직접 검색하여 상품 찾기
function searchItemList() {
  localStorage.setItem("searchKeyword", keyword);
  fetch(
    `http://172.30.1.19:8000/products/search?word=${localStorage.getItem(
      "searchKeyword"
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
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

          fetch("http://172.30.1.19:8000/users/cart", {
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
              alert("장바구니 페이지로 이동하시겠습니까?");
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
            `http://172.30.1.19:8000/products/list?order=${sortDetailList[k].innerText}`,
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
      const itemImg = document.querySelectorAll(".imgWrapAtag");
      itemImg.forEach((el, index) => {
        el.onclick = (e) => {
          // e.preventDefault();
          let parentTag = e.target.parentElement; //클릭한 요소의 부모 태그 전체
          let aa = parentTag.parentElement; //클릭한 요소의 부모 태그 전체
          let child = aa.childNodes; //클릭한 요소들의 형제 태그 전체
          sku = child[6].innerText;
          localStorage.setItem("sku", sku);
        };
      });
    });
}

// -------------------------- 뒤로가기 누르면 새로고침 일어나게 하기
// location.href = document.referrer;
// -------------------------
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
    `http://172.30.1.19:8000/products/list?large_category=${localStorage.getItem(
      "gender"
    )}&medium_category=${localStorage.getItem(
      "categoryMedium"
    )}&small_category=${localStorage.getItem("categorySmall")}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
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

          fetch("http://172.30.1.19:8000/users/cart", {
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
              alert("장바구니 페이지로 이동하시겠습니까?");
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
            `http://172.30.1.19:8000/products/list?order=${sortDetailList[k].innerText}`,
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

      //   // 정렬필터(우)
      //   var sortDetail = document.querySelector(".sortDetail"); //가려진 부분
      //   var sortWrapper = document.querySelector(".sortWrapper"); //sortingBox
      //   var updownBtn = document.querySelector(".updownBtn"); //정렬 화살표(상하)

      //   sortWrapper.addEventListener("click", () => {
      //     sortDetail.classList.toggle("active");
      //     sortWrapper.classList.toggle("active");
      //     updownBtn.classList.toggle("active");
      //   });

      // 사진 클릭 시 상품상세보기 페이지로 이동
      const itemImg = document.querySelectorAll(".imgWrapAtag");
      itemImg.forEach((el, index) => {
        el.onclick = (e) => {
          // e.preventDefault();
          let parentTag = e.target.parentElement; //클릭한 요소의 부모 태그 전체
          let aa = parentTag.parentElement; //클릭한 요소의 부모 태그 전체
          let child = aa.childNodes; //클릭한 요소들의 형제 태그 전체
          sku = child[6].innerText;
          localStorage.setItem("sku", sku);
        };
      });
    });
}

if (
  location.href.indexOf(
    "http://127.0.0.1:5500/NEARFETCH_js_version/search%20list/searchCategory.html"
  ) > -1
) {
  searchCategoryList();
}

// 상품 카테고리 클릭해서 상품 찾기
//   const a = document.querySelectorAll(".categoryMedium li a");
//   console.log(a);

//   a.forEach((el, index) => {
//     el.onclick = (e) => {
//       console.log(e.target);

//       let categorySmall = e.target.innerText; //클릭한 요소(=clickedItem)
//       let categoryMedium =
//         e.target.parentElement.parentElement.parentElement.childNodes[1]
//           .innerText; //중간 카테고리(=categoryMedium)
//       let gender =
//         e.target.parentElement.parentElement.parentElement.childNodes[1]
//           .parentElement.parentElement.parentElement.childNodes[1].innerText; //대 카테고리(=gender)
//       // e.target.href=`http://127.0.0.1:5500/search%20list/search.html?large_category=${gender}&medium_category=${categoryMedium}&small_category=${categorySmall}`;
//       e.preventDefault();
//     };
//   });

// /* ----------------결제/pay.html---------------- */

// //결제 수단 선택
// const creditCard = document.querySelector("#creditCard");
// const transfer = document.querySelector("#transfer");

// creditCard.addEventListener("click", () => {
//   creditCard.style.backgroundColor = "black";
//   creditCard.style.color = "white";
//   transfer.style.backgroundColor = "transparent";
//   transfer.style.color = "black";
// });

// transfer.addEventListener("click", () => {
//   transfer.style.backgroundColor = "black";
//   transfer.style.color = "white";
//   creditCard.style.backgroundColor = "transparent";
//   creditCard.style.color = "black";
// });

// //전체 동의
// function selectAll(selectAll) {
//   const checkboxes = document.getElementsByName("agree");

//   checkboxes.forEach((checkbox) => {
//     checkbox.checked = selectAll.checked;
//   });
// }

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
