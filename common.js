//최상단 Swiper 끄기
const swiper=document.querySelector('.Swiper');
const offBtn=document.querySelector('.swiperOff');

offBtn.addEventListener('click',function(){
  swiper.style.display="none";
}
)


const Item=document.querySelector('.Item');
Item.addEventListener('scroll',()=>{
  Item.style.display=none;
})


