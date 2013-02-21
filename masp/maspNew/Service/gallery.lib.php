<?php 
require  'libs.php';


if (!function_exists("preprint")) { 
	function preprint($s, $return=false) { 
		$x = "<pre>"; 
		$x .= print_r($s, 1); 
		$x .= "</pre>"; 
		if ($return) return $x; 
		else print $x; 
	} 
} 


/**
* 
*/
class ClassName
{
	private $baseurl;

	function __construct($baseUrl)
	{
		$this->baseurl = $baseUrl;
	}

	public function getGallery($location, $culture) { 
		$base = $this->baseurl;

		$list = $this->getfiles("../Content/".$location."/slides/",$culture );
		$list["vizualizace"] = $this->vizualizace("../Content/".$location."/3d/",$location,$base );
		$list["full"] = curPageURL().$base."/Content/".$location."/slides/";
		$list["thumb"] = curPageURL().$base."/Content/".$location."/thumbs/";
		$list["location"] = $location;
		return $list;
	}

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

		if (isset($p['extension']))
		{
			$e = strtolower($p['extension']);
			return ($e == $ext && strtolower($p['filename']) == $filename );
		}
		return false;
	}
	function titlefile($base,$imgfile){
		$p = pathinfo($imgfile);
		return $base.$p['filename'];
	}


	function getfiles($path, $culture){
		if (is_dir($path) && $handle = opendir($path)) {
			$arr = null;
			while (false !== ($file = readdir($handle))) {
				if ($file != "." && $file != "..") {
					if(isimage($file)){
						$xxx["name"] =  $file;
						$tit = $this->titlefile($path, $file);
						$xxx["title"] = "";
						if (file_exists($tit.".cz.txt")) $xxx["title"]["cz"] =  file_get_contents($tit.".cz.txt",true);
						if (file_exists($tit.".en.txt")) $xxx["title"]["en"] =  file_get_contents($tit.".en.txt",true);
						$arr["images"][] = $xxx;
					}
					if ($this->isContent($file, $culture,$culture."_figure","txt")){
						$arr["figure"] =  file_get_contents($path.$file,true);
					}
					if ($this->isContent($file, $culture,$culture."_text","html")){
						$arr["text"] =  file_get_contents($path.$file,true);
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
				if($this->ishtml($file)){
					$arr[] = curPageURL().$baseurl."/Content/".$location."/3d/".$file;
				}
			}
		}
		return $arr;
	}


}



?>