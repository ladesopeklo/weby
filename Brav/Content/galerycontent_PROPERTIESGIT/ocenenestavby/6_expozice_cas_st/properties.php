<?php 
$headercs = "<h3>EXPOZICE ČASU VE ŠTERNBERKU</h3>
	<h4>ČESTNÉ UZNÁNÍ v soutěžní přehlídce STAVBA ROKU 2010 Olomouckého kraje v kategorii rekonstrukce a obnava</h4>";
		
$textcs = "

	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> Šternberk</div>
	<div>investor <span class='red'>|</span> Město Šternberk</div>
	<div>autor <span class='red'>|</span> Polách, Bravenec</div>
	<div>realizace <span class='red'>|</span> 2010</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);



?>