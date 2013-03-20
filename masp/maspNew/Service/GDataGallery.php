<?php 
require_once  '../config.php';
require_once  'libs.php';
require_once  'GDataClientFactory.php';
//ini_set('display_errors', '0');
error_reporting(E_ALL^E_STRICT);

session_start();

if (APP_DEBUG && isset($_GET["gallery"]))
	$location = $_GET["gallery"];
else {
	$data = json_decode(file_get_contents('php://input'));
	$location = $data->{"location"};
}


function xxx($keywordsArray) {
	foreach ($keywordsArray as $value) {
		$ok = preg_match('/^(small|medium|large|xlarge):([s|w|h]\d+[-c]*)$/i', $value, $matches);
		preprint($ok);
		preprint($matches);
		$xxx[$value] = $value;				
	}
	return $xxx;
}

try {
	$client = new GDataClientFactory();
	$gallery = new GDataGallery($client->getClient());

	$response = $gallery->chuj($location);	

	$aaa = array("SMall:s5454-c", "small:sdsd" , "xsmall:s5151:");

	preprint(xxx($aaa));

	//preprint($response); 

	echo json_encode($response);
} catch(Exception $e) {
	echo ExceptionToJson($e);
}



?>