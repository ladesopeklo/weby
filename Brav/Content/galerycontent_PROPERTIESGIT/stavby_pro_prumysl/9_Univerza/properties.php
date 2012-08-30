<?php 
$headercs = "<h3>&nbsp;</h3><h3>NOVOSTAVBA VÝROBNÍHO AREÁLU SPOLEČNOSTI UNIVERSA V OLOMOUCI - HOLICI</h3>";
		
$textcs = "	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> Holice u Olomouce</div>
	<div>investor <span class='red'>|</span> UNIVERSA tepelná technika s.r.o.</div>
	<div>autor <span class='red'>|</span> Polách, Bravenec</div>
	<div>projekt <span class='red'>|</span> Atelier Polách & Bravenec s.r.o. 2008-10</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);
?>