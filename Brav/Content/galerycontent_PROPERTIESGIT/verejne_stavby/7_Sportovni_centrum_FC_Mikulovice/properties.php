<?php 
$headercs = "<h3>&nbsp;</h3><h3>NOVOSTAVBA SPORTOVNÍHO AREÁLU FC TRUL MIKULOVICE</h3>";
		
$textcs = "	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> Mikulovice</div>
	<div>investor <span class='red'>|</span> FC TRUL Mikulovice</div>
	<div>autor <span class='red'>|</span> Polách, Bravenec, Rozwalka</div>
	<div>studie <span class='red'>|</span> Atelier Polách & Bravenec s.r.o. 2005</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);
?>