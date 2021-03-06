//   -----------itemdetail.html(=상품 상세보기 페이지) 에서만 해당 코드 실행-----------


if (
  location.href.indexOf(
    "http://127.0.0.1:5500/NEARFETCH_js_version/item%20detail/itemdetail.html"
  ) > -1
) {
  fetch(
    `http://13.209.72.165:8000/products/detail/${new URLSearchParams(
      location.search
    ).get("sku")}`,
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

      for (let i = 0; i < response.detail.itemImg.length; i += 1) {
        const li = document.createElement("li");
        ul.appendChild(li); //사진 갯수만큼 li태그 추가

        const img = document.createElement("img");
        li.appendChild(img);
        img.src = response.detail.itemImg[i];
      }

      //우//상품정보
      const itemInfoWrapper = document.querySelector(".itemBuy>.itemDes");
      for (let i = 0; i < 4; i++) {
        const className = ["itemBrand", "itemName", "price", "sale_price"];
        const li = document.createElement("li");
        itemInfoWrapper.appendChild(li);
        li.textContent = response.detail[className[i]];
        li.setAttribute("class", className[i]);
      }

      // 옵션 추가
      const select = document.querySelector(".itemBuyBtn>select");
      for (i = 0; i < response.detail["itemOption"].length; i++) {
        const option = document.createElement("option");
        select.appendChild(option);
        option.textContent = response.detail["itemOption"][i];
      }

      // 상품 상세 정보(sku,materials)
      const skuNum = document.querySelector(".informDes .skuNum");
      const materials = document.querySelector(".informDes .materials");
      skuNum.textContent = response.detail["skuNum"];
      materials.textContent = response.detail["materials"];

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

      //   클릭한 옵션값 선택
      const selectOption = document.querySelector(".itemBuyBtn select"); //select

      function changeValue() {
        let value_str = document.querySelector(".itemBuyBtn select");
        let selectedValue = value_str.options[value_str.selectedIndex].text;
        return selectedValue;
      }

      selectOption.addEventListener("change", changeValue);
      const itemBuyCart = document.querySelector(".itemBuyBtn .goCart");

      const recomItemWrapper = document.querySelector(".row__inner");
      for (let i = 0; i < response.recommend.length; i++) {
        const div = document.createElement("div");
        recomItemWrapper.appendChild(div);
        div.setAttribute("class", "RecomItem");

        const recomDivClassName = ["RecomItem__content", "RecomItem__details"];

        for (let j = 0; j < recomDivClassName.length; j++) {
          const RecomItem = document.querySelectorAll(".RecomItem");
          const div = document.createElement("div");
          RecomItem[i].appendChild(div);
          div.setAttribute("class", recomDivClassName[j]);
        }

        //추천상품명/가격
        const recomImgBox = document.querySelectorAll(".RecomItem__content");

        const aTag = document.createElement("a");
        aTag.setAttribute("class", "imgWrapAtag");
        recomImgBox[i].appendChild(aTag);

        const imgWrapAtag = document.querySelectorAll(".imgWrapAtag");
        const imgTag = document.createElement("img");
        imgWrapAtag[i].appendChild(imgTag);
        imgTag.setAttribute("class", "RecomItem__img");
        onerror = "myFunction()";

        const RecomItem__img = document.querySelectorAll(".RecomItem__img");
        RecomItem__img[i].src = response.recommend[i]["itemImg"][0];

        aTag.href = `/NEARFETCH_js_version/item%20detail/itemdetail.html?sku=${response.recommend[i]["skuNum"]}`;

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
        const price = document.querySelectorAll(".RecomItem__details>.price");
        const sale_price = document.querySelectorAll(
          ".RecomItem__details>.sale_price"
        );
        const skuNum = document.querySelectorAll(".RecomItem__details>.skuNum");
        const itemOption = document.querySelectorAll(
          ".RecomItem__details>.itemOption"
        );
        const materials = document.querySelectorAll(
          ".RecomItem__details>.materials"
        );

        itemBrand[i].textContent = response.recommend[i]["itemBrand"];
        itemName[i].textContent = response.recommend[i]["itemName"];
        price[i].textContent = response.recommend[i]["price"];
        sale_price[i].textContent = response.recommend[i]["sale_price"];
        skuNum[i].textContent = response.recommend[i]["skuNum"];
        itemOption[i].textContent = response.recommend[i]["itemOption"];
        materials[i].textContent = response.recommend[i]["materials"];
      }

      // 할인 가격 노출
      priceShow()
     

      //   itemdetail.html에서 바로 장바구니에 넣기
      itemBuyCart.addEventListener("click", (e) => {
        // e.preventDefault();
        let param = {
          sku_number: response.detail.skuNum,
          itemOption: changeValue(),
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
          .then(fetchCart())
          .catch((error) => console.log("error:", error));
      });

      // 구매하기
      const proceedNowBtn = document.querySelector(".proceedNow");
      proceedNowBtn.addEventListener("click", () => {
        localStorage.setItem("buyNow",JSON.stringify(response.detail))
        window.location.href = `http://127.0.0.1:5500/NEARFETCH_js_version/pay/pay.html`;
       make();
      });
    });
  // });
}


//추천상품과 겹치지 않게 스크롤이벤트 처리
function scrolling(){
  window.addEventListener('scroll',()=>{
    const target = document.querySelector('.itemDetail');
    const itemBuySection = target.clientHeight
    let value=this.window.scrollY

    if(value>itemBuySection*0.9){
      document.querySelector(".buy .itemBuy").style.display="none"
    }else(
      document.querySelector(".buy .itemBuy").style.display="block"
    )
  })
}

scrolling()



//링크 공유하기
function clip() {
  var url = ""; 
  var textarea = document.createElement("textarea");
  document.body.appendChild(textarea); 
  url = window.document.location.href; 
  textarea.value = url;
  textarea.select(); 
  document.execCommand("copy");
  document.body.removeChild(textarea); 
  alert("URL이 복사되었습니다."); 
}
