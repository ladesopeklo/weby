<?php 
$headercs = "<h3>&nbsp;</h3><h3>INTERIÉR LŮŽKOVÉHO PAVILONU DOMOVA VĚTRNÝ MLÝN VE SKALIČCE</h3>";
		
$textcs = "	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> Skalička u Hranic na Moravě</div>
	<div>investor <span class='red'>|</span> Olomoucký Kraj</div>
	<div>autor <span class='red'>|</span> Polách, Bravenec</div>
	<div>projekt <span class='red'>|</span> Atelier Polách & Bravenec s.r.o. 2009</div>
	<div>realizace <span class='red'>|</span> 2011-12</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);
?>