// 카테고리 대 필터(좌)
var filterDetail=document.querySelector('.filterDetail')//가려진 부분
var filterWrapper=document.querySelector('.filterWrapper') //filterBox
var leftrightBtn=document.querySelector('.leftrightBtn')//필터 화살표(좌우)

var filter=document.getElementById('filter')//'핕터'글자


filter.addEventListener('click',()=>{
    filterDetail.classList.toggle('active');
    filterWrapper.classList.toggle('active');
    leftrightBtn.classList.toggle('active')
})


// 카테고리 중
var clothing=document.getElementById('clothing')//가려진 부분(의류)
var shoes=document.getElementById('shoes')//가려진 부분(신발)
var bags=document.getElementById('bags')//가려진 부분(가방)
var acc=document.getElementById('acc')//가려진 부분(악세사리)
var jewerly=document.getElementById('jewerly')//가려진 부분(주얼리)

var updownBtnClothing=document.querySelectorAll('.updownBtn')[0]//필터 화살표
var updownBtnShoes=document.querySelectorAll('.updownBtn')[1]//필터 화살표
var updownBtnBags=document.querySelectorAll('.updownBtn')[2]//필터 화살표
var updownBtnAcc=document.querySelectorAll('.updownBtn')[3]//필터 화살표
var updownBtnJewerly=document.querySelectorAll('.updownBtn')[4]//필터 화살표

updownBtnClothing.addEventListener('click',()=>{
    clothing.classList.toggle('active');
    updownBtnClothing.toggle('active');
})

updownBtnShoes.addEventListener('click',()=>{
    shoes.classList.toggle('active');
})

updownBtnBags.addEventListener('click',()=>{
    bags.classList.toggle('active');
})

updownBtnAcc.addEventListener('click',()=>{
    acc.classList.toggle('active');
})

updownBtnJewerly.addEventListener('click',()=>{
    jewerly.classList.toggle('active');
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

// 가격 슬라이드바

$(document).ready(function(){
	$("#min_price,#max_price").on('change', function () {

	  var min_price_range = parseInt($("#min_price").val());
	  var max_price_range = parseInt($("#max_price").val());

	  if (min_price_range > max_price_range) {
		$('#max_price').val(min_price_range);
	  }

	  $("#slider-range").slider({
		values: [min_price_range, max_price_range]
	  });
	});


	$("#min_price,#max_price").on("paste keyup", function () {                                        
	  var min_price_range = parseInt($("#min_price").val());
	  var max_price_range = parseInt($("#max_price").val());
	  
	  if(min_price_range == max_price_range){
			max_price_range = min_price_range + 50000;
			
			$("#min_price").val(min_price_range);		
			$("#max_price").val(max_price_range);
	  }

	  $("#slider-range").slider({
		values: [min_price_range, max_price_range]
	  });
	});


	$(function () {
	  $("#slider-range").slider({
		range: true,
		orientation: "horizontal",
		min: 0,
		max: 100000000,
		values: [0, 100000000],
		step: 50000,

		slide: function (event, ui) {
		  if (ui.values[0] == ui.values[1]) {
			  return false;
		  }
		  
		  $("#min_price").val(ui.values[0]);
		  $("#max_price").val(ui.values[1]);
		}
	  });

	  $("#min_price").val($("#slider-range").slider("values", 0));
	  $("#max_price").val($("#slider-range").slider("values", 1));

	});
});