<?php 
$headercs = "<h3>&nbsp;</h3><h3>INTERIÉR INFORMAČNÍHO CENTRA UNIVERZITY PALACKÉHO V OLOMOUCI</h3>";
		
$textcs = "	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> Olomouc</div>
	<div>investor <span class='red'>|</span> UP v Olomouci</div>
	<div>autor <span class='red'>|</span> Polách, Bravenec, Fabián</div>
	<div>projekt <span class='red'>|</span> 1997</div>
	<div>realizace <span class='red'>|</span> 1998-9</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);
?>