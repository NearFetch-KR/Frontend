function ShowSalePrice(){
    // 할인 가격 같이 보여주기
    const price = document.querySelectorAll(".price");
    const sale_price = document.querySelectorAll(
      ".sale_price"
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
 }

 export default ShowSalePrice;