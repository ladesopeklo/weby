<?php 
$headercs = "<h3>&nbsp;</h3><h3>REKONSTRUKCE A DOSTAVBA KNIHOVNY V ŠUMPERKU</h3>";
		
$textcs = "	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> Šumperk</div>
	<div>investor <span class='red'>|</span> Město Šumperk</div>
	<div>autor <span class='red'>|</span> Polách, Bravenec</div>
	<div>studie <span class='red'>|</span> Atelier Polách & Bravenec s.r.o. 2008s</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);
?>