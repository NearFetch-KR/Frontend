/* ----------------앱 소개/appDown.html---------------- */

// //스크롤 이동
const circles = document.querySelectorAll(".circle");
const contents = document.querySelectorAll(".appinfo");
const firstTop = contents[0].offsetTop;
const secondTop = contents[1].offsetTop;
const thirdTop = contents[2].offsetTop;
const fourTop = contents[3].offsetTop;

circles[0].onclick = function (e) {
  window.scroll({ top: firstTop, behavior: "smooth" });
  circles[0].style.backgroundColor = "black";
  circles[1].style.backgroundColor = "transparent";
  circles[2].style.backgroundColor = "transparent";
  circles[3].style.backgroundColor = "transparent";
};
circles[1].onclick = function () {
  window.scroll({ top: secondTop, behavior: "smooth" });
  circles[0].style.backgroundColor = "transparent";
  circles[1].style.backgroundColor = "black";
  circles[2].style.backgroundColor = "transparent";
  circles[3].style.backgroundColor = "transparent";
};
circles[2].onclick = function () {
  window.scroll({ top: thirdTop, behavior: "smooth" });
  circles[0].style.backgroundColor = "transparent";
  circles[1].style.backgroundColor = "transparent";
  circles[2].style.backgroundColor = "black";
  circles[3].style.backgroundColor = "transparent";
};

circles[3].onclick = function () {
  window.scroll({ top: fourTop, behavior: "smooth" });
  circles[0].style.backgroundColor = "transparent";
  circles[1].style.backgroundColor = "transparent";
  circles[2].style.backgroundColor = "transparent";
  circles[3].style.backgroundColor = "black";
};

//텍스트 나타나는 애니메이션
ScrollReveal({ reset: true });
ScrollReveal().reveal(".show", { delay: 500 });
