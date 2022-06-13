//섹션_1 캐러셀
function ShowCarousel(){
  document.querySelector(".carouselBtn1").addEventListener('click',()=>{
    document.querySelector('.carousel').style.transform='translate(0vw)'
     })
  
      document.querySelector(".carouselBtn2").addEventListener('click',()=>{
    document.querySelector('.carousel').style.transform='translate(-100vw)'
     })
     
     document.querySelector(".carouselBtn3").addEventListener('click',()=>{
      document.querySelector('.carousel').style.transform='translate(-200vw)'
      })
}
ShowCarousel();

    
// 섹션2_타이머
function getTime() {
  const target = new Date("Fri June 24 2022 00:00:00 GMT+0900");
  const today = new Date();
  const gap = target - today;
  const d = String(Math.floor(gap / (1000 * 60 * 60 * 24))).padStart(2, "0"); // 일
  const h = String(
    Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  ).padStart(2, "0"); // 시
  const m = String(Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60))).padStart(
    2,
    "0"
  ); // 분
  const s = String(Math.floor((gap % (1000 * 60)) / 1000)).padStart(2, "0"); // 초

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

//특가 상품
function mainHotdeal() {
  fetch("http://13.209.72.165:8000/products/main/hotdeal", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      const HotDealContents = document.querySelector(".HotDealContents");

      //   상품리스트 UI에 뿌려주기
      for (let i = 0; i < response.result.length; i += 1) {
        const divTag = document.createElement("div");
        HotDealContents.appendChild(divTag);
        divTag.setAttribute("class", "itemWrapper");

        const aTag = document.createElement("a");
        divTag.appendChild(aTag);
        aTag.setAttribute("class", "imgWrapAtag");
        aTag.href = `/NEARFETCH_js_version/item%20detail/itemdetail.html?sku=${response.result[i]["skuNum"]}`;

        const img = document.createElement("img");
        aTag.appendChild(img);

        img.setAttribute("class", "itemImg");

        const divWrapper = document.createElement("div");
        divTag.appendChild(divWrapper);
        divWrapper.setAttribute("class", "divWrapper");

        divWrapper.innerText =
          Math.ceil(response.result[i].discount_rate * 100) + "% discount";
      }

      const itemImg = document.querySelectorAll(".HotDealContents .itemImg");
      function showImage() {
        //1 번 사진
        var imgNum1 = Math.floor(
          Math.random() * response.result[0].itemImg.length
        );
        itemImg[0].src = response.result[0].itemImg[imgNum1];

        //2번 사진
        var imgNum2 = Math.floor(
          Math.random() * response.result[1].itemImg.length
        );
        itemImg[1].src = response.result[1].itemImg[imgNum2];
      }

      setInterval(showImage, 1000);
    });
}
mainHotdeal();

// 메인 중간 인기 상품
function mainHitItem() {
  fetch("http://13.209.72.165:8000/products/main/hotitem", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
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

      // 할인 가격 같이 보여주기
      const price = document.querySelectorAll(".mustBuyWrapper .price");
      const sale_price = document.querySelectorAll(
        ".mustBuyWrapper .sale_price"
      );

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
    });
}
mainHitItem();

// 메인_최하단 추천 상품
function mainRecomInit() {
  fetch("http://13.209.72.165:8000/products/main/recommend", {
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

      priceShow();

      //   장바구니 로고 클릭 시 장바구니로 추가
      goCart();
    });
}

mainRecomInit();
