// ----------------장바구니 상품 리스트 노출----------------
window.onload = function () {
  console.log("로그인상태 테스트2");
  if (
    localStorage.getItem("login-token") ||
    localStorage.getItem("kakao_d00e298d264188749cec865d2f70fa40")
  ) {
    document.querySelector(".infoBar #logout").innerText = "로그아웃";
  } else {
    document.querySelector(".infoBar #logout").innerText = "로그인";
  }
};

const selectedValueList = [];

function makeCartList() {
  fetch("http://172.30.1.23:8000/users/cart", {
    method: "GET",
    headers: {
      "Content-Type": "application/son",
      Authorization: localStorage.getItem("login-token"),
    },
  })
    .then((response) => response.json())
    .then((response) => {
      // console.log(response.result);
      for (let k = 0; k < response.result.length; k++) {
        const addItemListWrapper = document.querySelector(
          ".addListTable tbody"
        );
        const tr = document.createElement("tr");
        addItemListWrapper.appendChild(tr);

        for (let i = 0; i < 5; i++) {
          const tdClassList = [
            "addImg",
            "contents",
            "itemOption",
            "itemQt",
            "priceWrapper",
            // "removeCart",
          ];
          const td = document.createElement("td");
          tr.appendChild(td);
          td.setAttribute("class", tdClassList[i]);
        }

        const addImg = document.querySelectorAll("tbody .addImg");
        const img = document.createElement("img");
        addImg[k].appendChild(img);
        const imgInner = document.querySelectorAll(".addImg img");
        imgInner[k].src = response.result[k].image;

        const contents = document.querySelectorAll("tbody .contents");
        const contentsClassList = ["itemBrand", "itemName"];
        for (let j = 0; j < contentsClassList.length; j++) {
          const div = document.createElement("div");
          contents[k].appendChild(div);
          div.setAttribute("class", contentsClassList[j]);
        }

        const priceWrapper = document.querySelectorAll("tbody .priceWrapper");
        const priceClassList = ["price", "sale_price"];
        for (let j = 0; j < priceClassList.length; j++) {
          const div = document.createElement("div");
          priceWrapper[k].appendChild(div);
          div.setAttribute("class", priceClassList[j]);
        }

        const itemOption = document.querySelectorAll(".itemOption");
        const select = document.createElement("select");
        itemOption[k].appendChild(select);
        // console.log(response.result[k].option);

        for (i = 0; i < response.result[k].option.length; i++) {
          const option = document.createElement("option");
          select.appendChild(option);
          option.textContent = response.result[k]["option"][i];
        }

        // 실제 선택한 옵션이 장바구니 리스트에 보이게끔
        let selectedOptionIdx = response.result[k].option.indexOf(
          response.result[k].selectedOption
        );
        // console.log(response.result[k].selectedOption, selectedOptionIdx);

        const selectList = document.querySelectorAll(".itemOption select");

        if (selectedOptionIdx >= 0) {
          //선택한 옵션 index
          selectList[k].options[selectedOptionIdx].selected = true;
        } else {
          selectList[k].options[0].selected = true;
        }

        const price = document.querySelectorAll(".priceWrapper>.price");
        const sale_price = document.querySelectorAll(
          ".priceWrapper>.sale_price"
        );

        const itemQt = document.querySelectorAll(".itemQt");
        const itemBrand = document.querySelectorAll(".itemBrand");
        const itemName = document.querySelectorAll(".itemName");

        itemBrand[k].textContent = response.result[k].brand;
        itemName[k].textContent = response.result[k].name;

        itemQt[k].textContent = response.result[k].quantity;
        //   itemOption[k].textContent = response.result[k].option;
        price[k].textContent = response.result[k].price;
        sale_price[k].textContent = response.result[k].sale_price;

        // 할인 가격 보여주기
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
        const removeCart = document.querySelectorAll(".priceWrapper");
        const removeImgTag = document.createElement("img");
        removeCart[k].appendChild(removeImgTag);
        const removeCartImg = document.querySelectorAll(".priceWrapper img");
        removeCartImg[k].src = "/images/cancel.png";
        removeCartImg[k].setAttribute("class", "removeCart");

        removeCartImg[k].addEventListener("click", () => {
          fetch(
            `http://172.30.1.23:8000/users/cart?cartId=${response.result[k].cart_id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
            .then((response) => {
              console.log(response.MESSAGE);
              location.reload();
            });
        });
      }

      //  장바구니, 주문창 총 금액 계산
      const totalAmount = document.querySelector(".totalAmount>span");
      const prices = document.querySelectorAll("tr .price");
      const sale_prices = document.querySelectorAll("tr .sale_price");

      const priceArry = [];
      for (i = 0; i < response.result.length; i++) {
        if (response.result[i].sale_price !== null) {
          priceArry.push(Number(sale_prices[i].innerText.split(",").join("")));
        } else {
          priceArry.push(Number(prices[i].innerText.split(",").join("")));
        }
      }

      const sum = priceArry.reduce((a, b) => a + b);
      totalAmount.textContent = sum
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      //   클릭한 옵션값 선택
      const selectInCart = document.querySelectorAll(
        ".addListTable tr .itemOption select"
      );

      for (let i = 0; i < selectInCart.length; i++) {
        let selectedValue =
          selectInCart[i].options[selectInCart[i].selectedIndex].text;
        selectedValueList.push(selectedValue);
      }
      console.log(selectedValueList);

      // 구매하기
      const proceedBtn = document.querySelector(".proceed");
      proceedBtn.addEventListener("click", () => {
        let param = {
          itemOption: selectedValueList,
        };
        fetch("http://172.30.1.23:8000/users/cart", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("login-token"),
          },

          body: JSON.stringify(param),
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response.result);
            window.location.href = `http://127.0.0.1:5500/NEARFETCH_js_version/pay/pay.html`;
          });
      });
    });
}

