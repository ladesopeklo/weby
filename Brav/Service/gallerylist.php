<?php 
require  '../config.php';
require  'libs.php';
////check
$culture = isset($_POST["culture"]) ? $_POST["culture"] : "cs" ;
$controller=null;
if ($debug){
	$controller = isset($_POST["controller"]) ? $_POST["controller"] : "galerycontent" ;
	$action = isset($_POST["action"]) ? $_POST["action"] : "ocenenestavby" ;
}
else{
	$controller = isset($_POST["controller"]) ? $_POST["controller"] : "" ;
	$action = isset($_POST["action"]) ? $_POST["action"] : "" ;
}

if (!$controller){	fatal("neni nastavena lokace");}
if (!$action){	fatal("neni nastavena lokace");}
///globals
$url = $baseurl."/Content/".$controller."/".$action;
$path	 = "../Content/".$controller."/".$action;;



function getfiles($path, $culture){
	/* @var $path type */
	if ($handle = opendir($path)) {
		$arr = null;
		while (false !== ($file = readdir($handle))) {
			if ($file != "." && $file != "..") {
				
				if (is_dir($path."/".$file)){
					$tmp["name"] = $file;
					
					//$tmp["images"] = array("01.jpg","02.jpg","03.jpg","04.jpg","05.jpg","06.jpg","07.jpg") ;
					$arr["galleries"][] = $tmp;
				}
				
				
			}
		}
		closedir($handle);
		return $arr;
	}
}

$ret = getfiles($path,$culture);
$ret["url"] = $url;
$ret["controller"] = $controller;
$ret["action"] = $action;

echo json_encode($ret);




?>
