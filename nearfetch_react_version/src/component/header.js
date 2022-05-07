import React from "react";
import "./header.css";

class Header extends React.Component {
  render() {
    return (
      <div class="section headerwrapper">
        <div class="InfoLogo">
          <div class="InfoMenu">
            <button id="loginBtn">로그인</button>
            <div id="loginModal">
              {/* <!-- <div class="modal-content" include-html="/component/login.html"></div> --> */}
              <div class="modal-content">
                <div class="close-area">
                  {/* <img src="/images/cancel.png" alt="" class="loginClose"> */}
                </div>
                <form action="" class="login">
                  <div class="loginFormTitle">즐거운 니어페치 쇼핑 시작</div>
                  <div class="loginNregister">
                    <ul>
                      <li>
                        <a href="#">로그인</a>
                      </li>
                      <li>
                        <a href="">회원 가입</a>
                      </li>
                    </ul>
                  </div>
                  <div class="ui-slider-horizontal"></div>
                  <div class="loginInfoWrapper">
                    <div class="inputWrapper">
                      <label for="mail">이메일 주소</label>
                      <br />
                      <input type="text" id="mail" />
                    </div>
                    <div class="inputWrapper">
                      <label for="password">비밀번호</label>
                      <br />
                      <input type="text" id="password" />
                    </div>
                  </div>
                  <div class="btnWrapper">
                    <button class="mailLogin">이메일로 로그인</button>

                    <button class="kakaoLogin" onclick="kakaoLogin();">
                      카카오톡으로 로그인
                    </button>
                    {/* <button class="kakaoLogout" onclick="kakaoLogout();">카카오톡 로그아웃</button> */}
                  </div>
                  <div class="loginActions">
                    <ul>
                      <li>
                        <a href="">회원가입하기</a>
                      </li>
                      <li>
                        <a href="">아이디를 잊으셨나요?</a>
                      </li>
                      <li>
                        <a href="">비밀번호를 잊으셨나요?</a>
                      </li>
                    </ul>
                  </div>
                </form>
              </div>
            </div>

            <button id="registerBtn">회원가입</button>
            <div id="registerModal">
              <div
                class="modal-content"
                include-html="/component/register.html"
              ></div>
            </div>

            <button id="myInfo">내정보</button>
            <button
              id="myCart"
              onclick="location.href='../myinfoAll/cart.html'"
            >
              장바구니
            </button>
          </div>

          {/* <!-- 메인로고 --> */}
          <div class="MainLogoWrapper">
            <a href="../main page/main.html">NEARFETCH</a>
          </div>
        </div>

        {/* <!-- 상품 카테고리&검색창 --> */}
        <div class="itemCategory">
          {/* <!-- 상품 카테고리 --> */}
          <div class="topnav" id="myTopnav">
            {/* <!-- 디자이너 --> */}
            <div class="dropdown">
              <button>DESIGNERS</button>
            </div>
            {/* <!-- 여성 --> */}
            <div class="dropdown">
              <button class="dropbtn">WOMEN</button>
              <div class="dropdown-content">
                <div class="categoryMedium">
                  <a href="#">clothing</a>
                  <ul>
                    <li>
                      <a href="">coats</a>
                    </li>
                    <li>
                      <a href="">dresses</a>
                    </li>
                    <li>
                      <a href="">jackets</a>
                    </li>
                    <li>
                      <a href="">jeans</a>
                    </li>
                    <li>
                      <a href="">knitwear</a>
                    </li>
                    <li>
                      <a href="">lingerie & swimwear</a>
                    </li>
                    <li>
                      <a href="">shirts</a>
                    </li>
                    <li>
                      <a href="">skirts</a>
                    </li>
                    <li>
                      <a href="">t-shirts</a>
                    </li>
                    <li>
                      <a href="">pants</a>
                    </li>
                  </ul>
                </div>

                <div class="categoryMedium">
                  <a href="#">shoes</a>
                  <ul>
                    <li>
                      <a href="">boots</a>
                    </li>
                    <li>
                      <a href="">flats</a>
                    </li>
                    <li>
                      <a href="">heels</a>
                    </li>
                    <li>
                      <a href="">lace-up shoes</a>
                    </li>
                    <li>
                      <a href="">loafers</a>
                    </li>
                    <li>
                      <a href="">sandals</a>
                    </li>
                    <li>
                      <a href="">sneakers</a>
                    </li>
                    <li>
                      <a href="">wedges</a>
                    </li>
                  </ul>
                </div>

                <div class="categoryMedium">
                  <a href="#">bags</a>
                  <ul>
                    <li>
                      <a href="">backpacks</a>
                    </li>
                    <li>
                      <a href="">belt bags</a>
                    </li>
                    <li>
                      <a href="">clutches</a>
                    </li>
                    <li>
                      <a href="">handbags</a>
                    </li>
                    <li>
                      <a href="">shopping bags</a>
                    </li>
                    <li>
                      <a href="">shoulder bags</a>
                    </li>
                    <li>
                      <a href="">travel bags</a>
                    </li>
                  </ul>
                </div>
                <div class="categoryMedium">
                  <a href="#">accessories</a>
                  <ul>
                    <li>
                      <a href="">belts & braces</a>
                    </li>
                    <li>
                      <a href="">jewelry</a>
                    </li>
                    <li>
                      <a href="">glasses</a>
                    </li>
                    <li>
                      <a href="">gloves</a>
                    </li>
                    <li>
                      <a href="">hats</a>
                    </li>
                    <li>
                      <a href="">scarves & foulards</a>
                    </li>
                    <li>
                      <a href="">wallets</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* <!-- 남성 --> */}
            <div class="dropdown">
              <button class="dropbtn">MEN</button>
              <div class="dropdown-content">
                <div class="categoryMedium">
                  <a href="#">clothing</a>
                  <ul>
                    <li>
                      <a href="">coats</a>
                    </li>
                    <li>
                      <a href="">jackets</a>
                    </li>
                    <li>
                      <a href="">jeans</a>
                    </li>
                    <li>
                      <a href="">knitwear</a>
                    </li>
                    <li>
                      <a href="">shirts</a>
                    </li>
                    <li>
                      <a href="">suits</a>
                    </li>
                    <li>
                      <a href="">t-shirts</a>
                    </li>
                    <li>
                      <a href="">pants</a>
                    </li>
                    <li>
                      <a href="">underwear & swimwear</a>
                    </li>
                  </ul>
                </div>

                <div class="categoryMedium">
                  <a href="#">shoes</a>
                  <ul>
                    <li>
                      <a href="">boots</a>
                    </li>
                    <li>
                      <a href="">lace-up shoes</a>
                    </li>
                    <li>
                      <a href="">loafers</a>
                    </li>
                    <li>
                      <a href="">sandals</a>
                    </li>
                    <li>
                      <a href="">sneakers</a>
                    </li>
                  </ul>
                </div>

                <div class="categoryMedium">
                  <a href="#">bags</a>
                  <ul>
                    <li>
                      <a href="">backpacks</a>
                    </li>
                    <li>
                      <a href="">belt bags</a>
                    </li>
                    <li>
                      <a href="">briefcases</a>
                    </li>
                    <li>
                      <a href="">clutches</a>
                    </li>
                    <li>
                      <a href="">handbags</a>
                    </li>
                    <li>
                      <a href="">messenger bags</a>
                    </li>
                    <li>
                      <a href="">shopping bags</a>
                    </li>
                    <li>
                      <a href="">travel bags</a>
                    </li>
                  </ul>
                </div>
                <div class="categoryMedium">
                  <a href="#">accessories</a>
                  <ul>
                    <li>
                      <a href="">belts & braces</a>
                    </li>
                    <li>
                      <a href="">jewelry</a>
                    </li>
                    <li>
                      <a href="">glasses</a>
                    </li>
                    <li>
                      <a href="">gloves</a>
                    </li>
                    <li>
                      <a href="">hats</a>
                    </li>
                    <li>
                      <a href="">ties & bowties</a>
                    </li>
                    <li>
                      <a href="">scarves & foulards</a>
                    </li>
                    <li>
                      <a href="">wallets</a>
                    </li>
                    <li>
                      <a href="">watches</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* <!-- 세일 --> */}
            <div class="dropdown">
              <button class="dropbtn">SALE</button>
              <div class="dropdown-content">
                <div class="categoryMedium">
                  <a href="#">sale WOMEN</a>
                  <ul>
                    <li>
                      <a href="">clothing</a>
                    </li>
                    <li>
                      <a href="">shoes</a>
                    </li>
                    <li>
                      <a href="">bags</a>
                    </li>
                    <li>
                      <a href="">accessories</a>
                    </li>
                  </ul>
                </div>

                <div class="categoryMedium">
                  <a href="#">sale MEN</a>
                  <ul>
                    <li>
                      <a href="">clothing</a>
                    </li>
                    <li>
                      <a href="">shoes</a>
                    </li>
                    <li>
                      <a href="">bags</a>
                    </li>
                    <li>
                      <a href="">accessories</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <a href="javascript:void(0);" class="icon" onclick="spreadNavbar()">
              &#9776;
            </a>
          </div>

          <form action="" method="GET">
            <input name="search" type="text" placeholder="검색:" />
          </form>
        </div>
      </div>
    );
  }
}

export default Header;
