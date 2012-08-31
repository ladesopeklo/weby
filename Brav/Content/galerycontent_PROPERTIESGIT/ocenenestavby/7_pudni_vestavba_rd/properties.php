<?php 
$headercs = "<h3>PŮDNÍ VESTAVBA RODINNÉHO DOMU V OLOMOUCI</h3>
	<h3>3. místo v hodnocení odborné poroty v soutěži iDNES.cz o NEJLEPŠÍ BYDLENÍ V PODKROVÍ</h3>";
		
$textcs = "

	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> Olomouc</div>
	<div>investor <span class='red'>|</span> soukromá osoba</div>
	<div>autor <span class='red'>|</span> Bravenec</div>
	<div>realizace <span class='red'>|</span> 2010</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);

?>