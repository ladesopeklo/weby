<?php 

$headercs = "<h3>NOVOSTAVBA RODINNÉHO DOMU V DROŽDÍNĚ U OLOMOUCE</h3>
	<h4>Zvláštní ocenění v soutěžní přehlídce POROTHERM DŮM BRICK AWARD 2011-2012 - Cihla v 21.století</h4>
";
		
$textcs = "
	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> Droždín u Olomouce</div>
	<div>investor <span class='red'>|</span> soukromá osoba</div>
	<div>autor <span class='red'>|</span> Polách, Bravenec</div>
	<div>realizace <span class='red'>|</span> 2011</div>
	</div>";

//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headercs);



?>