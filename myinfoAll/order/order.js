//배송중인것만 배송정보 보여주기!
const trkStatus=document.querySelectorAll('.trkStatus'); //배송상태값
const trkInfo=document.querySelectorAll('.trkInfo'); //배송정보

for(i=0;i<trkStatus.length;i++){
    if(trkStatus[i].innerText=="배송중"){
        trkInfo[i].style.display="block";
    }else{
        trkInfo[i].style.display="none";
    }
}
//n번째 돋보기를 누르면 n번째 송장번호가 들어간 택배 조회창으로 이동
const n=document.querySelectorAll('.n'); //n번째 순서값
const trkBtn=document.querySelectorAll('.trkInfo>img')// 운송장 조회 버튼
const trkCompany=document.querySelectorAll('.trkCompany') //택배사
const trkNum=document.querySelectorAll('.trkNum') //송장번호


//택배 조회
trkBtn.forEach(function(trkBtn) {
        trkBtn.addEventListener('click', logEvent);
    });
    
  function logEvent(event) {	
     var number = event.target.closest('.trkInfo').children[1].innerText
      if(event.target.closest('.trkInfo').children[0].innerText == '우체국') {
window.open('about:blank').location.href='https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm?sid1='+number+'&displayHeader=N';
      } else {
   window.open('about:blank').location.href='http://www.doortodoor.co.kr/servlets/cmnChnnel?tc=dtd.cmn.command.c03condiCrg01Cmd&invc_no='+number;
      }   
    } 







