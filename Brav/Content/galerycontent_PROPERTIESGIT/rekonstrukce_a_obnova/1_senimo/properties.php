<?php 

$headercs = "<h3>REKONVERZE BÝVALÝCH JATEK NA OBCHODNÍ DŮM SENIMO</h3>
	<h3>ČESTNÉ UZNÁNÍ OBCE ARCHITEKTŮ v kategorii rekonstrukce 1994<br />
	ČESTNÉ UZNÁNÍ za rekonstrukci v soutěžní přehlídce STAVBA DESETILETÍ 1989-1999 OLOMOUCKA
	</h3>";
		
$textcs = "
	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> Olomouc</div>
	<div>investor <span class='red'>|</span> ZD Senice na Hané</div>
	<div>autor <span class='red'>|</span> Polách, Fabián</div>
	<div>realizace <span class='red'>|</span> 1993</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);


?>