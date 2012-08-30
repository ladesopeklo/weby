<?php 
$headercs = "<h3>&nbsp;</h3><h3>REKONSTRUKCE A DOSTAVBA DĚTSKÉHO DOMOVA V OLOMOUCI</h3>";
		
$textcs = "	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> Olomouc - Lazce</div>
	<div>investor <span class='red'>|</span> Olomoucký Kraj</div>
	<div>autor <span class='red'>|</span> Polách, Bravenec</div>
	<div>studie <span class='red'>|</span> Atelier Polách & Bravenec s.r.o. 2011</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);
?>