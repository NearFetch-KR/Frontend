// 섹션2_타이머
function getTime() {
  const target = new Date("Fri May 27 2022 00:00:00 GMT+0900");
  const today = new Date();
  const gap = target - today;
  const d = String(Math.floor(gap / (1000 * 60 * 60 * 24))).padStart(2, "0"); // 일
  const h = String(Math.floor((gap / (1000 * 60 * 60)) % 24)).padStart(2, "0"); // 시
  const m = String(Math.floor(((gap / 1000) * 60) % 60)).padStart(2, "0"); // 분
  const s = String(Math.floor((gap / 1000) % 60)).padStart(2, "0"); // 초

  if (gap > 0) {
    document.querySelector(".NumberDays").innerText = d;
    document.querySelector(".NumberHours").innerText = h;
    document.querySelector(".NumberMinutes").innerText = m;
    document.querySelector(".NumberSeconds").innerText = s;
  }
}

function timerInit() {
  getTime();
  setInterval(getTime, 1000);
}

timerInit();

// 메인 중간 인기 상품
function mainHitItem() {
  fetch("http://172.30.1.57:8000/products/main/hotitem", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response.result);
      const mustBuyWrapper = document.querySelector(
        ".MustBuyNow .mustBuyWrapper"
      );

      //   상품리스트 UI에 뿌려주기
      for (let i = 0; i < response.result.length; i += 1) {
        const divTag = document.createElement("div");
        mustBuyWrapper.appendChild(divTag);
        divTag.setAttribute("class", "itemWrapper");

        const aTag = document.createElement("a");
        divTag.appendChild(aTag);
        aTag.setAttribute("class", "imgWrapAtag");
        aTag.href = `/NEARFETCH_js_version/item%20detail/itemdetail.html?sku=${response.result[i]["skuNum"]}`;

        const img = document.createElement("img");
        aTag.appendChild(img);

        img.setAttribute("class", "itemImg");
        img.src = response.result[i].itemImg[0];

        const divWrapper = document.createElement("div");
        divTag.appendChild(divWrapper);
        divWrapper.setAttribute("class", "divWrapper");

        const classList = ["itemBrand", "itemName", "price", "sale_price"];

        for (let k = 0; k < classList.length; k++) {
          const div = document.createElement("div");
          divWrapper.appendChild(div);
          div.setAttribute("class", classList[k]);
        }

        document.querySelectorAll(".itemWrapper .itemBrand")[i].innerText =
          response.result[i][classList[0]];
        document.querySelectorAll(".itemWrapper .itemName")[i].innerText =
          response.result[i][classList[1]];
        document.querySelectorAll(".itemWrapper .price")[i].innerText =
          response.result[i][classList[2]];
        document.querySelectorAll(".itemWrapper .sale_price")[i].innerText =
          response.result[i][classList[3]];
      }

      // 가격
      const price = document.querySelectorAll(".itemWrapper .price");
      const sale_price = document.querySelectorAll(".itemWrapper .sale_price");
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
    });
}
mainHitItem();

// 메인_최하단 추천 상품
function mainRecomInit() {
  fetch("http://172.30.1.57:8000/products/main/recommend", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      const mainRecomItemWrapper = document.querySelector(
        ".Recommend>.itemListWrapper"
      );
      const ul = document.createElement("ul");
      mainRecomItemWrapper.appendChild(ul);
      ul.setAttribute("class", "list");

      //   상품리스트 UI에 뿌려주기
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

      // 가격
      const price = document.querySelectorAll(".itemListWrapper .price");
      //   console.log(price);
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

          fetch("http://172.30.1.57:8000/users/cart", {
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
    });
}

mainRecomInit();
