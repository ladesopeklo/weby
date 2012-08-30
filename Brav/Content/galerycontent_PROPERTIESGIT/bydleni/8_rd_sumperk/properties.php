<?php 


$headercs = "<h3>&nbsp;</h3><h3>VÝSTAVBA BYTOVÝCH, RODINNÝCH A ŘADOVÝCH DOMŮ V ŠUMPERKU</h3><br />";
		
$textcs = "
<div class='detail'>
	<div>místo stavby <span class='red'>|</span> lok. Prievidzská, lok. Panorama v Šumperku</div>
	<div>investor <span class='red'>|</span> FORTEX a.s.</div>
	<div>autor <span class='red'>|</span> Polách, Bravenec</div>
	<div>projekt <span class='red'>|</span> Atelier Polách & Bravenec s.r.o. 2008-10</div>
	<div>realizace <span class='red'>|</span> v realizaci</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);


?>