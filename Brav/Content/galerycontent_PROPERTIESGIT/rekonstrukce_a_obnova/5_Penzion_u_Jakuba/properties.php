<?php 
$headercs = "<h3>&nbsp;</h3>
	<h3>REKONSTRUKCE MĚŠŤANSKÉHO DOMU V OLOMOUCI - 8.KVĚTNA 9 - PENZION U JAKUBA</h3>";
		
$textcs = "	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> Olomouc</div>
	<div>investor <span class='red'>|</span> soukromá osoba</div>
	<div>autor <span class='red'>|</span> Polách, Bravenec</div>
	<div>realizace <span class='red'>|</span> 2008</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);
?>