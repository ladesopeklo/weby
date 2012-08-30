<?php 

$headercs = "<h3>AAA</h3>
	<h4>aaa</h4>";
		
$textcs = "	<div class='detail'>
	<div>místo stavby <span class='red'>|</span> xxx</div>
	<div>investor <span class='red'>|</span> xxx</div>
	<div>autor <span class='red'>|</span> xxx</div>
	<div>realizace <span class='red'>|</span> 1999-2005</div>
	</div>";

$texten ="";
$headeren ="";

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

$data["header"]["cs"]= preg_replace('/\s\s+/', '', $headersc);
$data["header"]["en"]= preg_replace('/\s\s+/', '', $headeren);






?>