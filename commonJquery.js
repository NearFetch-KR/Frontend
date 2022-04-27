
/* ----------------제품 상세/itemdetail.html---------------- */
//구매 박스 특정 위치까지 fixed
$(document).ready(function() {
	$(window).scroll(function () {
		var height = $(document).scrollTop(); //현재 스크롤 위치
		var sectionBottom=$('.buy').height(); //섹션의 총 높이
		if(height>sectionBottom-500){
			$('.itemBuy').css({
				position:"absolute",
			})
		}else if(height<sectionBottom-500){
			$('.itemBuy').css({
				position:"fixed",
			})
		}
	});

	
  });