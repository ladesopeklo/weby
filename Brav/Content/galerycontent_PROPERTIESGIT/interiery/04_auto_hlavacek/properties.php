<?php 
$headercs = "<h3>&nbsp;</h3><h4>INTERIÉR PRODEJNÍHO A SERVISNÍHO CENTRA AUTO HLAVÁČEK a.s. V OLOMOUCI</h4>";
		
$textcs = "	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> Olomouc</div>
	<div>investor <span class='red'>|</span> Auto Hlaváček a.s., Olomouc</div>
	<div>autor <span class='red'>|</span> Polách, Bravenec</div>
	<div>projekt <span class='red'>|</span> Atelier Polách & Bravenec s.r.o. 2006</div>
	<div>realizace <span class='red'>|</span> 2006</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);
?>