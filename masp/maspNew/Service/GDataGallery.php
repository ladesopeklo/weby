<?php 
require  '../config.php';
require  'libs.php';
//ini_set('display_errors', '0');
error_reporting(E_ALL ^ E_STRICT);

$clientLibraryPath = 'GData/library';
$oldPath = set_include_path(get_include_path() . PATH_SEPARATOR . $clientLibraryPath);
require_once 'Zend/Loader.php';
require_once 'GoogleClientWrapper.php';
require_once 'GData/GDataGallery.php';

Zend_Loader::loadClass('Zend_Gdata_Photos');
Zend_Loader::loadClass('Zend_Gdata_ClientLogin');
Zend_Loader::loadClass('Zend_Gdata_AuthSub');

function getAuthSubHttpClient()
{
    $ccc = new GoogleClientWrapper();
    try {
        $token = $ccc->getAccessTokenId();
    } catch (exception $ex) {
        echo ExceptionToJson($ex);                
        exit(1);
    }


    /*if (!isset($_SESSION['sessionToken']) && !isset($_GET['token']) ){
        echo '<a href="' . getAuthSubUrl() . '">Login!</a>';
        exit;
    } else if (!isset($_SESSION['sessionToken']) && isset($_GET['token'])) {
        $_SESSION['sessionToken'] = Zend_Gdata_AuthSub::getAuthSubSessionToken($_GET['token']);
    }*/
    
    $client = Zend_Gdata_AuthSub::getHttpClient($token);
    return $client;

}



session_start();

//$data = json_decode(file_get_contents('php://input'));
//$location = $data->{"location"};
//echo $location;

$location = "xxx";

$gp = new Zend_Gdata_Photos(getAuthSubHttpClient(), "Google-DevelopersGuide-1.0");
$gallery = new GDataGallery($gp);

echo json_encode($gallery->chuj($location));

?>