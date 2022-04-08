
// 주소 검색(by kakao)
function findAddr(){
	new daum.Postcode({
        oncomplete: function(data) {
        	
        	console.log(data);
        	
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var jibunAddr = data.jibunAddress; // 지번 주소 변수
            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('member_post').value = data.zonecode;
            if(roadAddr !== ''){
                document.getElementById("member_addr").value = roadAddr;
            } 
            else if(jibunAddr !== ''){
                document.getElementById("member_addr").value = jibunAddr;
            }
        }
    }).open();
}


//결제 수단 선택
const creditCard=document.querySelector('#creditCard')
const transfer=document.querySelector('#transfer')


creditCard.addEventListener('click',()=>{
    creditCard.style.backgroundColor="black";
    creditCard.style.color="white";
    transfer.style.backgroundColor="transparent";
    transfer.style.color="black";

})

transfer.addEventListener('click',()=>{
    transfer.style.backgroundColor="black";
    transfer.style.color="white";
    creditCard.style.backgroundColor="transparent";
    creditCard.style.color="black";
})

//전체 동의
function selectAll(selectAll)  {
    const checkboxes = document.getElementsByName('agree');
    
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAll.checked;
    })
  }

