<?php 
require  '../config.php';
require  'libs.php';

////check
$culture = isset($_POST["culture"]) ? $_POST["culture"] : "cs" ;
$controller=null;
if ($debug){
	$controller = isset($_POST["controller"]) ? $_POST["controller"] : "galerycontent/ocenenestavby" ;
	$action = isset($_POST["action"]) ? $_POST["action"] : "abc" ;
}
else{
	$controller = isset($_POST["controller"]) ? $_POST["controller"] : "" ;
	$action = isset($_POST["action"]) ? $_POST["action"] : "" ;
}

if (!$controller){	fatal("neni nastavena lokace");}
if (!$action){	fatal("neni nastavena lokace");}
///globals
$url = $baseurl."/Content/".$controller."/".$action;
$path	 = "../Content/".$controller."/".$action;

?> 


<?php
function ishtml($file){
	$p = pathinfo($file);
	if (isset($p['extension']))
	{
		$e = strtolower($p['extension']);
		return ($e == 'html' || $e == "htm");
	}
	return false;
}
function isContent($file,$culture,$filename,$ext){
	$c = substr($file,0, 2);
	if ($c != $culture) return false;
	
	$p = pathinfo($file);
	//preprint($p);
	if (isset($p['extension']))
	{
		$e = strtolower($p['extension']);
		return ($e == $ext && strtolower($p['filename']) == $filename );
	}
	return false;
}

function getproperties($path){
	$f = $path."/properties.php";
	if (file_exists($f)){
		include $f;
		return $data;
		
	}
	
	$data["text"]= "";
	return $data;
}


function getfiles($path, $culture){
	if ($handle = opendir($path)) {
		$arr = null;
		while (false !== ($file = readdir($handle))) {
			if ($file != "." && $file != "..") {
				if(isimage($file)){
					$xxx["name"] =  $file;
					$arr["images"][] = $xxx;
				}
			}
		}
		closedir($handle);
		return $arr;
	}
}

function vizualizace($path,$location,$baseurl){
	if (!is_dir($path)) return;
	if ($handle = opendir($path)) {
		$arr = null;
		while (false !== ($file = readdir($handle))) {
			if(ishtml($file)){
				$arr[] = $url."/3d/".$file;
			}
		}
	}
	return $arr;
}
$pathimagesFullsize = $path."/slides/";
$pathimagesThumbs = $path."/thumbs/";
$path3d = $path."/3d/";

$urlimagesFullsize = $url."/slides/";
$urlimagesThumbs = $url."/thumbs/";


$list = getfiles($pathimagesFullsize,$culture);
$list["url"] = $url;
$list["controller"] = $controller;
$list["action"] = $action;


//$list = getfiles("../Content/".$location."/slides/",$culture );
$list["vizualizace"] = vizualizace($path3d,$action,$url );
$list["urlimgfullsize"] = $urlimagesFullsize;
$list["urlimgthumbs"] = $urlimagesThumbs;


$list["properties"] = getproperties($path);
$list["culture"] = $culture;

//stejny jak actio
//$list["location"] = $location;

//preprint($list);

echo json_encode($list);
exit;
$constants = get_defined_constants(true);
$json_errors = array();
foreach ($constants["json"] as $name => $value) {
    if (!strncmp($name, "JSON_ERROR_", 11)) {
        $json_errors[$value] = $name;
    }
}
var_dump(json_decode(getproperties($path), true));
echo 'Last error: ', $json_errors[json_last_error()], PHP_EOL, PHP_EOL;



?>