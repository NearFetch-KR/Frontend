/* ----------------결제/pay.html---------------- */

//결제 수단 선택
const creditCard = document.querySelector("#creditCard");
const transfer = document.querySelector("#transfer");

creditCard.addEventListener("click", () => {
  creditCard.style.backgroundColor = "black";
  creditCard.style.color = "white";
  transfer.style.backgroundColor = "transparent";
  transfer.style.color = "black";
});

transfer.addEventListener("click", () => {
  transfer.style.backgroundColor = "black";
  transfer.style.color = "white";
  creditCard.style.backgroundColor = "transparent";
  creditCard.style.color = "black";
});

//전체 동의
function selectAll(selectAll) {
  const checkboxes = document.getElementsByName("agree");

  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAll.checked;
  });
}

// 주문자와 동일
// const sameToOrderer = document.querySelector(".sameToOrderer");
// function copyOrdererInfo() {
//   if (this.checked) {
//     let orderInfo_name = document.querySelector(".ordererInfo .contactInfo");
//     //   let orderInfo_phone1 = document.querySelector(".ordererInfo .phone1");
//     //   let orderInfo_phone2 = document.querySelector(".ordererInfo .phone2");
//     //   let orderInfo_phone3 = document.querySelector(".ordererInfo .phone3");
//     let shippingInfo_name = document.querySelector(
//       ".shippingInfo .contactInfo"
//     );

//     //   let shippingInfo_phone1 = document.querySelector(".shippingInfo .phone1");
//     //   let shippingInfo_phone2 = document.querySelector(".shippingInfo .phone2");
//     //   let shippingInfo_phone3 = document.querySelector(".shippingInfo .phone3");
//     //   shippingInfo_name = orderInfo_name;
//     console.log("체크됨");
//     //   console.log(orderInfo_name);
//   } else {
//     console.log("체크 안됨");
//   }
// }

// sameToOrderer.addEventListener("change", copyOrdererInfo);
