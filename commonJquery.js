

/* ----------------상품 리스트(검색)/search.html---------------- */
/* ----------------상품 리스트(특정 브랜드)/branditem.html---------------- */

// 가격 슬라이드바 실행
// $(document).ready(function(){
// 	$("#min_price,#max_price").on('change', function () {

// 	  var min_price_range = parseInt($("#min_price").val());//최소값
// 	  var max_price_range = parseInt($("#max_price").val());//최대값

// 	  if (min_price_range > max_price_range) {
// 		$('#max_price').val(min_price_range);//최대값을 최소값으로 지정
// 	  }

// 	  $("#slider-range").slider({
// 		  values: [min_price_range, max_price_range]
// 	  });
// 	});


// 	$("#min_price,#max_price").on("paste keyup", function () {                                        
// 	  var min_price_range = parseInt($("#min_price").val());
// 	  var max_price_range = parseInt($("#max_price").val());
	  
// 	  if(min_price_range == max_price_range){
// 			max_price_range = min_price_range + 5;
			
// 			$("#min_price").val(min_price_range);		
// 			$("#max_price").val(max_price_range);
// 	  }

// 	  $("#slider-range").slider({
// 		values: [min_price_range, max_price_range]
// 	  });
// 	});


// 	$(function () {
// 	  $("#slider-range").slider({
// 		range: true,
// 		orientation: "horizontal",
// 		min: 0,
// 		max: 10000,
// 		values: [0, 10000],
// 		step: 5,

// 		slide: function (event, ui) {
// 		  if (ui.values[0] == ui.values[1]) {
// 			  return false;
// 		  }
		  
// 		  $("#min_price").val(ui.values[0]);
// 		  $("#max_price").val(ui.values[1]);
// 		}
// 	  });

// 	  $("#min_price").val($("#slider-range").slider("values", 0));
// 	  $("#max_price").val($("#slider-range").slider("values", 1));

// 	});
// });


/* ----------------제품 상세/itemdetail.html---------------- */
//구매 박스 특정 위치까지 fixed
$(document).ready(function() {
	$(window).scroll(function () {
		var height = $(document).scrollTop(); //현재 스크롤 위치
		var sectionBottom=$('.buy').height(); //섹션의 총 높이
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

	
  });