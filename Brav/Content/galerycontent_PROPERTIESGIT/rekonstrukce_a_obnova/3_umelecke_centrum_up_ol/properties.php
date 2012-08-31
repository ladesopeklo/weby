<?php 
$headercs = "<h3>UMĚLECKÉ CENTRUM UNIVERZITY PALACKÉHO V OLOMOUCI</h3>
	<h3>ČESTNÉ UZNÁNÍ v soutěži STAVBA ROKU 2004 Olomouckého kraje v kategorii občanské stavby</h3>";
		
$textcs = "	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> bývalý jezuitský konvikt - Univerzitní 3. a 5., Olomouc</div>
	<div>investor <span class='red'>|</span> UP Olomouc</div>
	<div>autor <span class='red'>|</span> Polách, Bravenec, Fabián</div>
	<div>realizace <span class='red'>|</span> 1999-2005</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);
?>


