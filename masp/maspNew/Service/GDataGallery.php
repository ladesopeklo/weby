<?php 
if (!function_exists("preprint")) { 
	function preprint($s, $return=false) { 
		$x = "<pre>"; 
		$x .= print_r($s, 1); 
		$x .= "</pre>"; 
		if ($return) return $x; 
		else print $x; 
	} 
} 


require  '../config.php';



$clientLibraryPath = 'GData/library';
$oldPath = set_include_path(get_include_path() . PATH_SEPARATOR . $clientLibraryPath);
require_once 'Zend/Loader.php';
Zend_Loader::loadClass('Zend_Gdata_Photos');
Zend_Loader::loadClass('Zend_Gdata_ClientLogin');
Zend_Loader::loadClass('Zend_Gdata_AuthSub');


function getCurrentUrl() {
return "http://localhost:85/weby/masp/maspNew/Service/g.php";
}
function getAuthSubUrl()
{
    // the $next variable should represent the URL of the PHP script 
    // an example implementation for getCurrentUrl is in the sample code
    $next = getCurrentUrl(); 
    $scope = 'https://picasaweb.google.com/data';
    $secure = false;
    $session = true;
    return Zend_Gdata_AuthSub::getAuthSubTokenUri($next, $scope, $secure,
        $session);
}


function getAuthSubHttpClient()
{
    if (!isset($_SESSION['sessionToken']) && !isset($_GET['token']) ){
        echo '<a href="' . getAuthSubUrl() . '">Login!</a>';
        exit;
    } else if (!isset($_SESSION['sessionToken']) && isset($_GET['token'])) {
        $_SESSION['sessionToken'] = Zend_Gdata_AuthSub::getAuthSubSessionToken($_GET['token']);
    }
    
    $client = Zend_Gdata_AuthSub::getHttpClient($_SESSION['sessionToken']);
    return $client;
}

function getThumb($thumb) { 
    $x["url"] = $thumb->getUrl();
    $x["width"] = $thumb->getWidth();
    $x["height"] = $thumb->getHeight();
    return $x;
}


session_start();

//$data = json_decode(file_get_contents('php://input'));
//$location = $data->{"location"};
//echo $location;

$location = "xxx";

// update the second argument to be CompanyName-ProductName-Version
$gp = new Zend_Gdata_Photos(getAuthSubHttpClient(), "Google-DevelopersGuide-1.0");

$query = $gp->newAlbumQuery();

$query->setUser("default");
$query->setAlbumName($location);

$albumFeed = $gp->getAlbumFeed($query);

$image;
$thumbs;

foreach ($albumFeed as $albumEntry) {
    $image["id"] = $albumEntry->getGphotoId()->getText();
    $image["albumId"] = $albumEntry->getGphotoAlbumId()->getText();
    $image["version"] = $albumEntry->getGphotoVersion()->getText();
    $image["title"] = $albumEntry->getTitle()->getText();
    $image["keywords"] = $albumEntry->getTitle()->getText();
    $image["description"] = $albumEntry->getMediaGroup()->getDescription()->getText();
    
    $thumbs = $albumEntry->getMediaGroup()->getThumbnail();
    $content = $albumEntry->getMediaGroup()->getContent();

    $image["small"] = getThumb($thumbs[0]);
    $image["medium"] = getThumb($thumbs[1]);
    $image["large"] = getThumb($thumbs[2]);
    $image["xlarge"] = getThumb($content[0]);
    $image["fullsize"]["width"] = $albumEntry->getGphotoWidth()->getText();
    $image["fullsize"]["height"] = $albumEntry->getGphotoHeight()->getText();
    //udelat replacovani url
    $image["fullsize"]["url"] = $image["large"]["url"];

    //echo $albumEntry->getGphotoId()->getText(); "<br />\n";
    //preprint($albumEntry->getMediaGroup()->getThumbnail());
 //   echo json_encode($image);
	preprint($image);
//    preprint($albumEntry);
}

?>