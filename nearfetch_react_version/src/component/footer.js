function Footer(){
    return(
<div className="section FooterInfo">
  <div className="CompanyInfo">
    <h3>회사 소개</h3>
    <ul>
      <li>
        <a href="/NEARFETCH_js_version/appDown/appDown.html"
          >왜 NearFetch인가?</a
        >
      </li>
      <li>
        <a href="/NEARFETCH_js_version/UpSelling Point/usp.html"
          >NearFetch만의 혜택</a
        >
      </li>
    </ul>
  </div>

  <div className="CustomerSupport">
    <h3>고객 센터</h3>
    <ul>
      <li>
        <a href="/NEARFETCH_js_version/QnA/qna.html">자주하는 질문</a>
      </li>
      <li>채팅으로 연락하기</li>
      <li>전화로 연락하기</li>
    </ul>
  </div>

  <div className="AppDownload">
    <h3>앱 다운로드</h3>
    <img src="/images/qr.PNG" alt="" width="80px" />
  </div>
</div>

    )
}

export default Footer;