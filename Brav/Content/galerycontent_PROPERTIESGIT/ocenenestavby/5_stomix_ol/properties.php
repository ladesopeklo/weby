<?php 

$headercs = "<h3>LOGISTICKÉ CENTRUM STOMIX OLOMOUC</h3>
	<h3>ČESTNÉ UZNÁNÍ v soutěžní přehlídce STAVBA ROKU 2010 Olomouckého kraje v kategorii průmyslové stavby</h3>";
		
$textcs = "

	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> Olomouc</div>
	<div>investor <span class='red'>|</span> STOMIX Olomouc s.r.o.</div>
	<div>autor <span class='red'>|</span> Polách, Bravenec</div>
	<div>realizace <span class='red'>|</span> 2009</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);

?>