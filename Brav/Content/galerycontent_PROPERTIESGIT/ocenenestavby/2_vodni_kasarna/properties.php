<?php 

$headercs = "<h3>REKONSTRUKCE VODNÍCH KASÁREN V OLOMOUCI</h3>
	<h3>ČESTNÉ UZNÁNÍ pro investora v soutěžní přehlídce STAVBA DESETILETÍ 1989 - 1999 OLOMOUCKA</h3>";
		
$textcs = "

	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> Uhelná - Mlýnská, Olomouc</div>
	<div>investor <span class='red'>|</span> Filia s.r.o</div>
	<div>autor <span class='red'>|</span> Polách, Fabián, Bravenec</div>
	<div>realizace <span class='red'>|</span> 1998</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);

?>