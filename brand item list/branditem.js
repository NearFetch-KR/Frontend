// 카테고리 필터(좌)
var filterDetail=document.querySelector('.filterDetail')//가려진 부분
var filterWrapper=document.querySelector('.filterWrapper') //filterBox
var leftrightBtn=document.querySelector('.leftrightBtn')//필터 화살표(좌우)

filterWrapper.addEventListener('click',()=>{
    filterDetail.classList.toggle('active');
    filterWrapper.classList.toggle('active');
    leftrightBtn.classList.toggle('active')
})

// 정렬필터(우)
var sortDetail=document.querySelector('.sortDetail')//가려진 부분
var sortWrapper=document.querySelector('.sortWrapper') //sortingBox
var updownBtn=document.querySelector('.updownBtn') //정렬 화살표(상하)

sortWrapper.addEventListener('click',()=>{
    sortDetail.classList.toggle('active');
    sortWrapper.classList.toggle('active');
    updownBtn.classList.toggle('active')
})