if (
  location.href.indexOf(
    "http://127.0.0.1:5500/NEARFETCH_js_version/myinfoAll/cart.html"
  ) > -1
) {
  makeCartList();
}

/* ----------------내 정보(통합)/myinfoAll.html---------------- */

if (
  location.href.indexOf(
    "http://127.0.0.1:5500/NEARFETCH_js_version/myinfoAll/myinfo.html"
  ) > -1
) {
  // 주소 저장(성공)
  const saveAddressBtn = document.querySelector(".myInfoAddress #save");
  const member_post_Default = document.querySelector(
    ".myInfoAddress #member_post"
  );
  const member_addr_Default = document.querySelector(
    ".myInfoAddress #member_addr"
  );
  const addr_detail_Default = document.querySelector(
    ".myInfoAddress #addr_detail"
  );

  function getAddressValue() {
    member_post = document.querySelector(".myInfoAddress #member_post").value;
    member_addr = document.querySelector(".myInfoAddress #member_addr").value;
    addr_detail = document.querySelector(".myInfoAddress #addr_detail").value;
  }

  member_post_Default.addEventListener("onkeyup", getAddressValue);
  member_addr_Default.addEventListener("onkeyup", getAddressValue);
  addr_detail_Default.addEventListener("onkeyup", getAddressValue);

  saveAddressBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let param = {
      post_number: member_post,
      address1: member_addr,
      address2: addr_detail,
    };
    let token = localStorage.getItem("login-token");
    fetch("http://172.30.1.23:8000/users/register/location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(param),
    })
      .then((response) => response.json())
      .then((response) => {
        alert("주소 저장이 완료되었습니다.");
      })
      .catch((error) => console.log("error:", error));
  });

  const member_post_saved = document.querySelector(
    ".myInfoAddress #member_post"
  ).value;
  const member_addr_saved = document.querySelector(
    ".myInfoAddress #member_addr"
  ).value;
  const addr_detail_saved = document.querySelector(
    ".myInfoAddress #addr_detail"
  ).value;

  //저장해둔 주소 노출
  fetch("http://172.30.1.23:8000/users/register/location", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("login-token"),
    },
  })
    .then((response) => response.json())
    .then((response) => {
      const member_post_saved = response.result.post_number;
      const member_addr_saved = response.result.address1;
      const addr_detail_saved = response.result.address2;

      if (member_post_saved && member_addr_saved && addr_detail_saved) {
        member_post_Default.value = member_post_saved;
        member_addr_Default.value = member_addr_saved;
        addr_detail_Default.value = addr_detail_saved;
      }
    })
    .catch((error) => console.log("error:", error));
}

// 주소 검색(by kakao)
function findAddr() {
  new daum.Postcode({
    oncomplete: function (data) {
      // console.log(data);
      var roadAddr = data.roadAddress; // 도로명 주소 변수
      var jibunAddr = data.jibunAddress; // 지번 주소 변수
      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById("member_post").value = data.zonecode;
      if (roadAddr !== "") {
        document.getElementById("member_addr").value = roadAddr;
      } else if (jibunAddr !== "") {
        document.getElementById("member_addr").value = jibunAddr;
      }
    },
  }).open();
}

//로그아웃(기능)
const logoutBtn = document.querySelector(".infoBar #logout");
logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let token = localStorage.getItem("login-token");
  fetch("http://172.30.1.23:8000/users/logout", {
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

// //배송중인것만 배송정보 보여주기!
// const trkStatus = document.querySelectorAll(".trkStatus"); //배송상태값
// const trkInfo = document.querySelectorAll(".trkInfo"); //배송정보

// for (i = 0; i < trkStatus.length; i++) {
//   if (trkStatus[i].innerText == "배송중") {
//     trkInfo[i].style.display = "block";
//   } else {
//     trkInfo[i].style.display = "none";
//   }
// }
// //n번째 돋보기를 누르면 n번째 송장번호가 들어간 택배 조회창으로 이동
// // const n=document.querySelectorAll('.n'); //n번째 순서값
// const trkBtn = document.querySelectorAll(".trkInfo>img"); // 운송장 조회 버튼
// const trkCompany = document.querySelectorAll(".trkCompany"); //택배사
// const trkNum = document.querySelectorAll(".trkNum"); //송장번호

// //택배 조회
// trkBtn.forEach(function (trkBtn) {
//   trkBtn.addEventListener("click", logEvent);
// });

// function logEvent(event) {
//   var number = event.target.closest(".trkInfo").children[1].innerText;
//   if (event.target.closest(".trkInfo").children[0].innerText == "우체국") {
//     window.open("about:blank").location.href =
//       "https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm?sid1=" +
//       number +
//       "&displayHeader=N";
//   } else {
//     window.open("about:blank").location.href =
//       "http://www.doortodoor.co.kr/servlets/cmnChnnel?tc=dtd.cmn.command.c03condiCrg01Cmd&invc_no=" +
//       number;
//   }
// }
