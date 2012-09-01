<?php 

$headercs = "<h3>&nbsp;</h3><h3>RODINNÉ DOMY</h3><br />
";
		
$textcs = "
	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> Jeseník, Nemilany u Olomouce, Dolany u Olomouce, Klenčí pod Čerchovem</div>
	<div>investor <span class='red'>|</span> soukromé osoby</div>
	<div>autor <span class='red'>|</span> Polách, Bravenec</div>
	<div>projekt <span class='red'>|</span> Atelier Polách & Bravenec s.r.o. 2000-12</div>
	<div>realizace <span class='red'>|</span> 2000-12</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);




?>