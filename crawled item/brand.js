const axios=require('axios');
const cheerio=require('cheerio');

function melonCrawler(){
	const url=`https://www.melon.com/chart/index.htm`; 
	
	axios.get(url)
	.then(res=>{
		if(res.status==200){
			let crawledMusic=[];
			//[{title:"...",artist:"...",img:"..."},{},{}..]형태로 가져오고싶음!

			const $=cheerio.load(res.data); 
			const $list=$('table > tbody >tr');
			$list.each(function(i){
				crawledMusic[i]={
					title:$(this).find('div > div > div.ellipsis.rank01 > span > a').text(), 
					artist:$(this).find('div > div > div.ellipsis.rank02 > a').text(),
					img:$(this).find('td > div > a > img').attr('src')
				}
			});
			console.log(crawledMusic);
		
		}
})
}

melonCrawler();