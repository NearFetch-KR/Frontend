import React from 'react';
import './main.css';


class Main extends React.Component{
    render(){
        return (
        <div>
        <div class="section newsList">
            <h2>니어패치 매거진,<br/>그 브랜드를 알고싶다.</h2>
            <div class="carousel" aria-label="Gallery">
              <ol class="carousel__viewport">
                <li id="carousel__slide1"
                    tabindex="0"
                    class="carousel__slide">
                  <div class="carousel__snapper">
                      <img src="https://media.matchesfashion.com/apps/Content/Homepage/Heroes/c9d6a3ce-920c-4b3c-a43e-eb8e5812483a-0427-WW-HP-hero-1-large.jpg?width=1180&quality=95" alt=""/>
                  </div>
                </li>
                <li id="carousel__slide2"
                    tabindex="0"
                    class="carousel__slide">
                  <div class="carousel__snapper">
                      <img src="https://media.matchesfashion.com/apps/Content/Homepage/Promos/36ba518b-3590-49a4-9fa0-4df4fdd0bec7-0000-ww-promo-7-large.jpg?width=1400&quality=90" alt=""/>
                  </div>
                </li>
                <li id="carousel__slide3"
                    tabindex="0"
                    class="carousel__slide">
                  <div class="carousel__snapper">
                      <img src="https://media.matchesfashion.com/apps/Content/Meganav/def3beae-0fda-40d8-a161-57eaabd85628-Home.jpg10.jpg" alt=""/>
                  </div>
                </li>
                <li id="carousel__slide4"
                    tabindex="0"
                    class="carousel__slide">
                  <div class="carousel__snapper">
                    <img src="https://media.matchesfashion.com/apps/Content/Homepage/Promos/36ba518b-3590-49a4-9fa0-4df4fdd0bec7-0000-ww-promo-7-large.jpg?width=1400&quality=90" alt=""/>
                 </div>
                </li>
              </ol>
            </div>
        </div>

        <div class="section HotDeal">
            <h2>오늘만 이 가격, 실화🤫</h2>
            <div class="Timer">
                <ul>
                    <li>
                        <div class="NumberDays"></div>
                        <div class="timeText">days</div>
                    </li>
                    <li>
                        <div class="number-semi">:</div>
                    </li>
                    <li>
                        <div class="NumberHours"></div>
                        <div class="timeText">hours</div>
                    </li>
                    <li>
                        <div class="number-semi">:</div>
                    </li>
                    <li>
                        <div class="NumberMinutes"></div>
                        <div class="timeText">minutes</div>
                    </li>
                    <li>
                        <div class="number-semi">:</div>
                    </li>
                    <li>
                        <div class="NumberSeconds"></div>
                        <div class="timeText">seconds</div>
                    </li>
                </ul>
            </div>
            <div class="HotDealContents">
                {/* <!-- 컨텐츠1 --> */}
                <div class="HotDealWrapper">
                    <div class="HotDealContentsVideo">
                        <video src="https://www.chanel.com/videos/e_volume:mute/q_90,f_mp4,c_scale,w_1852,c_limit/FSH-1617110876630-campagne04filmmobile.mp4" autoplay muted loop></video>
                    </div>
                    <div class="HotDealContentsText">
                        <div class="itemBrand">GUCCI</div>
                        <div class="itemName">마티백 18 크링클드 </div> 
                        <span class="price">139,000원</span>
                    </div>
                </div>
                {/* <!-- 컨텐츠2 --> */}
                <div class="HotDealWrapper">
                    <div class="HotDealContentsVideo">
                        <video src="https://www.chanel.com/videos/e_volume:mute/q_90,f_mp4,c_scale,w_1852,c_limit/FSH-1617110876630-campagne04filmmobile.mp4" autoplay muted loop></video>
                    </div>
                    <div class="HotDealContentsText">
                        <div class="itemBrand">GUCCI</div>
                        <div class="itemName">마티백 18 크링클드 </div> 
                        <span class="price">139,000원</span>
                    </div>
                </div>   
            </div>
        </div>
        </div>
    

        // // <!-- 이번주 베스트셀러 -->
        // <div class="section BestSeller">
        //     <h2>이번 주 ✨갓✨템</h2>
        //     <div include-html="/component/itemList.html"></div>
        // </div>

        // // <!-- 당장 사야할 것들 -->
        // <div class="section MustBuyNow">
        //     <h2>당장 사야할 것들,여기 다 있다</h2>
        //     <div class="mustBuyWrapper">
        //         <div class="mustBuyItem">
        //             <img src="https://media.matchesfashion.com/prehome/aw21/womens-category-bags.jpg?width=500&quality=65" alt=""/>
        //             <div class="spanWrapper">
        //                 <span class="itemBrand">GUCCI</span>
        //                 <span>/</span>
        //                 <span class="itemName">귀염토트백</span>
        //                 <br/>
        //                 <span><span class="price">10,000</span>원</span>
        //             </div>
        //         </div>
        //         <div class="mustBuyItem">
        //             <img src="https://media.matchesfashion.com/prehome/aw21/womens-category-bags.jpg?width=500&quality=65" alt=""/>
        //             <div class="spanWrapper">
        //                 <span class="itemBrand">GUCCI</span>
        //                 <span>/</span>
        //                 <span class="itemName">귀염토트백</span>
        //                 <br/>
        //                 <span class="price">10,000</span>
        //                 <span>원</span>
        //             </div>
        //         </div>
        //         <div class="mustBuyItem">
        //             <img src="https://media.matchesfashion.com/prehome/aw21/womens-category-bags.jpg?width=500&quality=65" alt=""/>
        //             <div class="spanWrapper">
        //                 <span class="itemBrand">GUCCI</span>
        //                 <span>/</span>
        //                 <span class="itemName">귀염토트백</span>
        //                 <br/>
        //                 <span class="price">10,000</span>
        //                 <span>원</span>
        //             </div>
        //         </div>
        //         <div class="mustBuyItem">
        //             <img src="https://media.matchesfashion.com/prehome/aw21/womens-category-bags.jpg?width=500&quality=65" alt=""/>
        //             <div class="spanWrapper">
        //                 <span class="itemBrand">GUCCI</span>
        //                 <span>/</span>
        //                 <span class="itemName">귀염토트백</span>
        //                 <br/>
        //                 <span class="price">10,000</span>
        //                 <span>원</span>
        //             </div>
        //         </div>
        //     </div>
        // </div>
       
   
        

        // // <!-- 난리난 브랜드 -->
        // <div class="section RageNow">
        //     <h2>루이비통,지금 난리 났다.</h2>
        //     <div class="videoWrapper">
        //         <div class="videoBox">                                                                              
        //             <video src="https://lv-vod.fl.freecaster.net/vod/louisvuitton/d8F13pGZxs_HD.mp4" autoplay muted loop></video>
        //         </div>
        //         <button type="button">더 많은 상품 알아보기</button>
        //     </div> 
        // </div>
       
      
        // // <!-- 추천리스트 -->
        // <div class="section Recommend">
        //     <h2>세상 소중한 당신에게,<br/>감히 추천하는 아이템.</h2>
        //     <div class="itemListWrapper">
        //         {/* <!-- 추천 아이템 리스트 --> */}
        //     </div>
        // </div>
          
        )
    }
}
     
export default Main;