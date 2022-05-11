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
