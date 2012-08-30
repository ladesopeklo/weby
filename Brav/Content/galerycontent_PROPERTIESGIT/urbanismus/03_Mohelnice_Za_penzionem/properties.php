<?php 
$headercs = "<h3>&nbsp;</h3><h3>URBANISTICKÁ STUDIE PRO BYTOVOU VÝSTAVBU - LOK. ZA PENZIONEM V MOHELNICI</h3>";
		
$textcs = "	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> Mohelnice</div>
	<div>investor <span class='red'>|</span> bytové družstvo Nová Mohelnice</div>
	<div>autor <span class='red'>|</span> Polách, Bravenec</div>
	<div>projekt <span class='red'>|</span> Atelier Polách & Bravenec s.r.o. 2007</div>
	<div>realizace <span class='red'>|</span> 2010</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);
?>