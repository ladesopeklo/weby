<?php 
$headercs = "<h3>&nbsp;</h3><h3>PRODEJNÍ A SERVISNÍ CENTRUM - VW, ŠKODA, AUDI, KIA - AUTO HLAVÁČEK OLOMOUC</h3>";
		
$textcs = "	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> Holice u Olomouce</div>
	<div>investor <span class='red'>|</span> Auto Hlaváček, a.s.</div>
	<div>autor <span class='red'>|</span> Polách, Bravenec, Škoda auto showroom koncept</div>
	<div>projekt <span class='red'>|</span> Atelier Polách & Bravenec s.r.o. 2008-10</div>
	<div>realizace <span class='red'>|</span> 2011</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);
?>