<?php 
$headercs = "<h3>VILA STOMIX - REKONSTRUKCE A PŘÍSTAVBA BÝVALÉ FRANKEHO VILY V ŽULOVÉ</h3>
	<h3>STAVBA ROKU 2008 Olomouckého kraje v kategorii rekonstrukce a obnova</h3>";
		
$textcs = "	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> Žulová</div>
	<div>investor <span class='red'>|</span> STOMIX s.r.o.</div>
	<div>autor <span class='red'>|</span> Polách, Bravenec</div>
	<div>realizace <span class='red'>|</span> 2008</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);
?>