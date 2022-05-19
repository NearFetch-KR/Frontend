//   -----------itemdetail.html(=상품 상세보기 페이지) 에서만 해당 코드 실행-----------

if (
  location.href.indexOf(
    "http://127.0.0.1:5500/NEARFETCH_js_version/item%20detail/itemdetail.html"
  ) > -1
) {
  fetch(
    `http://52.79.242.14:8000/products/detail/${new URLSearchParams(
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
      response;
      // 좌//이미지
      const itemImgWrapper = document.querySelector(".buy>.itemDetail");
      const ul = document.createElement("ul");
      itemImgWrapper.appendChild(ul);
      ul.setAttribute("class", "itemImages");
      for (let i = 0; i < response.detail.itemImg.length; i += 1) {
        const li = document.createElement("li");
        itemImgWrapper.appendChild(li); //사진 갯수만큼 li태그 추가

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
      const price = document.querySelectorAll(".price");
      const sale_price = document.querySelectorAll(".sale_price");

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
          // price[i].style.color = "red";

          price[i].style.textDecoration = "line-through";

          sale_price[i].textContent = sale_price[i].textContent
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      }

      //   itemdetail.html에서 바로 장바구니에 넣기
      itemBuyCart.addEventListener("click", (e) => {
        // e.preventDefault();
        let param = {
          sku_number: response.detail.skuNum,
          itemOption: changeValue(),
        };

        fetch("http://52.79.242.14:8000/users/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("login-token"),
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
      });
    });
  // });
}

//링크 공유하기
function clip() {
  var url = ""; // <a>태그에서 호출한 함수인 clip 생성
  var textarea = document.createElement("textarea");
  //url 변수 생성 후, textarea라는 변수에 textarea의 요소를 생성

  document.body.appendChild(textarea); //</body> 바로 위에 textarea를 추가(임시 공간이라 위치는 상관 없음)
  url = window.document.location.href; //url에는 현재 주소값을 넣어줌
  textarea.value = url; // textarea 값에 url를 넣어줌
  textarea.select(); //textarea를 설정
  document.execCommand("copy"); // 복사
  document.body.removeChild(textarea); //extarea 요소를 없애줌
  alert("URL이 복사되었습니다."); // 알림창
}
