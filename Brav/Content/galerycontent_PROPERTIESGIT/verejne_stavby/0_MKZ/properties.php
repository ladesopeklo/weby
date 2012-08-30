<?php 
$headercs = "<h3>&nbsp;</h3><h3>MULTIFUNKČNÍ KULTURNÍ ZAŘÍZENÍ VE ŠTERNBERKU - STAVEBNÍ ÚPRAVY A DOSTAVBA</h3>";
		
$textcs = "	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> Šternberk</div>
	<div>investor <span class='red'>|</span> Město Šternberk</div>
	<div>autor <span class='red'>|</span> Polách, Bravenec</div>
	<div>projekt <span class='red'>|</span> Atelier Polách & Bravenec s.r.o. 2008-12</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);
?>