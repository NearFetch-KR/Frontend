//X누르면 지워버리기!
const button=document.querySelectorAll('.likeItem>button');
const likeItem=document.querySelectorAll('.likeItem'); //
// console.log(likeItem.length)

//버튼 누르면 누른 박스 사라지게 만들기!
for(var i=0;i<button.length;i++){
    button[i].addEventListener('click',()=>{
        likeItem[i].style.display="none";
    })
}
