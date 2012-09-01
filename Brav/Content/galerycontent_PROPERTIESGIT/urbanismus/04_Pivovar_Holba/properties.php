<?php 
$headercs = "<h3>&nbsp;</h3><h3>URBANISTICKÁ STUDIE PRŮMYSLOVÉHO AREÁLU PIVOVARU HOLBA HANUŠOVICE</h3>";
		
$textcs = "	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> Hanušovice</div>
	<div>investor <span class='red'>|</span> Pivovar HOLBA a.s.</div>
	<div>autor <span class='red'>|</span> Polách, Bravenec</div>
	<div>studie <span class='red'>|</span> Atelier Polách & Bravenec s.r.o. 2007</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);
?>