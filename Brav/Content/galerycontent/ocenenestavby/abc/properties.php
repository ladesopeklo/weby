<?php 


$textcs = "<h3>UMĚLECKÉ CENTRUM UNIVERZITY PALACKÉHO V OLOMOUCI</h3>
	<h4>&nbsp;</h4>

	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> bývalý jezuitský konvikt Univerzitní 3. a 5., Olomouc</div>
	<div>investor <span class='red'>|</span> UP Olomouc</div>
	<div>autor <span class='red'>|</span> Polách, Bravenec, Fabián</div>
	<div>realizace <span class='red'>|</span> 1999-2005</div>
	</div>";

$texten ="";

$images["01.jpg"]["title"]["cs"] =  "title cs pro 01.jpg";
$images["01.jpg"]["title"]["en"] =  "title en for 01.jpg";
$images["01.jpg"]["description"]["cs"] =  "title cs pro 01.jpg";
$images["01.jpg"]["description"]["en"] =  "title en for 01.jpg";

$images["02.jpg"]["title"]["cs"] =  "title cs pro 02.jpg";
$images["02.jpg"]["title"]["en"] =  "title en for 02.jpg";
$images["02.jpg"]["description"]["cs"] =  "<h3>lkansdklnsadklnklas </h3>";
$images["02.jpg"]["description"]["en"] =  "title en for 02.jpg";


//preg_replace - oddela zbytecne bile znaky (uspora prenesenych dat)
$data["text"]["cs"]= preg_replace('/\s\s+/', '', $textcs);
$data["text"]["en"]= preg_replace('/\s\s+/', '', $texten);






?>