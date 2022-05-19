//GUCCI 제품 기획전
fetch("http://52.79.242.14:8000/products/list?brand=GUCCI", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((response) => {
    // var hotBrandMain = response.result.filter((item) => {
    //   if (item.gender.includes("WOMEN")) {
    //     return true;
    //   }
    //   return false;
    // });

    // // 중복값 제외한 메인 상품 3개 뽑기
    // var hotBrandMainRandom = [];
    // for (let i = 0; i < hotBrandMain.length; i++) {
    //   const randomItem =
    //     hotBrandMain[Math.floor(Math.random() * hotBrandMain.length)];
    //   if (!hotBrandMainRandom.includes(randomItem)) {
    //     hotBrandMainRandom.push(randomItem);
    //     if (hotBrandMainRandom.length == 3) {
    //       break;
    //     }
    //   } else {
    //     i--;
    //   }
    // }

    // 상품 리스트 태그 생성
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
    // 세일 시 세일 가격
    priceShow();

    goCart(); //장바구니 담기 함수
    filterNsorter(); //필터&정렬 함수
  });

//   현재 카테고리 위치
const hotBrandNam = document.querySelectorAll(".hotBrandName");
for (let i = 0; i < hotBrandNam.length; i++) {
  hotBrandNam[i].innerText = "GUCCI";
}
