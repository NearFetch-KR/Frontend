//* ----------------상품 리스트(검색)/search.html---------------- *//
// 필터 요소 담을 객체
const data2 = {};

urlParams = new URLSearchParams(location.search);
const convert_word = [];

// case1.직접 검색하여 상품 찾기
function searchItemList() {
  keyword = urlParams.get("word");
  fetch(`http://52.79.242.14:8000/products/list${location.search}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      convert_word.push(response.convert_word);
      // 정렬(우)
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

      //   검색한 단어 위치
      document.querySelector("#currentGender>a").innerText = keyword;
      const searchItemListWrapper = document.querySelector(
        ".searchItemWrapper .itemListWrapper"
      );
      //   아이템 들어갈 자리
      const ul = document.createElement("ul");

      searchItemListWrapper.appendChild(ul);

      // 검색 결과가 없을 경우
      if (response.result.length == 0) {
        ul.innerText = "검색되는 상품이 없습니다🙅🏻‍♀️";
        ul.style.fontSize = "50px";
        ul.style.fontWeight = "300";
        ul.style.textAlign = "center";
        ul.style.display = "block";
      }

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

      // 세일 가격 표시
      priceShow();

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

          fetch("http://52.79.242.14:8000/users/cart", {
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
      //   filterNsorter();
      //   필터(좌);
      fetch(`http://52.79.242.14:8000/products/make/filter`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          // 1.필터 리스트 만들기
          //성별 필터
          const filter_gender_ul = document.querySelector(".filter_gender_ul");
          for (let i = 0; i < response.result.gender.length; i++) {
            const liTag = document.createElement("li");
            filter_gender_ul.appendChild(liTag);
            // const aTag = document.createElement("a");
            const li = document.querySelectorAll(".filter_gender_ul li");
            // li[i].appendChild(aTag);

            const a = document.querySelectorAll(".filter_gender_ul li");
            a[i].textContent = response.result.gender[i];
          }

          //스몰 필터
          const filter_category_small_ul = document.querySelector(
            ".filter_category_small_ul"
          );
          for (let i = 0; i < response.result.categorySmall.length; i++) {
            const liTag = document.createElement("li");
            filter_category_small_ul.appendChild(liTag);
            // const aTag = document.createElement("a");
            const li = document.querySelectorAll(
              ".filter_category_small_ul li"
            );
            // li[i].appendChild(aTag);

            const a = document.querySelectorAll(".filter_category_small_ul li");
            a[i].textContent = response.result.categorySmall[i];
          }

          //브랜드 필터
          const filter_category_brand_ul = document.querySelector(
            ".filter_category_brand_ul"
          );
          for (let i = 0; i < response.result.brand.length; i++) {
            const liTag = document.createElement("li");
            filter_category_brand_ul.appendChild(liTag);
            // const aTag = document.createElement("a");
            const li = document.querySelectorAll(
              ".filter_category_brand_ul li"
            );
            // li[i].appendChild(aTag);

            const a = document.querySelectorAll(".filter_category_brand_ul li");
            a[i].textContent = response.result.brand[i];
          }

          // 필터 버튼
          const filter_category = document.querySelector(".filter_category"); //가려진 부분
          const filterWrapper = document.querySelector(".filterWrapper"); //filterBox
          const filter = document.querySelector(".filter"); //
          const leftrightBtn = document.querySelector(".leftrightBtn"); //필터 화살표(좌우)
          const itemListWrapper = document.querySelector(".itemListWrapper"); //상품리스트
          const clicked_li = document.querySelectorAll(".filter_category li"); //필터 카테고리

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

          // 클릭된 소,중,대 카테고리는 active class 추가
          for (let i = 0; i < clicked_li.length; i++) {
            if (clicked_li[i].innerText == [...convert_word][0].gender) {
              clicked_li[i].classList.add("active");
            }
            if (clicked_li[i].innerText == [...convert_word][0].categorySmall) {
              clicked_li[i].classList.add("active");
            }
            if (clicked_li[i].innerText == [...convert_word][0].brand) {
              clicked_li[i].classList.add("active");
            }
          }

          clicked_li.forEach((el, index) => {
            el.onclick = (e) => {
              const filter_small = e.target.innerText; //스몰카테고리(=클릭한 자신)
              const filter_mid =
                e.target.parentElement.parentElement.childNodes[1].innerText; //상위카테고리

              //추가된 필터 리스트(li)
              const filteredList = document
                .querySelector(".filter_category")
                .getElementsByClassName("active");
              //data 객체 내 key값 생성
              data2.gender = [];
              data2.categorySmall = [];
              data2.brand = [];

              //추가로 클릭된 필터를 data 객체 내 추가
              for (let i = 0; i < filteredList.length; i++) {
                //클릭한 요소가해당하는 카테고리
                const aa =
                  filteredList[i].parentElement.parentElement.childNodes[1]
                    .innerText;
                if (aa == "GENDER") {
                  //gender에 해당한다면
                  data2["gender"].push(filteredList[i].innerText); //data객체 내 gender에 추가
                } else if (aa == "SMALL CATEGORY") {
                  data2["categorySmall"].push(filteredList[i].innerText);
                } else if (aa == "BRAND") {
                  data2["brand"].push(filteredList[i].innerText);
                }
              }

              for (let k = 0; k < Object.values(data2).length; k++) {
                for (let j = 0; j < Object.keys(data2).length; j++) {
                  if (Object.values(data2)[k][j] !== undefined) {
                    filterAll.push(
                      Object.keys(data2)[k] + "=" + Object.values(data2)[k][j]
                    );
                  }
                }
              }

              const fill = [];
              for (var key in data2) {
                if (data2.hasOwnProperty(key)) {
                  for (let i = 0; i < data2[key].length; i++) {
                    fill.push(`${key}=${data2[key][i]}`);
                  }
                }
              }

              const filterAllList = fill.join("&");

              history.pushState(
                null,
                null,
                `/NEARFETCH_js_version/search%20list/search.html?${filterAllList}`
              );

              //필터 적용하여 데이터 요청
              fetch(
                `http://52.79.242.14:8000/products/list${location.search}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
                .then((response) => response.json())
                .then((response) => {
                  document.querySelector(" .itemListWrapper").textContent = "";
                  const itemListWrapper =
                    document.querySelector(" .itemListWrapper");

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
                  priceShow();

                  if (response.result.length == 0) {
                    ul.innerText = "검색되는 상품이 없습니다🙅🏻‍♀️";
                    ul.style.fontSize = "50px";
                    ul.style.fontWeight = "300";
                    ul.style.textAlign = "center";
                    ul.style.display = "block";
                  }
                });

              // console.log(response.price_bar.min, response.price_bar.max);
            };
          });
        });
    });
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
    `http://52.79.242.14:8000/products/list${location.search}`,

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      // 정렬(우)
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

      //   현재 카테고리 위치
      document.querySelector("#currentGender>a").innerText = gender;
      document.querySelector("#currentBrand>a").innerText = categoryMedium;
      const searchItemListWrapper = document.querySelector(
        ".searchItemWrapper .itemListWrapper"
      );

      //   아이템 들어갈 자리
      const ul = document.createElement("ul");
      searchItemListWrapper.appendChild(ul);
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

      // 세일 가격 표시
      const price = document.querySelectorAll(".itemListWrapper .price");
      const sale_price = document.querySelectorAll(
        ".itemListWrapper .sale_price"
      );

      for (let i = 0; i < price.length; i++) {
        if (sale_price[i].innerText == "") {
          //세일 안 할 때
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

          fetch("http://52.79.242.14:8000/users/cart", {
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

      filterNsorter();

      //   //실제 가격바
      //   var minSlider = document.getElementById("min");
      //   var maxSlider = document.getElementById("max");

      //   //    response의 최저값으로 시작
      //   minSlider.min = response.price_bar.min;

      //   //    response의 최대값으로 끝남
      //   maxSlider.max = response.price_bar.max;

      //   //빈칸에 찍히는 최저값, 최대값
      //   var outputMin = document.getElementById("min-value");
      //   var outputMax = document.getElementById("max-value");

      //   outputMin.innerHTML = minSlider.value;
      //   outputMax.innerHTML = maxSlider.value;

      //   minSlider.oninput = function () {
      //     outputMin.innerHTML = this.value;
      //   };

      //   maxSlider.oninput = function () {
      //     outputMax.innerHTML = this.value;
      //   };
      //   console.log(response.price_bar.min);
    });
}

if (
  location.href.indexOf(
    "http://127.0.0.1:5500/NEARFETCH_js_version/search%20list/searchCategory.html"
  ) > -1
) {
  searchCategoryList();
}
