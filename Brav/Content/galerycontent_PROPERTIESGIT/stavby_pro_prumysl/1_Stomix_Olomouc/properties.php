<?php 
$headercs = "<h3>LOGISTICKÉ CENTRUM STOMIX OLOMOUC</h3>
	<h4>ČESTNÉ UZNÁNÍ v soutěži STAVBA ROKU 2010 Olomouckého kraje v kategorii stavby pro průmysl <br />ocenění KABÁT ROKU 2009 společnosti STOMIX</h4>";
		
$textcs = "	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> Olomouc</div>
	<div>investor <span class='red'>|</span> STOMIX s.r.o.</div>
	<div>autor <span class='red'>|</span> Bravenec, Polách</div>
	<div>realizace <span class='red'>|</span> 2009</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);
?>