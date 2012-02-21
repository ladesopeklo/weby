<?php 
$culture = isset($_POST["culture"]) ? $_POST["culture"] : "cs" ;
$p = isset($_POST["action"]) ? $_POST["action"] : "" ;
$type = isset($_POST["type"]) ? $_POST["type"] : "html" ;

$path	 = "../Content/".$p;

function checkType($file,$type){
	$p = pathinfo($file);
	if (isset($p['extension']))
	{
		$e = strtolower($p['extension']);
		if  ($e == $type ){
			return strtolower($p['filename']);
		}
	}
	return null;
}


function getfiles($path, $culture,$type){
	if ($handle = opendir($path)) {
		$arr = null;
		while (false !== ($file = readdir($handle))) {
			if ($file != "." && $file != "..") {
				$tmp = checkType($file,$type);
				if($tmp != null){

					$checkculture  = checkType($tmp,$culture);
					if ($checkculture != null ){
						$arr[] =  $checkculture;
					}
				
					
				}
			}
		}
		closedir($handle);
		return $arr;
	}
}

$list = getfiles($path,$culture,$type);
echo json_encode($list);



?>