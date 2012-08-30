<?php 
$headercs = "<h3>&nbsp;</h3><h4>INTERIÉR POVĚŘENÉHO ÚŘADU VE ŠTERNBERKU</h4>";
		
$textcs = "	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> Šternberk</div>
	<div>investor <span class='red'>|</span> Město Šternberk</div>
	<div>autor <span class='red'>|</span> Polách, Bravenec</div>
	<div>projekt <span class='red'>|</span> Atelier Polách & Bravenec s.r.o. 2005</div>
	<div>realizace <span class='red'>|</span> 2005</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);
?>