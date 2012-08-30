<?php 
require  '../config.php';
require  'libs.php';

//input
/*
 * controller
 * action
 * culture
 * 
 */

//RETURN
/*
 * 
 */

////check
$source = $debug ? $_REQUEST : $_POST; 
$culture = isset($source["culture"]) ? $source["culture"] : $defaultCulture ;
$controller=null;

$controller = isset($source["controller"]) ? urldecode ($source["controller"]) : "" ;
$action = isset($source["action"]) ? urldecode($source["action"]) : "" ;
$maxitems = isset($source["maxitems"]) ? urldecode($source["maxitems"]) : $gallerylist_maxItemsDefualts ;


if (!$controller){	fatal("neni nastavena lokace");}
if (!$action){	fatal("neni nastavena lokace");}
///globals
$url = $baseurl."/Content/".$controller."/".$action;
$path	 = "../Content/".$controller."/".$action;



function getfiles($path, $culture, $maxitems){
	/* @var $path type */
	if ($handle = opendir($path)) {
		$arr = null;$i = 0;

		while (false !== ($file = readdir($handle)) && $i++ <=$maxitems+1) {
			if ($file != "." && $file != "..") {
				
				if (is_dir($path."/".$file)){
					$tmp["name"] = $file;
					$arr["galleries"][] = $tmp;
				}
			}
			
		}
		closedir($handle);
		sort($arr["galleries"]);
		return $arr;
	}
}

$list = getfiles($path,$culture, $maxitems);


$list["url"] = $url;
$list["controller"] = $controller;
$list["action"] = $action;

$urlimagesFullsize = $url."/slides/";
$urlimagesThumbs = $url."/thumbs/";

$list["urlimgfullsize"] = $urlimagesFullsize;
$list["urlimgthumbs"] = $urlimagesThumbs;


echo json_encode($list);




?>
