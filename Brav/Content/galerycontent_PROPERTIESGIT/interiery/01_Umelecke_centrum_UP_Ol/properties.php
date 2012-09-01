<?php 
$headercs = "<h3>INTERIÉR UMĚLECKÉHO CENTRA UNIVERZITY PALACKÉHO V OLOMOUCI</h3><h3>ČESTNÉ UZNÁNÍ v soutěži STAVBA ROKU 2004 Olomouckého kraje v kategorii občanské stavby</h3>";

$textcs = "	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> Olomouc, Univerzitní 3,5</div>
	<div>investor <span class='red'>|</span> UP v Olomouci</div>
	<div>autor <span class='red'>|</span> Polách, Bravenec, Rozwalka, Lubič</div>
	<div>projekt <span class='red'>|</span> Atelier Polách & Bravenec s.r.o. 2001-2003</div>
	<div>realizace <span class='red'>|</span> 2002-4</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);
?>