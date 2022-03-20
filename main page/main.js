// 캐러셀 이미지
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }

  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds


  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}


// 타이머
function getTime() {
  const target = new Date("Fri Mar 25 2022 00:00:00 GMT+0900");
  const today = new Date();
  const gap = target - today;
  const d = String(Math.floor(gap / (1000 * 60 * 60 * 24))).padStart(2,"0"); // 일
  const h = String(Math.floor((gap / (1000 * 60 * 60)) % 24)).padStart(2,"0"); // 시
  const m = String(Math.floor(((gap / 1000) * 60) % 60)).padStart(2,"0"); // 분
  const s = String(Math.floor((gap / 1000) % 60)).padStart(2,"0"); // 초

  if (gap > 0) {
    document.querySelector(".NumberDays").innerText=d;
    document.querySelector(".NumberHours").innerText=h;
    document.querySelector(".NumberMinutes").innerText=m;
    document.querySelector(".NumberSeconds").innerText=s;
    // timer.innerText = `${d}일 ${h}시간 ${m}분 ${s}초 남았습니다.`;
  } 
}

function init() {
    getTime();
    setInterval(getTime, 1000);
  }

init();


//최상단 Swiper 끄기
const swiper=document.querySelector('.Swiper');
const offBtn=document.querySelector('.swiperOff');

offBtn.addEventListener('click',function(){
  swiper.style.display="none";
}
)