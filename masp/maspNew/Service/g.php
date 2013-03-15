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


session_start();

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

echo $_GET['token'];

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

// update the second argument to be CompanyName-ProductName-Version
$gp = new Zend_Gdata_Photos(getAuthSubHttpClient(), "Google-DevelopersGuide-1.0");

// In version 1.5+, you can enable a debug logging mode to see the
// underlying HTTP requests being made, as long as you're not using
// a proxy server
// $gp->enableRequestDebugLogging('/tmp/gp_requests.log');
// Creates a Zend_Gdata_Photos_AlbumQuery
$query = $gp->newAlbumQuery();

$query->setUser("default");
$query->setAlbumName("xxx");

$albumFeed = $gp->getAlbumFeed($query);

foreach ($albumFeed as $albumEntry) {
//    echo $albumEntry->getKeywords() . "<br />\n";
    
	preprint($albumEntry->getMediaGroup());
}

?>