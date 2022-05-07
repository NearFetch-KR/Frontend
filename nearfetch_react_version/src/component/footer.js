import React from 'react';
import './footer.css';


class Footer extends React.Component{
    render(){
        return (
            <div class="section FooterInfo">
                <div class="CompanyInfo">
                    <h3>회사 소개</h3>
                    <ul>
                        <li>왜 NearFetch인가?</li>
                        <li>NearFetch만의 혜택</li>
                    </ul>
                </div>

                <div class="CustomerSupport">
                    <h3>고객 센터</h3>
                    <ul>
                        <li>자주하는 질문</li>
                        <li>채팅으로 연락하기</li>
                        <li>전화로 연락하기</li>
                    </ul>
                </div>

                <div class="AppDownload">
                    <h3>앱 다운로드</h3>
                    {/* <img src="/" alt="" width="80px"> */}
                </div>  
            </div>
        )
    }
}
     
export default Footer;