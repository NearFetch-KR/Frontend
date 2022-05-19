// /* -----------로그인&회원가입(모달창&기능)----------- */
window.onload = function () {
  // console.log("로그인상태 테스트1");
  // if (localStorage.getItem("login-token")) {
  //   document.querySelector(".InfoMenu #loginBtn").style.display = "none";
  // } else {
  //   document.querySelector(".InfoMenu #loginBtn").innerText = "로그인";
  // }
  // function goSearch() {
  //   document.myForm.action = `http://127.0.0.1:5500/NEARFETCH_js_version/search%20list/search.html`;
  //   const keyword_default = document.querySelector("form .keyword");
  //   searchItemList();
  // }
  // const form = document.querySelector(".itemCategory .form");
  // console.log("form test");
  // form.addEventListener("submit", goSearch);
  // //   로그인 모달창
  // var loginModal = document.getElementById("loginModal");
  // var loginBtn = document.getElementById("loginBtn");
  // var loginClose = document.querySelector(".loginClose");
  // loginBtn.onclick = function () {
  //   loginModal.style.display = "block";
  // };
  // loginClose.onclick = function () {
  //   loginModal.style.display = "none";
  // };
  // window.onclick = function (event) {
  //   if (event.target == loginModal) {
  //     loginModal.style.display = "none";
  //   }
  // };
  // //   회원가입 모달창
  // var registerModal = document.getElementById("registerModal");
  // var registerBtn = document.getElementById("registerBtn");
  // var registerClose = document.querySelector(".registerClose");
  // registerBtn.onclick = function () {
  //   registerModal.style.display = "block";
  // };
  // registerClose.onclick = function () {
  //   registerModal.style.display = "none";
  // };
  // window.onclick = function (event) {
  //   if (event.target == registerModal) {
  //     registerModal.style.display = "none";
  //   }
  // };
  // //회원가입(기능)
  // const mailRegister = document.querySelector(".goRegister");
  // mailRegister.addEventListener("click", (e) => {
  //   let name = document.querySelector(
  //     ".registerBtnWrapper .inputWrapper #name"
  //   ).value;
  //   let mail = document.querySelector(
  //     ".registerBtnWrapper .inputWrapper #registerMail"
  //   ).value;
  //   let pw = document.querySelector(
  //     ".registerBtnWrapper .inputWrapper #registerPW"
  //   ).value;
  //   e.preventDefault();
  //   let param = {
  //     name: name,
  //     email: mail,
  //     password: pw,
  //   };
  //   fetch("http://52.79.242.14:8000/users/signup", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(param),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       alert("회원가입이 완료되었습니다. 로그인을 진행해주세요.");
  //       document.getElementById("registerModal").style.display = "none";
  //     })
  //     .catch((error) => console.log("error:", error));
  // });
  // // 로그인(기능)
  // const mailLogin = document.querySelector(".login .mailLogin");
  // mailLogin.addEventListener("click", (e) => {
  //   let mail = document.querySelector(
  //     ".loginInfoWrapper .inputWrapper #loginMail"
  //   ).value;
  //   let pw = document.querySelector(
  //     ".loginInfoWrapper .inputWrapper #loginPW"
  //   ).value;
  //   e.preventDefault();
  //   let param = {
  //     email: mail,
  //     password: pw,
  //   };
  //   fetch("http://52.79.242.14:8000/users/signin", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(param),
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       if (response.access_token) {
  //         localStorage.setItem("login-token", response.access_token);
  //         alert("로그인 성공");
  //         document.getElementById("loginModal").style.display = "none";
  //       } else {
  //         alert("회원 정보를 재확인해주세요.");
  //       }
  //     })
  //     .catch((error) => console.log("error:", error));
  // });
  // // 카카오 로그인
  // // Kakao.init('c06d45d83cfbe0482ac643895bc7aea1'); //발급받은 키 중 javascript키를 사용해준다.
  // // // console.log(Kakao.isInitialized()); // sdk초기화여부판단
  // // function kakaoLogin() {
  // //     Kakao.Auth.login({
  // //     success: function (response) {
  // //         Kakao.API.request({
  // //         url: '/v2/user/me',
  // //         success: function (response) {
  // //             console.log(response)
  // //         },
  // //         fail: function (error) {
  // //             console.log(error)
  // //         },
  // //         })
  // //     },
  // //     fail: function (error) {
  // //         console.log(error)
  // //     },
  // //     })
  // // }
  // // //카카오로그아웃
  // // function kakaoLogout() {
  // //     if (Kakao.Auth.getAccessToken()) {
  // //     Kakao.API.request({
  // //         url: '/v1/user/unlink',
  // //         success: function (response) {
  // //             console.log(response)
  // //         },
  // //         fail: function (error) {
  // //         console.log(error)
  // //         },
  // //     })
  // //     Kakao.Auth.setAccessToken(undefined)
  // //     }
  // // }
};
