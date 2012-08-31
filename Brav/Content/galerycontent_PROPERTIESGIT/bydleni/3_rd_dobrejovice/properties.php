<?php 

$headercs = "<h3>&nbsp;</h3><h3>VÝSTAVBA RODINNÝCH DOMŮ V LOKALITĚ MLÝNSKÝ RYBNÍK - DOBŘEJOVICE U PRAHY</h3><br />
";
		
$textcs = "
	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> Dobřejovice u Prahy</div>
	<div>investor <span class='red'>|</span> SIG s.r.o.</div>
	<div>autor <span class='red'>|</span> Polách, Bravenec</div>
	<div>projekt <span class='red'>|</span> Atelier Polách & Bravenec s.r.o. 2008-10</div>
	<div>realizace <span class='red'>|</span> 2010</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);

?>