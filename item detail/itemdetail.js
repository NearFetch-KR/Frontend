//구매 박스 특정 위치까지 fixed
$(window).scroll(function () {
    var height = $(document).scrollTop(); //현재 스크롤 위치
    var sectionBottom=$('.buy').height(); //섹션의 총 높이
    // console.log(height,sectionBottom-500);
    if(height>sectionBottom-500){
        $('.itemBuyContents').css({
            position:"absolute",
        })
    }else if(height<sectionBottom-500){
        $('.itemBuyContents').css({
            position:"fixed",
        })
    }
});
