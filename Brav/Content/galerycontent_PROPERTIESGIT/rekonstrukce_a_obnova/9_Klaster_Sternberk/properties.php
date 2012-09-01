<?php 
$headercs = "<h3>&nbsp;</h3><h3>OBNOVA A ZÁCHRANA BÝV. AUGUSTINIÁNSKÉHO KLÁŠTERA VE ŠTERNBERKU</h3>";
		
$textcs = "	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> Šternberk</div>
	<div>investor <span class='red'>|</span> Město Šternberk</div>
	<div>autor <span class='red'>|</span> Bravenec, Polách</div>
	<div>realizace <span class='red'>|</span> 1999-2012</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);
?>